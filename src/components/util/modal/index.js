import React, { useRef, useEffect } from 'react'
import './Modal.css'
import Portal from '../Portal'
import { TweenMax, Circ } from 'gsap';

const Modal = ({ children, isOpen = false, className, handleClose }) => {
  
  let overlay = useRef(null)

  useEffect(() => {
      console.log('test')
      TweenMax.from('.page-overlay', { autoAlpha: 0.4, duration: 0.5 } )
      TweenMax.from('.modal', { y: '20px', duration: 0.356, ease: Circ })
  }, [isOpen])

  return (
    <>
    { isOpen ?
      <Portal destenation="modal__portal">
        <div 
          ref={el => { overlay = el }}
          className="page-overlay" 
          onClick={handleClose}
        ></div>

        <div 
          className={`modal ${className}`} 
          onClick={e => e.preventDefault()} 
        >
          { children }
        </div>
      </Portal> : null
    }
    </>
  )
}

export default Modal
