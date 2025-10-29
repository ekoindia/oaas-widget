import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { BankDependentParam, BankListElement } from '../../../types';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';
import InputGlobal from '../../Common/InputGlobal';
import Labelglobal from '../../Common/Labelglobal';

const BankAccount = ({ stepData, handleSubmit, isDisabledCTA = false, bankList }: GlobalStepPropsType) => {
    console.log('[AgeontOnboarding] bankList', bankList);
    console.log('[AgentOnboarding] stepData', stepData);
    const { label, description, primaryCTAText, isSkipable } = stepData;

    const [selectedBank, setSelectedBank] = useState<BankListElement | null>(null);
    const [accountValidation, setAccountValidation] = useState({
        min: 6,
        max: 20,
        pattern_error: 'Please enter a valid account number'
    });

    const initialValues = {
        bank_code: '',
        account: '',
        ifsc: '',
        branch_address: ''
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
            .matches(/^[a-zA-Z]{4}0[a-zA-Z0-9]{6}$/, 'Invalid IFSC format (e.g., SBIN0000001)')
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

    const handleSkip = () => {
        handleSubmit({ ...stepData, stepStatus: 2 });
    };

    const onSubmit = (values: any) => {
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

        // Add bank_id from selected bank's dependent parameters
        if (selectedBank) {
            const bankIdParam = selectedBank.dependent_params.find((p: BankDependentParam) => p.name === 'bank_id');
            if (bankIdParam && bankIdParam.value) {
                formData.bank_id = bankIdParam.value;
            }
        }

        handleSubmit({
            ...stepData,
            form_data: formData,
            stepStatus: 3
        });
    };

    return (
        <div>
            <div className="text-[22px] font-medium sm:font-normal">{label || 'Add Account'}</div>
            <div className="mt-3 text-base sm:text-sm font-normal sm:font-light">
                {description ||
                    'This is the account from which you would want to do a transfer of funds in order to get E-value instantly. To get instant E-value kindly deposit funds from your added bank account only. Fund deposited from other bank account (which has not been added here) will not be considered for E-value clearance.'}
            </div>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                    <Form className="mt-8 max-w-md">
                        <div className="space-y-4">
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
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" type="submit" disabled={isDisabledCTA}>
                                {isDisabledCTA ? 'Loading...' : primaryCTAText || 'Proceed'}
                            </ButtonGlobal>
                            {isSkipable && (
                                <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" onClick={handleSkip} type="button">
                                    Skip this step
                                </ButtonGlobal>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BankAccount;
