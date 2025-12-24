import React, { useState, useEffect } from 'react';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import { Spinner } from '../../Common';
import ButtonGlobal from '../../Common/ButtonGlobal';

const SignAgreement = ({ stepData, handleSubmit, isDisabledCTA, handleStepCallBack, esignStatus, skipButtonComponent }: GlobalStepPropsType) => {
    const [popupOpened, setPopupOpened] = useState(false); // Track if popup has been opened by the user
    const [popupOpenedDelayed, setPopupOpenedDelayed] = useState(false); // True 3s after popupOpened

    useEffect(() => {
        if (typeof handleStepCallBack === 'function') handleStepCallBack({ type: stepData.id, method: 'getSignUrl' });
    }, []);

    // Set popupOpenedDelayed to true 3s after popupOpened is set to true
    useEffect(() => {
        if (popupOpened) {
            const timer = setTimeout(() => setPopupOpenedDelayed(true), 3000);
            return () => clearTimeout(timer);
        }

        setPopupOpenedDelayed(false);
        return undefined;
    }, [popupOpened]);

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
                <span className="sm:block">Only one more to go!&nbsp;</span>
                <span className="sm:block">Sign the agreement using your Aadhaar number to continue.</span>
            </p>
            <div className="flex flex-row justify-center w-full">
                {popupOpenedDelayed ? (
                    <div className="flex flex-col items-center w-full sm:font-normal text-[16px] pt-8 pl-4 pr-4 text-center">
                        <div className="sm:block">After completing the e-sign process:</div>
                        <ButtonGlobal className="mt-4" disabled={isLoading} onClick={checkStatusAfterPopupOpened}>
                            Continue
                        </ButtonGlobal>

                        <div className="mt-10 text-sm text-gray-500">
                            Didn&apos;t complete the e-sign process?&nbsp;
                            <span className="text-primary underline cursor-pointer" onClick={openPopupTab}>
                                Retry
                            </span>
                        </div>
                    </div>
                ) : (
                    <ButtonGlobal className="mt-6 mt-8" disabled={isLoading || popupOpened} onClick={openPopupTab}>
                        {isLoading ? 'Loading...' : popupOpened ? 'Starting Agreement Sign...' : stepData?.primaryCTAText}
                    </ButtonGlobal>
                )}
            </div>
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
