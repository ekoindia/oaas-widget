import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Business from '../components/Steps/Business/Business';

const AadharStory = {
    title: 'ReactComponentLibrary/Business'
} as ComponentMeta<typeof Business>;

export default AadharStory;

const Template: ComponentStory<typeof Business> = () => {
    const stepData = {
        id: 9,
        name: 'BusinessDetails',
        label: 'Business Details',
        isSkipable: false,
        isRequired: true,
        isVisible: true,
        stepStatus: 0,
        role: 13300,
        primaryCTAText: 'Next',
        description: '',
        form_data: {}
    };
    const handleStepDataSubmit = (data: any) => {
        console.log('HandleWlcStepData', data);
    };

    return <Business stepData={stepData} handleSubmit={handleStepDataSubmit} isDisabledCTA={false} />;
};

export const BussinessComoponent = Template.bind({});
