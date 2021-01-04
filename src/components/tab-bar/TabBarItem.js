import React from 'react'

const TabBarItem = ({ children, label, classNames, activeTab, ...attrs }) => {

  const classes = `tab-bar-item ${ activeTab === label ? 'active' : '' } ${classNames} `
  
  return (
    <div className={classes} {...attrs}>
      { children }
    </div>
  )
}

export default TabBarItem
