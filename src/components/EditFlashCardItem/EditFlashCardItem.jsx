import React, { useRef } from 'react'
import "./EditFlashCardItem.css";
import { Field, useFormikContext, ErrorMessage } from 'formik';

function EditFlashCardItem(props) {
    const fileInputRef = useRef(null);
    const { values, setFieldValue } = useFormikContext();
    const flashCard = values.flashCards[props.cardItemIndex];

    const onSelectImage = () => {
        fileInputRef.current.click();
    }
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            setFieldValue(`flashCards.${props.cardItemIndex}.image`, base64);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setFieldValue(`flashCards.${props.cardItemIndex}.image`, null);
    };

    return (
        <>
            <div className='cardPage'>
                <div className='CardItemIndx'>
                    {props.cardItemIndex + 1}
                </div>
                <div className='column'>
                    <label htmlFor={`flashCards.${props.cardItemIndex}.term`}>Enter Term*</label>
                    <Field 
                        name={`flashCards.${props.cardItemIndex}.term`}
                        type="text" 
                        className='TextArea'
                    />
                    <ErrorMessage 
                        name={`flashCards.${props.cardItemIndex}.term`} 
                        component="div" 
                        style={{ color: 'red', fontSize: '12px', marginTop: '5px' }} 
                    />
                </div>
                <div className='column'>
                    <label htmlFor={`flashCards.${props.cardItemIndex}.description`}>Enter Definition*</label>
                    <Field 
                        as="textarea"
                        name={`flashCards.${props.cardItemIndex}.description`}
                        className='TextArea' 
                    />
                    <ErrorMessage 
                        name={`flashCards.${props.cardItemIndex}.description`} 
                        component="div" 
                        style={{ color: 'red', fontSize: '12px', marginTop: '5px' }} 
                    />
                </div>
                <div className='column'>
                    {flashCard.image ? (
                        <div className='selected_img_container'>
                            <img className="selected_img" src={flashCard.image} alt="Uploaded preview" />
                            <div>
                                <div className='edit-btn' onClick={onSelectImage}>
                                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
                                    <img src='/edit.png' height={"18px"} alt="Edit" />
                                </div>
                                <div className='edit-btn' onClick={removeImage}>
                                    <img height={"18px"} src='/delete.png' alt="Delete" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='CardImagebtn secondary-btn' onClick={onSelectImage}>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
                            <span>Select Image</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default EditFlashCardItem