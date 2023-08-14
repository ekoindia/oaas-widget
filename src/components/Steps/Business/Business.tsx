import React, { useState } from 'react';
import ButtonGlobal from '../../Common/ButtonGlobal';
import InputGlobal from '../../Common/InputGlobal';
import Labelglobal from '../../Common/Labelglobal';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    authorized_signatory_name: Yup.string().required('Required'),
    contact_person_cell: Yup.string().required('Required'),
    current_address_line1: Yup.string().required('Required').min(3, 'Minimum 3 characters are required'),
    current_address_line2: Yup.string().required('Required').min(3, 'Minimum 3 characters are required'),
    current_address_pincode: Yup.string().required('Required').min(6, 'Must be exactly 6 digits').max(6, 'Must be exactly 6 digits'),
    current_address_district: Yup.string().required('Required').min(3, 'Minimum 3 characters are allowed'),
    current_address_state: Yup.string().required('Required')
});

const companyTypeData = [
    { label: 'Private Ltd', value: 1 },
    { label: 'LLP', value: 2 },
    { label: 'Partnership', value: 3 },
    { label: 'Sole Proprietorship', value: 4 }
];

const Business = ({ stepData, handleSubmit, isDisabledCTA = false, shopTypes = [], stateTypes = [] }: GlobalStepPropsType) => {
    const [formValues, setFormValues] = useState({
        name: '',
        alternate_mobile: '',
        company_type: 1,
        authorized_signatory_name: '',
        contact_person_cell: '',
        current_address_line1: '',
        current_address_line2: '',
        current_address_pincode: '',
        current_address_district: '',
        current_address_state: ''
    });

    const { label, description, primaryCTAText /*, isSkipable */ } = stepData;

    return (
        <>
            <Formik
                initialValues={formValues}
                validationSchema={SignupSchema}
                onSubmit={(formData) => {
                    handleSubmit({ ...stepData, form_data: formData, stepStatus: 3 });
                }}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form className="bg-white mt-4 min-[640px]:ml-6 w-full min-[640px]:mr-3 xl:mr-6 sm:mr-0 sm:ml-0">
                        <div className="mb-6">
                            <div className="text-[22px] font-[500] sm:font-[400]">{label}</div>
                            <div className="mt-3 text-[16px] sm:text-[14px] font-[400] sm:font-[300]">{description}</div>
                        </div>

                        {/* <div className="mt-8 text-black text-lg mb-4 font-bold">Business Type</div> */}

                        <div className="max-w-full md:max-w-[400px] xl:max-w-[800px] grid grid-cols-1 xl:grid-cols-2 gap-5 xl:w-full">
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Company/Firm's Name</Labelglobal>
                                <InputGlobal name="name" value={values.name} onChange={handleChange('name')} id="username" type="text" placeholder="" />
                                {errors.name && touched.name ? <div className="text-darkdanger text-xs">{errors.name}</div> : null}
                            </div>
                            <div>
                                <Labelglobal optional className="block text-black text-sm font-bold mb-2">
                                    Alternate Mobile Number
                                </Labelglobal>
                                <InputGlobal
                                    name="alternate_mobile"
                                    value={values.alternate_mobile}
                                    onChange={handleChange('alternate_mobile')}
                                    id="username"
                                    maxLength="10"
                                    type="number"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Company Type</Labelglobal>
                                <select
                                    name="company_type"
                                    value={values.company_type}
                                    onChange={handleChange('company_type')}
                                    className="px-2 py-[7px] border-2 w-full rounded bg-white border-default outline-primary mb-2"
                                >
                                    {companyTypeData.map((company, idx) => {
                                        return (
                                            <option value={company.value} key={`${idx}_${company.value}`}>
                                                {company.label}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Director/Authorised Signatory Full Name</Labelglobal>
                                <InputGlobal
                                    name="authorized_signatory_name"
                                    value={values.authorized_signatory_name}
                                    onChange={handleChange('authorized_signatory_name')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                                {errors.authorized_signatory_name && touched.authorized_signatory_name ? <div className="text-darkdanger text-xs">{errors.authorized_signatory_name}</div> : null}
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Contact Person's Mobile Number</Labelglobal>
                                <InputGlobal
                                    name="contact_person_cell"
                                    value={values.contact_person_cell}
                                    onChange={handleChange('contact_person_cell')}
                                    id="username"
                                    maxLength="10"
                                    type="tel"
                                    placeholder=""
                                />
                                {errors.contact_person_cell && touched.contact_person_cell ? <div className="text-darkdanger text-xs">{errors.contact_person_cell}</div> : null}
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Registered Business Address (Line 1)</Labelglobal>
                                <InputGlobal
                                    name="current_address_line1"
                                    value={values.current_address_line1}
                                    onChange={handleChange('current_address_line1')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                                {errors.current_address_line1 && touched.current_address_line1 ? <div className="text-darkdanger text-xs">{errors.current_address_line1}</div> : null}
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Registered Business Address (Line 2)</Labelglobal>
                                <InputGlobal
                                    name="current_address_line2"
                                    value={values.current_address_line2}
                                    onChange={handleChange('current_address_line2')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                                {errors.current_address_line2 && touched.current_address_line2 ? <div className="text-darkdanger text-xs">{errors.current_address_line2}</div> : null}
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Pincode</Labelglobal>
                                <InputGlobal
                                    name="current_address_pincode"
                                    value={values.current_address_pincode}
                                    onChange={handleChange('current_address_pincode')}
                                    maxLength="6"
                                    id="username"
                                    type="number"
                                    max="999999"
                                    placeholder=""
                                />
                                {errors.current_address_pincode && touched.current_address_pincode ? <div className="text-darkdanger text-xs">{errors.current_address_pincode}</div> : null}
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">City</Labelglobal>
                                <InputGlobal
                                    name="current_address_district"
                                    value={values.current_address_district}
                                    onChange={handleChange('current_address_district')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                                {errors.current_address_district && touched.current_address_district ? <div className="text-darkdanger text-xs">{errors.current_address_district}</div> : null}
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">State</Labelglobal>
                                <select
                                    name="current_address_state"
                                    value={values.current_address_state}
                                    onChange={handleChange('current_address_state')}
                                    className="px-2 py-[7px] border-2 w-full rounded bg-white border-default outline-primary mb-2"
                                >
                                    {stateTypes.map((state, idx) => {
                                        return (
                                            <option value={state.value} key={`${idx}_${state.value}`}>
                                                {state.label}
                                            </option>
                                        );
                                    })}
                                </select>
                                {errors.current_address_state && touched.current_address_state ? <div className="text-darkdanger text-xs">{errors.current_address_state}</div> : null}
                            </div>
                        </div>

                        <ButtonGlobal className="mt-6 mt-8" disabled={isDisabledCTA}>
                            {isDisabledCTA ? 'Loading...' : primaryCTAText}
                        </ButtonGlobal>

                        {/* {isSkipable && (
                            <ButtonGlobal className="mt-6 sm:ml-10" onClick={handleSkip}>
                                Skip this step
                            </ButtonGlobal>
                        )} */}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Business;
