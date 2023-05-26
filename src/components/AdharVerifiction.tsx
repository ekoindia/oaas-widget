import React, { useEffect, useState } from 'react';
import camera from '../assets/icons/camera.svg';
import filledcamera from '../assets/icons/filledcamera.svg';
import ButtonGlobal from './Common/ButtonGlobal';
import Camera from './Common/Camera';
import { useStore } from '../store/zustand';
import Browse from './Common/Browse';
import Uploadfile from './Common/Uploadfile';
import { GlobalStepPropsType } from '../utils/globalInterfaces.ts/stepsInterface';
import Modal from './Common/Modal';
import Frontcam from './Common/Frontcam';
import Backcam from './Common/Backcam';

const AdharVerifiction = ({ stepData, handleSubmit }: GlobalStepPropsType) => {
    const { cameraStatus, uploadedImage, setCameraStatus, image, selectedFile, setImage, preview } = useStore();
    const [cameraType, setCameraType] = useState('');
    const { label, description, isSkipable, primaryCTAText } = stepData;
    const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
    const [aadharImages, setAadharImages] = useState({ back: { url: null }, front: { url: null } });
    useEffect(() => {
        setCameraStatus(false);
    }, []);

    // useEffect(() => {
    //     if (image && cameraType) {
    //         console.log('image', image);
    //         // const objectUrl = URL.createObjectURL(image);
    //         // console.log('objectUrl', objectUrl);
    //         setAadharImages({
    //             ...aadharImages,
    //             [cameraType]: { url: image }
    //         });
    //     }
    // }, [image]);

    const handleImageCapture = (image: any, fileData: any) => {
        setAadharImages({
            ...aadharImages,
            [cameraType]: { url: image, fileData }
        });
    };

    const handleClickAdhar = () => {
        setShowInfoModal(true);
    };
    console.log('here are the adhar images', aadharImages, cameraStatus, cameraType);

    const handleSkip = () => {
        handleSubmit({ ...stepData, stepStatus: 2 });
    };
    const handleOnclick = () => {
        console.log('uploadedImage', uploadedImage, selectedFile);
        handleSubmit({ ...stepData, form_data: { aadharImages }, stepStatus: 3 });
    };

    const handleImageUpload = (files: any, type: string, fileData: any) => {
        console.log('files', files);
        setAadharImages({
            ...aadharImages,
            [type]: { url: files, fileData: fileData }
        });
    };

    const handleRetake = (type: string) => {
        setAadharImages({
            ...aadharImages,
            [type]: { url: null, fileData: null }
        });
        setCameraStatus(true);
    };
    return (
        <div className="pt-8 sm:p-8">
            <div className="text-[22px] font-[500] sm:font-[400]">{label}</div>
            <div className="mt-3 text-[16px] sm:text-[14px] font-[400] sm:font-[300]">
                {description}
                <span className="text-sky">.jpg, .png, .pdf</span>
            </div>
            <div className="mt-10 relative">
                {uploadedImage == 0 ? (
                    // <div></div>
                    <div className="hidden sm:flex flex-col text-center lg:flex-row ">
                        {cameraStatus === true && cameraType === 'front' && aadharImages?.front?.url == null ? (
                            <Camera type="Aadhaar" cameraType="front" handleImageCapture={handleImageCapture} imagesVal={aadharImages} />
                        ) : (
                            <div className="documentimgstyle xl:w-[36%] lg:[80%] w-[80%] h-[190px] mr-4 sm:w-[100%] md:w-[80%] sm:mb-8 w-72 ">
                                {aadharImages?.front?.url !== null || undefined ? (
                                    <Frontcam imageVal={aadharImages?.front?.url} handleRetake={() => handleRetake('front')} />
                                ) : (
                                    <>
                                        <img src={camera} className="w-[2rem] h-[2rem] flex-col mb-4" />
                                        <div className="text-sm">Drag and drop front copy of Aadhaar or you can</div>
                                        <div className="flex mt-4">
                                            <Uploadfile handleUpload={(files: any, fileData: any) => handleImageUpload(files, 'front', fileData)} />
                                            <ButtonGlobal className="documentbtn" onClick={() => (setCameraStatus(true), setCameraType('front'), setImage(null))}>
                                                <>
                                                    <img src={filledcamera} className="h-[2vh] mr-2" /> Open Camera
                                                </>
                                            </ButtonGlobal>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        {cameraStatus === true && cameraType === 'back' && aadharImages?.back?.url == null ? (
                            <Camera type="Aadhaar" cameraType="back" handleImageCapture={handleImageCapture} imagesVal={aadharImages} />
                        ) : (
                            <div className="documentimgstyle xl:w-[36%] lg:[80%] w-[80%] h-[190px] mr-4  sm:w-[100%] md:w-[80%] ">
                                {aadharImages?.back?.url !== null || undefined ? (
                                    <Backcam imageVal={aadharImages?.back?.url} handleRetake={() => handleRetake('back')} />
                                ) : (
                                    <>
                                        <img src={camera} className="w-[2rem] h-[2rem] flex-col mb-4" />
                                        <div className="text-sm">Drag and drop back copy of Aadhaar or you can</div>
                                        <div className="flex mt-4">
                                            <Uploadfile handleUpload={(files: any, fileData: any) => handleImageUpload(files, 'back', fileData)} />
                                            <ButtonGlobal className="documentbtn" onClick={() => (setCameraStatus(true), setCameraType('back'))}>
                                                <>
                                                    <img src={filledcamera} className="h-[2vh] mr-2" /> Open Camera
                                                </>
                                            </ButtonGlobal>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <Browse copyType="Aadhaar copy" />
                )}
            </div>
            <span className={`flex flex-col items-center sm:block`}>
                <ButtonGlobal
                    className="bg-sky hover:bg-black text-white font-semibold mt-4 py-2 px-8 rounded w-fit sm:w-fit text-[16px]"
                    onClick={handleClickAdhar}
                    // setCapturelocationData={handleLocationCapture}
                    // getLocation={true}
                >
                    {primaryCTAText}
                </ButtonGlobal>

                {isSkipable && (
                    <ButtonGlobal className="font-semibold sm:ml-10 mt-6" onClick={handleSkip}>
                        Skip this step
                    </ButtonGlobal>
                )}
            </span>
            <Modal
                showModal={showInfoModal}
                setShowModal={setShowInfoModal}
                handleOnclick={handleOnclick}
                attentionmsg={
                    <>
                        Are you sure you want to upload this Aadhaar. You will <br /> get only one attempt for Aadhaar verification.
                    </>
                }
            />
        </div>
    );
};

export default AdharVerifiction;
