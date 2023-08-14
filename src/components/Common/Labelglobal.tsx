import React from 'react';

type LabelProps = {
    className?: string;
    htmlFor?: string;
    optional?: boolean;
    children?: JSX.Element | string;
};
const Labelglobal = ({ className, htmlFor, optional, children }: LabelProps) => {
    return (
        <label className={`block text-black text-sm font-bold mb-1 ${className}`} htmlFor={htmlFor}>
            {children}
            {optional && <span className="text-xs font-normal ml-1">(Optional)</span>}
        </label>
    );
};

export default Labelglobal;
