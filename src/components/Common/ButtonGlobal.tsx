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
                'bg-primary text-white font-semibold rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[45px] px-8 py-2 drop-shadow-md hover:drop-shadow-lg hover:-translate-y-[1px] active:scale-98 active:filter-none transition-all duration-200 ease-in-out',
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
