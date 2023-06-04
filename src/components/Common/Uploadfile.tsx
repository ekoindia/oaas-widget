import React, { useEffect } from 'react';
import { useStore } from '../../store/zustand';
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
        console.log('Inside handleUpload => ', typeof e.target.files[0], e.target.files);
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        handleUpload(objectUrl, type, e.target.files[0]);
        // setManageVeriyStep();
    };
    return (
        <label htmlFor={type} className="documentbtn flex">
            <input type="file" onChange={onSelectFile} name={type} id={type} style={{ display: 'none' }} accept=".jpg, .jpeg, png" />
            <img src={imageicon} className="w-[18px] h-[18px] mr-2" />
            Browse
        </label>
    );
};

export default Uploadfile;
