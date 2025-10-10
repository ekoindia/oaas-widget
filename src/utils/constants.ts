/**
 * Constants for the Onboarding Widget
 *
 * This file contains all the magic numbers and status codes used throughout the onboarding process.
 * Using named constants improves code readability and makes maintenance easier.
 *
 * Usage:
 * ```typescript
 * import { API_STATUS, STEP_IDS } from '../utils/constants';
 *
 * // Instead of: if (stepResponse.status === 1709)
 * if (stepResponse.status === API_STATUS.ONBOARDING_REDIRECTION_ERROR) {
 *   // Handle error
 * }
 *
 * // Instead of: case 5:
 * case STEP_IDS.AADHAAR_CONSENT:
 *   return <AadhaarConsent />;
 * ```
 */

/**
 * API Response Status Codes
 */
export const API_STATUS = {
    SUCCESS: 0,
    ONBOARDING_REDIRECTION_ERROR: 1709
} as const;

/**
 * Onboarding Step IDs
 */
export const STEP_IDS = {
    WELCOME: 1,
    SELECTION_SCREEN: 2,
    LOCATION_CAPTURE: 3,
    AADHAAR_VERIFICATION: 4,
    AADHAAR_CONSENT: 5,
    CONFIRM_AADHAAR_NUMBER: 6,
    AADHAAR_NUMBER_OTP_VERIFY: 7,
    PAN_VERIFICATION: 8,
    BUSINESS: 9,
    SECRET_PIN: 10,
    VIDEO_KYC: 11,
    SIGN_AGREEMENT: 12,
    ACTIVATION_PLAN: 13,
    ONBOARDING_STATUS: 14,
    PAN_AADHAAR_MATCH: 15,
    PAN_VERIFICATION_DISTRIBUTOR: 16,
    DIGILOCKER_REDIRECTION: 20,
    ADD_BANK_ACCOUNT: 25
} as const;

/**
 * Step Status Values
 */
export const STEP_STATUS = {
    NOT_STARTED: 0,
    IN_PROGRESS: 1,
    COMPLETED: 2,
    FAILED: 3
} as const;

// Type definitions for better TypeScript support
export type ApiStatus = typeof API_STATUS[keyof typeof API_STATUS];
export type StepId = typeof STEP_IDS[keyof typeof STEP_IDS];
export type StepStatus = typeof STEP_STATUS[keyof typeof STEP_STATUS];
