import React, { useState } from 'react';
import { GlobalStepPropsType } from '../utils/globalInterfaces.ts/stepsInterface';
import InputGlobal from './Common/InputGlobal';
import ButtonGlobal from './Common/ButtonGlobal';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Labelglobal from './Common/Labelglobal';

const secretPinValidationSchema = Yup.object().shape({
    secretPin: Yup.number().integer().max(9999, 'Must be at most 4 digits').required('Secret PIN is required'),
    confirmSecretPin: Yup.number()
        .integer()
        .oneOf([Yup.ref('secretPin')], 'secret PIN must match')
        .required('required')
});

const SecretPin = ({ stepData, handleSubmit, isDisabledCTA }: GlobalStepPropsType) => {
    const { label, description, isSkipable, primaryCTAText } = stepData;
    const [formValues, setFormValues] = useState({
        secretPin: '',
        confirmSecretPin: ''
    });
    const handleSkip = () => {
        handleSubmit({ ...stepData, stepStatus: 2 });
    };
    return (
        <div className="pt-8 sm:p-8">
            <Formik
                initialValues={formValues}
                validationSchema={secretPinValidationSchema}
                onSubmit={(formData) => {
                    handleSubmit({ ...stepData, form_data: { formData }, stepStatus: 3 });
                    console.log(formData);
                }}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form className="bg-white mt-4 ml-6 w-full mr-2">
                        <div className="text-[22px] font-[500] sm:font-[400]">{label}</div>
                        <div className="mt-3 text-[16px] sm:text-[14px] font-[400] sm:font-[300]">{description}</div>
                        <div className="mt-10 relative"></div>
                        <span className={`flex flex-col items-center sm:block`}>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Secret PIN</Labelglobal>
                                <InputGlobal className="busin_drpdwn_input" name="secretPin" value={values.secretPin} onChange={handleChange('secretPin')} id="username" type="number" placeholder="" />
                                {errors.secretPin && touched.secretPin ? <div className="text-red">{errors.secretPin}</div> : null}
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Confirm Secret PIN</Labelglobal>
                                <InputGlobal
                                    className="busin_drpdwn_input"
                                    name="confirmSecretPin"
                                    value={values.confirmSecretPin}
                                    onChange={handleChange('confirmSecretPin')}
                                    id="username"
                                    type="number"
                                    placeholder=""
                                />
                                {errors.confirmSecretPin && touched.confirmSecretPin ? <div className="text-red">{errors.confirmSecretPin}</div> : null}
                            </div>
                            Note:
                            <div className="ml-8">
                                <li>Please set a stron secret PIN to secure your account</li>
                                <li>Your 4-digit secret pin will be required in all the transactions</li>
                            </div>
                            <ButtonGlobal
                                className="bg-sky hover:bg-black text-white font-semibold mt-4 py-2 px-8 rounded w-fit sm:w-fit text-[16px]"
                                // onClick={handleAadharConsentClick}
                                disabled={isDisabledCTA}
                            >
                                {isDisabledCTA ? 'Please wait...' : primaryCTAText}
                            </ButtonGlobal>
                            {isSkipable && (
                                <ButtonGlobal className="font-semibold sm:ml-10 mt-6" onClick={handleSkip}>
                                    Skip this step
                                </ButtonGlobal>
                            )}
                        </span>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SecretPin;