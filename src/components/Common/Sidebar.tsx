import React from 'react';
import CompleteMark from '../../assets/icons/completemark.svg';
import ButtonGlobal from './ButtonGlobal';
import { useStore } from '../../store/zustand';
import { StepDataType, stepsData } from '../../utils/data/stepsData';

type StepperProps = {
    steps: Array<StepDataType>;
};
const Sidebar = ({ steps }: StepperProps) => {
    const { currentStep, completed, setCurrentStepInput } = useStore();
    console.log('currentStep => ', currentStep);
    return (
        <div className="w-[75%] sm:w-full sm:rounded-2xl bg-white">
            <div className="sidebar">
                <div className="flex-col">
                    <div className="mb-2 text-base text-white">ONBOARDING PROGRESS</div>
                    <div className="sidebar_step_circl">
                        <div
                            className={`bg-green h-[12px] sm:h-2.5 rounded-full ${
                                currentStep === 2
                                    ? 'w-[14%]'
                                    : currentStep === 3
                                    ? 'w-[28%]'
                                    : currentStep === 4
                                    ? 'w-[42%]'
                                    : currentStep === 5
                                    ? 'w-[56%]'
                                    : currentStep === 6
                                    ? 'w-[70%]'
                                    : currentStep === 7
                                    ? 'w-[84%]'
                                    : currentStep === 8
                                    ? 'w-[100]'
                                    : 'w-[0]'
                            }`}
                        ></div>
                        <div className="sidebar_step_indictr">{currentStep > 1 ? stepsData.map((step) => step.id).indexOf(currentStep) + 1 : 0} Steps Completed</div>
                    </div>
                </div>
            </div>
            <div className="sidebar_step_name mb-10">
                {steps
                    ?.filter((step: StepDataType) => step.isVisible)
                    ?.map((step: StepDataType, i: number) => {
                        return (
                            <span key={step.id} className={`step-item ${currentStep === step.id && 'active'} ${step.stepStatus === 3 && 'complete'}`}>
                                <ButtonGlobal
                                // onClick={() => {
                                //     i > 0 && steps[i - 1].stepStatus !== 0 && setCurrentStepInput(steps[i]?.id);
                                // }}
                                >
                                    <span className="flex pb-5 items-center">
                                        <span className={`step ${i > 0 && steps[i - 1].stepStatus == 0 ? 'disabled' : ''}`}>
                                            {/* {step.stepStatus !== 3 ? i + 1 : <img src={CompleteMark} alt="complete mark" className="w-[15px] h-[11px]" />} */}
                                            {step.id >= currentStep ? i + 1 : <img src={CompleteMark} alt="complete mark" className="w-[15px] h-[11px]" />}
                                        </span>
                                        <span>
                                            <p className={`sidebar_step_num ${i > 0 && steps[i - 1].stepStatus == 0 ? 'disabled' : ''}`}>{step.label}</p>
                                            {step.stepStatus > 1 && step.stepStatus < 3 && (
                                                <div className={`stepStatus ${step.stepStatus === 2 ? 'text-red bg-white border-red border-2' : 'text-white bg-orange'}`}>
                                                    {step.stepStatus === 1 ? 'In Progress' : step.stepStatus === 2 ? 'Skipped' : ''}
                                                </div>
                                            )}
                                        </span>
                                    </span>
                                </ButtonGlobal>
                            </span>
                        );
                    })}
            </div>
        </div>
    );
};

export default Sidebar;
