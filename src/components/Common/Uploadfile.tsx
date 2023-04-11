import React, { useEffect } from 'react';
import { useStore } from '../../store/zustand';
import imageicon from '../../assets/icons/imageicon.svg';
import Tesseract from 'tesseract.js';

const Uploadfile = () => {
    const { uploadedImage, setUploadedImage, selectedFile, setPreview, panVerificationfailed, setSelectedFile, setManageVeriyStep } = useStore();
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        // const reader = new FileReader();
        // reader.readAsDataURL(selectedFile);
        // console.log(reader);
        // reader.onload = async () => {
        //     const img = new Image();
        //     img.src = reader.result as string;
        //     img.onload = async () => {
        //         const { data } = await Tesseract.recognize(img, 'eng');
        //         const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        //         const extractedPan = data.toString().match(panRegex);

        //         if (extractedPan) {
        //             alert(`pan card is matched ${extractedPan}`);
        //         } else {
        //             alert('Could not extract PAN number from image.');
        //         }
        //     };
        // };
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        setUploadedImage(uploadedImage + 1);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile, panVerificationfailed]);

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
        setManageVeriyStep();
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
