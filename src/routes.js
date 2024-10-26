import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Contrato = React.lazy(() => import('./views/Contrato/Contrato'));
const NovoContrato = React.lazy(() => import('./views/NovoContrato/NovoContrato'));
const detalheContrato = React.lazy(() => import('./views/Contrato/detalheContrato'));
const LicitacoesTCE = React.lazy(() => import('./views/Licitacoes/LicitacoesTCE'));
const Municipios = React.lazy(() => import('./components/Municipios'));

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Contrato', name: 'Contratos', element: Contrato },
  { path: '/NovoContrato', name: 'Novo Contrato', element: NovoContrato },
  { path: '/detalheContrato/:id', name: 'Detalhe de Contrato', element: detalheContrato },
  { path: '/LicitacoesTCE', name: 'Licitações TCE-PI', element: LicitacoesTCE },
  { path: '/Municipios', name: 'Municípios', element: Municipios },
];

export default routes;
