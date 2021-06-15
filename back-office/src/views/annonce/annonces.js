import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'
import axios from 'axios'


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Annonces = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [annonce,setAnnonce] = useState([]);
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/annonces?page=${newPage}`)
  }

  useEffect(() => {
    axios.get('http://localhost:5000/annonce/recupererannonce')
      .then(res => {
          console.log(res.data);
          setAnnonce(res.data);
          console.log(annonce)
      })
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>
          annonces
            <small className="text-muted"> example</small>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={annonce}
            fields={[
              { key: 'name', _classes: 'font-weight-bold' },'title','text','categorie','zone'
              
            ]}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/annonce/${item._id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Annonces
