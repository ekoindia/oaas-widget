import React from 'react';
import { twMerge } from 'tailwind-merge';
import UseGeoLocation from '../CustomHooks/UseGeoLocation';

type BtnProps = {
    className?: string;
    onClick?: any;
    children?: JSX.Element | string;
    disabled?: boolean;
    setCapturelocationData?: React.Dispatch<React.SetStateAction<any | null>>;
    getLocation?: boolean;
    type?: any;
    id?: string;
};

const ButtonGlobal = ({ className, children, onClick, disabled, setCapturelocationData, getLocation, type, id }: BtnProps) => {
    const hndlCapturLoction = () => {
        const location = UseGeoLocation();
        setCapturelocationData?.(location);
    };

    if (getLocation === true) {
        hndlCapturLoction();
    }

    return (
        <button
            className={twMerge(
                'bg-primary text-white font-semibold rounded-lg cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center min-h-[45px] px-8 py-2 shadow-[0px_3px_10px_rgba(0,0,0,0.094)] hover:brightness-90 disabled:hover:brightness-100 transition-all duration-200 ease-in-out',
                className
            )}
            id={id}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};

export default ButtonGlobal;
