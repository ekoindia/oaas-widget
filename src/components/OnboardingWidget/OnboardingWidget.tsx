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
    handleOnboardingSkip?: (_stepId: number) => void;
    apiInProgress?: boolean;
    stepsData: Array<StepDataType>;
    // theme?: Record<string, string>;
    digilockerData?: any;
    esignStatus?: number;
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
    handleOnboardingSkip,
    apiInProgress = false,
    stepsData,
    esignStatus,
    digilockerData,
    constants
}: OAASPackageProps) => {
    const [currentOnboardingStepId, setCurrentOnboardingStepId] = useState<number | undefined>();
    const [sideBarToggle, setSideBarToggle] = useState<boolean>(false);

    // Extract constants from props
    const { apiStatus, stepIds, stepStatus } = constants;

    console.log('[Onboarding] stepStatus', stepStatus);
    // console.log('[AgentOnboarding] OAAS currentOnboardingStepId', currentOnboardingStepId);
    // console.log('[AgentOnboarding] OAAS stepsData', stepsData);

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

    /**
     * Set Initial Onboarding Step ID based on stepStatus
     * If any step with role exists and is not COMPLETED or SKIPPED, set it as initial step
     */
    useEffect(() => {
        if (stepsData) {
            console.log('[Onboarding] stepsData', stepsData);
            const initialStep = stepsData?.find((step: StepDataType) => step.role && step.stepStatus != stepStatus.COMPLETED && step.stepStatus != stepStatus.SKIPPED);
            console.log('[Onboarding] initialStep found', initialStep);
            const _initialStepId = initialStep?.id ?? stepsData[0]?.id;
            console.log('[Onboarding] initialStep', initialStep);
            setCurrentOnboardingStepId(_initialStepId);
        }
    }, [stepsData, stepStatus]);

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
            handleOnboardingSkip={handleOnboardingSkip}
            apiInProgress={apiInProgress}
            esignStatus={esignStatus}
            digilockerData={digilockerData}
            stepsData={stepsData}
            constants={{ apiStatus, stepIds, stepStatus }}
        />
    );
};

export default OnboardingWidget;
