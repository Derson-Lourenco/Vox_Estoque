import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilExitToApp,
} from '@coreui/icons';
import { CNavGroup, CNavItem } from '@coreui/react';
import 'boxicons/css/boxicons.min.css';
import './components/Sidebar.css';



const _nav = [
  {
    component: CNavItem,
    name: 'Painel',
    to: '/dashboard',
    icon: <i className="bx bx-home-alt i"></i>,
  },
  {
    name: 'Contratos',
    component: CNavGroup,
    icon: <i className="bx bx-file iconMenu"></i>,
    items: [
      {
        component: CNavItem,
        name: 'Novo Contrato',
        to: '/NovoContrato',
      },
      {
        component: CNavItem,
        name: 'Pesquisar Contrato',
        to: '/Contrato',
      },
    ],
  },
  {
    name: 'Documentos',
    component: CNavGroup,
    icon: <i className="bx bx-folder iconMenu"></i>,
    items: [
      {
        component: CNavItem,
        name: 'Documentação',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Documentação',
        to: '/buttons/buttons',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Licitações',
    icon: <i className="bx bx-folder iconMenu"></i>,
    items: [
      {
        component: CNavItem,
        name: 'Pesquisar Licitações',
        to: '/LicitacoesTCE',
      },
      {
        component: CNavItem,
        name: 'Configuração',
        to: '/Municipios',
      },
    ],
  },
];

export default _nav;
