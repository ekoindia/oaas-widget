import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PanVerification from '../components/Steps/PanSteps/PanVerification';

const AadharStory = {
    title: 'ReactComponentLibrary/PanVerification'
} as ComponentMeta<typeof PanVerification>;

export default AadharStory;

const Template: ComponentStory<typeof PanVerification> = () => {
    const stepData = {
        id: 8,
        name: 'PanVerification',
        label: 'Pan Verification',
        isSkipable: false,
        isRequired: true,
        isVisible: true,
        stepStatus: 0,
        role: 12300,
        primaryCTAText: 'Verify PAN',
        description: 'Upload your PAN copy to verify your business. Accepted formats are',
        form_data: {},
        success_message: 'PAN verified successfully.'
    };
    const handleStepDataSubmit = (data: any) => {
        console.log('HandleWlcStepData', data);
    };

    return <PanVerification stepData={stepData} handleSubmit={handleStepDataSubmit} isDisabledCTA={false} />;
};

export const VerifyPAN = Template.bind({});
