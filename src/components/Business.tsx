import React, { useState } from 'react';
import ButtonGlobal from './Common/ButtonGlobal';
import InputGlobal from './Common/InputGlobal';
import Labelglobal from './Common/Labelglobal';
import { GlobalStepPropsType } from '../utils/globalInterfaces.ts/stepsInterface';
import { useStore } from '../store/zustand';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    // shopName: Yup.string().required('Required'),
    // companyName: Yup.string().required('Required'),
    directorFullName: Yup.string().required('Required'),
    contactPersonCellNo: Yup.string().required('Required'),
    pincode: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required')
});

const companyTypeData = [
    { label: 'Private Ltd', value: 'privateltd' },
    { label: 'LLP', value: 'llp' },
    { label: 'Partnership', value: 'partnership' },
    { label: 'Sole Proprietorship', value: 'soleproprietorship' }
];

const Business = ({ stepData, handleSubmit, isDisabledCTA = false, shopTypes = [], stateTypes = [] }: GlobalStepPropsType) => {
    const { steps, currentStep, setCompleted, setCurrentStepPlus } = useStore();
    const [formValues, setFormValues] = useState({
        // shopType: 'shop1',
        // shopName: '',
        companyName: '',
        alternateNumber: '',
        companyType: 'privateltd',
        directorFullName: '',
        contactPersonCellNo: '',
        RegisteredBusinessAddress1: '',
        RegisteredBusinessAddress2: '',
        pincode: '',
        city: '',
        state: '',
    });
    console.log('state types in business', stateTypes);
    return (
        <>
            {/* <div className="dropdown relative mt-2">
                <ButtonGlobal className="busin_drpdwn_btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                    <>
                        -- Select --
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="caret-down"
                            className="w-3 text-extrdarkgray"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                        >
                            <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                        </svg>
                    </>
                </ButtonGlobal>
                <ul className="busin_drpdwn_ul" aria-labelledby="dropdownMenuButton1">
                    <li>
                        <a className="busin_drpdwn_li_a" href="#">
                            Action
                        </a>
                    </li>
                    <li>
                        <a className="busin_drpdwn_li_a" href="#">
                            Another action
                        </a>
                    </li>
                    <li>
                        <a className="busin_drpdwn_li_a" href="#">
                            Something else here
                        </a>
                    </li>
                </ul>
            </div> */}
            <Formik
                initialValues={formValues}
                validationSchema={SignupSchema}
                onSubmit={(formData) => {
                    handleSubmit({ ...stepData, form_data: { formData }, stepStatus: 3 });
                    console.log(formData);
                }}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form className="bg-white mt-4 ml-6 w-full mr-2">
                        <div className="mt-8 text-black text-lg mb-4 font-bold">Business Type</div>
                        <div className="grid grid-cols-2 gap-4 w-full	">
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Company/Firm's name</Labelglobal>
                                <InputGlobal
                                    className="busin_drpdwn_input"
                                    name="companyName"
                                    value={values.companyName}
                                    onChange={handleChange('companyName')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                                {errors.companyName && touched.companyName ? <div className="text-red">{errors.companyName}</div> : null}
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Aleternate mobile number(optional)</Labelglobal>
                                <InputGlobal
                                    className="busin_drpdwn_input"
                                    name="alternateNumber"
                                    value={values.alternateNumber}
                                    onChange={handleChange('alternateNumber')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Company Type</Labelglobal>
                                <select
                                    name="companyType"
                                    value={values.companyType}
                                    onChange={handleChange('companyType')}
                                    id="cars"
                                    className="px-0.5 py-2.5 border-2 border-gray-800 w-full rounded-md bg-white border-gray"
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
                                    className="busin_drpdwn_input"
                                    name="directorFullName"
                                    value={values.directorFullName}
                                    onChange={handleChange('directorFullName')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                                {errors.directorFullName && touched.directorFullName ? <div className="text-red">{errors.directorFullName}</div> : null}
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Contact Person's Cell Number </Labelglobal>
                                <InputGlobal
                                    className="busin_drpdwn_input"
                                    name="contactPersonCellNo"
                                    value={values.contactPersonCellNo}
                                    onChange={handleChange('contactPersonCellNo')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                                {errors.contactPersonCellNo && touched.contactPersonCellNo ? <div className="text-red">{errors.contactPersonCellNo}</div> : null}
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Registered Business address(Line1)</Labelglobal>
                                <InputGlobal
                                    className="busin_drpdwn_input"
                                    name="RegisteredBusinessAddress1"
                                    value={values.RegisteredBusinessAddress1}
                                    onChange={handleChange('RegisteredBusinessAddress1')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Registered Business address(Line2)</Labelglobal>
                                <InputGlobal
                                    className="busin_drpdwn_input"
                                    name="RegisteredBusinessAddress2"
                                    value={values.RegisteredBusinessAddress2}
                                    onChange={handleChange('RegisteredBusinessAddress2')}
                                    id="username"
                                    type="text"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Pincode</Labelglobal>
                                <InputGlobal className="busin_drpdwn_input" name="pincode" value={values.pincode} onChange={handleChange('pincode')} id="username" type="number" placeholder="" />
                                {errors.pincode && touched.pincode ? <div className="text-red">{errors.pincode}</div> : null}
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">City</Labelglobal>
                                <InputGlobal className="busin_drpdwn_input" name="city" value={values.city} onChange={handleChange('city')} id="username" type="text" placeholder="" />
                                {errors.city && touched.city ? <div className="text-red">{errors.city}</div> : null}
                            </div>
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">State</Labelglobal>
                                <select name="state" value={values.state} onChange={handleChange('state')} className="px-0.5 py-2.5 border-2 border-gray-800 w-full rounded-md bg-white border-gray">
                                    {stateTypes.map((state, idx) => {
                                        return (
                                            <option value={state.value} key={`${idx}_${state.value}`}>
                                                {state.label}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <ButtonGlobal className="welcome_btn" disabled={isDisabledCTA} type="submit">
                            {isDisabledCTA ? 'Loading...' : stepData?.primaryCTAText}
                        </ButtonGlobal>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Business;
