import React, { useEffect, useState } from 'react';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import InputGlobal from '../../Common/InputGlobal';
import ButtonGlobal from '../../Common/ButtonGlobal';
import Labelglobal from '../../Common/Labelglobal';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const secretPinValidationSchema = Yup.object().shape({
    first_okekey: Yup.string().required('Required').min(4, 'Must be exactly 4 digits').max(4, 'Must be exactly 4 digits'),
    second_okekey: Yup.string()
        .oneOf([Yup.ref('first_okekey')], 'secret PIN must match')
        .required('Required')
});

const SecretPin = ({ stepData, handleSubmit, isDisabledCTA, handleStepCallBack }: GlobalStepPropsType) => {
    const { label, description, isSkipable, primaryCTAText } = stepData;
    const [formValues, setFormValues] = useState({
        first_okekey: '',
        second_okekey: ''
    });
    const handleSkip = () => {
        handleSubmit({ ...stepData, stepStatus: 2 });
    };
    useEffect(() => {
        handleStepCallBack({ type: stepData.id, method: 'getBookletNumber' });
        // handleStepCallBack({ type: stepData.id, method: 'getBookletKey' });
        // handleStepCallBack({ type: stepData.id, method: 'getBookletKey' });
    }, []);
    return (
        <div className="pt-8 sm:p-8">
            <Formik
                initialValues={formValues}
                validationSchema={secretPinValidationSchema}
                onSubmit={(formData) => {
                    handleSubmit({ ...stepData, form_data: formData, stepStatus: 3 });
                }}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form className="bg-white mt-4 sm:ml-2 xl:ml-6 w-full mr-2">
                        <div className="text-[22px] font-[500] sm:font-[400]">{label}</div>
                        <div className="mt-3 text-[16px] sm:text-[14px] font-[400] sm:font-[300]">{description}</div>
                        <div className="mt-10 relative"></div>
                        <span className={`flex flex-col sm:block`}>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Secret PIN</Labelglobal>
                                <InputGlobal name="first_okekey" value={values.first_okekey} onChange={handleChange('first_okekey')} id="username" type="number" maxLength="4" placeholder="" />
                                {errors.first_okekey && touched.first_okekey ? <div className="text-red">{errors.first_okekey}</div> : null}
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Confirm Secret PIN</Labelglobal>
                                <InputGlobal name="second_okekey" value={values.second_okekey} onChange={handleChange('second_okekey')} id="username" type="number" maxLength="4" placeholder="" />
                                {errors.second_okekey && touched.second_okekey ? <div className="text-red">{errors.second_okekey}</div> : null}
                            </div>
                            Note:
                            <div className="ml-8">
                                <li>Please set a strong secret PIN to secure your account</li>
                                <li>Your 4-digit secret pin will be required in all the transactions</li>
                            </div>
                            <ButtonGlobal
                                className="mt-4 w-fit sm:w-fit text-[16px]"
                                // onClick={handleAadhaarConsentClick}
                                type="submit"
                                disabled={isDisabledCTA}
                            >
                                {isDisabledCTA ? 'Please wait...' : primaryCTAText}
                            </ButtonGlobal>
                            {isSkipable && (
                                <ButtonGlobal className="sm:ml-10 mt-6" onClick={handleSkip}>
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
