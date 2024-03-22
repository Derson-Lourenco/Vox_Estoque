import { NavLink } from 'react-router-dom'
import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CContainer,
  CHeader,
  CHeaderToggler,
  CHeaderNav,
  CNavItem,
  CNavLink
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow )
  const headerRef = useRef()

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
   <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
     <CContainer className="border-bottom px-4" fluid>
      <CHeaderToggler  
        onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        style={{ marginInlineStart: '-14px' }}
      >
        <CIcon icon={cilMenu} size="lg" />
      </CHeaderToggler>

      <CHeaderNav className="d-none d-md-flex">
        <CNavItem>
          <CNavLink to="/dashboard" component={NavLink}>
            Dashboard
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Users</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Settings</CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav className="ms-auto">
        <CNavItem>
          <CNavLink href="#">
            <CIcon icon={cilBell} size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon icon={cilList} size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon icon={cilEnvelopeOpen} size="lg" />
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
     </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
   </CHeader>
  )
}

export default AppHeader