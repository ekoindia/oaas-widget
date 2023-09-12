import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import filledcamera from '../../../assets/icons/filledcamera.svg';
import ButtonGlobal from '../ButtonGlobal';
// import retry from '../../assets/icons/retry.png';
import { useStore } from '../../../store/zustand';
import { FACING_MODE_USER, resolutions } from './cameraConfig';

// camera priority list for web-cams [[ list of keywords (small-cased) ]], this will be preferred over preferredFacingMode
const CAMERA_PRIORITY: { [key: string]: boolean } = {
    webcam: true,
    droidcam: true,
    source: true
};

const PREFERRED_FACING_MODE_MAPPING: { [key: string]: string } = {
    user: 'front',
    environment: 'back'
};

type DeviceList = { label: string; deviceId: string; read?: boolean }[];

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
const Camera = ({ type, handleImageCapture, cameraType, preferredFacingMode = FACING_MODE_USER }: CameraProps) => {
    const webcamRef = useRef<any | null>(null);
    const { setCameraStatus } = useStore();
    const [resolutionIndex] = useState<number>(0);
    const [camDevices, setCamDevices] = useState<any[]>([]);
    const [deviceIdx, setDeviceIdx] = useState<number>(0);
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
                deviceId,
                read: false
            }));

            if (_mediaDevices.length === 1) {
                setCamDevices(_mediaDevices);
            } else {
                const _updatedMediaDevices: DeviceList = getModifiedDeviceList(_mediaDevices);
                setCamDevices(_updatedMediaDevices);
            }
        },
        [setCamDevices]
    );

    /**
     * Function to get camera device list based on different conditions
     */
    const getModifiedDeviceList = (_mediaDevices: DeviceList) => {
        const _deviceList: DeviceList = [];

        _mediaDevices?.forEach((device) => {
            const _label = device.label.toLowerCase();

            const _splitLabels = _label.split(' ');

            //check if contains any priority keyword
            for (let ele of _splitLabels) {
                if (CAMERA_PRIORITY[ele]) {
                    _deviceList.unshift(device);
                    device.read = true;
                    break;
                }
                // preferred camera back/rear
                else if (ele === PREFERRED_FACING_MODE_MAPPING[preferredFacingMode]) {
                    _deviceList.push(device);
                    device.read = true;
                    break;
                }
            }
        });

        // to push devices which are neither in priority nor preferred
        _mediaDevices.forEach((device) => {
            if (!device.read) {
                _deviceList.push(device);
            }

            delete device.read;
        });

        console.log('_deviceList', _deviceList);
        return _deviceList;
    };

    /**
     * Initializing Camera
     */
    const initCamera = (resolutionIndex: number = 0) => {
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
     * To switch between cameras/facing mode
     */
    const switchCamera = () => {
        setDeviceIdx((prev) => (prev < camDevices?.length - 1 ? prev + 1 : 0));
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

    useEffect(() => {
        if (camDevices.length > 0) {
            initCamera();
        }
    }, [deviceIdx, camDevices]);

    const btnClasses = 'bg-curtain text-white border-2 border-white text-[12px] rounded-[6px] px-4';

    return (
        <div className={'fixed top-0 left-0 right-0 bottom-0 z-50 bg-curtain lg:p-5 p-2 flex flex-col justify-center items-center'}>
            <p className="p-2 text-white border-2 border-white border-solid rounded-lg">{camDevices[deviceIdx]?.label}</p>
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
                    mirrored={camDevices?.length === 1 ? true : false}
                    videoConstraints={videoConstraints}
                    onUserMedia={() => {
                        navigator.mediaDevices
                            .enumerateDevices()
                            .then(getDevices)
                            .catch((err) => console.error('[Camera] error: Devices not found', err));
                    }}
                    onUserMediaError={(err) => {
                        console.error('[Camera] err', err);
                        initCamera(resolutionIndex > resolutions.length ? 0 : resolutionIndex + 1);
                    }}
                />
                {/* <p className="text-white bg-primary"> Cam: {camDevices[deviceIdx]?.label}</p> */}
                <div className={`fixed left-0 right-0 bottom-[10px] lg:bottom-[20px] flex flex-row flex-wrap gap-2 justify-around mt-3 w-full`}>
                    <ButtonGlobal onClick={closeCamera} className={btnClasses}>
                        Cancel
                    </ButtonGlobal>
                    {/* {hasFlash && (
                        <ButtonGlobal onClick={toggleFlash} className={btnClasses}>
                            <>Turn Flash {flashOn ? 'Off' : 'On'}</>
                        </ButtonGlobal>
                    )} */}
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
