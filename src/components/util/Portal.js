import React from 'react'
import ReactDOM from 'react-dom'


const Portal = ({ children, destenation }) => {
  return ReactDOM.createPortal(children, document.getElementById("modal__portal"))
}

export default Portal
