import React, { useEffect } from 'react';
import { GlobalStepPropsType } from '../../../utils/globalInterfaces/stepsInterface';
import ButtonGlobal from '../../Common/ButtonGlobal';

const LocationCapture = ({ stepData, handleSubmit, isDisabledCTA = false, handleStepCallBack }: GlobalStepPropsType) => {
    const { label, description, primaryCTAText } = stepData;

    const handleLocationCapture = (location: any) => {
        console.log('[AgentOnboarding] OAAS Captured location:', location);
        handleSubmit({ ...stepData, form_data: { latlong: `${location?.coordinates?.lat},${location?.coordinates?.lng},${location?.coordinates?.accuracy}` }, stepStatus: 3 });
    };

    const onSuccess = (location: any) => {
        if (!(location && location.coords && location.coords.latitude)) {
            console.error('Error in GeoLocation=>', location);
            return;
        }
        handleLocationCapture({
            loaded: true,
            coordinates: {
                lat: parseFloat(location.coords.latitude).toFixed(6),
                lng: parseFloat(location.coords.longitude).toFixed(6),
                accuracy: Math.round(+(location.coords.accuracy || 0))
            }
        });
    };

    const onError = (error: any) => {
        console.log('Error in GeoLocation=>', error);
    };

    const handleLocation = () => {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };

    useEffect(() => {
        if (typeof handleStepCallBack === 'function') handleStepCallBack({ type: stepData.id, method: 'grantPermission' });
    }, []);

    return (
        <div className="pt-8 sm:p-8 w-full">
            <div className="text-[22px] font-medium sm:font-normal">{label}</div>
            <div className="mt-3 text-base sm:text-sm font-normal sm:font-light">{description}</div>
            <ul className="mt-8 space-y-2 list-disc pl-5 text-sm sm:text-base max-w-2xl">
                <li>Please click the button below to allow browser to capture your location.</li>
                <li>In browser popup, click &quot;Allow&quot; button to enable location capturing.</li>
                <li>You will be re-directed to next step after successful location capture.</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <ButtonGlobal onClick={handleLocation} disabled={isDisabledCTA}>
                    {isDisabledCTA ? 'Loading...' : primaryCTAText}
                </ButtonGlobal>
            </div>
        </div>
    );
};

export default LocationCapture;
