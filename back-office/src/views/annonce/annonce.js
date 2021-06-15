import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const Annonce = ({match}) => {
    const history = useHistory();
    const [annonces,setAnnonces]=useState([]);
    axios.get('http://localhost:5000/annonce/recupererannonce')
    .then(res => {
        console.log(res.data);
        setAnnonces(res.data);
        console.log(annonce)
    })
  const annonce = annonces.find( user => user._id.toString() === match.params.id)
  const annoncedetails = annonce ? Object.entries(annonce) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
    const handledelete= ()=> {
        axios.delete(`http://localhost:5000/annonce/deleteannonce/${match.params.id}`)
        .then(res => console.log(res.data))
        history.push('/annonces')
    }
  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            annonce id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    annoncedetails.map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <button onClick={()=> handledelete()}>delete</button>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Annonce
