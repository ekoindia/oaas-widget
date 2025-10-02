import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';
import InputGlobal from '../../Common/InputGlobal';
import Labelglobal from '../../Common/Labelglobal';

const aadhaarConsentSchema = Yup.object().shape({
    name: Yup.string().required('Required').min(3, 'Minimum 3 characters required')
});

const AadhaarConsent = ({ stepData, handleSubmit, isDisabledCTA, orgDetail }: GlobalStepPropsType) => {
    const { label, description, isSkipable, primaryCTAText } = stepData;
    const org_name = orgDetail?.org_name || orgDetail?.app_name || 'us';
    const consentText = `You hereby consent to ${org_name} as your authorized representative to receive your personal and credit information from UIDAI, CIBIL and other government and private agencies for the purpose of providing you credit in the form of loans or line of credit through our lending partners (&quot;End Use Purpose&quot;).`;
    // const handleAadhaarConsentClick = () => {
    //     handleSubmit({ ...stepData, form_data: { is_consent: 'Y', consent_text: consentText, name: consentData }, stepStatus: 3 });
    // };
    const formValues = { name: '' };
    const handleSkip = () => {
        handleSubmit({ ...stepData, stepStatus: 2 });
    };
    return (
        <div className="pt-8 sm:p-8 w-full">
            <div className="text-[22px] font-[500] sm:font-[400]">{label}</div>
            <div className="mt-3 text-[16px] sm:text-[14px] font-[400] sm:font-[300]">{description}</div>
            <div className="relative mt-10"></div>
            <div className={`flex flex-col items-center sm:block w-full max-w-full md:max-w-[400px]`}>
                <Formik
                    initialValues={formValues}
                    validationSchema={aadhaarConsentSchema}
                    onSubmit={(formData) => {
                        // handleSubmit({ ...stepData, form_data: formData, stepStatus: 3 });
                        // console.log('this is form data', formData);
                        handleSubmit({ ...stepData, form_data: { is_consent: 'Y', consent_text: consentText, name: formData.name }, stepStatus: 3 });
                    }}
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form>
                            <Labelglobal className="block mb-2 text-sm font-bold text-black">Name</Labelglobal>
                            <InputGlobal name="name" className="w-full" value={values.name} onChange={handleChange('name')} id="name" type="text" placeholder="" />
                            {errors.name && touched.name ? <div className="text-darkdanger text-xs">{errors.name}</div> : null}
                            <ButtonGlobal className="mt-4 w-fit sm:w-fit text-[16px]" disabled={isDisabledCTA}>
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
            </div>
        </div>
    );
};

export default AadhaarConsent;
