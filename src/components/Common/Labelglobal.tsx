import React from 'react';

type LabelProps = {
    className?: string;
    htmlFor?: string;
    children?: JSX.Element | string;
};
const Labelglobal = ({ className, htmlFor, children }: LabelProps) => {
    return (
        <label className={`block text-black text-sm font-bold mb-1 ${className}`} htmlFor={htmlFor}>
            {children}
        </label>
    );
};

export default Labelglobal;
