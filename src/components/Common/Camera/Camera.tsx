import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import filledcamera from '../../../assets/icons/filledcamera.svg';
import ButtonGlobal from '../ButtonGlobal';
// import retry from '../../assets/icons/retry.png';
import { useStore } from '../../../store/zustand';
import { FACING_MODE_ENVIRONMENT, FACING_MODE_USER, resolutions } from './cameraConfig';

const CAMERA_WEBCAM_PATTERN = /webcam|usb/i;
const FACING_MODE_USER_PATTERN = /front|self|user/i;
const FACING_MODE_ENVIRONMENT_PATTERN = /back|rear/i;

type DeviceList = { label: string; deviceId: string; type?: string; mirrored?: boolean }[];

type CameraProps = {
    mediaRecorderRef?: any | null;
    capturing?: boolean;
    setCapturing?: React.Dispatch<React.SetStateAction<boolean>>;
    recordedChunks?: any;
    setRecordedChunks?: React.Dispatch<React.SetStateAction<any>>;
    type: string;
    cameraType: string;
    handleImageCapture?: any;
    imagesVal: any;
    preferredFacingMode?: 'user' | 'environment';
};

/**
 * Camera Component
 */
const Camera = ({ type, handleImageCapture, cameraType, preferredFacingMode = FACING_MODE_ENVIRONMENT }: CameraProps) => {
    const webcamRef = useRef<any | null>(null);
    const { setCameraStatus } = useStore();
    const [resolutionIndex] = useState<number>(0);
    const [camDevices, setCamDevices] = useState<DeviceList>([]);
    const [deviceIdx, setDeviceIdx] = useState<number>(-1);
    const [videoConstraints, setVideoConstraints] = useState<Object>({
        width: 1280,
        height: 720,
        aspectRatio: 0.8
    });

    /**
     * To get all the connected devices
     */
    const getDevices = useCallback(
        (mediaDevices: any) => {
            const _videoMediaDevices = mediaDevices.filter(({ kind }: any) => kind === 'videoinput');
            const _mediaDevices: DeviceList = _videoMediaDevices.map(({ label, deviceId }: { label: string; deviceId: string }) => ({
                label,
                deviceId
            }));

            const deviceList: DeviceList = getModifiedDeviceList(_mediaDevices);

            if (deviceList.length > 0) {
                const deviceIdx = getDeviceIdx(deviceList);
                initCamera(deviceList, deviceIdx);
                setDeviceIdx(deviceIdx);
                setCamDevices(deviceList);
            }
        },
        [setCamDevices]
    );

    /**
     * Function to get camera device list based on different conditions like priority and preferred facing mode
     */
    const getModifiedDeviceList = (_mediaDevices: DeviceList) => {
        const _deviceList: DeviceList = _mediaDevices;

        /* Step 1: Modify the list */
        _deviceList?.forEach((device) => {
            const _label = device.label.toLowerCase();

            if (FACING_MODE_USER_PATTERN.test(_label)) {
                device.type = FACING_MODE_USER;
                device.mirrored = true;
            } else if (FACING_MODE_ENVIRONMENT_PATTERN.test(_label)) {
                device.type = FACING_MODE_ENVIRONMENT;
                device.mirrored = false;
            } else if (CAMERA_WEBCAM_PATTERN.test(_label)) {
                device.type = 'webcam';
                device.mirrored = preferredFacingMode === FACING_MODE_USER ? true : false;
            } else {
                device.type = 'other';
                device.mirrored = preferredFacingMode === FACING_MODE_USER ? true : false;
            }
        });

        return _deviceList;
    };

    /**
     * Function to get camera index
     */
    const getDeviceIdx = (deviceList: DeviceList) => {
        /* Step 2: Get the device index */
        let _activeDeviceIdx = 0;

        const deviceIdxObj: { [key: string]: number[] } = {};

        for (let idx in deviceList) {
            let type: string = deviceList[idx]?.type || 'other';

            if (!deviceIdxObj[type]) {
                deviceIdxObj[type] = [+idx];
            } else {
                deviceIdxObj[type].push(+idx);
            }
        }

        if (deviceIdxObj['webcam']?.length > 0) {
            _activeDeviceIdx = +deviceIdxObj['webcam'][0];
        } else if (deviceIdxObj[preferredFacingMode]?.length > 0) {
            _activeDeviceIdx = deviceIdxObj[preferredFacingMode][0];
        }

        return _activeDeviceIdx;
    };

    /**
     * Initializing Camera
     */
    const initCamera = (camDevices: DeviceList, deviceIdx: number, resolutionIndex: number = 0) => {
        const res = resolutions[resolutionIndex];
        const _deviceId = camDevices?.[deviceIdx]?.deviceId;
        setVideoConstraints((prev) => ({
            ...prev,
            width: res.w,
            height: res.h,
            deviceId: _deviceId
        }));
    };

    /**
     * To switch between cameras
     */
    const switchCamera = () => {
        let _deviceIdx = deviceIdx < camDevices?.length - 1 ? deviceIdx + 1 : 0;

        if (camDevices.length > 0) {
            initCamera(camDevices, _deviceIdx);
        }
        setDeviceIdx(_deviceIdx);
    };

    /**
     * To capture image
     */
    const capture = useCallback(
        async (e: any) => {
            e.preventDefault();
            const imageSrc = webcamRef?.current?.getScreenshot();
            const blob = await fetch(imageSrc).then((res) => res.blob());
            const fileData = new File([blob], `${type}_${cameraType}.${blob.type.split('/')[1]}`, { type: blob.type });
            handleImageCapture(imageSrc, fileData);
            setCameraStatus(false);
        },
        [webcamRef]
    );

    /**
     * To close camera
     */
    const closeCamera = () => {
        setCameraStatus(false);
    };

    const btnClasses = 'bg-curtain text-white border-2 border-white text-[12px] rounded-[6px] px-4';

    return (
        <div className={'fixed top-0 left-0 right-0 bottom-0 z-50 bg-curtain lg:p-5 p-2 flex flex-col justify-center items-center'}>
            <p className="p-2 text-white border-2 border-white border-solid rounded-lg">
                {camDevices[deviceIdx]?.label}-{camDevices[deviceIdx]?.type}
            </p>
            <div className="flex flex-col mr-3 mt-[65px] w-full max-w-[800px] max-h-[95%]">
                <Webcam
                    className="rounded-[10px]"
                    audio={false}
                    ref={webcamRef}
                    minScreenshotHeight={500}
                    minScreenshotWidth={500}
                    screenshotFormat="image/jpeg"
                    screenshotQuality={0.98}
                    forceScreenshotSourceSize={true}
                    imageSmoothing={true}
                    mirrored={camDevices[deviceIdx]?.mirrored || false}
                    videoConstraints={videoConstraints}
                    onUserMedia={() => {
                        if (!camDevices?.length) {
                            navigator.mediaDevices
                                .enumerateDevices()
                                .then(getDevices)
                                .catch((err) => console.error('[Camera] error: Devices not found', err));
                        }
                    }}
                    onUserMediaError={(err) => {
                        console.error('[Camera] err', err);
                    }}
                />
                <div className={`fixed left-0 right-0 bottom-[10px] lg:bottom-[20px] flex flex-row flex-wrap gap-2 justify-around mt-3 w-full`}>
                    <ButtonGlobal onClick={closeCamera} className={btnClasses}>
                        Cancel
                    </ButtonGlobal>
                    {camDevices?.length > 1 && (
                        <ButtonGlobal onClick={switchCamera} className={btnClasses}>
                            Switch Camera
                        </ButtonGlobal>
                    )}
                    <ButtonGlobal onClick={capture} className={btnClasses}>
                        <>
                            <img src={filledcamera} className="w-[16px] h-[16px] mr-2" /> Capture
                        </>
                    </ButtonGlobal>
                </div>
            </div>
        </div>
    );
};

export default Camera;
