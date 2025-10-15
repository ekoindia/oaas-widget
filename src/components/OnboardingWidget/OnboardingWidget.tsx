import React, { useEffect, useState } from 'react';
import '../../index.css';
import { useStore } from '../../store/zustand';
import { BankListElement, BankListType } from '../../types';
import { StepDataType } from '../../utils/data/stepsData';
import Header from '../Common/Header/Header';
import Headermobile from '../Common/Header/Headermobile';
import { OnboardingWrapper } from '../Steps';

const selectOption = [
    {
        label: '--Select--',
        value: ''
    }
];

const bankSelectOption: BankListElement = {
    dependent_params: [],
    label: '--Select--',
    value: ''
};

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
    bankList?: BankListType;
    handleStepCallBack?: any;
    userData: any;
    stepsData: Array<StepDataType>;
    // theme?: Record<string, string>;
    primaryColor?: string;
    accentColor?: string;
    esignStatus?: number;
    appName?: string;
    orgName?: string;
    digilockerData?: any;
};

const OnboardingWidget = ({
    defaultStep = '12400',
    handleSubmit,
    isBranding = true,
    stepResponse,
    shopTypes = [],
    selectedMerchantType,
    stateTypes = [],
    bankList = [],
    handleStepCallBack,
    userData,
    stepsData,
    primaryColor,
    accentColor,
    esignStatus,
    appName,
    orgName,
    digilockerData
}: OAASPackageProps) => {
    console.log('[AgentOnboarding] OAAS stepsData', stepsData);
    const { setCurrentStepInitial, setInitialStepsData } = useStore();
    const [currentOnboardingStepId, setCurrentOnboardingStepId] = useState<number | undefined>();
    console.log('[AgentOnboarding] OAAS currentOnboardingStepId', currentOnboardingStepId);
    const [sideBarToggle, setSideBarToggle] = useState<boolean>(false);

    useEffect(() => {
        // Set Primary Color as css var "color-primary"
        if (primaryColor) {
            document.documentElement.style.setProperty('--color-primary', primaryColor);
        }

        // Set Accent Color as css var "color-accent"
        if (accentColor) {
            document.documentElement.style.setProperty('--color-accent', accentColor);
        }
    }, [primaryColor, accentColor]);

    const handleSidebarToggle = () => {
        setSideBarToggle((prev) => !prev);
    };

    // useEffect(() => {
    //     setInitialStepsData(stepsData?.filter((step: StepDataType) => step.isVisible));
    // }, [stepsData]);

    useEffect(() => {
        if (stepsData) {
            const initialStep = stepsData?.find((step: StepDataType) => step.role && step.stepStatus != 3);
            const _initialStepId = initialStep?.id ?? stepsData[0]?.id;
            setCurrentStepInitial(_initialStepId);
            setCurrentOnboardingStepId(_initialStepId);
        }
    }, [stepsData]);

    return (
        <div>
            {isBranding && (
                <>
                    <Header />
                    <Headermobile handleSidebarToggle={handleSidebarToggle} />
                </>
            )}
            <OnboardingWrapper
                sideBarToggle={sideBarToggle}
                setSideBarToggle={setSideBarToggle}
                handleSubmit={handleSubmit}
                stepResponse={stepResponse}
                currentOnboardingStepId={currentOnboardingStepId}
                shopTypes={[...selectOption, ...shopTypes]}
                stateTypes={[...selectOption, ...stateTypes]}
                bankList={[bankSelectOption, ...bankList]}
                selectedMerchantType={selectedMerchantType}
                handleStepCallBack={handleStepCallBack}
                userData={userData}
                esignStatus={esignStatus}
                orgName={orgName}
                appName={appName}
                digilockerData={digilockerData}
                stepsData={stepsData}
            />
        </div>
    );
};

export default OnboardingWidget;
