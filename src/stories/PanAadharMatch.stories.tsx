import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PanAdharMatch from '../components/Steps/PanSteps/PanAdharMatch';

const AadharStory = {
    title: 'ReactComponentLibrary/PanAdharMatch'
} as ComponentMeta<typeof PanAdharMatch>;

export default AadharStory;

const Template: ComponentStory<typeof PanAdharMatch> = () => {
    const stepData = {
        id: 15,
        name: 'PANAadhaarMatching',
        label: 'PAN - Aadhaar Matching',
        isSkipable: false,
        isRequired: false,
        isVisible: false,
        stepStatus: 0,
        primaryCTAText: 'Start Matching',
        description: '',
        form_data: {}
    };
    const handleStepDataSubmit = (data: any) => {
        console.log('HandleWlcStepData', data);
    };

    return <PanAdharMatch stepData={stepData} handleSubmit={handleStepDataSubmit} isDisabledCTA={false} />;
};

export const MatchPanAadhar = Template.bind({});
