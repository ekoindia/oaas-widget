import React, { useEffect, useState } from 'react';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';
import Labelglobal from '../../Common/Labelglobal';
import InputGlobal from '../../Common/InputGlobal';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

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
        <div className="pt-8 sm:p-8">
            <div className="text-[22px] font-[500] sm:font-[400]">{label}</div>
            <div className="mt-3 text-[16px] sm:text-[14px] font-[400] sm:font-[300]">{description}</div>
            <div className="mt-10 relative"></div>
            <span className={`flex flex-col items-center sm:block`}>
                <Formik
                    initialValues={formValues}
                    validationSchema={aadhaarNumberVerifySchema}
                    onSubmit={(formData) => {
                        handleSubmit({ ...stepData, form_data: { otp: formData.otpVal, is_consent: 'Y', share_code: formData.shareCode }, stepStatus: 3 });
                    }}
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form>
                            <div className="mb-7 w-[65%]">
                                <Labelglobal className="block text-black text-sm font-bold mb-2">OTP</Labelglobal>
                                <InputGlobal className="mb-2" maxLength="6" name="otpVal" value={values.otpVal} onChange={handleChange('otpVal')} id="otp" type="number" placeholder="" />
                                {errors.otpVal && touched.otpVal ? <div className="text-darkdanger text-xs">{errors.otpVal}</div> : null}
                                {!isResend ? (
                                    <small>Resend OTP in {resendTimerCount} sec</small>
                                ) : (
                                    <>
                                        <small>Did not receive yet?</small>
                                        <p
                                            style={{ color: 'rgb(31 90 167 / var(--tw-bg-opacity))', cursor: 'pointer' }}
                                            onClick={() => {
                                                setResendTimerCount(30);
                                                setIsResend(false);
                                                handleResendTimer();
                                                handleStepCallBack({ type: stepData.id, method: 'resendOtp' });
                                            }}
                                        >
                                            Resend OTP
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="mb-7 w-[65%]">
                                {/* <Labelglobal className="block text-black text-sm font-bold mb-2">Share Code</Labelglobal> */}
                                <InputGlobal
                                    name="shareCode"
                                    value={values.shareCode}
                                    onChange={handleChange('shareCode')}
                                    maxLength="4"
                                    id="shareCode"
                                    type="hidden" // number
                                    placeholder=""
                                />
                                {errors.shareCode && touched.shareCode ? <div className="text-darkdanger text-xs">{errors.shareCode}</div> : null}
                            </div>
                            <ButtonGlobal className="w-fit sm:w-fit text-[16px] mt-10" disabled={isDisabledCTA}>
                                {isDisabledCTA ? 'Please wait...' : primaryCTAText}
                            </ButtonGlobal>

                            {isSkipable && (
                                <ButtonGlobal className="sm:ml-10 mt-6" onClick={handleSkip}>
                                    Skip this step
                                </ButtonGlobal>
                            )}
                        </Form>
                    )}
                </Formik>
            </span>
        </div>
    );
};

export default AadhaarNumberOtpVerify;
