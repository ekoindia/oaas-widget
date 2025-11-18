import React, { useEffect, useState } from 'react';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';

const ActivationPlan = ({ stepData, handleSubmit, isDisabledCTA, handleStepCallBack, skipButtonComponent }: GlobalStepPropsType) => {
    const [consentData, setConsentData] = useState('');
    const { label, description, primaryCTAText } = stepData;
    const handleActivationPlan = () => {
        // handleSubmit({ ...stepData, form_data: { is_consent: 'Y', consent_text: consentText, name: consentData }, stepStatus: 2 });
    };
    useEffect(() => {
        if (typeof handleStepCallBack === 'function') handleStepCallBack({ type: stepData.id, method: 'getInitialActivationPlan' });
    }, []);
    return (
        <div>
            <div className="text-[22px] font-medium sm:font-normal">{label}</div>
            <div className="mt-3 text-base sm:text-sm font-normal sm:font-light">{description}</div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" onClick={handleActivationPlan} disabled={isDisabledCTA}>
                    {isDisabledCTA ? 'Please wait...' : primaryCTAText}
                </ButtonGlobal>
                {skipButtonComponent}
            </div>
        </div>
    );
};

export default ActivationPlan;
