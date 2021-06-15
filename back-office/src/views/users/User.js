import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import usersData from './UsersData'
import { useHistory } from 'react-router-dom'
import axios from 'axios';

const User = ({match}) => {
  const history = useHistory();
  const [userss,setuserss] = useState([]);
  const token = localStorage.getItem('token');

  axios.get('http://localhost:5000/users/',{ headers: {
      "x-auth-token" : token
    }}).then( res => 
      {
        console.log(res.data)
        setuserss(res.data)
      })
  const user = userss.find( user => user._id.toString() === match.params.id)
  const userDetails = user ? Object.entries(user) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    userDetails.map(([key, value], index) => {
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
