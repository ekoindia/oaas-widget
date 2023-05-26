import React, { useEffect, useState } from 'react';
import camera from '../assets/icons/camera.svg';
import filledcamera from '../assets/icons/filledcamera.svg';
import ButtonGlobal from './Common/ButtonGlobal';
import Camera from './Common/Camera';
import { useStore } from '../store/zustand';
import Browse from './Common/Browse';
import Uploadfile from './Common/Uploadfile';
import { GlobalStepPropsType } from '../utils/globalInterfaces.ts/stepsInterface';
import Frontcam from './Common/Frontcam';
import InputGlobal from './Common/InputGlobal';
import Labelglobal from './Common/Labelglobal';

const PanVerification = ({ stepData, handleSubmit, isDisabledCTA = false, shopTypes = [] }: GlobalStepPropsType) => {
    const { cameraStatus, uploadedImage, setCameraStatus, selectedFile, preview } = useStore();
    const { label, description, isSkipable, primaryCTAText } = stepData;
    const [formValues, setFormValues] = useState({
        shopType: '',
        shopName: '',
        panNumber: ''
    });
    const [panImage, setPanImage] = useState({ url: null, fileData: null });

    useEffect(() => {
        setCameraStatus(false);
    }, []);
    const handleOnSubmit = () => {
        handleSubmit({ ...stepData, form_data: { panImage, ...formValues }, stepStatus: 3 });
    };
    const handleSkip = () => {
        handleSubmit({ ...stepData, stepStatus: 2 });
    };

    const handleImageCapture = (image: any, fileData: any) => {
        setPanImage({
            url: image,
            fileData
        });
    };
    console.log('panImage =>', panImage);
    const handleImageUpload = (files: any, fileData: any) => {
        console.log('files', files);
        setPanImage({
            url: files,
            fileData
        });
    };
    const handleRetake = () => {
        setPanImage({
            url: null,
            fileData: null
        });
        setCameraStatus(true);
    };
    const handleChange = (e: any) => {
        console.log('handleChange', e.target.name, e.target.value);
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };
    console.log(
        'In pan shopTypes',
        shopTypes,
        shopTypes?.filter((shop: any) => shop.dependent_params.is_visible === 1)
    );
    return (
        <div className="pt-8 sm:p-8">
            <div className="text-[22px] font-[500] sm:font-[400]">{label}</div>

            {/* <div className="relative sm:hidden block mt-10">
                {uploadedImage === 0 ? (
                    cameraStatus === true && panImage?.url === null ? (
                        <Camera type="Pan" handleImageCapture={handleImageCapture} imagesVal={panImage} />
                    ) : (
                        <>
                            <div className="documentimgstyle w-[100%] h-[180px]">
                                <img src={camera} className="w-[3rem] h-[3rem] flex-col mb-6" />
                                Upload PAN copy by clicking here
                            </div>
                            <div className="flex justify-center">
                                <div className="side_arrow_alt"></div>
                            </div>
                            <div className="attmp_alt">You will get two attempts for PAN verification</div>
                        </>
                    )
                ) : (
                    <Browse copyType="Pan Copy" />
                )}
            </div> */}
            <div>
                <Labelglobal className="block text-black text-sm font-bold mb-2">Pan Card Number</Labelglobal>
                <InputGlobal className="busin_drpdwn_input" name="panNumber" value={formValues.panNumber} onChange={handleChange} id="panNumber" type="text" placeholder="" />
                {/* {errors.shopName && touched.shopName ? <div className="text-red">{errors.shopName}</div> : null} */}
            </div>
            <div className="relative hidden sm:block mt-10">
                {uploadedImage === 0 ? (
                    cameraStatus === true && panImage?.url === null ? (
                        <Camera type="pan" cameraType="front" handleImageCapture={handleImageCapture} imagesVal={panImage} />
                    ) : (
                        <div className="documentimgstyle overflow-hidden w-[100%]">
                            {panImage.url !== null || undefined ? (
                                <Frontcam imageVal={panImage.url} handleRetake={() => handleRetake()} />
                            ) : (
                                <>
                                    <img src={camera} className="w-[3rem] h-[3rem] flex-col mb-6" />
                                    Drag and drop copy of PAN Card or you can
                                    <div className="hidden sm:flex mt-8">
                                        <Uploadfile handleUpload={(files: any, fileData: any) => handleImageUpload(files, fileData)} />
                                        <ButtonGlobal className="documentbtn" onClick={() => setCameraStatus(true)}>
                                            <>
                                                <img src={filledcamera} className="h-[2vh] mr-2" /> Open Camera
                                            </>
                                        </ButtonGlobal>
                                    </div>
                                </>
                            )}
                        </div>
                    )
                ) : (
                    <Browse copyType="Pan Copy" />
                )}
            </div>
            <div>
                <Labelglobal className="block text-black text-sm font-bold mb-2">Shop Type</Labelglobal>
                <select name="shopType" value={formValues.shopType} onChange={handleChange} id="cars" className="px-0.5 py-3 border-2 border-gray-800 w-full rounded-md bg-white border-gray">
                    {shopTypes?.length > 0 &&
                        shopTypes?.map((shop: any, idx: number) => (
                            <option value={shop.value} key={`${idx}_${shop.value}`}>
                                {shop.label}
                            </option>
                        ))}
                </select>
            </div>
            <div>
                <Labelglobal className="block text-black text-sm font-bold mb-2">Shop Name</Labelglobal>
                <InputGlobal className="busin_drpdwn_input" name="shopName" value={formValues.shopName} onChange={handleChange} id="shopName" type="text" placeholder="" />
                {/* {errors.shopName && touched.shopName ? <div className="text-red">{errors.shopName}</div> : null} */}
            </div>
            <span className={`flex flex-col items-center sm:block`}>
                <ButtonGlobal className="bg-sky hover:bg-black text-white font-semibold mt-4 py-2 px-8 rounded w-fit sm:w-fit text-[16px]" disabled={isDisabledCTA} onClick={handleOnSubmit}>
                    {isDisabledCTA ? 'Loading...' : primaryCTAText}
                </ButtonGlobal>

                {isSkipable && (
                    <ButtonGlobal className="font-semibold sm:ml-10 mt-6" onClick={handleSkip}>
                        Skip this step
                    </ButtonGlobal>
                )}
            </span>
        </div>
    );
};

export default PanVerification;
