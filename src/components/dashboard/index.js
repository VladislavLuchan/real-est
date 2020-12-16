import React, { useState } from 'react'
import './Dashboard.css'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';
import StyledDropzone from '../dropzone'
import firebase, { timestamp } from '../../firebase'
import Input from '../util/Input'

const Dashboard = () => {
  const [value, setValue] = useState({ })
  const [fileToPush, setFile] = useState([])
  const { user } = useSelector(state => state.user)

  const handleChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // create document
    const storageRef = firebase.storage.ref()
    const fireRef = storageRef.child(`contracts/${fileToPush[0][0].name}`)
    await fireRef.put(fileToPush[0][0])
    console.log(`${fileToPush[0][0].name} uploaded`)
    const url = await fireRef.getDownloadURL()

    // create doc in firestore
    firebase.db.collection('contracts').doc(`${value.name}, ${value.adress}`).set({ 
        timestamp: timestamp(),
        name:  value.name,
        adress: value.adress,
        phone: value.phone,
        fileUrl: url,
        progress: 'started',
        author: user.displayName
      })

      // clear inputs
      setValue({ name: '', phone: '', adress: '' })
      setFile([])
    }

  const handleDrop = (file, rejec) => {
    setFile([ ...fileToPush, file ])
  }

  // format file size function
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

  return (
    <>
    { !user ? 
      <Redirect to='/login' /> : 
      (
        <div className="auth">
          <div className="auth-container">
          <form className="form dashboard">
            
            <h4 className="form__headline">Додати договір</h4>

            <Input 
              name="name" 
              autoFocus 
              label="Ім'я:" 
              placeholder="ПІБ" 
              value={value.name} 
              onChange={handleChange} 
            />

            <Input 
              name="adress" 
              label="Адреса:" 
              placeholder="прикл. вул. Велніна" 
              value={value.adress}
              onChange={handleChange} 
            />

            <Input
              type="tel"
              name="phone" 
              label="Телефон:"
              value={value.phone}
              onChange={handleChange} 
            /> 

            <div className="form__actions">
              <StyledDropzone multiple={false} onDrop={handleDrop} />
              <span className="form__file-size">{ fileToPush.length ? `${fileToPush[0][0].name} - ${formatBytes(fileToPush[0][0].size)}` : null }</span>
              <button className="form__submit" onClick={handleSubmit} type="submit">Додати</button>
            </div>
            
          </form>
          </div>
        </div>
      )
    }
    </>
  )
}

export default Dashboard
 