import React, { useEffect, useState } from 'react';
import { useStore } from '../../../store/zustand';
import { StepDataType } from '../../../utils/data/stepsData';
import Alert from '../../Common/Alert';
import Fetching from '../../Common/Fetching';
import Sidebar from '../../Common/Sidebar/Sidebar';
import Business from '../../Steps/Business/Business';
import VideoKYC from '../../Steps/KYC/VideoKYC';
import OnboardingStatus from '../../Steps/OnBoardingStatus/OnboardingStatus';
import AadhaarConsent from '../AadharSteps/AadharConsent';
import AadhaarNumberOtpVerify from '../AadharSteps/AadharNumberOtpVerify';
import AdharVerifiction from '../AadharSteps/AdharVerifiction';
import ConfirmAadhaarNumber from '../AadharSteps/ConfirmAadharNumber';
import ActivationPlan from '../ActivationPlan/ActivationPlan';
import SignAgreement from '../Agreement/SignAgreement';
import BusinessMerchant from '../Business/BusinessMerchant';
import LocationCapture from '../Location/LocationCapture';
import SecretPin from '../PIN/SecretPin';
import PanAdharMatch from '../PanSteps/PanAdharMatch';
import PanVerification from '../PanSteps/PanVerification';
import SelectionScreen from '../SelectionScreen/SelectionScreen';
import Welcome from '../Welcome/Welcome';

type HomepageProps = {
    sideBarToggle: boolean;
    setSideBarToggle: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (data: StepDataType) => void;
    stepResponse: any;
    shopTypes: Array<any>;
    selectedMerchantType: string | number;
    stateTypes: Array<any>;
    handleStepCallBack: any;
    userData: any;
    esignStatus: any;
    orgDetail?: any;
};

export const OnBoradingWrapper = ({
    sideBarToggle,
    setSideBarToggle,
    handleSubmit,
    stepResponse,
    shopTypes,
    selectedMerchantType,
    stateTypes,
    handleStepCallBack,
    userData,
    esignStatus,
    orgDetail
}: HomepageProps) => {
    const { currentStep, panStatus, fetchData, finish, steps, preview, selectedFile, image, cameraType, setCurrentStepInitial, setStepsData } = useStore();
    const [isDisable, setIsDisable] = useState<boolean>(false);
    const [currentStepData, setCurrentStepData] = useState<any>();

    const handleStepSubmit = (data: any) => {
        if (data.id === 1) {
            const currentStepIndex = steps?.map((step: StepDataType) => step?.id)?.indexOf(data?.id);
            setCurrentStepInitial(steps[currentStepIndex + 1]?.id);
            setStepsData(data);
            setCurrentStepData(data);
            // handleSubmit(data);
        } else {
            setIsDisable(true);
            setCurrentStepData(data);
            handleSubmit(data);
        }
        // return void;
    };

    const renderStep = (currentStep: number): any => {
        const stepData: StepDataType | undefined = steps?.find((step: StepDataType) => step.id === currentStep);
        if (stepData) {
            switch (currentStep) {
                case 2:
                    return <SelectionScreen handleSubmit={handleStepSubmit} stepData={stepData} isDisabledCTA={isDisable} />;
                case 3:
                    return <LocationCapture stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} handleStepCallBack={handleStepCallBack} />;
                case 4:
                    return <AdharVerifiction stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} />;
                case 5:
                    return <AadhaarConsent stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} orgDetail={orgDetail} />;
                case 6:
                    return <ConfirmAadhaarNumber stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} orgDetail={orgDetail} />;
                case 7:
                    return <AadhaarNumberOtpVerify stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} handleStepCallBack={handleStepCallBack} />;
                case 8:
                    return <PanVerification stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} shopTypes={shopTypes} />;
                case 9:
                    if (userData?.userDetails?.user_type === 1) {
                        return <Business stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} shopTypes={shopTypes} stateTypes={stateTypes} />;
                    } else {
                        return <BusinessMerchant stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} shopTypes={shopTypes} stateTypes={stateTypes} />;
                    }
                case 10:
                    return <SecretPin stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} handleStepCallBack={handleStepCallBack} />;

                case 11:
                    return <VideoKYC stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} />;
                case 12:
                    return <SignAgreement stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} handleStepCallBack={handleStepCallBack} esignStatus={esignStatus} />;
                case 13:
                    return <ActivationPlan stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} handleStepCallBack={handleStepCallBack} />;
                case 14:
                    return <OnboardingStatus stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} />;
                case 15:
                    return <PanAdharMatch />;
                default:
                    return <Welcome stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} />;
            }
        }
    };

    useEffect(() => {
        if (stepResponse) {
            const success =
                stepResponse?.status === 0 && // Status is successful
                !(Object.keys(stepResponse?.invalid_params || {}).length > 0); // No "invalid-params" present

            if (success /* || currentStepData?.id === 4 */) {
                // [Ques for Jalaj] Why goto next step when Aadhaar upload (step.id=4) fails?
                if (currentStepData) {
                    if (currentStepData?.id !== 2) {
                        const currentStepIndex = steps.map((step: StepDataType) => step?.id)?.indexOf(currentStepData?.id);
                        setCurrentStepInitial(steps[currentStepIndex + 1]?.id);
                    }
                    setStepsData(currentStepData);
                    setCurrentStepData(null);
                }
            }
            setIsDisable(false);
        }
    }, [stepResponse]);

    return (
        <>
            <div className={`${currentStep === 1 && 'pt-0'} ${currentStep === 0 && 'pt-7'} h-screens sm:pt-7 px-8 w-full md:px-24`}>
                <div className="flex items-center">
                    <div className="relative flex flex-col w-full h-full">
                        <div className="sm:flex sm:justify-between">
                            <span className="hidden sm:block md:block lg:block xl:block">
                                <Sidebar steps={steps} userData={userData} />
                            </span>
                            <div className="relative flex w-full pb-10 mb-10 rounded-2xl sm:ml-8 sm:bg-white">
                                {renderStep(currentStep)}
                                {/* {fetchData === true ? (
                                    <span className="hidden sm:block">
                                        <Fetching />
                                    </span>
                                ) : (
                                    ''
                                )} */}
                            </div>
                        </div>

                        {finish === true ? (
                            <span className="hidden sm:block">
                                <Alert />
                            </span>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
            {fetchData === true ? (
                <span className="hidden">
                    <Fetching />
                </span>
            ) : (
                ''
            )}
            {finish === true ? (
                <span className="hidden">
                    <Alert />
                </span>
            ) : (
                ''
            )}
            <span className="hidden block">
                {sideBarToggle ? (
                    <div className="z-20 absolute top-14 top-0 backdrop-blur-[1px] left-0 bottom-0 right-0 rounded-2xl flex justify-center">
                        <Sidebar steps={steps} userData={userData} />
                        <div className="w-[25%]" onClick={() => setSideBarToggle((prev) => !prev)}></div>
                    </div>
                ) : (
                    ''
                )}
            </span>
        </>
    );
};
