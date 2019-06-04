import React from 'react';
/** LOCALIDADES */
const Localidades = React.lazy(() => import('./views/Localidades/Localidades'))
const Silos = React.lazy(() => import('./views/Localidades/Silos'))
const TrafficControl = React.lazy(() => import('./views/Localidades/TrafficControl'))
/** USUARIOS */
const Usuarios = React.lazy(() => import('./views/Usuarios/Usuarios'))
const Roles = React.lazy(() => import('./views/Usuarios/Roles'))

const Dashboard = React.lazy(() => import('./views/Pages/Dashboard'))
const Page404 = React.lazy(() => import('./views/Pages/Page404'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Page404 },

  { path: '/localidades/list', name: 'Localidades', component: Localidades },
  { path: '/localidades/silos', name: 'Silos', component: Silos },
  { path: '/localidades/traffic-control', name: 'Traffic Control', component: TrafficControl },

  { path: '/usuarios/usuarios', name: 'Base', component: Usuarios },
  { path: '/usuarios/roles', name: 'Cards', component: Roles },
  { path: '/cooperativas/cooperativas', name: 'Forms', component: Page404 },
  { path: '/cooperativas/gremios', name: 'Switches', component: Page404 },
  { path: '/cooperativas/buses', name: 'Tables', component: Page404 },
  { path: '/cooperativas/conductores', name: 'Tabs', component: Page404 },
  { path: '/operaciones/rutas', name: 'Breadcrumbs', component: Page404 },
  { path: '/operaciones/viajes', name: 'Carousel', component: Page404 },
  { path: '/operaciones/viajes-planificados', name: 'Collapse', component: Page404 },
  { path: '/operaciones/frecuencias', name: 'Dropdowns', component: Page404 },
  { path: '/operaciones/frecuencias-extra', name: 'Jumbotrons', component: Page404 },
  { path: '/operaciones/frecuencias-lote', name: 'List Groups', component: Page404 },
  { path: '/operaciones/tasas-contingencia', name: 'Navbars', component: Page404 },
  { path: '/operaciones/consulta-tasa', name: 'Navs', component: Page404 },
  { path: '/operaciones/solicitudes/usuario', name: 'Paginations', component: Page404 },
  { path: '/operaciones/solicitudes/frecuencias', name: 'Popovers', component: Page404 },
  { path: '/operaciones/solicitudes/buses', name: 'Progress Bar', component: Page404 },
  { path: '/operaciones/solicitudes/modificaciones-buses', name: 'Tooltips', component: Page404 },
  { path: '/operaciones/solicitudes/choferes', name: 'Buttons', component: Page404 },
  { path: '/facturacion/clientes', name: 'Buttons', component: Page404 },
  { path: '/facturacion/documentos', name: 'Button Dropdowns', component: Page404 },
  { path: '/recaudaciones/panel', name: 'Button Groups', component: Page404 },
  { path: '/recaudaciones/clientes-frecuentes', name: 'Brand Buttons', component: Page404 },
  { path: '/recaudaciones/reporte-boletos-tasas',  name: 'Icons', component: Page404 },
  { path: '/recaudaciones/turnos-cooperativa', name: 'CoreUI Icons', component: Page404 },
  { path: '/recaudaciones/tasas-emitidas-vs-usadas', name: 'Flags', component: Page404 },
  { path: '/recaudaciones/tasas-usadas-por-viaje', name: 'Font Awesome', component: Page404 },
  { path: '/recaudaciones/recaudacion', name: 'Simple Line Icons', component: Page404 },
  { path: '/recaudaciones/ventas-por-turno', name: 'Notifications', component: Page404 },
  { path: '/recaudaciones/salida-de-viajes', name: 'Alerts', component: Page404 },
  { path: '/recaudaciones/pasajeros-por-viaje', name: 'Badges', component: Page404 },
  { path: '/recaudaciones/viajes-por-bus', name: 'Modals', component: Page404 },
  { path: '/recaudaciones/viajes-diario', name: 'Widgets', component: Page404 },
  { path: '/recaudaciones/viajes-semanales', name: 'Charts', component: Page404 },
  { path: '/recaudaciones/viajes-por-liquidar',  name: 'Users', component: Page404 },
  { path: '/cobranza/diarios', name: 'User Details', component: Page404 },
  { path: '/cobranza/pendientes', name: 'User Details', component: Page404 },
  { path: '/cobranza/consultas', name: 'User Details', component: Page404 },
  { path: '/auditoria/reportes-detallados', name: 'User Details', component: Page404 },
  { path: '/auditoria/tipo-emision-cooperativas', name: 'User Details', component: Page404 },
  { path: '/auditoria/permisos-roles', name: 'User Details', component: Page404 },
  { path: '/auditoria-sri/registro-acciones', name: 'User Details', component: Page404 },
  { path: '/auditoria-sri/totalizados', name: 'User Details', component: Page404 },
];

export default routes;
