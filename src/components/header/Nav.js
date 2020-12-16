import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import firebase from '../../firebase'

// @todo fix fonts inaccuracy

const Nav = () => {
  const { user } = useSelector(state => state.user)

  const handleLogOut = () => {
    firebase.logout()
  }

  return (
    <nav className="nav">
        <NavLink to="/" className="nav__logo"><h3>Logo</h3></NavLink>
        <ul className="av-menu nav__menu">
          <li className="nav__item"><a href="#">ДОСТУПНІ ЗЕМЛІ</a></li>
          <li className="nav__item"><NavLink to="/contracts">{user ? "КОНТРАКТИ" : "ПРО НАС"}</NavLink></li>
          <li className="nav__item"><NavLink to="/dashboard">{user ? "ДОДАТИ" : "АДМІНІСТРАЦІЯ"}</NavLink></li>
        </ul>
        <ul className="nav__login">
          { user == null ? 
          <>
            <li className="nav__login-button"><NavLink to="/login"><button>Увійти</button></NavLink></li>
            <li className="nav__register-button"><NavLink to="/register"><button>Зареєструватися</button></NavLink></li>
          </> : <li><button onClick={handleLogOut}>Вийти</button></li>
          }
          
        </ul>
      </nav>
  )
}

export default Nav
