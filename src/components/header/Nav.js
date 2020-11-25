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
    <nav className="large-nav">
        <NavLink to="/" className="logo"><h3>Logo</h3></NavLink>
        <ul className="nav-ul nav-menu">
          <li><a href="#">ДОСТУПНІ ЗЕМЛІ</a></li>
          <li><NavLink to="/contracts">{user ? "КОНТРАКТИ" : "ПРО НАС"}</NavLink></li>
          <li><NavLink to="/dashboard">{user ? "ДОДАТИ" : "АДМІНІСТРАЦІЯ"}</NavLink></li>
        </ul>
        <ul className="nav-ul nav-login">
          { user == null ? 
          <>
            <li className="nav-login-button"><NavLink to="/login"><button>Увійти</button></NavLink></li>
            <li className="nav-register-button"><NavLink to="/register"><button>Зареєструватися</button></NavLink></li>
          </> : <li><button onClick={handleLogOut}>Вийти</button></li>
          }
          
        </ul>
      </nav>
  )
}

export default Nav
