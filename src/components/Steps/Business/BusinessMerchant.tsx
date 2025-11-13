import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';
import InputGlobal from '../../Common/InputGlobal';
import Labelglobal from '../../Common/Labelglobal';

const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Required').min(3, 'Minimum 3 characters required'),
    shop_address_line2: Yup.string().required('Required').min(3, 'Minimum 3 characters required'),
    shop_address_pincode: Yup.string().required('Required').min(6, 'Minimum 6 digits are required'),
    sender_district: Yup.string().required('Required').min(3, 'Minimum 3 characters required')
    // sender_state: Yup.string().required('Required')
});

const companyTypeData = [
    { label: 'Private Ltd', value: 'privateltd' },
    { label: 'LLP', value: 'llp' },
    { label: 'Partnership', value: 'partnership' },
    { label: 'Sole Proprietorship', value: 'soleproprietorship' }
];
const genderData = [
    { label: 'Male', value: 49 },
    { label: 'Female', value: 50 }
];

const addressCheckData = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
];

const BusinessMerchant = ({ stepData, handleSubmit, isDisabledCTA = false, shopTypes = [], stateTypes = [], skipButtonComponent }: GlobalStepPropsType) => {
    const { primaryCTAText } = stepData;
    const [formValues, setFormValues] = useState({
        name: '',
        gender: 49,
        businessType: 'privateltd',
        shop_address_line2: '',
        shop_landmark: '',
        shop_address_pincode: '',
        sender_district: '',
        sender_state: '',
        // addressCheck: '',
        latlong: ''
    });
    const [locationVal, setLocationVal] = useState<string>();
    const handleLocation = () => {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
    const onSuccess = (location: any) => {
        console.log('Location', location);
        // handleLocationCapture({
        //     loaded: true,
        //     coordinates: {
        //         lat: location.coords.latitude,
        //         lng: location.coords.longitude,
        //         accuracy: location.coords.accuracy
        //     }
        // });
        const locationValue = `${location.coords.latitude},${location.coords.longitude},${location.coords.accuracy}`;
        setLocationVal(locationValue);
    };
    const onError = (error: any) => {
        console.log('Error in GeoLocation=>', error);
    };
    return (
        <div>
            <Formik
                initialValues={formValues}
                validationSchema={SignupSchema}
                onSubmit={(formData) => {
                    handleSubmit({ ...stepData, form_data: { ...formData, latlong: locationVal }, stepStatus: 3 });
                }}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <div className="text-[22px] font-medium sm:font-normal mb-4">Enter Your Details</div>
                        <ButtonGlobal className="w-full sm:w-auto mb-8" onClick={handleLocation} type="button">
                            Location Capture
                        </ButtonGlobal>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                            <div>
                                <Labelglobal>Full Name (as per your PAN Card)</Labelglobal>
                                <InputGlobal name="name" value={values.name} onChange={handleChange('name')} id="username" type="text" placeholder="" />
                                {errors.name && touched.name ? <div className="text-darkdanger text-xs mt-1">{errors.name}</div> : null}
                            </div>
                            <div>
                                <Labelglobal>Gender</Labelglobal>
                                <select
                                    name="gender"
                                    value={values.gender}
                                    onChange={handleChange('gender')}
                                    className="px-3 py-2 border-2 w-full rounded bg-white border-default outline-primary mb-2"
                                >
                                    {genderData.map((gender, idx) => {
                                        return (
                                            <option value={gender.value} key={`${idx}_${gender.value}`}>
                                                {gender.label}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div>
                                <Labelglobal>Business Type</Labelglobal>
                                <select
                                    name="businessType"
                                    value={values.businessType}
                                    onChange={handleChange('businessType')}
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
                                <Labelglobal>Business Address</Labelglobal>
                                <InputGlobal name="shop_address_line2" value={values.shop_address_line2} onChange={handleChange('shop_address_line2')} id="username" type="text" placeholder="" />
                                {errors.shop_address_line2 && touched.shop_address_line2 ? <div className="text-darkdanger text-xs mt-1">{errors.shop_address_line2}</div> : null}
                            </div>
                            <div>
                                <Labelglobal optional>Landmark</Labelglobal>
                                <InputGlobal name="shop_landmark" value={values.shop_landmark} onChange={handleChange('shop_landmark')} id="username" type="text" placeholder="" />
                            </div>

                            <div>
                                <Labelglobal>Pincode</Labelglobal>
                                <InputGlobal
                                    name="shop_address_pincode"
                                    value={values.shop_address_pincode}
                                    onChange={handleChange('shop_address_pincode')}
                                    id="username"
                                    type="number"
                                    placeholder=""
                                    maxLength="6"
                                />
                                {errors.shop_address_pincode && touched.shop_address_pincode ? <div className="text-darkdanger text-xs mt-1">{errors.shop_address_pincode}</div> : null}
                            </div>
                            <div>
                                <Labelglobal>City</Labelglobal>
                                <InputGlobal name="sender_district" value={values.sender_district} onChange={handleChange('sender_district')} id="username" type="text" placeholder="" />
                                {errors.sender_district && touched.sender_district ? <div className="text-darkdanger text-xs mt-1">{errors.sender_district}</div> : null}
                            </div>
                            <div>
                                <Labelglobal>State</Labelglobal>
                                <select
                                    name="sender_state"
                                    value={values.sender_state}
                                    onChange={handleChange('sender_state')}
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
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" disabled={isDisabledCTA}>
                                {isDisabledCTA ? 'Loading...' : primaryCTAText}
                            </ButtonGlobal>
                            {skipButtonComponent}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BusinessMerchant;
