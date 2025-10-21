import React, { useEffect, useState } from 'react';
import '../../index.css';
import { BankListElement, BankListType } from '../../types';
import { StepDataType } from '../../utils/data/stepsData';
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
    appName?: string;
    orgName?: string;
    primaryColor?: string;
    accentColor?: string;
    shopTypes?: Array<any>;
    stateTypes?: Array<any>;
    bankList?: BankListType;
    userData: any;
    handleSubmit: (data: any) => void;
    // developerKey?: string;
    // secretKey?: string;
    // isBranding?: boolean;
    stepResponse?: any;
    handleStepCallBack?: any;
    stepsData: Array<StepDataType>;
    // theme?: Record<string, string>;
    digilockerData?: any;
    esignStatus?: number;
};

const OnboardingWidget = ({
    appName,
    orgName,
    primaryColor,
    accentColor,
    shopTypes = [],
    stateTypes = [],
    bankList = [],
    userData,
    handleSubmit,
    stepResponse,
    handleStepCallBack,
    stepsData,
    esignStatus,
    digilockerData
}: OAASPackageProps) => {
    const [currentOnboardingStepId, setCurrentOnboardingStepId] = useState<number | undefined>();
    const [sideBarToggle, setSideBarToggle] = useState<boolean>(false);
    console.log('[AgentOnboarding] OAAS currentOnboardingStepId', currentOnboardingStepId);
    console.log('[AgentOnboarding] OAAS stepsData', stepsData);

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

    useEffect(() => {
        if (stepsData) {
            const initialStep = stepsData?.find((step: StepDataType) => step.role && step.stepStatus != 3);
            const _initialStepId = initialStep?.id ?? stepsData[0]?.id;
            setCurrentOnboardingStepId(_initialStepId);
        }
    }, [stepsData]);

    return (
        <OnboardingWrapper
            orgName={orgName}
            appName={appName}
            shopTypes={[...selectOption, ...shopTypes]}
            stateTypes={[...selectOption, ...stateTypes]}
            bankList={[bankSelectOption, ...bankList]}
            userData={userData}
            sideBarToggle={sideBarToggle}
            setSideBarToggle={setSideBarToggle}
            handleSubmit={handleSubmit}
            stepResponse={stepResponse}
            currentOnboardingStepId={currentOnboardingStepId}
            handleStepCallBack={handleStepCallBack}
            esignStatus={esignStatus}
            digilockerData={digilockerData}
            stepsData={stepsData}
        />
    );
};

export default OnboardingWidget;
