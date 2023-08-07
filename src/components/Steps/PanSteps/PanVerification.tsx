import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useStore } from '../../../store/zustand';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import { ButtonGlobal, CamDropzone, InputGlobal, Labelglobal } from '../../Common';

const PANREGEX = /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/;

const PanVerification = ({ stepData, handleSubmit, isDisabledCTA = false, shopTypes = [] }: GlobalStepPropsType) => {
    // console.log('[PanVerification] handleSubmit', handleSubmit);
    const { label, description, isSkipable, primaryCTAText } = stepData;

    const { cameraStatus, uploadedImage, setCameraStatus, selectedFile, preview } = useStore();

    useEffect(() => {
        setCameraStatus(false);
    }, []);

    const handleSkip = () => {
        handleSubmit({ ...stepData, stepStatus: 2 });
    };

    const {
        handleSubmit: handleSubmitRhf,
        register,
        formState: { errors },
        control,
        // watch,
        setValue
    } = useForm(/* { mode: 'onChange' } */);

    // const watchAll = watch();
    // console.log('[PAN Verification] watchAll', watchAll);
    // console.log('[PAN Verification] errors', errors);

    const panVerificationFormMetadata = [
        {
            id: 'panNumber',
            label: 'PAN Number',
            required: true,
            type: 'TEXT',
            placeholder: 'XXXXXXXXXX',
            validation: { required: true, pattern: PANREGEX, maxLength: 10, minLength: 10 },
            capitalize: true
        },
        {
            id: 'panImage',
            label: 'PAN Image',
            required: true,
            type: 'IMAGE',
            validation: { required: true }
        },
        {
            id: 'shopType',
            label: 'Shop Type',
            required: true,
            type: 'LIST',
            list_elements: shopTypes
        },
        {
            id: 'shopName',
            label: 'Shop Name',
            required: true,
            type: 'TEXT',
            validation: { required: true }
        }
    ];

    return (
        <div className="pt-8 sm:p-8 xl:w-[55%] lg:w-[70%]">
            <div className="text-[22px] font-[500] sm:font-[400]">{label}</div>
            <div className="mt-3 mb-3 text-[16px] sm:text-[14px] font-[400] sm:font-[300]">
                {description}
                <span className="text-primary"> .jpg, .png, .pdf</span>
            </div>

            <form onSubmit={handleSubmitRhf((_data) => handleSubmit({ ...stepData, form_data: _data, stepStatus: 3 }))}>
                <Value
                    {...{
                        formHeading: 'PAN Verification',
                        formLabel: 'Upload your PAN copy to verify your business. Accepted formats are .jpg, .png, .pdf',
                        renderer: panVerificationFormMetadata,
                        register,
                        control,
                        setValue,
                        errors
                    }}
                />
                <div className="flex flex-col items-center sm:block">
                    <ButtonGlobal className="bg-primary hover:bg-black text-white font-semibold mt-4 py-2 px-8 rounded w-fit sm:w-fit text-[16px]" disabled={isDisabledCTA} type="submit">
                        {isDisabledCTA ? 'Loading...' : primaryCTAText}
                    </ButtonGlobal>

                    {isSkipable && (
                        <ButtonGlobal className="mt-6 font-semibold sm:ml-10" onClick={handleSkip}>
                            Skip this step
                        </ButtonGlobal>
                    )}
                </div>
            </form>
        </div>
    );
};

export default PanVerification;

type FormProps = {
    renderer: Array<any>;
    register: Function;
    control: any;
    setValue: Function;
    errors: any;
};

const Value = ({ renderer, register, control, setValue, errors }: FormProps) => {
    return (
        <div className="flex flex-col gap-y-2">
            {renderer?.map(({ id, label, required, value, disabled, list_elements, type, placeholder, validation, maxLength, minLength, capitalize }) => {
                switch (type) {
                    case 'TEXT':
                        return (
                            <div>
                                <Labelglobal htmlFor={id}>{label}</Labelglobal>
                                <InputGlobal
                                    className="block w-full px-3 py-2 mb-1 leading-tight border-2 rounded outline-none border-lightdefault"
                                    id={id}
                                    name={id}
                                    value={value}
                                    required={required}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    maxLength={maxLength}
                                    minLength={minLength}
                                    {...register(id, {
                                        ...validation,
                                        onChange: (e: any) => {
                                            let _text = e.target.value;
                                            _text = capitalize ? _text.toUpperCase() : _text;
                                            setValue(id, _text);
                                        }
                                    })}
                                />
                                {errors[id]?.type === 'required' && <p className="text-xs text-darkdanger">Required</p>}
                                {errors[id]?.type === 'pattern' && <p className="text-xs text-darkdanger">Please enter correct value</p>}
                                {errors[id]?.type === 'maxLength' && <p className="text-xs text-darkdanger">Length exceeds</p>}
                                {errors[id]?.type === 'minLength' && <p className="text-xs text-darkdanger">Insufficient Characters</p>}
                            </div>
                        );
                    case 'IMAGE':
                        return (
                            <Controller
                                name={id}
                                control={control}
                                render={({ field: { value } }) => {
                                    return (
                                        <div>
                                            <CamDropzone file={value} setFile={(file) => setValue(id, file)} />
                                            {errors[id]?.type === 'required' && <p className="text-xs text-darkdanger">Required</p>}
                                        </div>
                                    );
                                }}
                                rules={{
                                    ...validation
                                }}
                            />
                        );
                    case 'LIST':
                        return (
                            <div>
                                <Labelglobal htmlFor={id}>{label}</Labelglobal>
                                <select
                                    id={id}
                                    name={id}
                                    className="px-0.5 py-[9px] border-2 border-lightdefault-800 w-full rounded-md bg-white border-lightdefault"
                                    {...register(id, { ...validation })}
                                >
                                    {list_elements?.length > 0 &&
                                        list_elements.map((shop: any, idx: number) => (
                                            <option value={shop.value} key={`${idx}_${shop.value}`}>
                                                {shop.label}
                                            </option>
                                        ))}
                                </select>
                                {errors[id]?.type === 'required' && <p className="text-xs text-darkdanger">Required</p>}
                            </div>
                        );
                }
            })}
        </div>
    );
};
