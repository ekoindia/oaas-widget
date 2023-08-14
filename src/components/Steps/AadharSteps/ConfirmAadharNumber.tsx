import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';
import InputGlobal from '../../Common/InputGlobal';
import Labelglobal from '../../Common/Labelglobal';

const ConfirmAadhaarNumberSchema = Yup.object().shape({
    aadhaarCardNumber: Yup.string().required('Required').min(12, 'Minimum 12 characters required')
});

const ConfirmAadhaarNumber = ({ stepData, handleSubmit, isDisabledCTA, orgDetail }: GlobalStepPropsType) => {
    const formValues = { aadhaarCardNumber: '' };
    const { label, description, isSkipable, primaryCTAText } = stepData;
    // const handleConfirmAadhaarClick = () => {
    //     handleSubmit({ ...stepData, form_data: { aadhaar: aadhaarCardNumber, is_consent: 'Y' }, stepStatus: 3 });
    // };
    const handleSkip = () => {
        handleSubmit({ ...stepData, stepStatus: 2 });
    };

    return (
        <div className="pt-8 sm:p-8">
            <div className="text-[22px] font-[500] sm:font-[400]">{label}</div>
            <div className="mt-3 text-[16px] sm:text-[14px] font-[400] sm:font-[300]">{description}</div>
            <div className="relative mt-10"></div>
            <span className={`flex flex-col items-center sm:block`}>
                <Formik
                    initialValues={formValues}
                    validationSchema={ConfirmAadhaarNumberSchema}
                    onSubmit={(formData) => {
                        handleSubmit({ ...stepData, form_data: { aadhar: formData.aadhaarCardNumber, is_consent: 'Y' }, stepStatus: 3 });
                    }}
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form>
                            <div className="mb-7 w-[80%] xl:w-[45%]">
                                <Labelglobal className="block mb-2 text-sm font-bold text-black">Aadhaar Card Number</Labelglobal>
                                <InputGlobal
                                    name="aadhaarCardNumber"
                                    value={values.aadhaarCardNumber}
                                    onChange={handleChange('aadhaarCardNumber')}
                                    id="username"
                                    maxLength="12"
                                    type="number"
                                    placeholder=""
                                />
                                {errors.aadhaarCardNumber && touched.aadhaarCardNumber ? <div className="text-darkdanger text-xs">{errors.aadhaarCardNumber}</div> : null}
                            </div>
                            <div>
                                You hereby consent to {orgDetail?.org_name || orgDetail?.app_name || 'us'} as your authorized representative to receive your Aadhaar verification information from UIDAI
                                to validate your Aadhaar details.
                            </div>
                            <ButtonGlobal className="mt-4 w-fit sm:w-fit text-[16px] mt-10" disabled={isDisabledCTA}>
                                {isDisabledCTA ? 'Please wait...' : primaryCTAText}
                            </ButtonGlobal>

                            {isSkipable && (
                                <ButtonGlobal className="mt-6 sm:ml-10" onClick={handleSkip}>
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

export default ConfirmAadhaarNumber;
