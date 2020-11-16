import React, { useState} from 'react'
import './Register.css'
import firebase from '../../firebase'
import { withRouter } from 'react-router-dom'

const Register = (props) => {
  const [value, setValue] = useState({ email: "", password: "", passwordConfirm: ""})

  const handleSubmit = e => {
    e.preventDefault()
    onRegister()
  }

  const onRegister = async () => {
    try {
      await firebase.register(value.email, value.email, value.password)
    } catch(error) {
      alert(error.message)
    }
    props.history.replace('/')
  }

  const handleChange = e => {
    // console.log(e.target.value)
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  return (
    <div className="auth">
      <h1>Реєстрація</h1>
      <div className="form-container">
        <form>
        <div className="form-input">
          <label htmlFor="email">Електронна адреса:</label>
          <input onChange={handleChange} value={value.email} type="email" autoFocus name="email" placeholder="example@mail.com" />
        </div>
        <div className="form-input">
          <label htmlFor="password">Пароль:</label>
          <input onChange={handleChange} value={value.password} type="password"  name="password" />
        </div>
        <div className="form-input">
          <label htmlFor="password-confirm">Повторіть пароль:</label>
          <input onChange={handleChange} value={value.passwordConfirm} type="password"  name="passwordConfirm" />
        </div>
        
        <button disabled={value.password !== value.passwordConfirm} onClick={handleSubmit} type="submit">Зареєструватися</button>
      </form>
      </div>
    </div>
  )
}

export default withRouter(Register)
