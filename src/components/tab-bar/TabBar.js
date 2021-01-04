import React, { useState, useEffect } from 'react'

const TabBar = ({ children, className, vertical, ...attrs }) => {
  const [activeTab, setActiveTab] = useState(null)

  useEffect(() => {

  }, [])

  const getChildrenLables = (children) => {
    return children.map({props})
  }

  return (
    <div className={` ${className}`} {...attrs}>
      
    </div>
  )
}

export default TabBar
