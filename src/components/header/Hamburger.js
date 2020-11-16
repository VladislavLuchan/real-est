import React from 'react'
import hamSvg from '../../img/menu.svg'

const Hamburger = () => {
  return (
    <nav className="ham-nav">
        <h3>Logo</h3>
        <img className="hamburger" src={hamSvg} alt="menu" />
    </nav>
  )
}

export default Hamburger
