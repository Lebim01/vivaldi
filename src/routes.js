import React from 'react';
/** LOCALIDADES */
const Localidades = React.lazy(() => import('./views/Localidades/Localidades'))
const EditLocalidades = React.lazy(() => import('./views/Localidades/EditLocalidades'))
const Silos = React.lazy(() => import('./views/Localidades/Silos'))
const EditSilos = React.lazy(() => import('./views/Localidades/EditSilos'))
const TrafficControl = React.lazy(() => import('./views/Localidades/TrafficControl'))
/** USUARIOS */
const Usuarios = React.lazy(() => import('./views/Usuarios/Usuarios'))
const EditUsuarios = React.lazy(() => import('./views/Usuarios/EditUsuarios'))
const Roles = React.lazy(() => import('./views/Usuarios/Roles'))
const EditRoles = React.lazy(() => import('./views/Usuarios/EditRoles'))
/** COOPERTIVAS */
const Cooperativas = React.lazy(() => import('./views/Cooperativas/Cooperativas'))
const EditCooperativas = React.lazy(() => import('./views/Cooperativas/EditCooperativas'))
const Gremios = React.lazy(() => import('./views/Cooperativas/Gremios'))
const EditGremios = React.lazy(() => import('./views/Cooperativas/EditGremios'))
const Buses = React.lazy(() => import('./views/Cooperativas/Buses'))
const EditBuses = React.lazy(() => import('./views/Cooperativas/EditBuses'))
const DistribucionAsientos = React.lazy(() => import('./views/Cooperativas/DistribucionAsientos'))
const EditDistribucionAsientos = React.lazy(() => import('./views/Cooperativas/EditDistribucionAsientos'))
const Conductores = React.lazy(() => import('./views/Cooperativas/Conductores'))
const EditConductores = React.lazy(() => import('./views/Cooperativas/EditConductores'))
const PuntoVenta = React.lazy(() => import('./views/Cooperativas/PuntoVenta'))
const EditPuntoVenta = React.lazy(() => import('./views/Cooperativas/EditPuntoVenta'))

const Dashboard = React.lazy(() => import('./views/Pages/Dashboard'))
const Page404 = React.lazy(() => import('./views/Pages/Page404'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Page404 },

  { path: '/localidades/localidades', name: 'Localidades', component: Localidades, exact : true },
  { path: '/localidades/localidades/edit', name: 'Crear/Editar Localidades', component: EditLocalidades, exact : true },
  { path: '/localidades/silos', name: 'Silos', component: Silos, exact : true },
  { path: '/localidades/silos/Edit', name: 'Crear/Editar Silos', component: EditSilos, exact : true },
  { path: '/localidades/traffic-control', name: 'Traffic Control', component: TrafficControl },

  { path: '/usuarios/usuarios', name: 'Usuarios', component: Usuarios, exact : true },
  { path: '/usuarios/usuarios/edit', name: 'Crear/Editar Usuarios', component: EditUsuarios, exact : true },
  { path: '/usuarios/roles', name: 'Roles', component: Roles, exact : true },
  { path: '/usuarios/roles/edit', name: 'Crear/Editar Rol', component: EditRoles, exact : true },

  { path: '/cooperativas/cooperativas', name: 'Cooperativas', component: Cooperativas, exact : true },
  { path: '/cooperativas/cooperativas/edit', name: 'Crear/Editar Cooperativas', component: EditCooperativas, exact : true },
  { path: '/cooperativas/gremios', name: 'Gremios', component: Gremios, exact : true },
  { path: '/cooperativas/gremios/edit', name: 'Crear/Editar Gremios', component: EditGremios, exact : true },
  { path: '/cooperativas/buses', name: 'Buses', component: Buses, exact : true },
  { path: '/cooperativas/buses/edit', name: 'Crear/Editar Buses', component: EditBuses, exact : true },
  { path: '/cooperativas/distribucion-asientos', name: 'Distribución Asientos', component: DistribucionAsientos, exact : true },
  { path: '/cooperativas/distribucion-asientos/edit', name: 'Crear/Editar Distribución', component: EditDistribucionAsientos, exact : true },
  { path: '/cooperativas/conductores', name: 'Conductores', component: Conductores, exact : true },
  { path: '/cooperativas/conductores/edit', name: 'Crear/Editar Conductores', component: EditConductores, exact : true },
  { path: '/cooperativas/punto-venta', name: 'Punto de Venta', component: PuntoVenta, exact : true },
  { path: '/cooperativas/punto-venta/edit', name: 'Crear/Editar Punto de Venta', component: EditPuntoVenta, exact : true },
  
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
