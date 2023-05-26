import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import ButtonGlobal from './ButtonGlobal';
import filledcamera from '../../assets/icons/filledcamera.svg';
import retry from '../../assets/icons/retry.png';
import { useStore } from '../../store/zustand';
import Frontcam from './Frontcam';
import Backcam from './Backcam';
import FrontBackcapture from './FrontBackcapture';

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
};
const Camera = ({ capturing, setCapturing, mediaRecorderRef, recordedChunks, setRecordedChunks, type, imagesVal, handleImageCapture, cameraType }: CameraProps) => {
    const { image, setImage, setCameraStatus, setManageVeriyStepback } = useStore();
    const videoConstraints = {
        width: { min: 1280 },
        height: { min: 720 },
        aspectRatio: 0.6666666667,
        facingMode: 'user'
    };

    const webcamRef = useRef<any | null>(null);

    const capture = useCallback(
        async (e: any) => {
            e.preventDefault();
            const imageSrc = webcamRef?.current?.getScreenshot();
            console.log('Image src', imageSrc);
            const blob = await fetch(imageSrc).then((res) => res.blob());
            const fileData = new File([blob], `${type}_${cameraType}.${blob.type.split('/')[1]}`, { type: blob.type });
            console.log('Image src Blob', blob, fileData);

            // formData.append('images', blob);
            handleImageCapture(imageSrc, fileData);
            setCameraStatus(false);
            // setManageVeriyStep();
        },
        [webcamRef]
    );

    const handleRetake = (e: any) => {
        e.preventDefault();
        setImage(null);
        // setManageVeriyStepback();
    };

    const handleDataAvailable = useCallback(({ data }: any) => {
        if (data.size > 0) {
            setRecordedChunks?.((prev: any) => prev.concat(data));
        }
    }, []);

    const handleStartCaptureClick = useCallback(
        (e: any) => {
            e.preventDefault();
            setCapturing?.(true);
            mediaRecorderRef.current = new MediaRecorder(webcamRef?.current?.stream, {
                mimeType: 'video/webm'
            });
            mediaRecorderRef?.current?.addEventListener('dataavailable', handleDataAvailable);
            mediaRecorderRef?.current?.start();
        },
        [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]
    );

    const handleStopCaptureClick = useCallback(
        (e: any) => {
            e.preventDefault();
            mediaRecorderRef?.current?.stop();
            setCapturing?.(false);
        },
        [mediaRecorderRef, setCapturing]
    );

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: 'video/webm'
            });
            const url = URL.createObjectURL(blob);
            const a: any = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = url;
            a.download = 'react-webcam-stream-capture.webm';
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks?.([]);
        }
    }, [recordedChunks]);
    console.log('imagesVal', imagesVal, imagesVal?.front?.url, imagesVal?.back?.url);
    return (
        <span>
            {/* {image === null ? ( */}
            <>
                <span className={`${type === 'Pan' || type === 'videoRecord' ? 'flex justify-end' : 'flex'}`}>
                    {type === 'Pan' || type === 'videoRecord' ? (
                        <Webcam
                            audio={false}
                            mirrored={true}
                            height={type === 'videoRecord' ? 500 : 500}
                            width={type === 'videoRecord' ? 500 : 500}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            className="rounded-[10px]"
                        />
                    ) : (
                        <>
                            <div className="flex flex-col jalaj">
                                <Webcam
                                    audio={false}
                                    mirrored={true}
                                    height={340}
                                    width={340}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                    className="rounded-[10px]"
                                />
                                <span className={`flex flex-col items-end mt-3`}>
                                    <ButtonGlobal onClick={capture} className="cam_btn">
                                        <>
                                            <img src={filledcamera} className="w-[16px] h-[16px] mr-1" /> Capture
                                        </>
                                    </ButtonGlobal>
                                </span>
                            </div>
                            {/* <FrontBackcapture type="front" /> */}
                        </>
                    )}
                </span>
            </>
            {/* ) : (
                type !== 'Aadhaar' && (
                    <>
                        <img src={image} alt="screenshot" className="rounded-[10px]" />
                        <span className="flex justify-end mt-3">
                            <ButtonGlobal onClick={handleRetake} className="cam_btn">
                                <>
                                    <img src={retry} alt="retry_icon" className="w-[16px] h-[16px] mr-1" /> Re-Capture
                                </>
                            </ButtonGlobal>
                        </span>
                    </>
                )
            )} */}
        </span>
    );
};

export default Camera;