import React from 'react'

const TabBarNav = ({ navLabel, className, onChangeActiveTab }) => { 
  return (
    <button
      className={`nav-item ${className}`}
      onClick={() => { onChangeActiveTab(navLabel) }}
      >
        {navLabel}
    </button>
  )
}

export default TabBarNav
