import React, { useEffect, useState } from 'react';
import '../../assets/Styles/style.css';
import Header from '../Common/Header';
import SncdHeadermobile from '../Common/SncdHeadermobile';
import HomePage from '../HomePage';
import { useStore } from '../../store/zustand';
import '../../index.css';
import { StepDataType, stepsData } from '../../utils/data/stepsData';

type OASSPackageProps = {
    defaultStep: string;
    handleSubmit: (data: any) => void;
    developerKey?: string;
    secretKey?: string;
    isBranding?: boolean;
    stepResponse?: any;
    selectedMerchantType?: any;
    shopTypes?: Array<any>;
    stateTypes?: Array<any>;
    handleStepCallBack?: any;
    userData: any;
};
export const Home = ({
    defaultStep = '12400',
    handleSubmit,
    isBranding = true,
    stepResponse,
    shopTypes = [],
    selectedMerchantType,
    stateTypes = [],
    handleStepCallBack,
    userData
}: OASSPackageProps) => {
    const { currentStep, setCurrentStepInitial } = useStore();
    const [sideBarToggle, setSideBarToggle] = useState<boolean>(false);
    const handleSidebarToggle = () => {
        setSideBarToggle((prev) => !prev);
    };
    let visibleStepData = stepsData;
    if (userData?.details?.user_type === 3) {
        visibleStepData = visibleStepData.filter((step) => step.isVisible && step.id !== 10 && step.id !== 9);
    } else {
        visibleStepData = visibleStepData.filter((step) => step.isVisible);
    }
    useEffect(() => {
        const initialStep = visibleStepData?.find((step: StepDataType) => step.role && defaultStep?.includes(`${step.role}`));
        console.log(':::::InitialStep => ', initialStep);
        setCurrentStepInitial(initialStep ? initialStep?.id : 3);
    }, [defaultStep]);

    return (
        <>
            <div className={`${currentStep === 0 ? 'bg-gray' : 'bg-white'} sm:bg-gray w-full min-h-screen`}>
                {isBranding && (
                    <>
                        <Header />
                        <SncdHeadermobile handleSidebarToggle={handleSidebarToggle} />
                    </>
                )}
                <HomePage
                    sideBarToggle={sideBarToggle}
                    setSideBarToggle={setSideBarToggle}
                    handleSubmit={handleSubmit}
                    stepResponse={stepResponse}
                    shopTypes={shopTypes}
                    stateTypes={stateTypes}
                    selectedMerchantType={selectedMerchantType}
                    handleStepCallBack={handleStepCallBack}
                    userData={userData}
                />
                {/* <SelectionScreen /> */}
            </div>
        </>
    );
};
