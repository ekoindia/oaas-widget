import React from 'react';
import { BankListType } from '../../../types';
import { StepDataType } from '../../../utils/data/stepsData';
import ButtonGlobal from '../../Common/ButtonGlobal';
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
    apiInProgress?: boolean;
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
    apiInProgress,
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

    const currentStepData = stepsData?.find((step: StepDataType) => step.id === currentOnboardingStepId);
    const showSkipButton = currentStepData && !currentStepData.isRequired && typeof handleOnboardingSkip === 'function';

    const handleSkipClick = () => {
        if (currentStepData && handleOnboardingSkip) {
            handleOnboardingSkip(currentStepData.id);
        }
    };

    const skipButtonComponent = showSkipButton ? (
        <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px] bg-white text-primary" onClick={handleSkipClick}>
            Skip
        </ButtonGlobal>
    ) : null;

    const renderStep = (currentStep: number): any => {
        const stepData: StepDataType | undefined = stepsData?.find((step: StepDataType) => step.id === currentOnboardingStepId);

        if (stepData) {
            const props = {
                stepData,
                handleSubmit,
                skipButtonComponent,
                isDisabledCTA: apiInProgress
            };
            switch (currentStep) {
                case stepIds.LOCATION_CAPTURE:
                    return <LocationCapture {...props} handleStepCallBack={handleStepCallBack} />;
                case stepIds.AADHAAR_VERIFICATION:
                    return <AdharVerifiction {...props} />;
                case stepIds.AADHAAR_CONSENT:
                    return <AadhaarConsent {...props} orgName={orgName} appName={appName} />;
                case stepIds.CONFIRM_AADHAAR_NUMBER:
                    return <ConfirmAadhaarNumber {...props} orgName={orgName} appName={appName} />;
                case stepIds.AADHAAR_NUMBER_OTP_VERIFY:
                    return <AadhaarNumberOtpVerify {...props} handleStepCallBack={handleStepCallBack} />;
                case stepIds.PAN_VERIFICATION:
                    return <PanVerification {...props} shopTypes={shopTypes} />;
                case stepIds.BUSINESS:
                    if (userData?.userDetails?.user_type === 1) {
                        return <Business {...props} shopTypes={shopTypes} stateTypes={stateTypes} />;
                    } else {
                        return <BusinessMerchant {...props} shopTypes={shopTypes} stateTypes={stateTypes} />;
                    }
                case stepIds.SECRET_PIN:
                    return <SecretPin {...props} handleStepCallBack={handleStepCallBack} />;
                case stepIds.VIDEO_KYC:
                    return <VideoKYC {...props} />;
                case stepIds.SIGN_AGREEMENT:
                    return <SignAgreement {...props} handleStepCallBack={handleStepCallBack} esignStatus={esignStatus} />;
                case stepIds.ACTIVATION_PLAN:
                    return <ActivationPlan {...props} handleStepCallBack={handleStepCallBack} />;
                case stepIds.ONBOARDING_STATUS:
                    return <OnboardingStatus {...props} />;
                case stepIds.PAN_AADHAAR_MATCH:
                    return <PanAdharMatch />;
                case stepIds.PAN_VERIFICATION_DISTRIBUTOR:
                    return <PanVerificationDistributor {...props} />;
                case stepIds.DIGILOCKER_REDIRECTION:
                    return <DigilockerRedirection {...props} handleStepCallBack={handleStepCallBack} digilockerData={digilockerData} />;
                case stepIds.ADD_BANK_ACCOUNT:
                    return <BankAccount {...props} bankList={bankList} />;
                default:
                    return <Welcome {...props} />;
            }
        } else {
            return <div>No step data found for step {currentOnboardingStepId}</div>;
        }
    };

    return (
        <div>{renderStep(currentOnboardingStepId ?? 0)}</div>
        // <div className="mt-8">
        //     <div className={`${currentOnboardingStepId === stepIds.WELCOME && 'pt-0'} ${currentOnboardingStepId === 0 && 'pt-7'} h-screens px-4 sm:px-8 w-full md:px-24`}>
        //         <div className="w-full">
        //             <div className="relative w-full">
        //                 {/* <div className="sm:grid sm:grid-cols-[280px_minmax(0,768px)] sm:gap-6"> */}
        //                 {/* <span className="hidden sm:block md:block lg:block xl:block">
        //                         <Sidebar steps={stepsData || []} userData={userData} currentStepId={currentOnboardingStepId} constants={{ stepIds, stepStatus }} />
        //                     </span> */}
        //                 <div className="relative flex flex-col w-full pb-10 mb-10 p-4 sm:p-8 rounded-2xl bg-white min-w-0">{renderStep(currentOnboardingStepId ?? 0)}</div>
        //                 {/* </div> */}
        //             </div>
        //         </div>
        //     </div>

        //     <span className="hidden">
        //         {sideBarToggle ? (
        //             <div className="z-20 absolute top-0 backdrop-blur-[1px] left-0 bottom-0 right-0 rounded-2xl flex justify-center">
        //                 <Sidebar steps={stepsData || []} userData={userData} currentStepId={currentOnboardingStepId} constants={{ stepIds, stepStatus }} />
        //                 <div className="w-[25%]" onClick={() => setSideBarToggle((prev) => !prev)}></div>
        //             </div>
        //         ) : (
        //             ''
        //         )}
        //     </span>
        // </div>
    );
};
