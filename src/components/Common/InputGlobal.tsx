import React from 'react';

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
};

const InputGlobal = ({ type, id, className, placeholder, onChange, value, name, maxLength, minLength, ...props }: InputProps) => {
    return <input type={type} id={id} className={className} onChange={onChange} placeholder={placeholder} value={value} {...props} name={name} maxLength={maxLength} minLength={minLength} />;
};

export default InputGlobal;
