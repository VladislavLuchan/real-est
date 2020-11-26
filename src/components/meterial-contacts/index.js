import React, { useEffect, useState } from 'react'
import moment from 'moment';
import firebase from '../../firebase'
import './contract.css'
// import SortAscIcon from '../icons/SortAscIcon'
// import SortDescIcon from '../icons/SortDescIcon'
// import Loader from '../util/loader'

/* @todo 
  [] loader
  [] sorting
  [] search
  [] modal
  [] better progress column
  [] make table responsive
  [] replace contracts with this element
*/

const MatContracts = () => {

  const [contracts, setContracts] = useState([])
  
  // fetch contracts from db
  useEffect(() => {
    firebase.db.collection('contracts')
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        snapshot.docs.map((doc, i) => {
          // format data
          const tempDoc = doc.data()
          setContracts(prevContracts => {
            return [ ...prevContracts, { ...tempDoc, id: i, timestamp: moment(new Date(tempDoc.timestamp?.toDate())).fromNow() } ]
          })
        })
      })
  }, [])


  return (
    <div className="contracts-wrapper">
      <div className="contracts-table">
      <table className="table">
        <thead className="table__head">
          <tr>
            {/* <th><SortAscIcon /> №</th> */}
            <th>№</th>
            <th>ім'я</th>
            <th>адресса</th>
            <th>телефон</th>
            <th>автор</th>
            <th>етап роботи</th>
            <th>файл договору</th>
            <th>внесено</th>
          </tr>
        </thead>
        <tbody className="table__body">
            { contracts.length ? contracts.map((contract, i) => (
                <tr className="table__item" key={i}>
                <td datalabel="№ договору" className="table__item-number">{i + 1}</td>
                <td datalabel="Ім'я">{contract.name}</td>
                <td datalabel="Адресса">{contract.adress}</td>
                <td datalabel="Телефон">{contract.phone}</td>
                <td datalabel="Автор">{contract.author}</td>
                <td datalabel="Етап роботи">{contract.progress}</td>
                <td datalabel="Файл договору"><a href={contract.fileUrl} target="_blank" download="contract">📄</a></td>
                <td datalabel="Дата внесення">{contract.timestamp}</td>
            </tr>
          )): null }
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default MatContracts
