import React, { useState } from 'react';
import { Browse, ButtonGlobal, Camera, FACING_MODE_ENVIRONMENT, Frontcam, Uploadfile } from '..';
import camera from '../../../assets/icons/camera.svg';
import filledcamera from '../../../assets/icons/filledcamera.svg';
import { useStore } from '../../../store/zustand';

type CamDropzoneProps = {
    file: any;
    setFile: (file: any) => Object;
};

const CamDropzone = ({ file, setFile }: CamDropzoneProps) => {
    const [docImage, setDocImage] = useState({ url: null, fileData: null });
    // console.log('[CamDropzone] docImage', docImage);
    const { cameraStatus, uploadedImage, setCameraStatus, selectedFile, preview } = useStore();

    const handleImageCapture = (image: any, fileData: any) => {
        setDocImage({
            url: image,
            fileData: fileData
        });
        setFile({
            url: image,
            fileData: fileData
        });
        // setPanError(false);
    };
    const handleImageUpload = (files: any, type: any, fileData: any) => {
        setDocImage({
            url: files,
            fileData: fileData
        });
        setFile({
            url: files,
            fileData: fileData
        });
        // setPanError(false);
    };
    const handleRetake = () => {
        setDocImage({
            url: null,
            fileData: null
        });
        setFile({
            url: null,
            fileData: null
        });
        // setPanError(true);
        setCameraStatus(false);
    };
    return (
        <div>
            {uploadedImage === 0 ? (
                cameraStatus === true && docImage?.url === null ? (
                    <Camera type="pan" cameraType="front" handleImageCapture={handleImageCapture} imagesVal={docImage} preferredFacingMode={FACING_MODE_ENVIRONMENT} />
                ) : (
                    <>
                        {docImage?.url !== null || undefined ? (
                            <div className="flex flex-col w-[100%] md:w-[100%] lg:w-[100%] sm:w-[100%] max-[450px]:w-[100%] max-[640px]:w-[100%] max-[640px]:mb-2 md:mb-2 sm:mb-2  mr-3">
                                <Frontcam imageVal={docImage?.url} handleRetake={() => handleRetake()} />
                            </div>
                        ) : (
                            <>
                                <div className="p-8 text-sm text-darkdefault border border-default rounded-md bg-lightdefault border-dashed flex flex-col justify-center items-center overflow-hidden w-[100%]">
                                    <img src={camera} className="w-[3rem] h-[3rem] flex-col mb-6" />
                                    Upload or click a copy of your PAN card
                                    <div className="flex mt-8">
                                        <Uploadfile type="pan" handleUpload={(files: any, type: any, fileData: any) => handleImageUpload(files, type, fileData)} />
                                        <ButtonGlobal className="text-white text-xs bottom-1.5 font-medium rounded-md pl-2 pr-2 py-[6px] w-max mr-2" onClick={() => setCameraStatus(true)}>
                                            <span className="flex">
                                                <img src={filledcamera} className="h-[15px] mr-2" /> Open Camera
                                            </span>
                                        </ButtonGlobal>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )
            ) : (
                <Browse copyType="Pan Copy" />
            )}
        </div>
    );
};

export default CamDropzone;
