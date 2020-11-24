import React from 'react'

const TableEl = ({ number, name, timestamp, fileURL, adress, phone, author, progress }) => {
  return (
    <tr className="table__item">
        <td className="table__item-number">{number}</td>
        <td>{name}</td>
        <td>{adress}</td>
        <td>{phone}</td>
        <td>{author}</td>
        <td>{progress}</td>
        {/* <td><a href={fileURL} target="_blank" download="contract"><img className="table__file-image" src={fileIcon} alt="файл*"/></a></td> */}
        <td><a href={fileURL} target="_blank" download="contract">📄</a></td>
        <td>{timestamp}</td>
    </tr>
  )
}

export default TableEl
