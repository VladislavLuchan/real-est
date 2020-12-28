import React from 'react'

const TableEl = ({ onTrClick, number, name, timestamp, fileUrl, adress, phone, author, progress }) => {
  return (
    <tr className="table__item" onClick={e => onTrClick(e)}>
      <td datalabel="№ договору" className="table__item-number">{number}</td>
      <td datalabel="Ім'я">{name}</td>
      <td datalabel="Адресса">{adress}</td>
      <td datalabel="Телефон">{phone}</td>
      <td datalabel="Автор">{author}</td>
      <td datalabel="Етап роботи">
        {
          progress == "started" ? "❌" : progress == "finished" ? "✔" : 
          "🗑"
        }
      </td>
      <td datalabel="Файл договору" onClick={e => e.stopPropagation()}><a href={fileUrl} target="_blank" download="contract">📄</a></td>
      <td datalabel="Дата внесення">{timestamp}</td>
    </tr>
  )
}

export default TableEl