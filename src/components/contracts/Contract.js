import React from 'react'
import moment from 'moment';

const Contract = ({ name, timestamp, fileURL, adress, phone, author, progress }) => {
  return (
    <li className="contacts-item">
      <ul className="item-list">
        <li>{name}</li>
        <li>{adress}</li>
        <li>{phone}</li>
        <li><a href={fileURL} target="_blank" download="contract">файл*</a></li>
        <li>{author}</li>
        <li>{progress}</li>
        <li>{moment(new Date(timestamp?.toDate())).fromNow()}</li>
      </ul>
    </li>
  )
}

export default Contract
