import '../../assets/Styles/style.css';
import '../../index.css';
type OASSPackageProps = {
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
};
export declare const Home: ({ defaultStep, handleSubmit, isBranding, stepResponse, shopTypes, selectedMerchantType, stateTypes, handleStepCallBack, userData }: OASSPackageProps) => JSX.Element;
export {};
