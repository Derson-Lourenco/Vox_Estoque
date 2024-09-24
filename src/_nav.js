import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilDescription,
  cilFindInPage,
  cilPlus,
  cilGlobeAlt,
  cilExitToApp  // Importa o ícone de saída
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import 'boxicons/css/boxicons.min.css'; // Certifique-se de que o CSS foi importado
import './components/Sidebar.css';




const _nav = [
  {
    component: CNavItem,
    name: 'Painel',
    to: '/dashboard',
    icon: <i className="bx bx-home-alt icon"></i>, // Corrigido
  },
  {
    name: 'Contratos',
    component: CNavGroup,
    to: '/Contrato',
    icon: <i className="bx bx-home-alt icon"></i>,
    // icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Novo Contrato',
        // icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/NovoContrato',
      },
      {
        component: CNavItem,
        name: 'Pesquisar Contrato',
        // icon: <CIcon icon={cilFindInPage} customClassName="nav-icon" />,
        to: '/Contrato',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Documentos',
    to: '/buttons',
    icon: <i className="bx bx-home-alt icon"></i>,
    // icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Documentação',
        // icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
        to: '/buttons/buttons',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Licitações',
    icon: <i className="bx bx-home-alt icon"></i>,
    // icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Pesquisar Licitações',
        // icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" />,
        to: '/LicitacoesTCE',
      },
    ],
  },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },

  // Adicionar o botão de sair no final
  // {
  //   component: CNavItem,
  //   name: 'Sair',
  //   to: '/logout', // Define a rota para logout ou ação
  //   icon: <CIcon icon={cilExitToApp} customClassName="nav-icon" />,
  // },
]

export default _nav
