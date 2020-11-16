import React from 'react'

const Contract = ({ name, timestamp, fileURL, adress, phone, author, progress }) => {
  return (
    <li className="contacts-item">
      <ul className="item-list">
        <li>{name}</li>
        <li>{adress}</li>
        <li>{phone}</li>
        <li><a href={fileURL} target="_blank" download="contract">fileURL</a></li>
        <li>{author}</li>
        <li>{progress}</li>
        <li>{new Date(timestamp?.toDate()).toUTCString()}</li>
      </ul>
    </li>
  )
}

export default Contract
