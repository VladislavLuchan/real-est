import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import Contract from './Contract'
import './Contracts.css'

const Contracts = () => {

  const [contracts, setContracts] = useState([])

  useEffect(() => {
    firebase.db.collection('contracts')
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        setContracts(snapshot.docs.map(doc => doc.data()))
      })
  }, [])

    console.log(contracts);
  return (
    <div className="contracts-container">
      <div className="contracts">
        <ul>
          { contracts.length ? contracts.map((contract, i) => (
            <Contract 
              key={i}  
              name={contract.name} 
              timestamp={contract.timestamp}
              author={contract.author}
              adress={contract.adress}
              phone={contract.phone}
              fileURL={contract.fileUrl}  
              progress={contract.progress} 
            />
          )): null }
        </ul>
      </div>
    </div>
  )
}

export default Contracts
