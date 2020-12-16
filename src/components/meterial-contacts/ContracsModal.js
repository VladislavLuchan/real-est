import React from 'react'
import Modal from '../util/modal'
import { Formik, Form, Field } from 'formik';
import Input from '../util/Input'

const ContracsModal = () => {
  return (
  <Modal>
    <h3 className="modal__headline">Редагувати контракт</h3>
    <Formik
       initialValues={{ email: '', password: '' }}

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
     </Formik>
  </Modal>
  )
}

export default ContracsModal
