import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../firebase'
import { selectUser, login, logout } from '../../userSlice'


const Login = ({ history }) => {
  const [value, setValue] = useState({ email: "", password: "" })
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

   useEffect(() => {
    if(user) {
      history.replace('/dashboard')
    }

    firebase.auth.onAuthStateChanged(authUser => {
      console.log(authUser)
      if(authUser) {
        // the user is logged in 
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))

      } else {
        // the user is logged out
        dispatch(logout())
      }
    })
  }, [dispatch, user])


  const firebaseLogin = async () => {
    try {
      await firebase.login(value.email, value.password)
    } catch (error) {
      alert(error.message)
    }
    history.replace('/dashboard')
  }

  const handleSubmit = e => {
    e.preventDefault()
    firebaseLogin()
  }

  const handleChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  

  return (
    <div className="auth">
      <h1>Вхід</h1>
      <form>
        <div className="form-input">
          <label htmlFor="email">Електронна адреса:</label>
          <input onChange={handleChange} value={value.email} type="email" autoFocus name="email" placeholder="exampleee@mail.com" />
        </div>
        <div className="form-input">
          <label htmlFor="password">Пароль:</label>
          <input onChange={handleChange} value={value.password} type="password"  name="password" />
        </div>        
        <button onClick={handleSubmit} type="submit">Зареєструватися</button>
      </form>
    </div>
  )
}

export default withRouter(Login)
