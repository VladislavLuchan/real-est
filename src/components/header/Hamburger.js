import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom'
import { Squash as HamburgerIcon } from 'hamburger-react';
import { TweenMax, Expo } from 'gsap';

/* 
  @todo
    [] Add animation
*/

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector(state => state.user)


  useEffect(() => {
    if(isOpen) {
      TweenMax.fromTo('.hamburger__menu', { height: '0px'}, { height: '50vh', duration: 0.7, ease: Expo.easeOut })
    }

    // if(!isOpen ) {
    //   alert(123)
    //   TweenMax.to('.hamburger__menu', { height: '0px', duration: 0.7, ease: Expo.easeOut})
    // }

  }, [isOpen])


  const handleLogOut = () => {
    firebase.logout()
  }

  const handleClick = () => {
    TweenMax.to('.hamburger__menu', {  height: '0px', display: 'none', duration: 0.4, ease: Expo.easeOut}).then(e => {
      setIsOpen(false);
    })
  }

  return (
    <nav className="hamburger">
      <Link to="/" className="hamburger__logo">
        <h3>Logo</h3>
      </Link>
      <HamburgerIcon toggled={isOpen}  toggle={setIsOpen} className="harmburger__icon" />

      {/* hidden menu */}
      <nav style={{ display: isOpen ? 'block' : 'none' }} className="hamburger__menu">
        <ul className="hamburger__list">
          <li className="hamburger__item"><a href="#">Доступні землі</a></li>
          <li className="hamburger__item"><NavLink onClick={handleClick} to="/contracts">{user ? "Контракти" : "Про нас"}</NavLink></li>
          <li className="hamburger__item"><NavLink onClick={handleClick} to="/dashboard">{user ? "Додати договір" : "Адміністрація"}</NavLink></li>
          { user ? <li className="hamburger__item" onClick={handleLogOut}>Вийти</li> : (
            <>
              <li className="hamburger__item"><NavLink onClick={handleClick}  to="/login">Увійти</NavLink></li>
              <li className="hamburger__item"><NavLink onClick={handleClick} to="/register">Зареєструватися</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </nav>
  )
}

export default Hamburger
