// Module declarations for static assets
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';

// Re-export bank types from bankTypes.ts
// export { BankDependentParam, BankListElement, BankListType } from './bankTypes';

// Bank types
export type BankDependentParam = {
    name: string;
    value?: string;
    length_min?: number;
    length_max?: number;
    pattern_error?: string;
};

export type BankListElement = {
    value: string;
    label?: string;
    dependent_params: BankDependentParam[];
};

export type BankListType = BankListElement[];
