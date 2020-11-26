import React, { useState } from 'react'
import firebase from '../../firebase'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Squash as HamburgerIcon } from 'hamburger-react';

/* 
  @todo
    [] Add animation
*/

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector(state => state.user)

  const handleLogOut = () => {
    firebase.logout()
  }

  return (
    <nav className="hamburger">
      <NavLink to="/" className="hamburger__logo">
        <h3>Logo</h3>
      </NavLink>
      <HamburgerIcon onToggle={() => setIsOpen(prevIsOpen => !prevIsOpen)} className="harmburger__icon" />

      {/* hidden menu */}
      <nav style={{ display: isOpen ? 'block' : 'none' }} className="hamburger__menu">
        <ul className="hamburger__list">
          <li className="hamburger__item"><a href="#">Доступні землі</a></li>
          <li className="hamburger__item"><NavLink to="/contracts">{user ? "Контракти" : "Про нас"}</NavLink></li>
          <li className="hamburger__item"><NavLink to="/dashboard">{user ? "Додати договір" : "Адміністрація"}</NavLink></li>
          { user ? <li className="hamburger__item" onClick={handleLogOut}>Вийти</li> : (
            <>
              <li className="hamburger__item"><NavLink to="/login">Увійти</NavLink></li>
              <li className="hamburger__item"><NavLink to="/register">Зареєструватися</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </nav>
  )
}

export default Hamburger
