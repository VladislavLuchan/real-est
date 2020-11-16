import React, { useState } from 'react'
import './Dashboard.css'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';
import StyledDropzone from '../dropzone'

const Dashboard = () => {
  const [value, setValue] = useState({ })
  const { user } = useSelector(state => state.user)

  const handleChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <>
    { !user ? 
      <Redirect to='/login' /> : 
      (
        <div className="auth">
          <h1>Додати договір</h1>
          <form>
            <div className="form-input">
              <label htmlFor="name">Ім'я:</label>
              <input onChange={handleChange} value={value.name} type="text" autoFocus name="name" placeholder="example@mail.com" />
            </div>
            <div className="form-input">
              <label htmlFor="adress">Адреса:</label>
              <input onChange={handleChange} value={value.adress} type="text"  name="adress" />
            </div>      
            <div className="form-input">
              <label htmlFor="phone">Телефон:</label>
              <input onChange={handleChange} value={value.phone} type="tel"  name="phone" />
            </div>
            <StyledDropzone />
            <button onClick={handleSubmit} type="submit">Додати</button>
          </form>
        </div>
      )
    }
    </>
  )
}

export default Dashboard
