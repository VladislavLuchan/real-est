import React, { useEffect, useState, useMemo } from 'react'
import moment from 'moment'
import Loader from '../util/loader'
import firebase from '../../firebase'
import ContracsModal from './ContracsModal'
import TableEl from './TableEl'
import 'moment/locale/uk'
import './contract.css'
import { TweenMax, Circ } from 'gsap';

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContract, setModalContract] = useState({})
  
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

      // table animation
  }, [])

  useEffect(() => {
    if(loading === false) {
      TweenMax.from('table', { y: '100px', autoAlpha: 0, duration: 0.7, ease: Circ })
    }
  }, [loading])

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleOpen = (contact) => {
    setModalContract(contact)
    setIsModalOpen(true)
  }

  return (
    <>
    <div className="contracts-wrapper">
      <div className="contracts-table">
      {
      !loading ?
      
      <table className="table">
        <thead className="table__head">
          <tr>
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
              <TableEl
                onTrClick={() => handleOpen({ ...contract, number: i + 1})}
                adress={contract.adress}
                author={contract.author}
                name={contract.name}
                progress={contract.progress}
                phone={contract.phone}
                fileUrl={contract.fileUrl}
                timestamp={contract.timestamp}
                number={i + 1}
                key={i} 
              />
          )): null }
        </tbody>
      </table> : <Loader />
      }
    </div>
    </div>
    <ContracsModal className="contract-modal" modalContract={modalContract} isOpen={isModalOpen} handleClose={handleClose} />
    </>
  )
}

export default MatContracts
