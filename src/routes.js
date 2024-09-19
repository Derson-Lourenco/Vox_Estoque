import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));

// Contrato
const Contrato = React.lazy(() => import('./views/Contrato/Contrato'));
const NovoContrato = React.lazy(() => import('./views/NovoContrato/NovoContrato'));

// Documentos
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));

// Licitações
const LicitacoesTCE = React.lazy(() => import('./views/Licitacoes/LicitacoesTCE'));

const Charts = React.lazy(() => import('./views/charts/Charts'));

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'));

const Widgets = React.lazy(() => import('./views/widgets/Widgets'));

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Contrato', name: 'Contrato', element: Contrato },
  { path: '/NovoContrato', name: 'NovoContrato', element: NovoContrato },
  { path: '/theme', name: 'Theme', element: Colors },
  { path: '/LicitacoesTCE', name: 'LicitacoesTCE', element: LicitacoesTCE },
  // Outras rotas podem ser adicionadas aqui
];

export default routes;
