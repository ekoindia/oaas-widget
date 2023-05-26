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

/**
 * @value 0 @description default not yet started
 * @value 1 @description started
 * @value 2 @description skipped
 * @value 3 @description completed
 */

export const stepsData: Array<StepDataType> = [
    {
        id: 1,
        name: 'Welcome',
        label: 'Welcome',
        isSkipable: false,
        isRequired: false,
        isVisible: false,
        stepStatus: 0,
        primaryCTAText: 'Start Onboarding',
        description: '',
        form_data: {}
    },
    {
        id: 2,
        name: 'RoleCapture',
        label: 'Tell us who you are?',
        isSkipable: false,
        isRequired: false,
        isVisible: false,
        stepStatus: 0,
        primaryCTAText: 'Continue',
        description: '',
        form_data: {
            roles: [
                {
                    id: 1,
                    merchant_type: 1,
                    applicant_type: 0,
                    label: "I'm a seller",
                    description: 'I serve customers from my shop',
                    icon: '../assets/icons/user_merchant.png',
                    isVisible: true
                },
                {
                    id: 2,
                    merchant_type: 3,
                    applicant_type: 2,
                    label: "I'm a distributor",
                    description: 'I have a network of seller and i want to serve them',
                    icon: '../assets/icons/user_distributor.png',
                    isVisible: true
                },
                {
                    id: 3,
                    merchant_type: 2,
                    applicant_type: 1,
                    label: "I'm a Enterprise",
                    description: 'I want to use API and other solution to make my own service',
                    icon: '../assets/icons/user_enterprise.png',
                    isVisible: false
                }
            ]
        }
    },
    {
        id: 3,
        name: 'LocationCapture',
        label: 'Location Capturing',
        isSkipable: false,
        isRequired: true,
        isVisible: true,
        stepStatus: 0,
        role: 12400,
        primaryCTAText: 'Start Location Capture',
        description: '',
        form_data: {},
        success_message: 'Location captured successfully.'
    },
    {
        id: 4,
        name: 'AadhaarVerification',
        label: 'Aadhaar Verification',
        isSkipable: false,
        isRequired: true,
        isVisible: true,
        stepStatus: 0,
        role: 12400,
        primaryCTAText: 'Verify Aadhaar',
        description: '',
        form_data: {},
        success_message: 'Aadhaar uploaded successfully.'
    },
    {
        id: 5,
        name: 'Aadhar Consent',
        label: 'Aadhar Consent',
        isSkipable: false,
        isRequired: true,
        isVisible: true,
        stepStatus: 0,
        role: 24000,
        primaryCTAText: 'Verify Consent',
        description: '',
        form_data: {},
        success_message: 'Aadhaar consent taken.'
    },
    {
        id: 6,
        name: 'Confirm Aadhar Number',
        label: 'Confirm Aadhar Number',
        isSkipable: false,
        isRequired: true,
        isVisible: true,
        stepStatus: 0,
        role: 24000,
        primaryCTAText: 'Proceed',
        description: '',
        form_data: {},
        success_message: 'Aadhaar number confirmed.'
    },
    {
        id: 7,
        name: 'ConfirmAadharOTP',
        label: 'Confirm Aadhar OTP',
        isSkipable: false,
        isRequired: true,
        isVisible: true,
        stepStatus: 0,
        role: 24000,
        primaryCTAText: 'Confirm',
        description: '',
        form_data: {},
        success_message: 'Aadhaar confirmed successfully.'
    },
    {
        id: 8,
        name: 'PanVerification',
        label: 'Pan Verification',
        isSkipable: false,
        isRequired: true,
        isVisible: true,
        stepStatus: 0,
        role: 12300,
        primaryCTAText: 'Verify PAN',
        description: '',
        form_data: {},
        success_message: 'PAN verified successfully.'
    },
    {
        id: 9,
        name: 'BusinessDetails',
        label: 'Business Details',
        isSkipable: false,
        isRequired: true,
        isVisible: false,
        stepStatus: 0,
        primaryCTAText: 'Next',
        description: '',
        form_data: {}
    },
    {
        id: 10,
        name: 'SecretPin',
        label: 'Set Your 4-Digit Secret Pin',
        isSkipable: false,
        isRequired: true,
        isVisible: false,
        stepStatus: 0,
        primaryCTAText: 'Next',
        description: '',
        form_data: {}
    },
    {
        id: 11,
        name: 'SelfieKYC',
        label: 'Selfie KYC',
        isSkipable: false,
        isRequired: true,
        isVisible: true,
        stepStatus: 0,
        role: 12500,
        primaryCTAText: 'Next',
        description: 'Thanks for completing your personal and address verification. Take a selfie of 5-10 seconds to complete eKYC process.',
        form_data: {},
        success_message: 'KYC completed.'
    },
    {
        id: 12,
        name: 'Sign Agreement',
        label: 'Sign Agreement',
        isSkipable: false,
        isRequired: true,
        isVisible: true,
        stepStatus: 0,
        role: 12800,
        primaryCTAText: 'Sign Agreement',
        description: '',
        form_data: {},
        success_message: 'Agreement signed successfully.'
    },
    {
        id: 13,
        name: 'OnboardingStatus',
        label: 'Onboarding Status',
        isSkipable: false,
        isRequired: false,
        isVisible: false,
        stepStatus: 0,
        primaryCTAText: 'Submit',
        description: '',
        form_data: {}
    },
    {
        id: 14,
        name: 'PANAadhaarMatching',
        label: 'PAN - Aadhaar Matching',
        isSkipable: false,
        isRequired: false,
        isVisible: false,
        stepStatus: 0,
        primaryCTAText: 'Start Matching',
        description: '',
        form_data: {}
    }
];