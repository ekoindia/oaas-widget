import React from 'react';
import { BankListType } from '../../../types';
import { STEP_IDS } from '../../../utils/constants';
import { StepDataType } from '../../../utils/data/stepsData';
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
import SelectionScreen from '../SelectionScreen/SelectionScreen';
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
    userData: any;
    esignStatus: any;
    orgName?: string;
    appName?: string;
    digilockerData?: any;
    stepsData?: Array<StepDataType> | undefined;
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
    userData,
    esignStatus,
    orgName,
    appName,
    digilockerData,
    stepsData
}: HomepageProps) => {
    const renderStep = (currentStep: number): any => {
        const stepData: StepDataType | undefined = stepsData?.find((step: StepDataType) => step.id === currentOnboardingStepId);

        if (stepData) {
            switch (currentStep) {
                case STEP_IDS.SELECTION_SCREEN:
                    return <SelectionScreen handleSubmit={handleSubmit} stepData={stepData} />;
                case STEP_IDS.LOCATION_CAPTURE:
                    return <LocationCapture stepData={stepData} handleSubmit={handleSubmit} handleStepCallBack={handleStepCallBack} />;
                case STEP_IDS.AADHAAR_VERIFICATION:
                    return <AdharVerifiction stepData={stepData} handleSubmit={handleSubmit} />;
                case STEP_IDS.AADHAAR_CONSENT:
                    return <AadhaarConsent stepData={stepData} handleSubmit={handleSubmit} orgName={orgName} appName={appName} />;
                case STEP_IDS.CONFIRM_AADHAAR_NUMBER:
                    return <ConfirmAadhaarNumber stepData={stepData} handleSubmit={handleSubmit} orgName={orgName} appName={appName} />;
                case STEP_IDS.AADHAAR_NUMBER_OTP_VERIFY:
                    return <AadhaarNumberOtpVerify stepData={stepData} handleSubmit={handleSubmit} handleStepCallBack={handleStepCallBack} />;
                case STEP_IDS.PAN_VERIFICATION:
                    return <PanVerification stepData={stepData} handleSubmit={handleSubmit} shopTypes={shopTypes} />;
                case STEP_IDS.BUSINESS:
                    if (userData?.userDetails?.user_type === 1) {
                        return <Business stepData={stepData} handleSubmit={handleSubmit} shopTypes={shopTypes} stateTypes={stateTypes} />;
                    } else {
                        return <BusinessMerchant stepData={stepData} handleSubmit={handleSubmit} shopTypes={shopTypes} stateTypes={stateTypes} />;
                    }
                case STEP_IDS.SECRET_PIN:
                    return <SecretPin stepData={stepData} handleSubmit={handleSubmit} handleStepCallBack={handleStepCallBack} />;
                case STEP_IDS.VIDEO_KYC:
                    return <VideoKYC stepData={stepData} handleSubmit={handleSubmit} />;
                case STEP_IDS.SIGN_AGREEMENT:
                    return <SignAgreement stepData={stepData} handleSubmit={handleSubmit} handleStepCallBack={handleStepCallBack} esignStatus={esignStatus} />;
                case STEP_IDS.ACTIVATION_PLAN:
                    return <ActivationPlan stepData={stepData} handleSubmit={handleSubmit} handleStepCallBack={handleStepCallBack} />;
                case STEP_IDS.ONBOARDING_STATUS:
                    return <OnboardingStatus stepData={stepData} handleSubmit={handleSubmit} />;
                case STEP_IDS.PAN_AADHAAR_MATCH:
                    return <PanAdharMatch />;
                case STEP_IDS.PAN_VERIFICATION_DISTRIBUTOR:
                    return <PanVerificationDistributor stepData={stepData} handleSubmit={handleSubmit} /* shopTypes={shopTypes}*/ />;
                case STEP_IDS.DIGILOCKER_REDIRECTION:
                    return <DigilockerRedirection stepData={stepData} handleSubmit={handleSubmit} handleStepCallBack={handleStepCallBack} digilockerData={digilockerData} />;
                case STEP_IDS.ADD_BANK_ACCOUNT:
                    return <BankAccount stepData={stepData} handleSubmit={handleSubmit} bankList={bankList} />;
                default:
                    return <Welcome stepData={stepData} handleSubmit={handleSubmit} />;
            }
        } else {
            return <div>No step data found for step {currentOnboardingStepId}</div>;
        }
    };

    return (
        <>
            <div className={`${currentOnboardingStepId === STEP_IDS.WELCOME && 'pt-0'} ${currentOnboardingStepId === 0 && 'pt-7'} h-screens sm:pt-7 px-8 w-full md:px-24`}>
                <div className="flex items-center">
                    <div className="relative flex flex-col w-full h-full">
                        <div className="sm:flex sm:justify-between">
                            <span className="hidden sm:block md:block lg:block xl:block">
                                <Sidebar steps={stepsData || []} userData={userData} currentStepId={currentOnboardingStepId} />
                            </span>
                            <div className="relative flex w-full pb-10 mb-10 rounded-2xl sm:ml-8 sm:bg-white">{renderStep(currentOnboardingStepId ?? 0)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <span className="hidden block">
                {sideBarToggle ? (
                    <div className="z-20 absolute top-14 top-0 backdrop-blur-[1px] left-0 bottom-0 right-0 rounded-2xl flex justify-center">
                        <Sidebar steps={stepsData || []} userData={userData} currentStepId={currentOnboardingStepId} />
                        <div className="w-[25%]" onClick={() => setSideBarToggle((prev) => !prev)}></div>
                    </div>
                ) : (
                    ''
                )}
            </span>
        </>
    );
};
