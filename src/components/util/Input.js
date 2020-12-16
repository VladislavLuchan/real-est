import React from 'react'

const Input = ({ name, touched, placeholder, autoFocus = false, error, label, onChange, value, className, type = 'text' }) => {
  return (
  <div className="input">
    <label className="input__label" htmlFor={name}>{label}</label>
    <input 
      className={`input__field ${className}`}
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
    { error ? <p className="input__error">{error}</p> : null }
  </div>
  )
}

export default Input
