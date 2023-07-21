import React, { useEffect, useState } from 'react';
import Header from '../Common/Header/Header';
import Headermobile from '../Common/Header/Headermobile';
import { OnBoradingWrapper } from '../Steps';
import { useStore } from '../../store/zustand';
import { StepDataType } from '../../utils/data/stepsData';
import '../../index.css';

type OAASPackageProps = {
    defaultStep: string;
    handleSubmit: (data: any) => void;
    developerKey?: string;
    secretKey?: string;
    isBranding?: boolean;
    stepResponse?: any;
    selectedMerchantType?: any;
    shopTypes?: Array<any>;
    stateTypes?: Array<any>;
    handleStepCallBack?: any;
    userData: any;
    stepsData: Array<StepDataType>;
    // theme?: Record<string, string>;
    primaryColor?: string;
};
const OnboardingWidget = ({
    defaultStep = '12400',
    handleSubmit,
    isBranding = true,
    stepResponse,
    shopTypes = [],
    selectedMerchantType,
    stateTypes = [],
    handleStepCallBack,
    userData,
    stepsData,
    // theme,
    primaryColor
}: OAASPackageProps) => {
    const { steps, currentStep, setCurrentStepInitial, setInitialStepsData } = useStore();
    const [sideBarToggle, setSideBarToggle] = useState<boolean>(false);
    const [esignReady, setEsignReady] = useState<boolean>(true); // TODO: Set to false & then it will be set to true after a call from the parent app

    useEffect(() => {
        // Set Primary Color as css var "color-primary"
        if (primaryColor) {
            document.documentElement.style.setProperty('--color-primary', primaryColor);
        }
    }, [primaryColor]);

    // console.log('[oaas] OnboardingWidget Started', defaultStep, stepsData);

    const handleSidebarToggle = () => {
        setSideBarToggle((prev) => !prev);
    };

    type PostMessageType = {
        type: string;
        data?: object;
    };

    /**
     * receive message from the parent app
     * @param options
     * @param options.type  type/action of message
     * @param options.data  additional data to be passed
     */
    const postMessage = ({ type, data }: PostMessageType) => {
        console.log('[oaas] > postMessage: ', type, data);

        switch (type) {
            case 'esign:ready':
                setEsignReady(true);
                break;
        }
    };

    let visibleStepData = stepsData;

    if (visibleStepData) {
        if (userData?.userDetails?.user_type === 3) {
            // For Retailers, Filtering out steps: 9 (Business Details) & 10 (Secret PIN)
            visibleStepData = visibleStepData?.filter((step) => step.isVisible && step.id !== 10 && step.id !== 9);
        } else {
            // For Distributors
            visibleStepData = visibleStepData?.filter((step) => step.isVisible);
        }
    }
    // console.log('[oaas] > VISIBLE STEP DATA: ', userData?.userDetails?.user_type, visibleStepData, stepsData);

    useEffect(() => {
        setInitialStepsData(stepsData?.filter((step: StepDataType) => step.isVisible));
    }, [stepsData]);

    useEffect(() => {
        if (visibleStepData) {
            const initialStep = visibleStepData?.find((step: StepDataType) => step.role && defaultStep?.includes(`${step.role}`));
            setCurrentStepInitial(initialStep ? initialStep?.id : 3);
        }
    }, [defaultStep]);

    return (
        <>
            <div className={`${currentStep === 0 ? 'bg-lightdefault' : 'bg-white'} sm:bg-lightdefault w-full min-h-screen`}>
                {isBranding && (
                    <>
                        <Header />
                        <Headermobile handleSidebarToggle={handleSidebarToggle} />
                    </>
                )}
                <OnBoradingWrapper
                    sideBarToggle={sideBarToggle}
                    setSideBarToggle={setSideBarToggle}
                    handleSubmit={handleSubmit}
                    stepResponse={stepResponse}
                    shopTypes={shopTypes}
                    stateTypes={stateTypes}
                    selectedMerchantType={selectedMerchantType}
                    handleStepCallBack={handleStepCallBack}
                    userData={userData}
                    esignReady={esignReady}
                />
                {/* <SelectionScreen /> */}
            </div>
        </>
    );
};

export default OnboardingWidget;
