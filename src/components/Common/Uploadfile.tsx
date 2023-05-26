import React, { useEffect } from 'react';
import { useStore } from '../../store/zustand';
import imageicon from '../../assets/icons/imageicon.svg';
type UploadFileProps = {
    handleUpload: (files: any, fileData: any) => void;
};
const Uploadfile = ({ handleUpload }: UploadFileProps) => {
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
        handleUpload(objectUrl, e.target.files[0]);
        // setManageVeriyStep();
    };
    return (
        <label htmlFor={'upload-button'} className="documentbtn flex w-[4.2rem]">
            <input type="file" onChange={onSelectFile} name="done" id="upload-button" style={{ display: 'none' }} />
            <img src={imageicon} className="w-[18px] h-[18px] mr-2" />
            Browse
        </label>
    );
};

export default Uploadfile;
