import React, { useEffect, useRef, useMemo } from 'react';
import CompleteMark from '../../../assets/icons/completemark.svg';
import ButtonGlobal from '../ButtonGlobal';
import { useStore } from '../../../store/zustand';
import { StepDataType, stepsData } from '../../../utils/data/stepsData';
import './Sidebar.css';

type StepperProps = {
    steps: Array<StepDataType>;
    userData: any;
};
const Sidebar = ({ steps, userData }: StepperProps) => {
    const { currentStep, completed, setCurrentStepInput } = useStore();
    console.log('currentStep => ', currentStep);
    // let visibleStepData = steps;
    // console.log('Jalaj Steps', steps, visibleStepData);
    // if (userData?.userDetails?.user_type === 3) {
    //     visibleStepData = visibleStepData?.filter((step) => step.isVisible && step.id !== 10 && step.id !== 9);
    // } else {
    //     visibleStepData = visibleStepData?.filter((step) => step.isVisible);
    // }

    const visibleStepData = useMemo(() => {
        if (!steps) return [];
        if (userData?.userDetails?.user_type === 3) {
            // For Retailers, Filtering out steps: 9 (Business Details) & 10 (Secret PIN)
            return steps?.filter((step) => step.isVisible && step.id !== 10 && step.id !== 9);
        } else {
            return steps?.filter((step) => step.isVisible);
        }
    }, [steps]);

    const progressRef = useRef<any>(null);
    const currentStepIndex = visibleStepData?.map((step) => step.id)?.indexOf(currentStep);

    useEffect(() => {
        let progress = 0;
        if (currentStepIndex + 1 > 1) {
            progress = Math.floor((currentStepIndex / visibleStepData?.length!) * 100);
        }
        if (progressRef?.current) {
            progressRef.current.style.width = `${progress}%`;
        }
    }, [currentStepIndex, visibleStepData]);

    return (
        <div className="w-[75%] sm:w-full sm:rounded-2xl bg-white">
            <div className="px-5 pt-5 p-5 bg-primary rounded-t-2xl">
                <div className="flex-col">
                    <div className="mb-2 text-base text-white">ONBOARDING PROGRESS</div>
                    <div className="w-[100%] bg-white rounded-full h-[12px] h-2.5 mb-4">
                        <div ref={progressRef} className={`bg-success h-[12px] sm:h-3.0 rounded-full`}></div>
                        <div className="text-[14px] text-xs text-end pt-1 text-white mt-2 mt-1">{currentStepIndex > 1 ? `${currentStepIndex} Steps` : '0 Step'} Completed</div>
                    </div>
                </div>
            </div>
            <div className="pt-4 pl-3 p-5 bg-white rounded-b-2xl  h-full mb-10">
                {visibleStepData?.map((step: StepDataType, i: number) => {
                    // console.log('\n\n\n>>>>>>>> Sidebar Step:: ', i, currentStepIndex, step);

                    // if (step.stepStatus === 0 && currentStep === step.id) {
                    //     step.stepStatus = 1; // In progress
                    // }
                    const isDone = i < currentStepIndex;
                    const isCurrent = currentStep === step.id;
                    const isFuture = i > currentStepIndex;

                    return (
                        <span key={step.id} className={`stepbox flex flex-col relative w-60 ${currentStep === step.id ? 'active' : ''} ${step.id < currentStep ? 'complete' : ''}`}>
                            <div
                            // onClick={() => {
                            //     i > 0 && steps[i - 1].stepStatus !== 0 && setCurrentStepInput(steps[i]?.id);
                            // }}
                            >
                                <span className="flex pb-5 items-center">
                                    <span className={`step relative before:bg-lightdefault ${isFuture ? 'disabled' : ''}`}>
                                        {/* {step.stepStatus !== 3 ? i + 1 : <img src={CompleteMark} alt="complete mark" className="w-[15px] h-[11px]" />} */}
                                        {isDone ? <img src={CompleteMark} alt="complete mark" className="w-[14px] h-[14px]" /> : i + 1}
                                    </span>
                                    <div className="min-h-[40px] flex flex-col justify-center">
                                        <div className={`ml-3 pr-2 text-[13px] font-medium ${isCurrent ? 'text-primary' : isFuture ? 'disabled' : 'text-black'}`}>{step.label}</div>
                                        {
                                            /* step.stepStatus >= 1 && step.stepStatus <= 3 */ isCurrent && (
                                                <div
                                                    className={`w-[70px] rounded-full h-[16px] ml-3 mt-[4px] text-[10px] flex justify-center items-center ${
                                                        step.stepStatus === 2 ? 'text-darkdanger bg-white border-darkdanger border-2' : 'text-white bg-warning'
                                                    }`}
                                                >
                                                    {/* step.stepStatus === 1 */ isCurrent ? 'In Progress' : step.stepStatus === 2 ? 'Skipped' : ''}
                                                </div>
                                            )
                                        }
                                    </div>
                                </span>
                            </div>
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
