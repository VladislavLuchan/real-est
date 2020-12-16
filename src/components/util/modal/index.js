import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

const Modal = ({ children, style, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleModalClose = () => {
    setIsOpen(false);
  }

  return ReactDOM.createPortal(
    <>
      {/* full page overlay */}
      <div 
        className="page-overlay" 
        onClick={handleModalClose} style={{ display: isOpen ? 'block' : 'none' }}
      ></div>

      {/* modal component */}
      <div 
        className={`modal ${className}`} 
        style={{ display: isOpen ? 'block' : 'none', ...style }} 
        onClick={e => e.preventDefault()} 
      >
        { children }
      </div>

    </>, document.getElementById('modal__portal'))
}

export default Modal
