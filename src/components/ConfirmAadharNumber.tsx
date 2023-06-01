import React, { useEffect, useState } from 'react';
import { GlobalStepPropsType } from '../utils/globalInterfaces.ts/stepsInterface';
import ButtonGlobal from './Common/ButtonGlobal';
import Labelglobal from './Common/Labelglobal';
import InputGlobal from './Common/InputGlobal';

const ConfirmAadharNumber = ({ stepData, handleSubmit, isDisabledCTA }: GlobalStepPropsType) => {
    const [aadharCardNumber, setAadharCardNumber] = useState('');
    const { label, description, isSkipable, primaryCTAText } = stepData;
    const handleConfirmAadharClick = () => {
        handleSubmit({ ...stepData, form_data: { aadhar: aadharCardNumber, is_consent: 'Y' }, stepStatus: 3 });
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
                <div className="mb-7 w-[80%] xl:w-[45%]">
                    <Labelglobal className="block text-black text-sm font-bold mb-2">Aadhar card Number</Labelglobal>
                    <InputGlobal
                        className="busin_drpdwn_input"
                        name="shopName"
                        value={aadharCardNumber}
                        onChange={(e: any) => setAadharCardNumber(e.target.value)}
                        id="username"
                        type="number"
                        placeholder=""
                    />
                </div>
                <div>
                    You hereby consent to Eko India Financial Services Private Limited as your authorized representative to receive your Aadhaar verification information from UIDAI to validate your
                    Aadhaar details.
                </div>
                <ButtonGlobal
                    className="bg-sky hover:bg-black text-white font-semibold mt-4 py-2 px-8 rounded w-fit sm:w-fit text-[16px] mt-10"
                    onClick={handleConfirmAadharClick}
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

export default ConfirmAadharNumber;
