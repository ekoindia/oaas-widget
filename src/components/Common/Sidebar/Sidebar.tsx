import React, { useEffect, useMemo, useRef } from 'react';
import CompleteMark from '../../../assets/icons/completemark.svg';
import { StepDataType } from '../../../utils/data/stepsData';
import './Sidebar.css';

type StepperProps = {
    steps: Array<StepDataType>;
    userData: any;
    currentStepId?: number;
    constants: {
        stepIds: {
            BUSINESS: number;
            SECRET_PIN: number;
            [key: string]: number;
        };
        stepStatus: {
            COMPLETED: number;
            SKIPPED: number;
            [key: string]: number;
        };
    };
};
const Sidebar = ({ steps, userData, currentStepId, constants }: StepperProps) => {
    const currentStep = currentStepId ?? 0;
    const { stepIds, stepStatus } = constants;

    const visibleStepData = useMemo(() => {
        if (!steps) return [];
        if (userData?.userDetails?.user_type === 3) {
            // For Retailers, Filtering out steps: Business Details & Secret PIN
            return steps?.filter((step) => step.isVisible && step.id !== stepIds.SECRET_PIN && step.id !== stepIds.BUSINESS);
        } else {
            return steps?.filter((step) => step.isVisible);
        }
    }, [steps, stepIds]);

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
        <div className="w-[75%] sm:w-[280px] sm:rounded-2xl bg-white">
            <div className="px-5 pt-5 p-5 bg-primary rounded-t-2xl">
                <div className="flex-col">
                    <div className="mb-2 text-base text-white">ONBOARDING PROGRESS</div>
                    <div className="w-[100%] bg-white rounded-full h-[12px] h-2.5 mb-4">
                        <div ref={progressRef} className={`bg-success h-[12px] sm:h-3.0 rounded-full`}></div>
                        <div className="text-[14px] text-xs text-end pt-1 text-white mt-2 mt-1">
                            {currentStepIndex}
                            {currentStepIndex > 1 ? ' Steps' : ' Step'} Completed
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-4 pl-3 p-5 bg-white rounded-b-2xl  h-full mb-10">
                {visibleStepData?.map((step: StepDataType, i: number) => {
                    // if (step.stepStatus === 0 && currentStep === step.id) {
                    //     step.stepStatus = 1; // In progress
                    // }
                    const isDone = i < currentStepIndex;
                    const isCurrent = currentStep === step.id;
                    const isFuture = i > currentStepIndex;
                    const isSkipped = step.stepStatus === stepStatus.SKIPPED;

                    // console.log('>>>>>>>> Sidebar Step:: ', isDone ? '↙️' : isFuture ? '↗️' : '—', i, currentStepIndex, step, currentStep);

                    return (
                        <span key={step.id} className={`stepbox flex flex-col relative w-60 ${isCurrent ? 'active' : ''} ${isDone ? 'complete' : ''}`}>
                            <div
                            // onClick={() => {
                            //     i > 0 && steps[i - 1].stepStatus !== 0 && setCurrentStepInput(steps[i]?.id);
                            // }}
                            >
                                <span className="flex pb-5 items-center">
                                    <span className={`step relative before:bg-lightdefault ${isFuture ? 'disabled' : ''} ${isSkipped ? 'border-orange-400 bg-orange-50' : ''}`}>
                                        {/* {step.stepStatus !== 3 ? i + 1 : <img src={CompleteMark} alt="complete mark" className="w-[15px] h-[11px]" />} */}
                                        {isSkipped ? (
                                            <span className="text-[10px] font-bold text-orange-500">—</span>
                                        ) : isDone ? (
                                            <img src={CompleteMark} alt="complete mark" className="w-[14px] h-[14px]" />
                                        ) : (
                                            i + 1
                                        )}
                                    </span>
                                    <div className="min-h-[40px] flex flex-col justify-center">
                                        <div className={`ml-3 pr-2 text-[13px] font-medium ${isCurrent ? 'text-primary' : isFuture ? 'disabled' : isSkipped ? 'text-orange-500' : 'text-black'}`}>
                                            {step.label}
                                        </div>
                                        {isCurrent && (
                                            <div className="w-[70px] rounded-full h-[16px] ml-3 mt-[4px] text-[10px] flex justify-center items-center text-white bg-warning">In Progress</div>
                                        )}
                                        {isSkipped && !isCurrent && (
                                            <div className="w-[70px] rounded-full h-[16px] ml-3 mt-[4px] text-[10px] flex justify-center items-center text-orange-600 bg-orange-100 border border-orange-400">
                                                Skipped
                                            </div>
                                        )}
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
