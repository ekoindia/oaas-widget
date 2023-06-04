import { StepDataType } from '../../utils/data/stepsData';
type StepperProps = {
    steps: Array<StepDataType>;
    userData: any;
};
declare const Sidebar: ({ steps, userData }: StepperProps) => JSX.Element;
export default Sidebar;
