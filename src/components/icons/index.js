import React from 'react'

const Icon = ({elProps, children}) => {
  return (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" viewBox="0 0 24 24" 
    stroke="black">
    {children}
    {elProps}
  </svg>
  )
}

export default Icon
