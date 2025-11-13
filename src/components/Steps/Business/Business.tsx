import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';
import InputGlobal from '../../Common/InputGlobal';
import Labelglobal from '../../Common/Labelglobal';

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

    const { label, description, primaryCTAText } = stepData;

    return (
        <div>
            <Formik
                initialValues={formValues}
                validationSchema={SignupSchema}
                onSubmit={(formData) => {
                    handleSubmit({ ...stepData, form_data: formData, stepStatus: 3 });
                }}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <div className="text-[22px] font-medium sm:font-normal">{label}</div>
                        <div className="mt-3 text-base sm:text-sm font-normal sm:font-light">{description}</div>

                        <div className="mt-8 max-w-4xl grid grid-cols-1 xl:grid-cols-2 gap-5">
                            <div>
                                <Labelglobal>Company/Firm's Name</Labelglobal>
                                <InputGlobal name="name" value={values.name} onChange={handleChange('name')} id="username" type="text" placeholder="" />
                                {errors.name && touched.name ? <div className="text-darkdanger text-xs mt-1">{errors.name}</div> : null}
                            </div>
                            <div>
                                <Labelglobal optional>Alternate Mobile Number</Labelglobal>
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
                                <Labelglobal>Company Type</Labelglobal>
                                <select
                                    name="company_type"
                                    value={values.company_type}
                                    onChange={handleChange('company_type')}
                                    className="px-3 py-2 border-2 w-full rounded bg-white border-default outline-primary mb-2"
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
                                <Labelglobal>Director/Authorised Signatory Full Name</Labelglobal>
                                <InputGlobal
                                    name="authorized_signatory_name"
                                    value={values.authorized_signatory_name}
                                    onChange={handleChange('authorized_signatory_name')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                                {errors.authorized_signatory_name && touched.authorized_signatory_name ? <div className="text-darkdanger text-xs mt-1">{errors.authorized_signatory_name}</div> : null}
                            </div>
                            <div>
                                <Labelglobal>Contact Person's Mobile Number</Labelglobal>
                                <InputGlobal
                                    name="contact_person_cell"
                                    value={values.contact_person_cell}
                                    onChange={handleChange('contact_person_cell')}
                                    id="username"
                                    maxLength="10"
                                    type="tel"
                                    placeholder=""
                                />
                                {errors.contact_person_cell && touched.contact_person_cell ? <div className="text-darkdanger text-xs mt-1">{errors.contact_person_cell}</div> : null}
                            </div>
                            <div>
                                <Labelglobal>Registered Business Address (Line 1)</Labelglobal>
                                <InputGlobal
                                    name="current_address_line1"
                                    value={values.current_address_line1}
                                    onChange={handleChange('current_address_line1')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                                {errors.current_address_line1 && touched.current_address_line1 ? <div className="text-darkdanger text-xs mt-1">{errors.current_address_line1}</div> : null}
                            </div>
                            <div>
                                <Labelglobal>Registered Business Address (Line 2)</Labelglobal>
                                <InputGlobal
                                    name="current_address_line2"
                                    value={values.current_address_line2}
                                    onChange={handleChange('current_address_line2')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                                {errors.current_address_line2 && touched.current_address_line2 ? <div className="text-darkdanger text-xs mt-1">{errors.current_address_line2}</div> : null}
                            </div>
                            <div>
                                <Labelglobal>Pincode</Labelglobal>
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
                                {errors.current_address_pincode && touched.current_address_pincode ? <div className="text-darkdanger text-xs mt-1">{errors.current_address_pincode}</div> : null}
                            </div>
                            <div>
                                <Labelglobal>City</Labelglobal>
                                <InputGlobal
                                    name="current_address_district"
                                    value={values.current_address_district}
                                    onChange={handleChange('current_address_district')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                                {errors.current_address_district && touched.current_address_district ? <div className="text-darkdanger text-xs mt-1">{errors.current_address_district}</div> : null}
                            </div>
                            <div>
                                <Labelglobal>State</Labelglobal>
                                <select
                                    name="current_address_state"
                                    value={values.current_address_state}
                                    onChange={handleChange('current_address_state')}
                                    className="px-3 py-2 border-2 w-full rounded bg-white border-default outline-primary mb-2"
                                >
                                    {stateTypes.map((state, idx) => {
                                        return (
                                            <option value={state.value} key={`${idx}_${state.value}`}>
                                                {state.label}
                                            </option>
                                        );
                                    })}
                                </select>
                                {errors.current_address_state && touched.current_address_state ? <div className="text-darkdanger text-xs mt-1">{errors.current_address_state}</div> : null}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" disabled={isDisabledCTA}>
                                {isDisabledCTA ? 'Loading...' : primaryCTAText}
                            </ButtonGlobal>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Business;
