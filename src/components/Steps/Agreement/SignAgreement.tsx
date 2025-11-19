import React, { useState, useEffect } from 'react';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import { Spinner } from '../../Common';
import ButtonGlobal from '../../Common/ButtonGlobal';

const SignAgreement = ({ stepData, handleSubmit, isDisabledCTA, handleStepCallBack, esignStatus, skipButtonComponent }: GlobalStepPropsType) => {
    const [popupOpened, setPopupOpened] = useState(false); // Track if popup has been opened by the user

    useEffect(() => {
        if (typeof handleStepCallBack === 'function') handleStepCallBack({ type: stepData.id, method: 'getSignUrl' });
    }, []);

    const openPopupTab = () => {
        handleStepCallBack({ type: stepData.id, method: 'legalityOpen' });
        setPopupOpened(true);
    };

    const checkStatusAfterPopupOpened = () => {
        handleStepCallBack({ type: stepData.id, method: 'checkEsignStatus' });
    };

    const onReload = () => {
        // Reload the browser window
        window.location.reload();
    };

    // const link = 'https://karzatechnologies.sandbox.leegality.com/sign/1f1b1fdd-a903-44f7-a2fc-84653bdf9829';
    const isLoading = isDisabledCTA === true; //  || esignStatus !== 1;

    // Default page content: E-sign API Loaded. Press button to start the E-sign process.
    let cardContent = (
        <>
            <p className="sm:font-normal text-[18px] pt-2 pl-4 pr-4">
                <span className="sm:block">Only one more to go!</span>
                <span className="sm:block">Sign the agreement using your Aadhaar number to continue.</span>
            </p>
            <ButtonGlobal className="mt-6 mt-8" disabled={isLoading} onClick={openPopupTab}>
                {isLoading ? 'Loading...' : stepData?.primaryCTAText}
            </ButtonGlobal>
            {popupOpened ? (
                <p className="sm:font-normal text-[16px] pt-4 pl-4 pr-4 text-center">
                    <span className="sm:block">After completing the e-sign process in the opened tab,</span>
                    <span className="sm:block">please click here to confirm status and proceed:</span>
                    <br />
                    <ButtonGlobal className="mt-6 mt-8" disabled={isLoading} onClick={checkStatusAfterPopupOpened}>
                        Continue
                    </ButtonGlobal>
                </p>
            ) : null}
        </>
    );

    if (esignStatus === 0) {
        // Waiting for E-sign agreement to load (get SignUrl)
        cardContent = (
            <>
                <Spinner />
                <p className="sm:font-normal text-[18px] pt-2 pl-4 pr-4">
                    <span className="sm:block">Generating agreement document. Please wait...</span>
                </p>
            </>
        );
    }

    if (esignStatus === 2) {
        // Waiting for E-sign agreement to load (get SignUrl)
        cardContent = (
            <>
                <p className="sm:font-normal text-[18px] pt-2 pl-4 pr-4 text-darkdanger">
                    <span className="sm:block">Failed to generate agreement document!</span>
                </p>

                <ButtonGlobal className="mt-8 mx-auto" onClick={onReload}>
                    Retry
                </ButtonGlobal>
            </>
        );
    }

    return (
        <div className="w-full min-h-[80vh] sm:min-h-[85%] flex items-center justify-center bg-white rounded-2xl">
            <div className="items-center text-center text-black">
                <img src="https://files.eko.co.in/docs/onborading/agreement.png" alt="welcome icon" className="flex items-center text-center h-[180px] mr-auto ml-auto mt-auto mb-6" />
                {cardContent}
            </div>
        </div>
    );
};

export default SignAgreement;
