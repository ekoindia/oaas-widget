import React from 'react';
import imageicon from '../../assets/icons/imageicon.svg';
type UploadFileProps = {
    type: any;
    handleUpload: (files: any, type: any, fileData: any) => void;
};
const Uploadfile = ({ type, handleUpload }: UploadFileProps) => {
    // useEffect(() => {
    //     if (!selectedFile) {
    //         setPreview(undefined);
    //         return;
    //     }

    //     const objectUrl = URL.createObjectURL(selectedFile);
    //     setPreview(objectUrl);
    //     setUploadedImage(uploadedImage + 1);
    //     return () => URL.revokeObjectURL(objectUrl);
    // }, [selectedFile, panVerificationfailed]);

    const onSelectFile = (e: any) => {
        // setCameraType(cameraType);
        if (!e.target.files || e.target.files.length === 0) {
            // setSelectedFile(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        handleUpload(objectUrl, type, e.target.files[0]);
        // setManageVeriyStep();
    };
    return (
        <label
            htmlFor={type}
            className="bg-primary text-white text-xs bottom-1.5 font-medium rounded-md pl-2 pr-2 py-[6px] w-max flex mr-2 justify-center items-center cursor-pointer drop-shadow-md hover:drop-shadow-lg hover:-translate-y-[1px] active:scale-98 active:filter-none transition-all duration-200 ease-in-out"
        >
            <input type="file" onChange={onSelectFile} name={type} id={type} style={{ display: 'none' }} accept=".jpg, .jpeg, .png" />
            <img src={imageicon} className="w-[16px] h-[16px] mr-2" />
            Browse
        </label>
    );
};

export default Uploadfile;
