import React, { useEffect, useState } from 'react';
import userDistributor from '../../../assets/icons/user_distributor.png';
import userEnterprise from '../../../assets/icons/user_enterprise.png';
import userMerchant from '../../../assets/icons/user_merchant.png';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';

const SelectionScreen = ({ stepData, handleSubmit, isDisabledCTA, primaryColor, accentColor }: GlobalStepPropsType) => {
    const { id, name, label, primaryCTAText, form_data } = stepData;
    const [roleVal, setRoleVal] = useState<number>(-1);
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
        <div className="flex flex-col max-w-md p-7 rounded-lg m-7 bg-white" id={`step_${id}_${name}`}>
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
                                value={role.applicant_type}
                                name="role"
                                onChange={handleChange}
                                checked={roleVal === role.applicant_type}
                            />
                        </label>
                    ))}
            <ButtonGlobal
                className="mt-6"
                onClick={() => {
                    handleSubmit({ ...stepData, form_data: { applicant_type: roleVal } });
                }}
                disabled={isDisabledCTA || roleVal < 0}
            >
                {isDisabledCTA ? 'Please wait...' : primaryCTAText}
            </ButtonGlobal>
        </div>
    );
};

export default SelectionScreen;
