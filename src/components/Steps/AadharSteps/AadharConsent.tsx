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

const AadhaarConsent = ({ stepData, handleSubmit, isDisabledCTA, orgName, appName }: GlobalStepPropsType) => {
    const { label, description, isSkipable, primaryCTAText } = stepData;
    const consentText = `You hereby consent to ${
        orgName || appName || 'us'
    } as your authorized representative to receive your personal and credit information from UIDAI, CIBIL and other government and private agencies for the purpose of providing you credit in the form of loans or line of credit through our lending partners (&quot;End Use Purpose&quot;).`;
    // const handleAadhaarConsentClick = () => {
    //     handleSubmit({ ...stepData, form_data: { is_consent: 'Y', consent_text: consentText, name: consentData }, stepStatus: 3 });
    // };
    const formValues = { name: '' };
    const handleSkip = () => {
        handleSubmit({ ...stepData, stepStatus: 2 });
    };
    return (
        <div>
            <div className="text-[22px] font-medium sm:font-normal">{label}</div>
            <div className="mt-3 text-base sm:text-sm font-normal sm:font-light">{description}</div>
            <div className="mt-8 max-w-md">
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
                            <Labelglobal>Name</Labelglobal>
                            <InputGlobal name="name" value={values.name} onChange={handleChange('name')} id="name" type="text" placeholder="" />
                            {errors.name && touched.name ? <div className="text-darkdanger text-xs mt-1">{errors.name}</div> : null}

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

export default AadhaarConsent;
