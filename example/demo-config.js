// Demo configuration for testing the OaaS Widget
// Modify this file to test different widget states and configurations

const USER_TYPE = 3; // 1: Distributor, 3: iRetailer, ...

window.DEMO_CONFIG = {
    appName: 'Test App',
    orgName: 'Demo Organization',
    primaryColor: '#75140c',
    accentColor: '#4c526f',

    // Handler for step submissions
    handleSubmit: (stepData) => {
        console.log('📤 Step submitted:', stepData);
        console.log('Step ID:', stepData.id);
        console.log('Step Name:', stepData.name);
        console.log('Form Data:', stepData.form_data);

        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('✅ Step submission successful');
                resolve({ success: true });
            }, 500);
        });
    },

    handleStepCallBack: (stepData) => {
        console.log('🔔 Step callback invoked:', stepData);
    },

    // Sample steps data
    stepsData: [
        {
            id: 3,
            name: 'LOCATION_CAPTURE',
            label: 'Location Capturing',
            isRequired: true,
            isVisible: true,
            stepStatus: 2,
            role: 12400,
            applicableRoles: [13000, 12400],
            primaryCTAText: 'Capture Location',
            description: 'Allow us to capture your business location for verification purposes. This helps us serve you better.',
            form_data: {},
            success_message: 'Location captured successfully.'
        },
        {
            id: 4,
            name: 'AADHAAR_VERIFICATION',
            label: 'Aadhaar Verification',
            isRequired: true,
            isVisible: true,
            stepStatus: 2,
            role: 12400,
            applicableRoles: [12400],
            primaryCTAText: 'Verify Aadhaar',
            description: 'Upload clear photos of both front and back of your Aadhaar card. Accepted formats: JPG, PNG, PDF',
            form_data: {},
            success_message: 'Aadhaar uploaded successfully.'
        },
        {
            id: 8,
            name: 'PAN_VERIFICATION',
            label: 'PAN Verification',
            isRequired: false,
            isVisible: true,
            stepStatus: 2,
            role: 12300,
            applicableRoles: [12300, 13000],
            primaryCTAText: 'Verify PAN',
            description: 'Upload a clear photo of your PAN card for business verification. Accepted formats: JPG, PNG, PDF',
            form_data: {},
            success_message: 'PAN verified successfully.'
        },
        {
            id: 11,
            name: 'VIDEO_KYC',
            label: 'Selfie KYC',
            isRequired: false,
            isVisible: true,
            stepStatus: 2,
            role: 12500,
            applicableRoles: [12500],
            primaryCTAText: 'Next',
            description: 'Take a clear selfie in good lighting to complete your identity verification. Ensure your face is clearly visible.',
            form_data: {},
            success_message: 'KYC completed.'
        },
        {
            id: 25,
            name: 'ADD_BANK_ACCOUNT',
            label: 'Add Bank Account',
            isRequired: true,
            isVisible: true,
            stepStatus: 2,
            role: 51700,
            applicableRoles: [51700],
            primaryCTAText: 'Next',
            description: 'Please provide your bank account details to proceed with the onboarding process.',
            form_data: {}
        },
        {
            id: 12,
            name: 'SIGN_AGREEMENT',
            label: 'Sign Agreement',
            isRequired: true,
            isVisible: true,
            stepStatus: 1,
            role: 12800,
            applicableRoles: [12800],
            primaryCTAText: 'Sign Agreement',
            description: 'Review and digitally sign the terms and conditions to activate your account and start using our services.',
            form_data: {},
            success_message: 'Agreement signed successfully.'
        }
    ],

    // Optional configuration
    shopTypes: [
        { value: 1, label: 'Grocery Store' },
        { value: 2, label: 'Electronics' },
        { value: 3, label: 'Clothing' },
        { value: 4, label: 'Pharmacy' },
        { value: 5, label: 'Other' }
    ],

    stateTypes: [
        { value: 1, label: 'Maharashtra' },
        { value: 2, label: 'Karnataka' },
        { value: 3, label: 'Tamil Nadu' },
        { value: 4, label: 'Delhi' },
        { value: 5, label: 'Gujarat' }
    ],

    bankList: [
        { value: 'SBIN', label: 'State Bank of India' },
        { value: 'HDFC', label: 'HDFC Bank' },
        { value: 'ICIC', label: 'ICICI Bank' },
        { value: 'AXIS', label: 'Axis Bank' },
        { value: 'KOTA', label: 'Kotak Mahindra Bank' }
    ],

    constants: {
        apiStatus: {
            SUCCESS: 0,
            ONBOARDING_REDIRECTION_ERROR: 1709
        },
        stepIds: {
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
        },
        stepStatus: {
            NOT_STARTED: 0,
            IN_PROGRESS: 1,
            COMPLETED: 2,
            FAILED: 3,
            SKIPPED: 4
        }
    },

    esignStatus: 1,

    userData: {
        personal_detail: {
            name: 'Shubham Jain',
            mobile: '8890000001'
        },
        user_code: '10003660',
        user_detail: {
            code: '10003847',
            role_list: [12800, 38000, 34001, 41000, 23000, 33000],
            user_type: USER_TYPE,
            onboarding: 1,
            mobile: '8890000001',
            onboarding_steps: [
                {
                    role: 12400,
                    label: 'Upload Aadhaar Card'
                },
                {
                    role: 51700,
                    label: 'Account Whitelisting'
                },
                {
                    role: 24000,
                    label: 'Aadhar verify'
                },
                {
                    role: 12300,
                    label: 'Upload Pan Card'
                },
                {
                    role: 12500,
                    label: 'Upload Photo'
                },
                {
                    role: 12800,
                    label: 'Agreement'
                }
            ],
            agreement_id: 5,
            name: 'Shubham Jain',
            eko_user_id: 203386,
            is_pin_not_set: 1
        },
        account_detail: {}
    }
};

// Log configuration loaded
console.log('✅ Demo configuration loaded with', window.DEMO_CONFIG.stepsData.length, 'steps');
