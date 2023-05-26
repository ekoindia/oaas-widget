import React from 'react';
import { useStore } from '../../store/zustand';
import ButtonGlobal from './ButtonGlobal';
import retry from '../../assets/icons/retry.png';
import camera from '../../assets/icons/camera.svg';
import Uploadfile from './Uploadfile';
import filledcamera from '../../assets/icons/filledcamera.svg';

type BackcamProps = {
    handleRetake: (input: string) => void;
    imageVal: any;
};
const Backcam = ({ handleRetake, imageVal }: BackcamProps) => {
    console.log('imagesVal inside back', imageVal);

    return (
        <div className="flex flex-col max-w-[60%]">
            {/* <div className="documentimgstyle w-[40%] h-[190px] mr-4 text-center">
                <img src={camera} className="w-[2rem] h-[2rem] flex-col mb-4" />
                <div className="text-sm">{`Drag and drop back copy of Aadhaar or you can`}</div>
                <div className="flex mt-4">
                    <Uploadfile  />
                    <ButtonGlobal className="documentbtn" onClick={() => (setImage(null), setCameraType('front'))}>
                        <>
                            <img src={filledcamera} className="h-[2vh] mr-2" /> Open Camera
                        </>
                    </ButtonGlobal>
                </div>
            </div> */}
            <img src={imageVal} alt="screenshot" className="rounded-[10px]" />
            <span className="flex flex-col justify-end items-start mt-3">
                <ButtonGlobal onClick={handleRetake} className="backcam_rty_btn">
                    <>
                        <img src={retry} alt="retry_icon" className="w-[16px] h-[16px] mr-1" /> Re-Capture
                    </>
                </ButtonGlobal>
            </span>
        </div>
    );
};

export default Backcam;
