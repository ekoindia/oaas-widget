import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OnboardingStatus from '../components/Steps/OnBoardingStatus/OnboardingStatus';

const AadharStory = {
    title: 'ReactComponentLibrary/OnboardingStatus'
} as ComponentMeta<typeof OnboardingStatus>;

export default AadharStory;

const Template: ComponentStory<typeof OnboardingStatus> = () => {
    const stepData = {
        id: 14,
        name: 'OnboardingStatus',
        label: 'Onboarding Status',
        isSkipable: false,
        isRequired: false,
        isVisible: false,
        stepStatus: 0,
        primaryCTAText: 'Submit',
        description: '',
        form_data: {}
    };
    const handleStepDataSubmit = (data: any) => {
        console.log('HandleWlcStepData', data);
    };

    return <OnboardingStatus stepData={stepData} handleSubmit={handleStepDataSubmit} isDisabledCTA={false} />;
};

export const OnBoarding = Template.bind({});
