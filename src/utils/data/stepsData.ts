export type StepDataType = {
    id: number;
    name: string;
    label: string;
    primaryCTAText: string;
    description: string;
    isSkipable: boolean;
    isRequired: boolean;
    isVisible: boolean;
    stepStatus: 0 | 1 | 2 | 3;
    role?: number;
    form_data: any;
    success_message?: string;
};
