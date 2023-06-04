import React, { useEffect, useRef } from 'react';
import CompleteMark from '../../assets/icons/completemark.svg';
import ButtonGlobal from './ButtonGlobal';
import { useStore } from '../../store/zustand';
import { StepDataType, stepsData } from '../../utils/data/stepsData';

type StepperProps = {
    steps: Array<StepDataType>;
    userData: any;
};
const Sidebar = ({ steps, userData }: StepperProps) => {
    const { currentStep, completed, setCurrentStepInput } = useStore();
    console.log('currentStep => ', currentStep);
    let visibleStepData = steps;
    if (userData?.details?.user_type === 3) {
        visibleStepData = visibleStepData.filter((step) => step.isVisible && step.id !== 10 && step.id !== 9);
    } else {
        visibleStepData = visibleStepData.filter((step) => step.isVisible);
    }
    const progressRef = useRef<any>(null);
    const currentStepIndex = visibleStepData?.map((step) => step.id)?.indexOf(currentStep);
    console.log('currentStepIndex', currentStepIndex, visibleStepData, currentStep);
    useEffect(() => {
        let progress = `0%`;
        if (currentStepIndex + 1 > 1) {
            progress = `${currentStepIndex + 1 * 10}%`;
        }
        if (progressRef?.current) {
            progressRef.current.style.width = progress;
        }
    }, [currentStepIndex]);
    return (
        <div className="w-[75%] sm:w-full sm:rounded-2xl bg-white">
            <div className="sidebar">
                <div className="flex-col">
                    <div className="mb-2 text-base text-white">ONBOARDING PROGRESS</div>
                    <div className="sidebar_step_circl">
                        <div ref={progressRef} className={`bg-green h-[12px] sm:h-2.5 rounded-full`}></div>
                        <div className="sidebar_step_indictr">{currentStepIndex > 1 ? `${currentStepIndex} Steps` : '0 Step'} Completed</div>
                    </div>
                </div>
            </div>
            <div className="sidebar_step_name mb-10">
                {visibleStepData?.map((step: StepDataType, i: number) => {
                    return (
                        <span key={step.id} className={`step-item ${currentStep === step.id && 'active'} ${step.id < currentStep && 'complete'}`}>
                            <ButtonGlobal
                            // onClick={() => {
                            //     i > 0 && steps[i - 1].stepStatus !== 0 && setCurrentStepInput(steps[i]?.id);
                            // }}
                            >
                                <span className="flex pb-5 items-center">
                                    <span className={`step ${i > 0 && step.id > currentStep ? 'disabled' : ''}`}>
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
