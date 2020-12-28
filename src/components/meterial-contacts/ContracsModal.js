import React from 'react'
import Modal from '../util/modal'
import { Formik, Form, Field } from 'formik';
import './contractModal.css'

const ContracsModal = ({ modalContract, ...attr }) => {
  return (
  <Modal { ...attr }>
    { modalContract.number ? 
      <>
        <div className="contract-modal__header">
          <h3>Контракт №{modalContract.number}</h3>
        </div>
        <div className="contract-modal__body">
          <ul className="contract-modal__list">
            <li>Ім'я: <strong>{modalContract.name}</strong></li>
            <li>Адрес: <strong>{modalContract.adress}</strong></li>
            <li>Номер телефону: <strong>{modalContract.phone}</strong></li>
            <li>Завантажити файл:  <a href={modalContract.fileUrl} target="_blank" download="contract">📄</a></li>
            <li>Автор: <strong>{modalContract.author}</strong></li>
            <li>Етап роботи: <strong>{modalContract.progress}</strong></li>
            <li>Дата внесення: <strong>{modalContract.timestamp}</strong></li>
          </ul>
        </div>
        <div className="contract-modal__footer"></div>
      </>
      : <h3>Нічого не знайдено</h3>
    }
  </Modal>
  )
}

export default ContracsModal
{/* <h3 className="modal__headline">Редагувати контракт</h3>
    <Formik
      // initial values
       initialValues={{ email: '', password: '' }}
      
       // validation
       validate={values => {
         const errors = {};

         // email validation
         if (!values.email) {
           errors.email = "Обов'язкове поле";
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Неправильний формат адресси';
         }

         // password validation 
         if(!values.password) {
           errors.password = "Обов'язкове поле";
         } else if(values.password.length < 6) {
           errors.password = "Занадто короткий пароль, мінімум 6 символів";
         }

         return errors;
       }}

       validateOnBlur

       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({ isSubmitting, values, isValid, errors  }) => (
         <Form>
           <Field error={ errors.email ? errors.email : null } name="email" type="text" label="Ім'я" as={Input} />
           <Field error={ errors.password ? errors.password : null } type="password" label="Пароль" name="password" as={Input} />
           <button type="submit" disabled={isSubmitting && !isValid}>
             Submit
           </button>
         </Form>
       )}
     </Formik> */}