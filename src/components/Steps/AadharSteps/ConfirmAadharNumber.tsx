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

const ConfirmAadhaarNumber = ({ stepData, handleSubmit, isDisabledCTA, orgName, appName }: GlobalStepPropsType) => {
    const formValues = { aadhaarCardNumber: '' };
    const { label, description, primaryCTAText } = stepData;
    // const handleConfirmAadhaarClick = () => {
    //     handleSubmit({ ...stepData, form_data: { aadhaar: aadhaarCardNumber, is_consent: 'Y' }, stepStatus: 3 });
    // };

    return (
        <div>
            <div className="text-[22px] font-medium sm:font-normal">{label}</div>
            <div className="mt-3 text-base sm:text-sm font-normal sm:font-light">{description}</div>
            <div className="mt-8 max-w-md">
                <Formik
                    initialValues={formValues}
                    validationSchema={ConfirmAadhaarNumberSchema}
                    onSubmit={(formData) => {
                        handleSubmit({ ...stepData, form_data: { aadhar: formData.aadhaarCardNumber, is_consent: 'Y' }, stepStatus: 3 });
                    }}
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form className="space-y-4">
                            <div>
                                <Labelglobal>Aadhaar Card Number</Labelglobal>
                                <InputGlobal
                                    name="aadhaarCardNumber"
                                    value={values.aadhaarCardNumber}
                                    onChange={handleChange('aadhaarCardNumber')}
                                    id="username"
                                    maxLength="12"
                                    type="number"
                                    placeholder=""
                                />
                                {errors.aadhaarCardNumber && touched.aadhaarCardNumber ? <div className="text-darkdanger text-xs mt-1">{errors.aadhaarCardNumber}</div> : null}
                            </div>
                            <div className="text-sm">
                                You hereby consent to {orgName || appName || 'us'} as your authorized representative to receive your Aadhaar verification information from UIDAI to validate your
                                Aadhaar details.
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" disabled={isDisabledCTA}>
                                    {isDisabledCTA ? 'Please wait...' : primaryCTAText}
                                </ButtonGlobal>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ConfirmAadhaarNumber;
