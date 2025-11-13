import { BankListType } from '../../types';
import { StepDataType } from '../data/stepsData';

export type GlobalStepPropsType = {
    handleSubmit: (data: any) => void;
    stepData: StepDataType;
    isDisabledCTA?: boolean;
    shopTypes?: Array<any>;
    stateTypes?: Array<any>;
    bankList?: BankListType;
    handleStepCallBack?: any;
    handleOnboardingSkip?: (_stepId: number) => void;
    primaryColor?: string;
    accentColor?: string;
    esignStatus?: number;
    orgName?: string;
    appName?: string;
    digilockerData?: any;
    constants?: {
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
        };
    };
};
