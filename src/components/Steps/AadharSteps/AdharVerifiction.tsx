import React, { useEffect, useState } from 'react';
import camera from '../../../assets/icons/camera.svg';
import filledcamera from '../../../assets/icons/filledcamera.svg';
import { useStore } from '../../../store/zustand';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import { Backcam, Camera, Frontcam } from '../../Common';
import Browse from '../../Common/Browse';
import ButtonGlobal from '../../Common/ButtonGlobal';
import Modal from '../../Common/Modal';
import Uploadfile from '../../Common/Uploadfile';

const AdharVerifiction = ({ stepData, handleSubmit, isDisabledCTA }: GlobalStepPropsType) => {
    const { cameraStatus, uploadedImage, setCameraStatus, image, selectedFile, setImage, preview } = useStore();
    const [cameraType, setCameraType] = useState('');
    const { label, description, isSkipable, primaryCTAText } = stepData;
    const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
    const [frontError, setFrontError] = useState(true);
    const [backError, setBackError] = useState(true);
    const [aadhaarImages, setAadhaarImages] = useState({ back: { url: null }, front: { url: null } });

    useEffect(() => {
        setCameraStatus(false);
    }, []);

    // useEffect(() => {
    //     if (image && cameraType) {
    //         console.log('image', image);
    //         // const objectUrl = URL.createObjectURL(image);
    //         // console.log('objectUrl', objectUrl);
    //         setAadhaarImages({
    //             ...aadhaarImages,
    //             [cameraType]: { url: image }
    //         });
    //     }
    // }, [image]);

    const handleImageCapture = (image: any, fileData: any) => {
        setAadhaarImages({
            ...aadhaarImages,
            [cameraType]: { url: image, fileData }
        });
        if (cameraType === 'front') {
            setFrontError(false);
        } else {
            setBackError(false);
        }
    };

    const handleClickAdhar = () => {
        if (!frontError && !backError) {
            setShowInfoModal(true);
        }
    };

    const handleSkip = () => {
        handleSubmit({ ...stepData, stepStatus: 2 });
    };
    const handleOnclick = () => {
        if (frontError === false && backError === false) {
            handleSubmit({ ...stepData, form_data: { aadhaarImages }, stepStatus: 3 });
        }
    };

    const handleImageUpload = (files: any, type: string, fileData: any) => {
        setAadhaarImages({
            ...aadhaarImages,
            [type]: { url: files, fileData: fileData }
        });
        if (type === 'front') {
            setFrontError(false);
        } else {
            setBackError(false);
        }
    };

    const handleRetake = (type: string) => {
        setAadhaarImages({
            ...aadhaarImages,
            [type]: { url: null, fileData: null }
        });
        if (type === 'front') {
            setFrontError(true);
        } else {
            setBackError(true);
        }
        setCameraStatus(false);
    };
    return (
        <div>
            <div className="text-[22px] font-medium sm:font-normal">{label}</div>
            <div className="mt-3 text-base sm:text-sm font-normal sm:font-light">
                {description}
                <span className="text-primary"> .jpg, .png</span>
            </div>
            <div className="mt-8">
                {uploadedImage == 0 ? (
                    // <div></div>
                    <div className="sm:flex flex-col text-center lg:flex-row max-[640px]:flex  max-[640px]:items-center ">
                        <div className="sm:flex flex-col text-center lg:flex-row w-[90%]">
                            {cameraStatus === true && cameraType === 'front' && aadhaarImages?.front?.url == null ? (
                                <Camera type="Aadhaar" cameraType="front" handleImageCapture={handleImageCapture} imagesVal={aadhaarImages} />
                            ) : (
                                <>
                                    {/* <div className="documentimgstyle xl:w-[36%] lg:[80%] w-[80%] h-[190px] mr-4 sm:w-[100%] md:w-[80%] sm:mb-8 w-72 "> */}
                                    {aadhaarImages?.front?.url ? (
                                        <div className="flex flex-col w-[50%] md:w-[100%] lg:w-[50%] sm:w-[100%] max-[450px]:w-[100%] max-[640px]:w-[100%] max-[640px]:mb-2 md:mb-2 sm:mb-2  mr-3">
                                            <Frontcam imageVal={aadhaarImages?.front?.url} handleRetake={() => handleRetake('front')} />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col xl:w-[50%] lg:w-[50%] lg:mr-4 max-[640px]:mr-0 md:mr-0 max-[640px]:mb-8 sm:mb-8 ">
                                            <div className="p-8 text-sm text-darkdefault border border-default rounded-md bg-lightdefault border-dashed flex flex-col justify-center items-center md:w-[100%]  h-[190px] sm:w-[100%]   ">
                                                <img src={camera} className="w-[2rem] h-[2rem] flex-col mb-4" />
                                                <div className="text-sm">Upload or click front side of your Aadhaar</div>
                                                <div className="flex mt-4 ml-1.5">
                                                    <Uploadfile
                                                        type="front"
                                                        handleUpload={(files: any, type: any, fileData: any) => {
                                                            handleImageUpload(files, type, fileData);
                                                        }}
                                                    />
                                                    <ButtonGlobal
                                                        className="text-xs bottom-1.5 font-medium rounded-md pl-2 pr-2 py-[6px] w-max mr-2"
                                                        onClick={() => (setCameraType('front'), setImage(null), setCameraStatus(true))}
                                                    >
                                                        <>
                                                            <img src={filledcamera} className="h-[15px] mr-2" /> Open Camera
                                                        </>
                                                    </ButtonGlobal>
                                                </div>
                                            </div>
                                            {frontError === true && <div className="self-start text-xs text-darkdanger">Required</div>}
                                        </div>
                                    )}
                                    {/* </div> */}
                                </>
                            )}
                            {cameraStatus === true && cameraType === 'back' && aadhaarImages?.back?.url == null ? (
                                <Camera type="Aadhaar" cameraType="back" handleImageCapture={handleImageCapture} imagesVal={aadhaarImages} />
                            ) : (
                                <>
                                    {/* <div className="documentimgstyle xl:w-[36%] lg:[80%] w-[80%] h-[190px] mr-4  sm:w-[100%] md:w-[80%] "> */}
                                    {aadhaarImages?.back?.url !== null || undefined ? (
                                        <Backcam imageVal={aadhaarImages?.back?.url} handleRetake={() => handleRetake('back')} />
                                    ) : (
                                        <div className="flex flex-col xl:w-[50%] lg:w-[50%] lg:mr-4 max-[640px]:mr-0 md:mr-0 max-[640px]:mb-8 sm:mb-8 ">
                                            <div className="p-8 text-sm text-darkdefault border border-default rounded-md bg-lightdefault border-dashed flex flex-col justify-center items-center md:w-[100%]  h-[190px] sm:w-[100%]   ">
                                                <img src={camera} className="w-[2rem] h-[2rem] flex-col mb-4" />
                                                <div className="text-sm">Upload or click back side of your Aadhaar</div>
                                                <div className="flex mt-4 ml-1.5">
                                                    <Uploadfile
                                                        type="back"
                                                        handleUpload={(files: any, type: any, fileData: any) => {
                                                            handleImageUpload(files, type, fileData);
                                                        }}
                                                    />
                                                    <ButtonGlobal
                                                        className="text-xs bottom-1.5 font-medium rounded-md pl-2 pr-2 py-[6px] w-max mr-2"
                                                        onClick={() => (setCameraType('back'), setCameraStatus(true))}
                                                    >
                                                        <>
                                                            <img src={filledcamera} className="h-[15px] mr-2" /> Open Camera
                                                        </>
                                                    </ButtonGlobal>
                                                </div>
                                            </div>
                                            {backError === true && <div className="self-start text-xs text-darkdanger">Required</div>}
                                        </div>
                                    )}
                                    {/* </div> */}
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <Browse copyType="Aadhaar copy" />
                )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" onClick={handleClickAdhar} disabled={isDisabledCTA || frontError || backError}>
                    {isDisabledCTA ? 'Please wait ...' : primaryCTAText}
                </ButtonGlobal>
                {isSkipable && (
                    <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" onClick={handleSkip}>
                        Skip this step
                    </ButtonGlobal>
                )}
            </div>
            <Modal
                showModal={showInfoModal}
                setShowModal={setShowInfoModal}
                handleOnclick={handleOnclick}
                attentionmsg={
                    <>
                        Are you sure you want to upload this Aadhaar? You will <br /> get only one attempt for Aadhaar verification.
                    </>
                }
            />
        </div>
    );
};
export default AdharVerifiction;
