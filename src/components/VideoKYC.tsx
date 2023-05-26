import React, { useEffect, useRef, useState } from 'react';
import filledcamera from '../assets/icons/filledcamera.svg';
import selfie from '../assets/icons/selfie.png';
import camera from '../assets/icons/camera.svg';
import { useStore } from '../store/zustand';
import ButtonGlobal from './Common/ButtonGlobal';
import Camera from './Common/Camera';
import InputGlobal from './Common/InputGlobal';
import { GlobalStepPropsType } from '../utils/globalInterfaces.ts/stepsInterface';
import Frontcam from './Common/Frontcam';

const VideoKYC = ({ stepData, handleSubmit, isDisabledCTA = false }: GlobalStepPropsType) => {
    const { cameraStatus, image, setCameraStatus } = useStore();
    const { label, description, isSkipable, primaryCTAText } = stepData;
    const mediaRecorderRef = useRef<any | null>(null);
    const [capturing, setCapturing] = useState<boolean>(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [videoKyc, setVideoKyc] = useState({ url: null, fileData: null });
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        setCameraStatus(false);
    }, []);
    const handleSkip = () => {
        handleSubmit({ ...stepData, stepStatus: 2 });
    };
    const handleImageCapture = (image: any, fileData: any) => {
        setVideoKyc({
            url: image,
            fileData
        });
    };
    const handleRetake = () => {
        setVideoKyc({
            url: null,
            fileData: null
        });
        setCameraStatus(true);
    };
    const handleOnSubmit = () => {
        handleSubmit({ ...stepData, form_data: { videoKyc }, stepStatus: 3 });
    };
    return (
        <div className="pt-8 sm:p-8 w-4/5">
            <div className="text-[22px] font-[500] sm:font-[400]">{label}</div>
            <div className="sm:font-[400] my-6">{description}</div>
            {cameraStatus === true ? (
                <Camera handleImageCapture={handleImageCapture} imagesVal={videoKyc} type="videoRecor" cameraType="front" />
            ) : (
                <>
                    {videoKyc.url !== null || undefined ? (
                        <Frontcam imageVal={videoKyc.url} handleRetake={() => handleRetake()} />
                    ) : (
                        <>
                            <div className="relative sm:hidden block w-[100%]" onClick={() => setCameraStatus(true)}>
                                <div className="videokycmobl w-[100%] h-[180px] text-center text-[22px]">
                                    <img src={camera} className="w-[3rem] h-[3rem] flex-col mb-6" />
                                    Click here to take a live photo/video with ID proof
                                </div>
                            </div>
                            <div className="hidden sm:flex w-full mt-8">
                                <img src={String(selfie)} alt="selfie icon" className="w-28 h-28" />
                                <div className="relative w-[60%] ml-9 flex justify-center items-center">
                                    <InputGlobal type="search" id="search" className="videoKyc min-w-fit" placeholder="Take a live photo/video with ID proof" value={image} />
                                    <ButtonGlobal className="vidoKyCambtn" onClick={() => setCameraStatus(true)}>
                                        <>
                                            <img src={filledcamera} className="h-[2vh] mr-2" /> Open Camera
                                        </>
                                    </ButtonGlobal>
                                </div>
                            </div>
                        </>
                    )}
                    <span className={`flex flex-col items-center sm:block mt-8`}>
                        <ButtonGlobal
                            className="bg-sky hover:bg-black text-white font-semibold mt-4 py-2 px-8 rounded w-fit sm:w-fit text-[16px]"
                            onClick={handleOnSubmit}
                            disabled={isDisabledCTA}
                            // setCapturelocationData={handleLocationCapture}
                            // getLocation={true}
                        >
                            {isDisabledCTA ? 'Loading...' : primaryCTAText}
                        </ButtonGlobal>

                        {isSkipable && (
                            <ButtonGlobal className="font-semibold sm:ml-10 mt-6" onClick={handleSkip}>
                                Skip this step
                            </ButtonGlobal>
                        )}
                    </span>
                </>
            )}
        </div>
    );
};

export default VideoKYC;
