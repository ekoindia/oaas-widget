import React, { useEffect, useState } from 'react';
import userDistributor from '../../../assets/icons/user_distributor.png';
import userEnterprise from '../../../assets/icons/user_enterprise.png';
import userMerchant from '../../../assets/icons/user_merchant.png';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';

const SelectionScreen = ({ stepData, handleSubmit, isDisabledCTA, primaryColor, accentColor }: GlobalStepPropsType) => {
    const { id, name, label, primaryCTAText, form_data } = stepData;
    const [roleVal, setRoleVal] = useState<number>(0);
    const handleChange = (e: any) => {
        setRoleVal(parseInt(e.target.value));
    };

    useEffect(() => {
        // Set Primary Color as css var "color-primary"
        if (primaryColor) {
            document.documentElement.style.setProperty('--color-primary', primaryColor);
        }

        // Set Accent Color as css var "color-accent"
        if (accentColor) {
            document.documentElement.style.setProperty('--color-accent', accentColor);
        }
    }, [primaryColor, accentColor]);

    // console.log('[oaas] SelectionScreen started: ', stepData);

    return (
        <div className="flex flex-col max-w-md p-7 mt-10 rounded-lg md:mt-2 bg-white" id={`step_${id}_${name}`}>
            <h2 className="mb-5 text-lg font-medium text-lightdefault-900 title-font">{label}</h2>
            {form_data?.roles?.length > 0 &&
                form_data.roles
                    ?.filter((role: any) => role.isVisible)
                    ?.map((role: any, idx: number) => (
                        <label className="flex mb-5 cursor-pointer" key={`${idx}_${role.id}`}>
                            <div className="p-4 mr-5 border-2 rounded-full border-slate-200">
                                <img src={role.id === 1 ? userMerchant : role.id === 2 ? userDistributor : userEnterprise}></img>
                            </div>
                            <div className="flex flex-col justify-center w-full mr-5">
                                <div>{role.label}</div>
                                <div className="text-xs font-light">{role.description}</div>
                            </div>
                            <input
                                id={role.id}
                                type="radio"
                                className="w-6 h-6 cursor-pointer accent-primary"
                                value={role.merchant_type}
                                name="role"
                                onChange={handleChange}
                                checked={roleVal === role.merchant_type}
                            />
                        </label>
                    ))}
            {/* <div className="flex mb-5">
                <div className="p-4 mr-5 border-2 rounded-full border-slate-200">
                    <img src={userMerchant}></img>
                </div>
                <div className="flex flex-col justify-center w-full mr-5">
                    <div>I'm a seller</div>
                    <div className="text-xs font-light">I serve customers from my shop</div>
                </div>
                <div>
                    <input type="radio" />
                </div>
            </div>
            <div className="flex mb-5">
                <div className="p-4 mr-5 border-2 rounded-full border-lightdefault-200">
                    <img src={userDistributor}></img>
                </div>
                <div className="flex flex-col justify-center w-full mr-5">
                    <div>I'm a distributor</div>
                    <div className="text-xs font-light">I have a network of seller and i want to serve them</div>
                </div>
                <div>
                    <input type="radio" />
                </div>
            </div>
            <div className="flex">
                <div className="p-4 mr-5 border-2 rounded-full border-slate-200">
                    <img src={userEnterprise}></img>
                </div>
                <div className="flex flex-col justify-center w-full mr-5">
                    <div>I'm a Enterprise</div>
                    <div className="text-xs">I want to use API and other solution to make my own service</div>
                </div>
                <div>
                    <input type="radio" />
                </div>
            </div> */}
            <ButtonGlobal
                className="mt-6"
                onClick={() => {
                    handleSubmit({ ...stepData, form_data: { merchant_type: roleVal } });
                }}
                disabled={isDisabledCTA || roleVal <= 0}
            >
                {isDisabledCTA ? 'Please wait...' : primaryCTAText}
            </ButtonGlobal>
        </div>
    );
};

export default SelectionScreen;
