import React, { useEffect, useState } from 'react';
import { GlobalStepPropsType } from '../utils/globalInterfaces.ts/stepsInterface';
import ButtonGlobal from './Common/ButtonGlobal';
import Labelglobal from './Common/Labelglobal';
import InputGlobal from './Common/InputGlobal';

const AadharNumberOtpVerify = ({ stepData, handleSubmit, isDisabledCTA }: GlobalStepPropsType) => {
    const [otpVal, setOtpVal] = useState('');
    const [shareCode, setShareCode] = useState('');
    const { label, description, isSkipable, primaryCTAText } = stepData;
    const handleOtpAadharClick = () => {
        handleSubmit({ ...stepData, form_data: { otp: otpVal, is_consent: 'Y', share_code: shareCode }, stepStatus: 3 });
    };
    const handleSkip = () => {
        handleSubmit({ ...stepData, stepStatus: 2 });
    };
    return (
        <div className="pt-8 sm:p-8">
            <div className="text-[22px] font-[500] sm:font-[400]">{label}</div>
            <div className="mt-3 text-[16px] sm:text-[14px] font-[400] sm:font-[300]">{description}</div>
            <div className="mt-10 relative"></div>
            <span className={`flex flex-col items-center sm:block`}>
                <div className="mb-7 w-[45%]">
                    <Labelglobal className="block text-black text-sm font-bold mb-2">OTP</Labelglobal>
                    <InputGlobal className="busin_drpdwn_input" name="otp" value={otpVal} onChange={(e: any) => setOtpVal(e.target.value)} id="otp" type="number" placeholder="" />
                </div>
                <div className="mb-7 w-[45%]">
                    <Labelglobal className="block text-black text-sm font-bold mb-2">Share Code</Labelglobal>
                    <InputGlobal className="busin_drpdwn_input" name="shareCode" value={shareCode} onChange={(e: any) => setShareCode(e.target.value)} id="shareCode" type="number" placeholder="" />
                </div>
                <ButtonGlobal
                    className="bg-sky hover:bg-black text-white font-semibold mt-4 py-2 px-8 rounded w-fit sm:w-fit text-[16px] mt-10"
                    onClick={handleOtpAadharClick}
                    disabled={isDisabledCTA}
                >
                    {isDisabledCTA ? 'Please wait...' : primaryCTAText}
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

export default AadharNumberOtpVerify;
