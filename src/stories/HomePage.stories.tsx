import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Home } from '../components/Home';

const HomeStory = {
    title: 'ReactComponentLibrary/Home'
} as ComponentMeta<typeof Home>;

export default HomeStory;
const handleStepDataSubmit = (data: any) => {
    console.log('HandleWlcStepData', data);
};
const Template: ComponentStory<typeof Home> = () => <Home defaultStep="13300" isBranding={false} handleSubmit={handleStepDataSubmit} selectedMerchantType={3} />;
export const homepage = Template.bind({});
