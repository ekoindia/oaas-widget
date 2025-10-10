import { BankListType } from '../../types';
import { StepDataType } from '../data/stepsData';

export type GlobalStepPropsType = {
    handleSubmit: (data: any) => void;
    stepData: StepDataType;
    isDisabledCTA: boolean;
    shopTypes?: Array<any>;
    stateTypes?: Array<any>;
    bankList?: BankListType;
    handleStepCallBack?: any;
    primaryColor?: string;
    accentColor?: string;
    esignStatus?: number;
    orgName?: string;
    appName?: string;
    digilockerData?: any;
};
