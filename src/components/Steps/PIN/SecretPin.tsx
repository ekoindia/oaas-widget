import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';
import InputGlobal from '../../Common/InputGlobal';
import Labelglobal from '../../Common/Labelglobal';

const secretPinValidationSchema = Yup.object().shape({
    first_okekey: Yup.string().required('Required').min(4, 'Must be exactly 4 digits').max(4, 'Must be exactly 4 digits'),
    second_okekey: Yup.string()
        .oneOf([Yup.ref('first_okekey')], 'secret PIN must match')
        .required('Required')
});

const SecretPin = ({ stepData, handleSubmit, isDisabledCTA, handleStepCallBack, skipButtonComponent }: GlobalStepPropsType) => {
    const { label, description, primaryCTAText } = stepData;
    const [formValues, setFormValues] = useState({
        first_okekey: '',
        second_okekey: ''
    });
    useEffect(() => {
        handleStepCallBack({ type: stepData.id, method: 'getBookletNumber' });
    }, []);
    return (
        <div>
            <div className="text-[22px] font-medium sm:font-normal">{label}</div>
            <div className="mt-3 text-base sm:text-sm font-normal sm:font-light">{description}</div>
            <div className="mt-8">
                <Formik
                    initialValues={formValues}
                    validationSchema={secretPinValidationSchema}
                    onSubmit={(formData) => {
                        handleSubmit({ ...stepData, form_data: formData, stepStatus: 3 });
                    }}
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form className="space-y-4">
                            <div>
                                <Labelglobal>Secret PIN</Labelglobal>
                                <InputGlobal name="first_okekey" value={values.first_okekey} onChange={handleChange('first_okekey')} id="username" type="number" maxLength="4" placeholder="" />
                                {errors.first_okekey && touched.first_okekey ? <div className="text-darkdanger text-xs mt-1">{errors.first_okekey}</div> : null}
                            </div>
                            <div>
                                <Labelglobal>Confirm Secret PIN</Labelglobal>
                                <InputGlobal name="second_okekey" value={values.second_okekey} onChange={handleChange('second_okekey')} id="username" type="number" maxLength="4" placeholder="" />
                                {errors.second_okekey && touched.second_okekey ? <div className="text-darkdanger text-xs mt-1">{errors.second_okekey}</div> : null}
                            </div>
                            <div className="text-sm">
                                <div className="font-medium mb-2">Note:</div>
                                <ul className="list-disc ml-5 space-y-1">
                                    <li>Please set a strong secret PIN to secure your account</li>
                                    <li>Your 4-digit secret pin will be required in all the transactions</li>
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" type="submit" disabled={isDisabledCTA}>
                                    {isDisabledCTA ? 'Please wait...' : primaryCTAText}
                                </ButtonGlobal>
                                {skipButtonComponent}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SecretPin;
