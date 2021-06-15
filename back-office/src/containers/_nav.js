import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Annonces',
    to: '/annonces',
    icon: <CIcon name="cil-align-left" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/users',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  }
]

export default _nav
