import React from 'react';
import camera from '../../assets/icons/camera.svg';
import ButtonGlobal from './ButtonGlobal';
import Uploadfile from './Uploadfile';
import { useStore } from '../../store/zustand';
import filledcamera from '../../assets/icons/filledcamera.svg';

type FrontBackcaptureProps = {
    type: string;
};
const FrontBackcapture = ({ type }: FrontBackcaptureProps) => {
    const { setCameraType } = useStore();
    return (
        <div
            className={`p-8 text-sm text-extrdarkgray border border-darkgray rounded-md bg-gray border-dashed flex flex-col justify-center items-center w-[40%] h-[190px] ${
                type === 'back' ? 'ml-4' : 'mr-4'
            } text-center`}
        >
            <img src={camera} className="w-[2rem] h-[2rem] flex-col mb-4" />
            <div className="text-sm">Drag and drop back copy of Aadhaar or you can</div>
            <div className="flex mt-4">
                {/* <Uploadfile cameraType={type} /> */}
                <ButtonGlobal
                    className="text-white text-xs bottom-1.5 bg-sky font-medium rounded-md pl-2 pr-2 py-[6px] w-max flex mr-2 justify-center items-center"
                    onClick={() => setCameraType(type)}
                >
                    <>
                        <img src={filledcamera} className="h-[2vh] mr-2" /> Open Camera
                    </>
                </ButtonGlobal>
            </div>
        </div>
    );
};

export default FrontBackcapture;
