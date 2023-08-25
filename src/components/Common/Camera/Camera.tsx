import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import filledcamera from '../../../assets/icons/filledcamera.svg';
import ButtonGlobal from '../ButtonGlobal';
// import retry from '../../assets/icons/retry.png';
import { useStore } from '../../../store/zustand';
import { FACING_MODE_ENVIRONMENT, FACING_MODE_USER, resolutions } from './cameraConfig';

const VIDEO_CONSTRAINTS = {
    audio: false,
    width: 1280,
    height: 720,
    aspectRatio: 0.8
};

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
const Camera = ({
    capturing,
    setCapturing,
    mediaRecorderRef,
    recordedChunks,
    setRecordedChunks,
    type,
    imagesVal,
    handleImageCapture,
    cameraType,
    preferredFacingMode = FACING_MODE_USER
}: CameraProps) => {
    const webcamRef = useRef<any | null>(null);
    const { setCameraStatus } = useStore();
    const [facingMode, setFacingMode] = useState<CameraProps['preferredFacingMode']>(preferredFacingMode);
    const [hasFlash, setHasFlash] = useState<boolean>(false);
    const [flashOn, setFlashOn] = useState<boolean>(false);
    const [resolutionIndex] = useState<number>(0);
    const [camDevices, setCamDevices] = useState<any[]>([]);
    const [deviceId, setDeviceId] = useState<number>();
    const [videoConstraints, setVideoConstraints] = useState<any>({
        ...VIDEO_CONSTRAINTS,
        facingMode: facingMode
    });

    const handleDevices = useCallback(
        (mediaDevices: any) => {
            let _mediaDevices = mediaDevices.filter(({ kind }: any) => kind === 'videoinput');
            setCamDevices(_mediaDevices);
            setDeviceId(_mediaDevices?.[0]?.deviceId);
        },
        [setCamDevices]
    );

    const detectFlashSupport = useCallback(() => {
        if (!('ImageCapture' in window)) {
            // return Promise.resolve(false);
            setHasFlash(false);
        }
        const track: any = getCameraTrack();
        if (track) {
            const imageCapture = new (window as any).ImageCapture(track);
            imageCapture
                .getPhotoCapabilities()
                .then((result: any) => {
                    setHasFlash(result.fillLightMode.includes('flash') ? true : false);
                })
                .catch(() => {
                    setHasFlash(false);
                });
            /* globals ImageCapture: false */
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((mediaStream) => {
                    webcamRef.current.srcObject = mediaStream;
                })
                .catch((error) => console.error(error));
        } else {
            console.log(':::Cam No camera track found:::');
        }
    }, [setHasFlash]);

    const getCameraTrack = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((mediaStream) => {
                webcamRef.current.srcObject = mediaStream;
                return mediaStream.getVideoTracks()[0];
            })
            .catch((error) => console.error(error));
    };

    const toggleFlash = () => {
        const track: any = getCameraTrack();
        if (track) {
            setFlashOn((flashOn: boolean) => {
                track.applyConstraints({
                    advanced: [{ torch: flashOn ? true : false }]
                });
                return !flashOn;
            });
        }
    };

    const switchCamera = () => {
        const _availableDeviceId = camDevices?.map((cd: any) => cd.deviceId);
        const _currentCamIndex = _availableDeviceId.indexOf(deviceId);
        let _newCamIndex = _currentCamIndex < camDevices?.length - 1 ? _currentCamIndex + 1 : 0;
        let _newCamId = camDevices?.[_newCamIndex]?.deviceId;
        setDeviceId(_newCamId);

        setFacingMode((prev) => (prev === FACING_MODE_USER ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER));
    };

    const capture = useCallback(
        async (e: any) => {
            e.preventDefault();
            const imageSrc = webcamRef?.current?.getScreenshot();
            const blob = await fetch(imageSrc).then((res) => res.blob());
            const fileData = new File([blob], `${type}_${cameraType}.${blob.type.split('/')[1]}`, { type: blob.type });

            // formData.append('images', blob);
            handleImageCapture(imageSrc, fileData);
            setCameraStatus(false);
            // setManageVeriyStep();
        },
        [webcamRef]
    );

    /**
     * Initializing Camera with effects
     */
    const initCamera = (resolutionIndex: number = 0) => {
        const res = resolutions[resolutionIndex];
        setVideoConstraints({
            ...videoConstraints,
            width: res.w,
            height: res.h,
            deviceId: deviceId
        });
    };

    const closeCamera = () => {
        setCameraStatus(false);
    };

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, []);

    useEffect(() => {
        detectFlashSupport();
    }, [deviceId, facingMode]);

    useEffect(() => {
        if (webcamRef?.current) {
            initCamera(resolutionIndex);
        }
    }, [webcamRef?.current, facingMode]);

    const btnClasses = 'bg-curtain text-white border-2 border-white text-[12px] rounded-[6px] px-4';

    return (
        <div className={'fixed top-0 left-0 right-0 bottom-0 z-50 bg-curtain lg:p-5 p-2 flex flex-col justify-center items-center'}>
            {/* ${type === 'Pan' || type === 'videoRecord' ? 'flex justify-end' : 'flex'} */}
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
                    mirrored={true}
                    videoConstraints={videoConstraints}
                    onUserMediaError={(err) => {
                        console.error('[Camera] err', err);
                        initCamera(resolutionIndex > resolutions.length ? 0 : resolutionIndex + 1);
                    }}
                />
                <div className={`fixed left-0 right-0 bottom-[10px] lg:bottom-[20px] flex flex-row flex-wrap gap-2 justify-around mt-3 w-full`}>
                    <ButtonGlobal onClick={closeCamera} className={btnClasses}>
                        Cancel
                    </ButtonGlobal>
                    {hasFlash && (
                        <ButtonGlobal onClick={toggleFlash} className={btnClasses}>
                            <>Turn Flash {flashOn ? 'Off' : 'On'}</>
                        </ButtonGlobal>
                    )}
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

/* ) : (
    type !== 'Aadhaar' && (
        <>
            <img src={image} alt="screenshot" className="rounded-[10px]" />
            <span className="flex justify-end mt-3">
                <ButtonGlobal onClick={handleRetake} className="text-[12px] p-1 rounded-[4px] w-[10rem]">
                    <>
                        <img src={retry} alt="retry_icon" className="w-[16px] h-[16px] mr-1" /> Re-Capture
                    </>
                </ButtonGlobal>
            </span>
        </>
    )
)} */

export default Camera;
