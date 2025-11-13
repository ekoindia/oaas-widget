import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useStore } from '../../../store/zustand';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import { ButtonGlobal, CamDropzone, InputGlobal, Labelglobal } from '../../Common';

const PANREGEX = /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/;

const PanVerification = ({ stepData, handleSubmit, isDisabledCTA = false, shopTypes = [] }: GlobalStepPropsType) => {
    // console.log('[PanVerification] handleSubmit', handleSubmit);
    const { label, description, primaryCTAText } = stepData;

    const { cameraStatus, uploadedImage, setCameraStatus, selectedFile, preview } = useStore();

    useEffect(() => {
        setCameraStatus(false);
    }, []);

    const {
        handleSubmit: handleSubmitRhf,
        register,
        formState: { errors },
        control,
        watch,
        setValue
    } = useForm(/* { mode: 'onChange' } */);

    const selectedShopType = watch('shopType');

    // const watchAll = watch();
    // console.log('[PAN Verification] watchAll', watchAll);
    // console.log('[PAN Verification] errors', errors);

    const panVerificationFormMetadata = [
        {
            id: 'panNumber',
            label: 'Enter PAN',
            required: true,
            type: 'TEXT',
            // placeholder: 'XXXXXXXXXX',
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
        <div>
            <div className="text-[22px] font-medium sm:font-normal">{label}</div>
            <div className="mt-3 text-base sm:text-sm font-normal sm:font-light">
                {description}
                <span className="text-primary"> .jpg, .png</span>
            </div>

            <form onSubmit={handleSubmitRhf((_data) => handleSubmit({ ...stepData, form_data: _data, stepStatus: 3 }))} className="mt-8">
                <Value
                    {...{
                        formHeading: 'PAN Verification',
                        formLabel: 'Upload your PAN copy to verify your business. Accepted formats are .jpg, .png, .pdf',
                        renderer: panVerificationFormMetadata,
                        register,
                        control,
                        setValue,
                        errors,
                        selectedShopType,
                        shopTypes
                    }}
                />
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <ButtonGlobal className="w-full h-[48px] sm:max-w-[200px] sm:h-[64px]" disabled={isDisabledCTA} type="submit">
                        {isDisabledCTA ? 'Loading...' : primaryCTAText}
                    </ButtonGlobal>
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
    selectedShopType?: string | number;
    shopTypes?: Array<any>;
};

const Value = ({ renderer, register, control, setValue, errors, selectedShopType, shopTypes = [] }: FormProps) => {
    // Find the selected shop type's dependent params
    const selectedShop = shopTypes.find((shop) => shop.value == selectedShopType);
    const shopNameParam = selectedShop?.dependent_params?.find((param: any) => param.name === 'shop_name');
    const isShopNameVisible = shopNameParam?.is_visible === 1;
    return (
        <div className="flex flex-col gap-y-2">
            {renderer?.map(({ id, label, required, value, disabled, list_elements, type, placeholder, validation, maxLength, minLength, capitalize }) => {
                // Hide shop_name field if not visible based on selected shop type
                if (id === 'shopName' && !isShopNameVisible) {
                    return null;
                }
                switch (type) {
                    case 'TEXT':
                        return (
                            <div key={id}>
                                <Labelglobal htmlFor={id}>{label}</Labelglobal>
                                <InputGlobal
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
                                key={id}
                                name={id}
                                control={control}
                                render={({ field: { value } }) => {
                                    return (
                                        <div key={id}>
                                            <Labelglobal htmlFor={id}>{label}</Labelglobal>
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
                            <div key={id}>
                                <Labelglobal htmlFor={id}>{label}</Labelglobal>
                                <select
                                    id={id}
                                    name={id}
                                    className="px-3 py-2 border-2 w-full rounded bg-white border-default outline-primary mb-2"
                                    {...register(id, { ...validation })}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select {label}
                                    </option>
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
