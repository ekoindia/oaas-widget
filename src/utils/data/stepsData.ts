export type StepDataType = {
    id: number;
    name: string;
    label: string;
    primaryCTAText: string;
    description: string;
    isRequired: boolean;
    isVisible: boolean;
    stepStatus: 0 | 1 | 2 | 3 | 4; // 0: NOT_STARTED, 1: IN_PROGRESS, 2: COMPLETED, 3: FAILED, 4: SKIPPED
    role?: number;
    applicableRoles?: number[];
    form_data: any;
    success_message?: string;
};
