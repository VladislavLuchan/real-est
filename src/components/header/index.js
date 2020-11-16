import React from 'react'
import './Header.css'
import { useWindowSize } from '../../hooks/useWindowSize'
import Hamburger from './Hamburger'
import Nav from './Nav'

const Header = () => {
  const [width, height] = useWindowSize()
  return (
    <header>
      { width > 1000 ? <Nav /> : <Hamburger /> }
    </header>
  )
}

export default Header
