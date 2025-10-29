// This is Image Preview Component name has to be changed

import React from 'react';
import retry from '../../../assets/icons/retry.png';
import { useStore } from '../../../store/zustand';
import ButtonGlobal from '../ButtonGlobal';

type FrontcamProps = {
    handleRetake: (input: string) => void;
    imageVal: any;
    type?: string;
};
const Frontcam = ({ handleRetake, imageVal, type }: FrontcamProps) => {
    const { image } = useStore();

    return (
        <>
            <div className={`w-full rounded-[10px] p-4 justify-center flex ${type === 'videoKyc' ? '' : 'h-[190px]'}`}>
                <img src={imageVal || image} alt="screenshot" className="object-contain rounded-[10px] max-w-lg" id="previewImage" />
            </div>
            <span className="flex flex-col justify-end items-end mt-3">
                <ButtonGlobal onClick={handleRetake} className="text-[12px] p-1 rounded-[4px] w-[10rem]">
                    <>
                        <img src={retry} alt="retry_icon" className="w-[16px] h-[16px] mr-1" /> Re-Capture
                    </>
                </ButtonGlobal>
            </span>
        </>
    );
};

export default Frontcam;
