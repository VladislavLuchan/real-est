import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import firebase from '../../firebase'

const Nav = () => {
  const { user } = useSelector(state => state.user)

  const handleLogOut = () => {
    firebase.logout()
  }

  return (
    <nav className="large-nav">
        <NavLink to="/"><h3>Logo</h3></NavLink>
        <ul className="nav-ul nav-menu">
          <li><a href="#">ДОСТУПНІ ЗЕМЛІ</a></li>
          <li><a href="#">ПРО НАС</a></li>
          <li><NavLink to="/dashboard">АДМІНІСТРАЦІЯ</NavLink></li>
        </ul>
        <ul className="nav-ul nav-login">
          { user == null ? 
          <>
            <li><NavLink to="/login"><button>Увійти</button></NavLink></li>
            <li><NavLink to="/register"><button>Зареєструватися</button></NavLink></li>
          </> : <li><button onClick={handleLogOut}>Вийти</button></li>
          }
          
        </ul>
      </nav>
  )
}

export default Nav
