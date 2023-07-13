import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ActivationPlan from '../components/Steps/ActivationPlan/ActivationPlan';

const AadharStory = {
    title: 'ReactComponentLibrary/ActivationPlan'
} as ComponentMeta<typeof ActivationPlan>;

export default AadharStory;

const Template: ComponentStory<typeof ActivationPlan> = () => {
    const stepData = {
        id: 13,
        name: 'Activation Plans',
        label: 'Activation Plans',
        isSkipable: false,
        isRequired: true,
        isVisible: false,
        stepStatus: 0,
        role: 13400,
        primaryCTAText: 'Sign Agreement',
        description: 'Select Plans To See Details',
        form_data: {},
        success_message: 'Agreement signed successfully.'
    };
    const handleStepDataSubmit = (data: any) => {
        console.log('HandleWlcStepData', data);
    };

    return <ActivationPlan stepData={stepData} handleSubmit={handleStepDataSubmit} isDisabledCTA={false} />;
};

export const Acivation = Template.bind({});
