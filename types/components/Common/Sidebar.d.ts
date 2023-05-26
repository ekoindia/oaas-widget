import { StepDataType } from '../../utils/data/stepsData';
type StepperProps = {
    steps: Array<StepDataType>;
};
declare const Sidebar: ({ steps }: StepperProps) => JSX.Element;
export default Sidebar;
