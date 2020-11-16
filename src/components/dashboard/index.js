import React, { useState, createRef } from 'react'
import './Dashboard.css'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import StyledDropzone from '../dropzone'
// import { addFile } from '../../appSlice'
import firebase, { timestamp  } from '../../firebase'

const Dashboard = () => {
  const [value, setValue] = useState({ })
  const [fileToPush, setFile] = useState([])
  const { user } = useSelector(state => state.user)
  // const dispatch = useDispatch()

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

  console.log(fileToPush)
  // console.log(dropzoneRef.current)

  return (
    <>
    { !user ? 
      <Redirect to='/login' /> : 
      (
        <div className="auth">
          <h1>Додати договір</h1>
          <div className="form-container">
              <form>
            <div className="form-input">
              <label htmlFor="name">Ім'я:</label>
              <input onChange={handleChange} value={value.name} type="text" autoFocus name="name" placeholder="ПІБ" />
            </div>
            <div className="form-input">
              <label htmlFor="adress">Адреса:</label>
              <input onChange={handleChange} value={value.adress} type="text"  name="adress" placeholder="вул. Леніна" />
            </div>      
            <div className="form-input">
              <label htmlFor="phone">Телефон:</label>
              <input onChange={handleChange} value={value.phone} type="tel"  name="phone" placeholder="тел." />
            </div>
            <StyledDropzone multiple={false} onDrop={handleDrop} />
            <span className="file-size">{ fileToPush.length ? `${fileToPush[0][0].name} - ${formatBytes(fileToPush[0][0].size)}` : null }</span>
            <button onClick={handleSubmit} type="submit">Додати</button>
          </form>
          </div>
        </div>
      )
    }
    </>
  )
}

export default Dashboard
 