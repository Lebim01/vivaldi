import React from 'react';

const Localidades = React.lazy(() => import('./views/Localidades/Localidades'))
const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/localidades/list', name: 'Localidades', component: Localidades },
  { path: '/localidades/sitios', name: 'Colors', component: Colors },
  { path: '/localidades/traffic-control', name: 'Typography', component: Typography },
  { path: '/usuarios/usuarios', name: 'Base', component: Cards },
  { path: '/usuarios/roles', name: 'Cards', component: Cards },
  { path: '/cooperativas/cooperativas', name: 'Forms', component: Forms },
  { path: '/cooperativas/gremios', name: 'Switches', component: Switches },
  { path: '/cooperativas/buses', name: 'Tables', component: Tables },
  { path: '/cooperativas/conductores', name: 'Tabs', component: Tabs },
  { path: '/operaciones/rutas', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/operaciones/viajes', name: 'Carousel', component: Carousels },
  { path: '/operaciones/viajes-planificados', name: 'Collapse', component: Collapses },
  { path: '/operaciones/frecuencias', name: 'Dropdowns', component: Dropdowns },
  { path: '/operaciones/frecuencias-extra', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/operaciones/frecuencias-lote', name: 'List Groups', component: ListGroups },
  { path: '/operaciones/tasas-contingencia', name: 'Navbars', component: Navbars },
  { path: '/operaciones/consulta-tasa', name: 'Navs', component: Navs },
  { path: '/operaciones/solicitudes/usuario', name: 'Paginations', component: Paginations },
  { path: '/operaciones/solicitudes/frecuencias', name: 'Popovers', component: Popovers },
  { path: '/operaciones/solicitudes/buses', name: 'Progress Bar', component: ProgressBar },
  { path: '/operaciones/solicitudes/modificaciones-buses', name: 'Tooltips', component: Tooltips },
  { path: '/operaciones/solicitudes/choferes', name: 'Buttons', component: Buttons },
  { path: '/facturacion/clientes', name: 'Buttons', component: Buttons },
  { path: '/facturacion/documentos', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/recaudaciones/panel', name: 'Button Groups', component: ButtonGroups },
  { path: '/recaudaciones/clientes-frecuentes', name: 'Brand Buttons', component: BrandButtons },
  { path: '/recaudaciones/reporte-boletos-tasas',  name: 'Icons', component: CoreUIIcons },
  { path: '/recaudaciones/turnos-cooperativa', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/recaudaciones/tasas-emitidas-vs-usadas', name: 'Flags', component: Flags },
  { path: '/recaudaciones/tasas-usadas-por-viaje', name: 'Font Awesome', component: FontAwesome },
  { path: '/recaudaciones/recaudacion', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/recaudaciones/ventas-por-turno', name: 'Notifications', component: Alerts },
  { path: '/recaudaciones/salida-de-viajes', name: 'Alerts', component: Alerts },
  { path: '/recaudaciones/pasajeros-por-viaje', name: 'Badges', component: Badges },
  { path: '/recaudaciones/viajes-por-bus', name: 'Modals', component: Modals },
  { path: '/recaudaciones/viajes-diario', name: 'Widgets', component: Widgets },
  { path: '/recaudaciones/viajes-semanales', name: 'Charts', component: Charts },
  { path: '/recaudaciones/viajes-por-liquidar',  name: 'Users', component: Users },
  { path: '/cobranza/diarios', name: 'User Details', component: User },
  { path: '/cobranza/pendientes', name: 'User Details', component: User },
  { path: '/cobranza/consultas', name: 'User Details', component: User },
  { path: '/auditoria/reportes-detallados', name: 'User Details', component: User },
  { path: '/auditoria/tipo-emision-cooperativas', name: 'User Details', component: User },
  { path: '/auditoria/permisos-roles', name: 'User Details', component: User },
  { path: '/auditoria-sri/registro-acciones', name: 'User Details', component: User },
  { path: '/auditoria-sri/totalizados', name: 'User Details', component: User },
];

export default routes;
