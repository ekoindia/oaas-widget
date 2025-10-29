import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';
import InputGlobal from '../../Common/InputGlobal';
import Labelglobal from '../../Common/Labelglobal';

const aadhaarNumberVerifySchema = Yup.object().shape({
    otpVal: Yup.string().required('(Required) OTP received on Aadhaar linked mobile number through SMS').min(6, '(Minimum 6 digits required)OTP received on Aadhaar linked mobile number through SMS'),
    shareCode: Yup.string().required('(Required) Please set up your 4-digit share code').min(4, '(Minimum 4 digits required) Please set up your 4-digit share code')
});

const AadhaarNumberOtpVerify = ({ stepData, handleSubmit, isDisabledCTA, handleStepCallBack }: GlobalStepPropsType) => {
    // const [otpVal, setOtpVal] = useState('');
    // const [shareCode, setShareCode] = useState('0000');
    const [isResend, setIsResend] = useState(false);
    const [resendTimerCount, setResendTimerCount] = useState(30);
    const formValues = { otpVal: '', shareCode: '0000' };
    const { label, description, isSkipable, primaryCTAText } = stepData;
    let timerOut: any = null;
    const handleResendTimer = () => {
        let timer = 30;
        console.log('Inside handleTimer', timer, resendTimerCount);
        setInterval(() => {
            console.log('Inside timwer', timer, resendTimerCount);
            if (timer >= 0) {
                timer = timer - 1;
                setResendTimerCount(timer);
            }
            if (timer === 0) {
                console.log('Inside timer complete', timer, resendTimerCount);
                setIsResend(true);
            }
        }, 1000);
        // if (timerOut !== null) {
        //     timerOut;
        // }
    };
    const handleSkip = () => {
        handleSubmit({ ...stepData, stepStatus: 2 });
    };
    useEffect(() => {
        if (resendTimerCount === 30) {
            console.log('Inside detectTimer', resendTimerCount);

            handleResendTimer();
        }
        // return () => {
        //     clearTimeout(timerOut);
        // };
    }, []);
    return (
        <div>
            <div className="text-[22px] font-medium sm:font-normal">{label}</div>
            <div className="mt-3 text-base sm:text-sm font-normal sm:font-light">{description}</div>
            <div className="mt-8 max-w-md">
                <Formik
                    initialValues={formValues}
                    validationSchema={aadhaarNumberVerifySchema}
                    onSubmit={(formData) => {
                        handleSubmit({ ...stepData, form_data: { otp: formData.otpVal, is_consent: 'Y', share_code: formData.shareCode }, stepStatus: 3 });
                    }}
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form className="space-y-4">
                            <div>
                                <Labelglobal>OTP</Labelglobal>
                                <InputGlobal maxLength="6" name="otpVal" value={values.otpVal} onChange={handleChange('otpVal')} id="otp" type="number" placeholder="" />
                                {errors.otpVal && touched.otpVal ? <div className="text-darkdanger text-xs mt-1">{errors.otpVal}</div> : null}
                                <div className="text-sm mt-2">
                                    {!isResend ? (
                                        <span className="text-darkdefault">Resend OTP in {resendTimerCount} sec</span>
                                    ) : (
                                        <>
                                            <span className="text-darkdefault">Did not receive yet? </span>
                                            <button
                                                type="button"
                                                className="text-primary cursor-pointer hover:underline"
                                                onClick={() => {
                                                    setResendTimerCount(30);
                                                    setIsResend(false);
                                                    handleResendTimer();
                                                    handleStepCallBack({ type: stepData.id, method: 'resendOtp' });
                                                }}
                                            >
                                                Resend OTP
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div>
                                {/* <Labelglobal>Share Code</Labelglobal> */}
                                <InputGlobal
                                    name="shareCode"
                                    value={values.shareCode}
                                    onChange={handleChange('shareCode')}
                                    maxLength="4"
                                    id="shareCode"
                                    type="hidden" // number
                                    placeholder=""
                                />
                                {errors.shareCode && touched.shareCode ? <div className="text-darkdanger text-xs mt-1">{errors.shareCode}</div> : null}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" disabled={isDisabledCTA}>
                                    {isDisabledCTA ? 'Please wait...' : primaryCTAText}
                                </ButtonGlobal>
                                {isSkipable && (
                                    <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" onClick={handleSkip}>
                                        Skip this step
                                    </ButtonGlobal>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AadhaarNumberOtpVerify;
