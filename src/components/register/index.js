/* 
  @todo
  [] create usernames
  [] add users to db
  [x] change apperance
  [] add validation
*/

import React, { useState} from 'react'
import './Register.css'
import firebase from '../../firebase'
import { withRouter, NavLink } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import Input from '../util/Input'
import * as Yup from 'yup'

const Register = (props) => {

  const onRegister = async ( name, email, password ) => {
    try {
      console.log('eeemail', name)
      await firebase.register(name, email, password)
      props.history.replace('/')
    } catch(error) {
      alert(error.message)
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Обов'язкове поле"),
    email: Yup.string().email('Невірний формат пошти').required("Обов'язкове поле"),
    password: Yup.string().min(6, 'Пароль має скаладатись мінімум з 6 символів').required("Обов'язкове поле")
  })

  return (
    <div className="auth">
      <div className="auth__container">

        <Formik
          initialValues={{ name: '', email: '', password: '' }}

          validationSchema={validationSchema}
          validateOnBlur

          onSubmit={(values, { setSubmitting }) => {
            console.log(values.email)
            onRegister(values.name, values.email, values.password)
          }}
          >
          {({ isSubmitting, values, isValid, errors, touched  }) => (
          <Form className="form register">
              <h2 className="form__headline">Реєстрація</h2>

              <Field  name="name" type="text" label="Ім'я" as={Input} />

              <Field error={ errors.email ? errors.email : null } name="email" type="email" label="Електронна адресса" as={Input} />

              <Field error={ errors.password ? errors.password : null } type="password" label="Пароль" name="password" as={Input} />


            <div className="form__actions">
              <button className="form__submit" disabled={isSubmitting && !isValid} type="submit">Зареєструватися</button>
              <NavLink to="/login" className="form__new-account">Вже маєте акаунт?</NavLink>
            </div>
          </Form>
        )}
        </Formik>
      </div>
    </div>
  )
}

export default withRouter(Register)
