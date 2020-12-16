import React, { useState, useEffect } from 'react'
import './Login.css'
import { withRouter, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import firebase from '../../firebase'
import { selectUser, login, logout } from '../../userSlice'


const Login = ({ history }) => {
  const [value, setValue] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
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
      history.replace('/dashboard')
    } catch (err) {
      setError("Невірна адресса або пароль")
    }
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
      <form className="form login">

            <h2 className="form__headline">Вхід</h2>

            <div className="form-input input">
              <label className="input__label" htmlFor="email">Електронна адреса:</label>
              <input className="input__field" onChange={handleChange} value={value.email} type="email" autoFocus name="email" placeholder="exampleee@mail.com" />
            </div>
            <div className="form-input input">
              <label className="input__label" htmlFor="password">Пароль:</label>
              <input className="input__field" onChange={handleChange} value={value.password} type="password"  name="password" />
            </div>
            <div className="form__actions">
              <button className="form__submit" onClick={handleSubmit} type="submit">Вхід</button>
              <p className="form__error">{error}</p>
              <NavLink to="/register" className="form__new-account">Досі не зареєстровані?</NavLink>
            </div>
    </form>
    </div>
  )
}

export default withRouter(Login)
