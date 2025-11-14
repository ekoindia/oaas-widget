import React from 'react';
import WelcomeIcon from '../../../assets/icons/welcomeIcon.png';
import { useStore } from '../../../store/zustand';
import { StepDataType } from '../../../utils/data/stepsData';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';

type WelcomeProps = {
    stepData: StepDataType;
};
const Welcome = ({ stepData, handleSubmit, skipButtonComponent }: GlobalStepPropsType) => {
    const { steps, currentStep, setCompleted, setCurrentStepPlus } = useStore();
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="items-center text-center text-black px-4">
                <img src={String(WelcomeIcon)} alt="welcome icon" className="h-48 w-48 sm:h-52 sm:w-52 mx-auto mb-6" />
                <h1 className="text-2xl font-semibold">Welcome!</h1>
                <p className="text-lg font-normal pt-4 px-4 max-w-xl mx-auto">
                    <span className="sm:block">Happy to see you here. Lets start your onboarding journey.</span>
                    <span className="sm:block"> We ensure, you&apos;ll be assisted at every step.</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                    <ButtonGlobal onClick={() => handleSubmit({ ...stepData, stepStatus: 3 })}>{currentStep === steps.length + 1 ? 'Done' : stepData?.primaryCTAText}</ButtonGlobal>
                    {skipButtonComponent}
                </div>
            </div>
        </div>
    );
};

export default Welcome;
