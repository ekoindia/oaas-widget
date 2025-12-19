import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import camera from '../../../assets/icons/camera.svg';
import filledcamera from '../../../assets/icons/filledcamera.svg';
import { BankDependentParam, BankListElement } from '../../../types';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';
import { Camera } from '../../Common/Camera';
import InputGlobal from '../../Common/InputGlobal';
import Labelglobal from '../../Common/Labelglobal';
import Uploadfile from '../../Common/Uploadfile';

const BankAccount = ({ stepData, handleSubmit, isDisabledCTA = false, bankList, skipButtonComponent }: GlobalStepPropsType) => {
    console.log('[AgeontOnboarding] bankList', bankList);
    console.log('[AgentOnboarding] stepData', stepData);
    const { label, description, primaryCTAText } = stepData;

    const [selectedBank, setSelectedBank] = useState<BankListElement | null>(null);
    const [accountValidation, setAccountValidation] = useState({
        min: 6,
        max: 20,
        pattern_error: 'Please enter a valid account number'
    });
    const [passbookImage, setPassbookImage] = useState<{ url: any; fileData: any } | null>(null);
    const [cameraStatus, setCameraStatus] = useState(false);

    const initialValues = {
        bank_code: '',
        account: '',
        ifsc: '',
        branch_address: '',
        passbook_image: null as File | null
    };

    // Create dynamic validation schema
    const validationSchema = Yup.object().shape({
        bank_code: Yup.string().required('Please select your bank'),
        account: Yup.string()
            .required('Bank account number is required')
            .min(accountValidation.min, `Minimum ${accountValidation.min} digits required`)
            .max(accountValidation.max, `Maximum ${accountValidation.max} digits allowed`)
            .matches(/^(?!0+$)[a-zA-Z0-9]*$/, accountValidation.pattern_error),
        ifsc: Yup.string()
            .required('IFSC code is required')
            .matches(/^[a-zA-Z]{4}0[a-zA-Z0-9]{6}$/, 'Invalid IFSC format (e.g., SBIN0000001)'),
        passbook_image: Yup.mixed().required('Passbook image is required')
    });

    const handleBankChange = (bankValue: string, setFieldValue: any) => {
        setFieldValue('bank_code', bankValue);
        setFieldValue('account', '');
        setFieldValue('ifsc', '');
        setFieldValue('branch_address', '');

        const bank = bankList?.find((b: BankListElement) => b.value === bankValue);
        setSelectedBank(bank || null);

        if (bank) {
            // Set account validation
            const accountParam = bank.dependent_params.find((p: BankDependentParam) => p.name === 'account');
            if (accountParam) {
                setAccountValidation({
                    min: accountParam.length_min || 6,
                    max: accountParam.length_max || 20,
                    pattern_error: accountParam.pattern_error || 'Please enter a valid account number'
                });
            }
        } else {
            setAccountValidation({ min: 6, max: 20, pattern_error: 'Please enter a valid account number' });
        }
    };

    const handlePassbookUpload = (url: string, type: string, fileData: File, setFieldValue: any) => {
        setPassbookImage({ url, fileData });
        console.log('[BankAccount] handlePassbookUpload fileData:', fileData);
        setFieldValue('passbook_image', fileData);
    };

    const handlePassbookRetake = (setFieldValue: any) => {
        setPassbookImage({ url: null, fileData: null });
        setFieldValue('passbook_image', null);
    };

    // const handleImageCapture = (imageData: any, setFieldValue: any) => {
    //     setCameraStatus(false);
    //     setPassbookImage({ url: imageData.url, fileData: imageData.file });
    //     setFieldValue('passbook_image', imageData.file);
    // };

    // TODO: Quick fix for camera issue - to be refactored later (19 Nov 2025)
    const handleImageCapture = (image: any, fileData: any, setFieldValue: any) => {
        setCameraStatus(false);
        setPassbookImage({ url: image, fileData });
        console.log('[BankAccount] handleImageCapture image:', image);
        console.log('[BankAccount] handleImageCapture fileData:', fileData);
        setFieldValue('passbook_image', fileData);
    };

    const onSubmit = (values: any) => {
        console.log('[BankAccount] onSubmit values:', values);
        const formData: any = {
            bank_code: values.bank_code,
            account: values.account
        };

        if (values.ifsc) {
            formData.ifsc = values.ifsc;
        }

        if (values.branch_address) {
            formData.branch_address = values.branch_address;
        }

        // Add passbook image if uploaded (similar to aadhaarImages structure)
        if (passbookImage) {
            formData.passbookImage = passbookImage;
        }

        // Add bank_id from selected bank's dependent parameters
        if (selectedBank) {
            const bankIdParam = selectedBank.dependent_params.find((p: BankDependentParam) => p.name === 'bank_id');
            if (bankIdParam && bankIdParam.value) {
                formData.bank_id = bankIdParam.value;
            }
        }

        console.log('[BankAccount] onSubmit formData:', formData);

        handleSubmit({
            ...stepData,
            form_data: formData,
            stepStatus: 2
        });
    };

    return (
        <div className="min-w-0">
            <div className="text-[22px] font-medium sm:font-normal">{label || 'Add Account'}</div>
            <div className="mt-3 text-base sm:text-sm font-normal sm:font-light break-words">{description}</div>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                    <Form className="mt-8 min-w-0">
                        <div className="flex flex-col gap-y-4 min-w-0">
                            {/* Bank Selection */}
                            <div>
                                <Labelglobal>Select Your Bank</Labelglobal>
                                <select
                                    name="bank_code"
                                    value={values.bank_code}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleBankChange(e.target.value, setFieldValue);
                                    }}
                                    className={`px-3 py-2 border-2 w-full rounded bg-white outline-primary border-default mb-2 ${errors.bank_code && touched.bank_code ? 'border-darkdanger' : ''}`}
                                >
                                    <option value="">Select</option>
                                    {bankList?.map((bank: BankListElement, idx: number) => (
                                        <option value={bank.value} key={`${idx}_${bank.value}`}>
                                            {bank.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.bank_code && touched.bank_code && <div className="text-darkdanger text-xs mt-1">* (Required)</div>}
                            </div>

                            {/* Bank Account Number */}
                            <div>
                                <Labelglobal>Bank Account Number</Labelglobal>
                                <InputGlobal
                                    name="account"
                                    value={values.account}
                                    onChange={handleChange}
                                    placeholder=""
                                    maxLength={accountValidation.max}
                                    className={errors.account && touched.account ? 'border-darkdanger' : ''}
                                />
                                {errors.account && touched.account && <div className="text-darkdanger text-xs mt-1">{errors.account}</div>}
                                {selectedBank && <div className="text-darkdefault text-xs mt-1">{accountValidation.pattern_error}</div>}
                            </div>

                            {/* IFSC Code - always required */}
                            <div>
                                <Labelglobal>IFSC</Labelglobal>
                                <InputGlobal
                                    name="ifsc"
                                    value={values.ifsc?.toUpperCase() || ''}
                                    onChange={handleChange}
                                    placeholder="Eg: SBIN0000001"
                                    maxLength={11}
                                    className={`uppercase ${errors.ifsc && touched.ifsc ? 'border-darkdanger' : ''}`}
                                />
                                {errors.ifsc && touched.ifsc && <div className="text-darkdanger text-xs mt-1">{errors.ifsc}</div>}
                                <div className="text-darkdefault text-xs mt-1">Bank branch's IFSC code</div>
                            </div>

                            {/* Passbook Upload */}
                            <div>
                                <Labelglobal>Bank Passbook Image</Labelglobal>
                                {cameraStatus ? (
                                    <Camera
                                        type="Passbook"
                                        cameraType="passbook"
                                        handleImageCapture={(image: any, fileData: any) => handleImageCapture(image, fileData, setFieldValue)}
                                        imagesVal={passbookImage}
                                    />
                                ) : passbookImage?.url ? (
                                    <div className="flex flex-col w-full">
                                        <div className="relative w-full h-[190px] border border-default rounded-md overflow-hidden">
                                            <img src={passbookImage.url} alt="Bank Passbook" className="w-full h-full object-cover" />
                                        </div>
                                        <ButtonGlobal className="text-xs font-medium rounded-md px-4 py-2 w-max mt-2" onClick={() => handlePassbookRetake(setFieldValue)} type="button">
                                            Retake
                                        </ButtonGlobal>
                                    </div>
                                ) : (
                                    <div className="flex flex-col w-full">
                                        <div className="p-8 text-sm text-darkdefault border border-default rounded-md bg-lightdefault border-dashed flex flex-col justify-center items-center h-[190px]">
                                            <img src={camera} className="w-[2rem] h-[2rem] flex-col mb-4" alt="Camera" />
                                            <div className="text-sm text-center">Upload or click bank passbook image</div>
                                            <div className="flex mt-4">
                                                <Uploadfile
                                                    type="passbook"
                                                    handleUpload={(url: string, type: string, fileData: File) => {
                                                        handlePassbookUpload(url, type, fileData, setFieldValue);
                                                    }}
                                                />
                                                <ButtonGlobal className="text-xs bottom-1.5 font-medium rounded-md pl-2 pr-2 py-[6px] w-max mr-2" onClick={() => setCameraStatus(true)} type="button">
                                                    <>
                                                        <img src={filledcamera} className="h-[15px] mr-2" alt="Camera" /> Open Camera
                                                    </>
                                                </ButtonGlobal>
                                            </div>
                                        </div>
                                        {errors.passbook_image && touched.passbook_image && <div className="text-darkdanger text-xs mt-1">* Required</div>}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" type="submit" disabled={isDisabledCTA}>
                                {isDisabledCTA ? 'Loading...' : primaryCTAText || 'Proceed'}
                            </ButtonGlobal>
                            {skipButtonComponent}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BankAccount;
