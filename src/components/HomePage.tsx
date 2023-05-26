import React, { useEffect, useState } from 'react';
import Sidebar from './Common/Sidebar';
import SupersetComponent from './SupersetComponent';
import Welcome from './Welcome';
import PanVerification from './PanVerification';
import AdharVerifiction from './AdharVerifiction';
import PanAdharMatch from './PanAdharMatch';
import Business from './Business';
import VideoKYC from './VideoKYC';
import OnboardingStatus from './OnboardingStatus';
import LoctionCapture from './LoctionCapture';
import { useStore } from '../store/zustand';
import Alert from './Common/Alert';
import Fetching from './Common/Fetching';
import { SelectionScreen } from './SelectionScreen';
import { StepDataType } from '../utils/data/stepsData';
import SignAgreement from './SignAgreement';
import AadharConsent from './AadharConsent';
import ConfirmAadharNumber from './ConfirmAadharNumber';
import AadharNumberOtpVerify from './AadharNumberOtpVerify';
import BusinessMerchant from './BusinessMerchant';
import SecretPin from './SecretPin';

type HomepageProps = {
    sideBarToggle: boolean;
    setSideBarToggle: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (data: StepDataType) => void;
    stepResponse: any;
    shopTypes: Array<any>;
    selectedMerchantType: string | number;
    stateTypes: Array<any>;
    handleStepCallBack: any;
};

const HomePage = ({ sideBarToggle, setSideBarToggle, handleSubmit, stepResponse, shopTypes, selectedMerchantType, stateTypes, handleStepCallBack }: HomepageProps) => {
    const { currentStep, panStatus, fetchData, finish, steps, preview, selectedFile, image, cameraType, setCurrentStepInitial, setStepsData } = useStore();
    const [isDisable, setIsDisable] = useState<boolean>(false);
    const [currentStepData, setCurrentStepData] = useState<any>();
    console.log('preview => ', preview, ' selected ==> ', selectedFile, 'image => ', image, 'shopTypes => ', shopTypes);
    const handleStepSubmit = (data: any) => {
        console.log('data', data, steps);
        if (data.id === 1) {
            const currentStepIndex = steps.map((step: StepDataType) => step?.id)?.indexOf(data?.id);
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
                    return (
                        // <SupersetComponent
                        //     steps={steps}
                        //     btnName="Start Location Capture"
                        //     pagename="Location Capturing"
                        //     capturelocationData={capturelocationData}
                        //     setCapturelocationData={setCapturelocationData}
                        //     stepsStatus={stepsStatus}
                        //     setStepsStatus={setStepsStatus}
                        // >
                        <LoctionCapture stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} />
                        // </SupersetComponent>
                    );
                case 4:
                    return (
                        // <SupersetComponent
                        //     steps={steps}
                        //     btnName="Verify Aadhaar"
                        //     pagename="Aadhaar Verification"
                        //     tagLine="Upload your Aadhar Copy front and back to verify yourself. Accepted format are "
                        //     stepsStatus={stepsStatus}
                        //     setStepsStatus={setStepsStatus}
                        // >
                        <AdharVerifiction stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} />
                        // </SupersetComponent>
                    );
                case 5:
                    return <AadharConsent stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} />;
                case 6:
                    return <ConfirmAadharNumber stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} />;
                case 7:
                    return <AadharNumberOtpVerify stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} />;
                case 8:
                    return (
                        // <SupersetComponent
                        //     steps={steps}
                        //     btnName="Verify PAN"
                        //     pagename="PAN Verification"
                        //     tagLine="Upload your PAN copy to verify your business. Accepted format are "
                        //     stepsStatus={stepsStatus}
                        //     setStepsStatus={setStepsStatus}
                        // >
                        <PanVerification stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} shopTypes={shopTypes} />
                        // </SupersetComponent>
                    );
                case 9:
                    if (selectedMerchantType === 2) {
                        return <BusinessMerchant stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} shopTypes={shopTypes} stateTypes={stateTypes} />;
                    } else {
                        return <Business stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} shopTypes={shopTypes} stateTypes={stateTypes} />;
                    }
                case 10:
                    return <SecretPin stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} />;

                case 11:
                    return <VideoKYC stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} />;
                case 12:
                    return <SignAgreement stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} handleStepCallBack={handleStepCallBack} />;
                case 13:
                    return (
                        // <SupersetComponent
                        //     steps={steps}
                        //     btnName="Submit"
                        //     pagename="Onboarding Status"
                        //     tagLine="Below are the details of the completion status of your onboarding."
                        //     stepsStatus={stepsStatus}
                        //     setStepsStatus={setStepsStatus}
                        // >
                        <OnboardingStatus stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} />
                        // </SupersetComponent>
                    );
                case 14:
                    return (
                        // <SupersetComponent
                        //     steps={steps}
                        //     btnName={`${panStatus === 0 ? 'Start Matching' : panStatus === 1 ? 'Next' : 'Retry'}`}
                        //     pagename="PAN - Aadhaar Matching"
                        //     stepsStatus={stepsStatus}
                        //     setStepsStatus={setStepsStatus}
                        // >
                        <PanAdharMatch />
                        // </SupersetComponent>
                    );
                default:
                    return <Welcome stepData={stepData} handleSubmit={handleStepSubmit} isDisabledCTA={isDisable} />;
            }
        }
    };

    useEffect(() => {
        if (stepResponse) {
            if (stepResponse?.status === 0 || currentStepData?.id === 4) {
                if (currentStepData) {
                    const currentStepIndex = steps.map((step: StepDataType) => step?.id)?.indexOf(currentStepData?.id);
                    setCurrentStepInitial(steps[currentStepIndex + 1]?.id);
                    setStepsData(currentStepData);
                    setCurrentStepData(null);
                }
            }
            console.log('stepResponse', steps, currentStepData);
            setIsDisable(false);
        }
    }, [stepResponse]);
    return (
        <>
            <div className={`${currentStep === 1 && 'pt-0'} ${currentStep === 0 && 'pt-7'} h-screens sm:pt-7 px-7 w-full md:px-24`}>
                <div className="flex items-center">
                    <div className="containerboxover relative">
                        <div className="sm:flex sm:justify-between">
                            <span className="hidden sm:block md:block lg:block xl:block">
                                <Sidebar steps={steps} />
                            </span>
                            <div className="flex w-full rounded-2xl sm:ml-8 mb-10 pb-10 sm:bg-white relative">
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
                <span className="block sm:hidden">
                    <Fetching />
                </span>
            ) : (
                ''
            )}
            {finish === true ? (
                <span className="block sm:hidden">
                    <Alert />
                </span>
            ) : (
                ''
            )}
            <span className="sm:hidden block">
                {sideBarToggle ? (
                    <div className="mbl_sidebar">
                        <Sidebar steps={steps} />
                        <div className="w-[25%]" onClick={() => setSideBarToggle((prev) => !prev)}></div>
                    </div>
                ) : (
                    ''
                )}
            </span>
        </>
    );
};

export default HomePage;
