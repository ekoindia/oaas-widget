import React from 'react';
import { BankListType } from '../../../types';
import { StepDataType } from '../../../utils/data/stepsData';
import ButtonGlobal from '../../Common/ButtonGlobal';
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
import { BankAccount } from '../BankAccount';
import BusinessMerchant from '../Business/BusinessMerchant';
import { DigilockerRedirection } from '../DigilockerRedirection';
import LocationCapture from '../Location/LocationCapture';
import SecretPin from '../PIN/SecretPin';
import PanAdharMatch from '../PanSteps/PanAdharMatch';
import PanVerification from '../PanSteps/PanVerification';
import PanVerificationDistributor from '../PanSteps/PanVerificationDistributor';
import { Welcome } from '../Welcome';

type HomepageProps = {
    sideBarToggle: boolean;
    setSideBarToggle: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (data: StepDataType) => void;
    currentOnboardingStepId: number | undefined;
    stepResponse: any;
    shopTypes: Array<any>;
    stateTypes: Array<any>;
    bankList: BankListType;
    handleStepCallBack: any;
    handleOnboardingSkip?: (_stepId: number) => void;
    userData: any;
    esignStatus: any;
    orgName?: string;
    appName?: string;
    digilockerData?: any;
    stepsData?: Array<StepDataType> | undefined;
    constants: {
        apiStatus: {
            SUCCESS: number;
            ONBOARDING_REDIRECTION_ERROR: number;
        };
        stepIds: {
            WELCOME: number;
            SELECTION_SCREEN: number;
            LOCATION_CAPTURE: number;
            AADHAAR_VERIFICATION: number;
            AADHAAR_CONSENT: number;
            CONFIRM_AADHAAR_NUMBER: number;
            AADHAAR_NUMBER_OTP_VERIFY: number;
            PAN_VERIFICATION: number;
            BUSINESS: number;
            SECRET_PIN: number;
            VIDEO_KYC: number;
            SIGN_AGREEMENT: number;
            ACTIVATION_PLAN: number;
            ONBOARDING_STATUS: number;
            PAN_AADHAAR_MATCH: number;
            PAN_VERIFICATION_DISTRIBUTOR: number;
            DIGILOCKER_REDIRECTION: number;
            ADD_BANK_ACCOUNT: number;
        };
        stepStatus: {
            NOT_STARTED: number;
            IN_PROGRESS: number;
            COMPLETED: number;
            FAILED: number;
            SKIPPED: number;
        };
    };
};

export const OnboardingWrapper = ({
    sideBarToggle,
    setSideBarToggle,
    handleSubmit,
    stepResponse,
    shopTypes,
    currentOnboardingStepId,
    stateTypes,
    bankList,
    handleStepCallBack,
    handleOnboardingSkip,
    userData,
    esignStatus,
    orgName,
    appName,
    digilockerData,
    stepsData,
    constants
}: HomepageProps) => {
    // Extract constants from props
    const { stepIds, stepStatus } = constants;
    console.log('[Onboarding] stepIds', stepIds);
    console.log('[Onboarding]. stepsData', stepsData);

    const renderStep = (currentStep: number): any => {
        const stepData: StepDataType | undefined = stepsData?.find((step: StepDataType) => step.id === currentOnboardingStepId);

        if (stepData) {
            switch (currentStep) {
                case stepIds.LOCATION_CAPTURE:
                    return <LocationCapture stepData={stepData} handleSubmit={handleSubmit} handleStepCallBack={handleStepCallBack} />;
                case stepIds.AADHAAR_VERIFICATION:
                    return <AdharVerifiction stepData={stepData} handleSubmit={handleSubmit} />;
                case stepIds.AADHAAR_CONSENT:
                    return <AadhaarConsent stepData={stepData} handleSubmit={handleSubmit} orgName={orgName} appName={appName} />;
                case stepIds.CONFIRM_AADHAAR_NUMBER:
                    return <ConfirmAadhaarNumber stepData={stepData} handleSubmit={handleSubmit} orgName={orgName} appName={appName} />;
                case stepIds.AADHAAR_NUMBER_OTP_VERIFY:
                    return <AadhaarNumberOtpVerify stepData={stepData} handleSubmit={handleSubmit} handleStepCallBack={handleStepCallBack} />;
                case stepIds.PAN_VERIFICATION:
                    return <PanVerification stepData={stepData} handleSubmit={handleSubmit} shopTypes={shopTypes} />;
                case stepIds.BUSINESS:
                    if (userData?.userDetails?.user_type === 1) {
                        return <Business stepData={stepData} handleSubmit={handleSubmit} shopTypes={shopTypes} stateTypes={stateTypes} />;
                    } else {
                        return <BusinessMerchant stepData={stepData} handleSubmit={handleSubmit} shopTypes={shopTypes} stateTypes={stateTypes} />;
                    }
                case stepIds.SECRET_PIN:
                    return <SecretPin stepData={stepData} handleSubmit={handleSubmit} handleStepCallBack={handleStepCallBack} />;
                case stepIds.VIDEO_KYC:
                    return <VideoKYC stepData={stepData} handleSubmit={handleSubmit} />;
                case stepIds.SIGN_AGREEMENT:
                    return <SignAgreement stepData={stepData} handleSubmit={handleSubmit} handleStepCallBack={handleStepCallBack} esignStatus={esignStatus} />;
                case stepIds.ACTIVATION_PLAN:
                    return <ActivationPlan stepData={stepData} handleSubmit={handleSubmit} handleStepCallBack={handleStepCallBack} />;
                case stepIds.ONBOARDING_STATUS:
                    return <OnboardingStatus stepData={stepData} handleSubmit={handleSubmit} />;
                case stepIds.PAN_AADHAAR_MATCH:
                    return <PanAdharMatch />;
                case stepIds.PAN_VERIFICATION_DISTRIBUTOR:
                    return <PanVerificationDistributor stepData={stepData} handleSubmit={handleSubmit} /* shopTypes={shopTypes}*/ />;
                case stepIds.DIGILOCKER_REDIRECTION:
                    return <DigilockerRedirection stepData={stepData} handleSubmit={handleSubmit} handleStepCallBack={handleStepCallBack} digilockerData={digilockerData} />;
                case stepIds.ADD_BANK_ACCOUNT:
                    return <BankAccount stepData={stepData} handleSubmit={handleSubmit} bankList={bankList} />;
                default:
                    return <Welcome stepData={stepData} handleSubmit={handleSubmit} />;
            }
        } else {
            return <div>No step data found for step {currentOnboardingStepId}</div>;
        }
    };

    const currentStepData = stepsData?.find((step: StepDataType) => step.id === currentOnboardingStepId);
    const showSkipButton = currentStepData && !currentStepData.isRequired && typeof handleOnboardingSkip === 'function';

    const handleSkipClick = () => {
        if (currentStepData && handleOnboardingSkip) {
            handleOnboardingSkip(currentStepData.id);
        }
    };

    return (
        <div className="mt-8">
            <div className={`${currentOnboardingStepId === stepIds.WELCOME && 'pt-0'} ${currentOnboardingStepId === 0 && 'pt-7'} h-screens px-8 w-full md:px-24`}>
                <div className="flex items-center">
                    <div className="relative flex flex-col w-full h-full">
                        <div className="sm:flex sm:justify-between">
                            <span className="hidden sm:block md:block lg:block xl:block">
                                <Sidebar steps={stepsData || []} userData={userData} currentStepId={currentOnboardingStepId} constants={{ stepIds, stepStatus }} />
                            </span>
                            <div className="relative flex flex-col w-full pb-10 mb-10 p-8 rounded-2xl sm:ml-8 bg-white">
                                {renderStep(currentOnboardingStepId ?? 0)}
                                {showSkipButton && (
                                    <div className="mt-6 flex justify-start">
                                        <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px] bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={handleSkipClick}>
                                            Skip this step
                                        </ButtonGlobal>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <span className="hidden block">
                {sideBarToggle ? (
                    <div className="z-20 absolute top-14 top-0 backdrop-blur-[1px] left-0 bottom-0 right-0 rounded-2xl flex justify-center">
                        <Sidebar steps={stepsData || []} userData={userData} currentStepId={currentOnboardingStepId} constants={{ stepIds, stepStatus }} />
                        <div className="w-[25%]" onClick={() => setSideBarToggle((prev) => !prev)}></div>
                    </div>
                ) : (
                    ''
                )}
            </span>
        </div>
    );
};
