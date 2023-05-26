import React, { useEffect, useState } from 'react';
import { GlobalStepPropsType } from '../utils/globalInterfaces.ts/stepsInterface';
import ButtonGlobal from './Common/ButtonGlobal';
import Labelglobal from './Common/Labelglobal';
import InputGlobal from './Common/InputGlobal';
const consentText =
    'You hereby consent to Eko India Financial Services Private Limited as your authorized representative to receive your personal and credit information from UIDAI, CIBIL and other government and private agencies for the purpose of providing you credit in the form of loans or line of credit through our lending partners (&quot;End Use Purpose&quot;).';
const AadharConsent = ({ stepData, handleSubmit, isDisabledCTA }: GlobalStepPropsType) => {
    const [consentData, setConsentData] = useState('');
    const { label, description, isSkipable, primaryCTAText } = stepData;
    const handleAadharConsentClick = () => {
        handleSubmit({ ...stepData, form_data: { is_consent: 'Y', consent_text: consentText, name: consentData }, stepStatus: 3 });
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
                <div>
                    <Labelglobal className="block text-black text-sm font-bold mb-2">Name</Labelglobal>
                    <InputGlobal className="busin_drpdwn_input" name="shopName" value={consentData} onChange={(e: any) => setConsentData(e.target.value)} id="username" type="text" placeholder="" />
                </div>
                <ButtonGlobal className="bg-sky hover:bg-black text-white font-semibold mt-4 py-2 px-8 rounded w-fit sm:w-fit text-[16px]" onClick={handleAadharConsentClick} disabled={isDisabledCTA}>
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

export default AadharConsent;
