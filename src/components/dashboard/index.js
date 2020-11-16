import React, { useState, createRef } from 'react'
import './Dashboard.css'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import StyledDropzone from '../dropzone'
import { addFile } from '../../appSlice'

const Dashboard = () => {
  const [value, setValue] = useState({ })
  const [fileToPush, setFile] = useState([])
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  const handleDrop = (file, rejec) => {
    // console.log(file)
    setFile([ ...fileToPush, file ])
  }

  console.log(fileToPush)
  // console.log(dropzoneRef.current)

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
              <input onChange={handleChange} value={value.name} type="text" autoFocus name="name" />
            </div>
            <div className="form-input">
              <label htmlFor="adress">Адреса:</label>
              <input onChange={handleChange} value={value.adress} type="text"  name="adress" />
            </div>      
            <div className="form-input">
              <label htmlFor="phone">Телефон:</label>
              <input onChange={handleChange} value={value.phone} type="tel"  name="phone" />
            </div>
            <StyledDropzone onDrop={handleDrop} />
            <button onClick={handleSubmit} type="submit">Додати</button>
          </form>
        </div>
      )
    }
    </>
  )
}

export default Dashboard
 