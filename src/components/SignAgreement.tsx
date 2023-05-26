import React, { useState } from 'react';
import { GlobalStepPropsType } from '../utils/globalInterfaces.ts/stepsInterface';
import ButtonGlobal from './Common/ButtonGlobal';
import { useStore } from '../store/zustand';
const SignAgreement = ({ stepData, handleSubmit, isDisabledCTA = false, handleStepCallBack }: GlobalStepPropsType) => {
    const { steps, currentStep, setCompleted, setCurrentStepPlus } = useStore();
    const [leegalityLoaded, setLeegalityLoaded] = useState<boolean>(false);
    React.useEffect(() => {
        if (typeof handleStepCallBack === 'function') handleStepCallBack({ type: stepData.id, method: 'getSignUrl' });
    }, []);

    const openPopupTab = () => {
        handleStepCallBack({ type: stepData.id, method: 'legalityOpen' });
    };

    const link = 'https://karzatechnologies.sandbox.leegality.com/sign/1f1b1fdd-a903-44f7-a2fc-84653bdf9829';

    return (
        <div className="welcome">
            <div className="items-center text-center text-black">
                <img src="https://files.eko.co.in/docs/onborading/agreement.png" alt="welcome icon" className="welcome_img" />
                <p className="sm:font-normal text-[18px] pt-2 pl-4 pr-4">
                    <span className="sm:block">Happy to see you here. Lets start your onboarding journey.</span>
                    <span className="sm:block"> We ensure, you&apos;ll be assisted at every step.</span>
                </p>
                <ButtonGlobal className="welcome_btn" disabled={isDisabledCTA} onClick={openPopupTab}>
                    {isDisabledCTA ? 'Loading...' : stepData?.primaryCTAText}
                </ButtonGlobal>
            </div>
        </div>
    );
};

export default SignAgreement;
