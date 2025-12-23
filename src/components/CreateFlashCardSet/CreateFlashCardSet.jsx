import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFlashcard, selectAllFlashcards } from '../../redux/flashcardSlice'
import './CreateFlashCardSet.css'
import EditFlashCardItem from '../EditFlashCardItem/EditFlashCardItem';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';

function CreateFlashCardSet() {
  const [image, setImage] = useState();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const flashcards = useSelector(selectAllFlashcards);

  const SyncGroupFields = ({ groupName, setFieldValue }) => {
    useEffect(() => {
      if (groupName !== '__add_new__') {
        const data = (flashcards && flashcards[groupName]) || {};
        setFieldValue('description', data.description || '');
        setFieldValue('flashCards', data.flashCards || [{ term: '', description: '', image: null }]);
        setImage(data.image || null);
      }
    }, [groupName, setFieldValue, flashcards]);

    return null;
  };

  const onSelectImage = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateBtnClick = (values) => {
    const finalGroupName = values.groupName === '__add_new__' ? values.newGroupName : values.groupName;

    const flashcardData = {
      groupName: finalGroupName,
      description: values.description,
      image: image,
      flashCards: values.flashCards
    };

    dispatch(addFlashcard({
      id: finalGroupName,
      data: flashcardData
    }));

    navigate("/my-flashcards");
  }

  const initialValues = {
    groupName: "",
    newGroupName: "",
    description: "",
    flashCards: [{ term: "", description: "", image: null }]
  };

  const validate = (values) => {
    const errors = {};

    if (!values.groupName) {
      errors.groupName = 'Group name is required';
    } else if (values.groupName === '__add_new__' && !values.newGroupName) {
      errors.newGroupName = 'New group name is required';
    }

    if (!values.flashCards || values.flashCards.length === 0) {
      errors.flashCards = 'At least one flashcard is required';
    } else {
      const flashCardErrors = [];
      values.flashCards.forEach((flashCard, index) => {
        const flashCardError = {};
        if (!flashCard.term) {
          flashCardError.term = 'Term is required';
        }
        if (!flashCard.description) {
          flashCardError.description = 'Definition is required';
        }
        if (Object.keys(flashCardError).length > 0) {
          flashCardErrors[index] = flashCardError;
        }
      });
      if (flashCardErrors.length > 0) {
        errors.flashCards = flashCardErrors;
      }
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        handleCreateBtnClick(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <div className="CreateFlashPage">
            <div className='text-label'>
              <label htmlFor="createGroup">Create Group*</label>
            </div>
            <div className="CardDetails">
              <div>
                <Field                  
                  name="groupName"
                  className="CardSetCb"
                  as="select"
                >
                  <option value="">Select</option>
                  <option value="__add_new__">Add new</option>
                  {Object.keys(flashcards || {}).map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </Field>
                <ErrorMessage name="groupName" component="div" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }} />

                <SyncGroupFields groupName={values.groupName} setFieldValue={setFieldValue} />

                {values.groupName === '__add_new__' && (
                  <div style={{ marginTop: '8px' }}>
                    <Field
                      id="createGroup"
                      name="newGroupName" 
                      placeholder="Enter new group name"
                      className="CardSetCb"
                    />
                    <ErrorMessage name="newGroupName" component="div" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }} />
                  </div>
                )}
              </div>
              <div className="UploadimageBtn secondary-btn" onClick={onSelectImage}>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
                <img className="smallImage" src="/upload.png" alt="Upload" />Upload Image
              </div>
              <div>
                {image && (
                  <>
                    <img className="upload_img" src={image} alt="Uploaded preview" />
                  </>
                )}
              </div>
            </div>
            <div className="AddDesc">
              <div className='text-label'>
                <label htmlFor="add-description">Add description</label>
              </div>
              <Field
                as="textarea"
                id="add-description"
                name="description"
                rows="4"
                className="descriptionText"
                placeholder="Description about what flashcards are about"
              />
              <br />
            </div>
          </div>
          <FieldArray name="flashCards">
            {({ push, remove, form }) => (
              <div className='flashCardList'>
                <div>
                  {form.values.flashCards.map((flashCard, index) => (
                    <EditFlashCardItem
                      key={index}
                      cardItemIndex={index}
                    />
                  ))}
                </div>
                <div className='AddCardItemBtn' onClick={() => push({ term: "", description: "", image: null })}>
                  + Add more
                </div>
              </div>
            )}
          </FieldArray>
          <div className='BtnContainer' >
            <button className='primary-btn' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateFlashCardSet;