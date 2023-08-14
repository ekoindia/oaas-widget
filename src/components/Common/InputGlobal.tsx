import React, { Ref, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = {
    type?: string;
    id?: string;
    className?: string;
    placeholder?: string;
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
            className={twMerge('w-full px-3 py-2 mb-2 leading-tight border-2 rounded outline-primary border-default transition-all duration-300 ease-in-out', className)}
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
