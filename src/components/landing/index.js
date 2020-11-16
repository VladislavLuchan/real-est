import React from 'react'
import './Landing.css'

const Landing = () => {
  return (
      <div className="content">
        <h1>Нерухомість</h1>
        <p>Тут ви зможете оформити та приватизувати    земельну ділянку</p>
        <div className="action-group">
          <button type="link" href="#" className="landing-btn">Каталог</button>
          <button type="link" href="#" className="landing-btn">Консультація</button>
        </div>
      </div>
  )
}

export default Landing
