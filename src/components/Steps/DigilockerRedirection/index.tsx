import React, { useEffect } from 'react';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';

/**
 * DigilockerRedirection Component
 *
 * This component handles the Digilocker redirection flow in the onboarding process.
 *
 * API Integration:
 * The parent project should handle the handleStepCallBack with the following method:
 *
 * Example handleStepCallBack implementation:
 * ```javascript
 * const handleStepCallBack = ({ type, method }) => {
 *   if (type === 20 && method === 'getDigilockerUrl') {
 *     // Make API call to get Digilocker redirection URL
 *     apiCall('/digilocker/generate-url', { userId, sessionId })
 *       .then(response => {
 *         // Update stepData.form_data.digilocker_url with the response
 *         setStepData(prevData => ({
 *           ...prevData,
 *           form_data: {
 *             ...prevData.form_data,
 *             digilocker_url: response.redirectUrl
 *           }
 *         }));
 *       });
 *   }
 * };
 * ```
 *
 * The API should return a response with a redirectUrl field that contains the Digilocker URL.
 */
export const DigilockerRedirection = ({ stepData, handleSubmit, isDisabledCTA, handleStepCallBack, digilockerData, skipButtonComponent }: GlobalStepPropsType) => {
    // console.log('[DigilockerRedirection] digilockerData', digilockerData);
    const { label, description, primaryCTAText } = stepData;

    useEffect(() => {
        // Call API to get Digilocker redirection URL
        if (typeof handleStepCallBack === 'function') {
            handleStepCallBack({ type: stepData.id, method: 'getDigilockerUrl' });
        }
    }, []);

    const handleOpenDigilocker = () => {
        if (digilockerData?.link) {
            // Open Digilocker in new tab
            // TODO: ensure link cannot be opened after single use
            window.open(digilockerData.link, '_blank', 'noopener,noreferrer');

            // You might want to add a callback here to track when user returns
            // or implement polling to check completion status
        } else if (typeof handleStepCallBack === 'function') {
            // Fallback: make API call to get URL if not available
            handleStepCallBack({ type: stepData.id, method: 'getDigilockerUrl' });
        }
    };

    const handleProceed = () => {
        // Submit the step as completed
        handleSubmit({
            ...stepData,
            form_data: {
                ...stepData.form_data,
                digilocker_completed: true,
                completion_timestamp: new Date().toISOString()
            },
            stepStatus: 2
        });
    };

    return (
        <div>
            <div className="text-[22px] font-[500] sm:font-[400] mb-4">{label || 'Digilocker Redirection'}</div>

            <div className="mt-3 mb-6 text-[16px] sm:text-[14px] font-[400] sm:font-[300]">
                {description || 'Please complete the verification process through Digilocker to continue with your onboarding.'}
            </div>

            <div className="space-y-4">
                {/* Open Digilocker Button */}
                <ButtonGlobal className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-blue-400" onClick={handleOpenDigilocker} disabled={isDisabledCTA}>
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>{'Open Digilocker'}</span>
                    </>
                </ButtonGlobal>

                {/* Steps */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                        <strong>Steps:</strong>
                    </p>
                    <ol className="mt-2 text-sm text-blue-700 list-decimal pl-5 space-y-1">
                        <li>Click "Open Digilocker" to access your digital documents</li>
                        <li>Complete the required verification process</li>
                        <li>Return to this page and click "Proceed" to continue</li>
                    </ol>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" onClick={handleProceed} disabled={isDisabledCTA}>
                        <>
                            <span>Proceed</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </>
                    </ButtonGlobal>
                    {skipButtonComponent}
                </div>
            </div>
        </div>
    );
};
