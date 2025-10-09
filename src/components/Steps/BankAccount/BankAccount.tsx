import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';
import InputGlobal from '../../Common/InputGlobal';
import Labelglobal from '../../Common/Labelglobal';

// Sample bank data - this would typically come from props or API
const SAMPLE_BANK_DATA = {
    bank_code: {
        list_elements: [
            {
                label: 'State Bank of India',
                value: 'SBIN',
                dependent_params: [
                    { name: 'account', length_max: 13, length_min: 11, pattern_error: 'Please enter a valid 11-digit SBI account number' },
                    { name: 'ifsc_required', value: 0 },
                    { name: 'bank_id', value: 108 }
                ]
            },
            {
                label: 'Punjab National Bank',
                value: 'PUNB',
                dependent_params: [
                    { name: 'account', length_max: 16, length_min: 13 },
                    { name: 'ifsc_required', value: 0 },
                    { name: 'bank_id', value: 11 }
                ]
            },
            {
                label: 'Bank of India',
                value: 'BKID',
                dependent_params: [
                    { name: 'account', length_max: 15, length_min: 15 },
                    { name: 'ifsc_required', value: 1 },
                    { name: 'bank_id', value: 3 }
                ]
            },
            {
                label: 'ICICI Bank',
                value: 'ICIC',
                dependent_params: [
                    { name: 'account', length_max: 15, length_min: 12 },
                    { name: 'ifsc_required', value: 0 },
                    { name: 'bank_id', value: 7 }
                ]
            },
            {
                label: 'HDFC Bank',
                value: 'HDFC',
                dependent_params: [
                    { name: 'account', length_max: 16, length_min: 9 },
                    { name: 'ifsc_required', value: 0 },
                    { name: 'bank_id', value: 6 }
                ]
            }
        ]
    }
};

interface BankAccountProps extends GlobalStepPropsType {
    bankData?: typeof SAMPLE_BANK_DATA;
}

const BankAccount = ({ stepData, handleSubmit, isDisabledCTA = false, bankData = SAMPLE_BANK_DATA }: BankAccountProps) => {
    console.log('[AgentOnboarding] stepData', stepData);
    const { label, description, primaryCTAText, isSkipable } = stepData;

    const [selectedBank, setSelectedBank] = useState<any>(null);
    const [isIfscRequired, setIsIfscRequired] = useState(false);
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
        ifsc: isIfscRequired
            ? Yup.string()
                  .required('IFSC code is required')
                  .matches(/^[a-zA-Z]{4}0[a-zA-Z0-9]{6}$/, 'Invalid IFSC format (e.g., SBIN0000001)')
            : Yup.string()
    });

    const handleBankChange = (bankValue: string, setFieldValue: any) => {
        setFieldValue('bank_code', bankValue);
        setFieldValue('account', '');
        setFieldValue('ifsc', '');
        setFieldValue('branch_address', '');

        const bank = bankData.bank_code.list_elements.find((b) => b.value === bankValue);
        setSelectedBank(bank || null);

        if (bank) {
            // Set account validation
            const accountParam = bank.dependent_params.find((p: any) => p.name === 'account');
            if (accountParam) {
                setAccountValidation({
                    min: (accountParam as any).length_min || 6,
                    max: (accountParam as any).length_max || 20,
                    pattern_error: (accountParam as any).pattern_error || 'Please enter a valid account number'
                });
            }

            // Check IFSC requirement
            const ifscRequiredParam = bank.dependent_params.find((p: any) => p.name === 'ifsc_required');
            setIsIfscRequired(ifscRequiredParam?.value === 1);
        } else {
            setIsIfscRequired(false);
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

        if (isIfscRequired && values.ifsc) {
            formData.ifsc = values.ifsc;
        }

        if (values.branch_address) {
            formData.branch_address = values.branch_address;
        }

        handleSubmit({
            ...stepData,
            form_data: formData,
            stepStatus: 3
        });
    };

    return (
        <div className="pt-8 sm:p-8">
            <div className="text-[22px] font-[500] sm:font-[400]">{label || 'Add Account'}</div>
            <div className="mt-3 text-[16px] sm:text-[14px] font-[400] sm:font-[300]">
                {description ||
                    'This is the account from which you would want to do a transfer of funds in order to get E-value instantly. To get instant E-value kindly deposit funds from your added bank account only. Fund deposited from other bank account (which has not been added here) will not be considered for E-value clearance.'}
            </div>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                    <Form className="mt-6">
                        <div className="space-y-4">
                            {/* Bank Selection */}
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Select Your Bank</Labelglobal>
                                <select
                                    name="bank_code"
                                    value={values.bank_code}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleBankChange(e.target.value, setFieldValue);
                                    }}
                                    className="px-3 py-2 border-2 w-full rounded bg-white border-default outline-primary mb-2"
                                >
                                    <option value="">Select</option>
                                    {bankData.bank_code.list_elements.map((bank, idx) => (
                                        <option value={bank.value} key={`${idx}_${bank.value}`}>
                                            {bank.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.bank_code && touched.bank_code && <div className="text-red-500 text-xs mt-1">* (Required)</div>}
                            </div>

                            {/* Bank Account Number */}
                            <div>
                                <Labelglobal className="block text-black text-sm font-bold mb-2">Bank Account Number</Labelglobal>
                                <InputGlobal name="account" value={values.account} onChange={handleChange} placeholder="" maxLength={accountValidation.max} />
                                {errors.account && touched.account && <div className="text-red-500 text-xs mt-1">{errors.account}</div>}
                                {selectedBank && <div className="text-gray-500 text-xs mt-1">{accountValidation.pattern_error}</div>}
                            </div>

                            {/* IFSC Code - conditionally rendered */}
                            {isIfscRequired && (
                                <div>
                                    <Labelglobal className="block text-black text-sm font-bold mb-2">IFSC</Labelglobal>
                                    <InputGlobal name="ifsc" value={values.ifsc?.toUpperCase() || ''} onChange={handleChange} placeholder="Eg: SBIN0000001" maxLength={11} className="uppercase" />
                                    {errors.ifsc && touched.ifsc && <div className="text-red-500 text-xs mt-1">{errors.ifsc}</div>}
                                    <div className="text-blue-600 text-xs mt-1 cursor-pointer hover:underline">Find IFSC</div>
                                    <div className="text-gray-500 text-xs mt-1">Bank branch's IFSC code</div>
                                </div>
                            )}

                            {/* Branch Address - shows when IFSC is entered */}
                            {values.ifsc && values.ifsc.length === 11 && (
                                <div>
                                    <Labelglobal className="block text-black text-sm font-bold mb-2">Branch Address</Labelglobal>
                                    <div className="px-3 py-2 border-2 rounded bg-gray-50 border-default text-gray-600 mb-2">
                                        {values.branch_address || 'Branch address will be populated automatically'}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col items-center sm:block mt-6">
                            <ButtonGlobal className="mt-4 w-fit sm:w-fit text-[16px]" type="submit" disabled={isDisabledCTA}>
                                {isDisabledCTA ? 'Loading...' : primaryCTAText || 'Proceed'}
                            </ButtonGlobal>

                            {isSkipable && (
                                <ButtonGlobal className="sm:ml-10 mt-6" onClick={handleSkip} type="button">
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
