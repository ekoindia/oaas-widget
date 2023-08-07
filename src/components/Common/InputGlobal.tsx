import React, { Ref, forwardRef } from 'react';

type InputProps = {
    type: string;
    id: string;
    className: string;
    placeholder: string;
    value?: any;
    name?: string;
    onChange?: any;
    maxLength?: any;
    minLength?: any;
    max?: any;
    props?: any;
};

const InputGlobal = forwardRef(({ type = 'text', id, className, placeholder, onChange, value, name, maxLength, max, minLength, ...rest }: InputProps, ref: Ref<HTMLInputElement>) => {
    return (
        <input
            type={type}
            id={id}
            className={className}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            max={max}
            name={name}
            maxLength={maxLength}
            minLength={minLength}
            ref={ref}
            {...rest}
        />
    );
});

export default InputGlobal;
