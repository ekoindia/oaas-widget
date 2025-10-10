export interface BankDependentParam {
    name: string;
    value?: number | string;
    length_min?: number;
    length_max?: number;
    pattern_error?: string;
}

export interface BankListElement {
    label: string;
    value: string;
    dependent_params: BankDependentParam[];
}

export type BankListType = BankListElement[];
