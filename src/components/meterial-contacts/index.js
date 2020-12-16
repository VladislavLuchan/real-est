import React, { useEffect, useState, useMemo } from 'react'
import Modal from '../util/modal'
import moment from 'moment'
import Loader from '../util/loader'
import 'moment/locale/uk'
import firebase from '../../firebase'
import './contract.css'
import ContracsModal from './ContracsModal'
// import SortAscIcon from '../icons/SortAscIcon'
// import SortDescIcon from '../icons/SortDescIcon'
// import Loader from '../util/loader'

/* @todo 
  [] loader
  [] sorting
  [] search
  [] modal
  [] better progress column
  [x] make table responsive
  [] replace contracts with this element
*/

const MatContracts = () => {

  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)
  
  // set language for momentjs
  useMemo(() => moment.locale('uk'), [moment])

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
          setLoading(false)
        })
      })

      
  }, [])

  return (
    <>
    <div className="contracts-wrapper">
      <div className="contracts-table">
      {
      !loading ?
      
      <table className="table">
        <thead className="table__head">
          <tr>
            {/* <th><SortAscIcon /> №</th> */}
            <th>№</th>
            <th>ім'я</th>
            <th>адресса</th>
            <th>телефон</th>
            <th>автор</th>
            <th>завершено</th>
            <th>файл</th>
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
                <td datalabel="Етап роботи">
                  {
                    contract.progress == "started" ? "❌" : contract.progress == "finished" ? "✔" : 
                    "🗑"
                  }
                </td>
                <td datalabel="Файл договору"><a href={contract.fileUrl} target="_blank"      download="contract">📄</a></td>
                <td datalabel="Дата внесення">{contract.timestamp}</td>
              </tr>
          )): null }
        </tbody>
      </table> : <Loader />
      }
    </div>
    </div>
    <ContracsModal />
    </>
  )
}

export default MatContracts
