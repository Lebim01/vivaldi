import React from 'react';
/** LOCALIDADES */
const Localidades = React.lazy(() => import('views/Localidades/Localidades'))
const EditLocalidades = React.lazy(() => import('views/Localidades/EditLocalidades'))
const Silos = React.lazy(() => import('views/Localidades/Silos'))
const EditSilos = React.lazy(() => import('views/Localidades/EditSilos'))
const TrafficControl = React.lazy(() => import('views/Localidades/TrafficControl'))
const EditTrafficControl = React.lazy(() => import('views/Localidades/EditTrafficControl'))
const Andenes = React.lazy(() => import('views/Localidades/Andenes'))
const EditAndenes = React.lazy(() => import('views/Localidades/EditAndenes'))
const Puertas = React.lazy(() => import('views/Localidades/Puertas'))
const EditPuertas = React.lazy(() => import('views/Localidades/EditPuertas'))

/** USUARIOS */
const Usuarios = React.lazy(() => import('views/Usuarios/Usuarios'))
const EditUsuarios = React.lazy(() => import('views/Usuarios/EditUsuarios'))
const Roles = React.lazy(() => import('views/Usuarios/Roles'))
const EditRoles = React.lazy(() => import('views/Usuarios/EditRoles'))
/** COOPERTIVAS */
const Cooperativas = React.lazy(() => import('views/Cooperativas/Cooperativas'))
const EditCooperativas = React.lazy(() => import('views/Cooperativas/EditCooperativas'))
const Gremios = React.lazy(() => import('views/Cooperativas/Gremios'))
const EditGremios = React.lazy(() => import('views/Cooperativas/EditGremios'))
const Buses = React.lazy(() => import('views/Cooperativas/Buses'))
const EditBuses = React.lazy(() => import('views/Cooperativas/EditBuses'))
const DistribucionAsientos = React.lazy(() => import('views/Cooperativas/DistribucionAsientos'))
const EditDistribucionAsientos = React.lazy(() => import('views/Cooperativas/EditDistribucionAsientos'))
const Conductores = React.lazy(() => import('views/Cooperativas/Conductores'))
const EditConductores = React.lazy(() => import('views/Cooperativas/EditConductores'))
const PuntoVenta = React.lazy(() => import('views/Cooperativas/PuntoVenta'))
const EditPuntoVenta = React.lazy(() => import('views/Cooperativas/EditPuntoVenta'))
const Marcas = React.lazy(() => import('views/Cooperativas/Marcas'))
const EditMarcas = React.lazy(() => import('views/Cooperativas/EditMarcas'))
/** OPERACIONES */
const Rutas = React.lazy(() => import('views/Operaciones/Rutas'))
const EditRutas = React.lazy(() => import('views/Operaciones/EditRutas'))
const Viajes = React.lazy(() => import('views/Operaciones/Viajes'))
const ViajesPlanificados = React.lazy(() => import('views/Operaciones/ViajesPlanificados'))
const ViajesPlanificadosSilo = React.lazy(() => import('views/Operaciones/ViajesPlanificadosSilo'))
const Frecuencias = React.lazy(() => import('views/Operaciones/Frecuencias'))
const EditFrecuencias = React.lazy(() => import('views/Operaciones/EditFrecuencias'))
const CrearFrecuenciaLote = React.lazy(() => import('views/Operaciones/CrearFrecuenciaLote'))
const ConsultaTasa = React.lazy(() => import('views/Operaciones/ConsultaTasa'))

/** SOLICITUDES */
const SolicitudUsuario = React.lazy(() => import('views/Operaciones/Solicitudes/SolicitudUsuario'))
const EditSolicitudUsuario = React.lazy(() => import('views/Operaciones/Solicitudes/EditSolicitudUsuario'))
const SolicitudBuses = React.lazy(() => import('views/Operaciones/Solicitudes/SolicitudBuses'))
const EditSolicitudBus = React.lazy(() => import('views/Operaciones/Solicitudes/EditSolicitudBus'))
const SolicitudFrecuencias = React.lazy(() => import('views/Operaciones/Solicitudes/SolicitudFrecuencias'))
const EditSolicitudFrecuencia = React.lazy(() => import('views/Operaciones/Solicitudes/EditSolicitudFrecuencia'))
const SolicitudConductores = React.lazy(() => import('views/Operaciones/Solicitudes/SolicitudConductores'))
const EditSolicitudConductor = React.lazy(() => import('views/Operaciones/Solicitudes/EditSolicitudConductor'))
const SolicitudTasaContingencia = React.lazy(() => import('views/Operaciones/Solicitudes/SolicitudTasaContingencia'))
const EditSolicitudTasaContingencia = React.lazy(() => import('views/Operaciones/Solicitudes/EditSolicitudTasaContingencia'))
const CrearSolicitudTasaContingencia = React.lazy(() => import('views/Operaciones/Solicitudes/CrearSolicitudTasaContingencia'))
const SolicitudDistribucionBuses = React.lazy(() => import('views/Operaciones/Solicitudes/SolicitudDistribucionBuses'))

/** RECAUDACIONES */
const Diario = React.lazy(() => import('views/Recaudaciones/Diario'))
const Pendientes = React.lazy(() => import('views/Recaudaciones/Pendientes'))
const Consultas = React.lazy(() => import('views/Recaudaciones/Consultas'))
const TasasContingencia = React.lazy(() => import('views/Recaudaciones/TasasContingencia'))
const VentaTasas = React.lazy(() => import('views/Recaudaciones/VentaTasas'))
const BandejaTasaCooperativa = React.lazy(() => import('views/Recaudaciones/BandejaTasaCooperativa'))

/** REPORTES */
const PanelRecaudaciones = React.lazy(() => import('views/Reportes/PanelRecaudaciones'))
const ReporteClientesFrecuentes = React.lazy(() => import('views/Reportes/ReporteClientesFrecuentes'))
const ReporteTasasVendidas = React.lazy(() => import('views/Reportes/ReporteTasasVendidas'))
const ReporteTasasGeneradas = React.lazy(() => import('views/Reportes/ReporteTasasGeneradas'))
const VendidosPorCooperativa = React.lazy(() => import('views/Reportes/VendidosPorCooperativa'))
const VendidosPorTurno = React.lazy(() => import('views/Reportes/VendidosPorTurno'))
const ReporteBoletosTasas = React.lazy(() => import('views/Reportes/ReporteBoletosTasas'))
const ReporteTurnosCooperativa = React.lazy(() => import('views/Reportes/ReporteTurnosCooperativa'))
const TasasEmitidasVSUsadasCooperativa = React.lazy(() => import('views/Reportes/TasasEmitidasVSUsadasCooperativa'))
const TasasUsadasPorViaje = React.lazy(() => import('views/Reportes/TasasUsadasPorViaje'))
const Recaudacion = React.lazy(() => import('views/Reportes/Recaudacion'))
const ReporteTasasContingenciaGeneral = React.lazy(() => import('views/Reportes/ReporteTasasContingenciaGeneral'))
const ViajesBus = React.lazy(() => import('views/Reportes/ViajesBus'))
const ViajesSemanales = React.lazy(() => import('views/Reportes/ViajesSemanales'))
const CobranzaRecaudacion = React.lazy(() => import('views/Reportes/Recaudacion'))
const ViajesPorFecha = React.lazy(() => import('views/Reportes/ViajesFecha'))
const SalidaViajes = React.lazy(() => import('views/Reportes/SalidaViajes'))
const PasajerosPorViaje = React.lazy(() => import('views/Reportes/PasajerosPorViaje'))
const Kiosko = React.lazy(() => import('views/Reportes/Kiosko'))

/** FACTURACION */
const Pasajeros = React.lazy(() => import('views/Facturacion/Pasajeros'))
const EditPasajero = React.lazy(() => import('views/Facturacion/EditPasajero'))
const Documentos = React.lazy(() => import('views/Facturacion/Documentos'))

const Page404 = React.lazy(() => import('views/Pages/Page404'))
/** DEMOGRAFIA */
const Provincia = React.lazy(() => import('views/Localidades/Provincia'))
const EditProvincia = React.lazy(() => import('views/Localidades/EditProvincia'))
const Ciudad = React.lazy(() => import('views/Localidades/Ciudad'))
const EditCiudad = React.lazy(() => import('views/Localidades/EditCiudad'))

/** AUDITORIA */
const RegistroAccion = React.lazy(() => import('views/Auditoria/RegistroAccion'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: PanelRecaudaciones, exact: true  },

  { path: '/localidades/localidades', name: 'Localidades', component: Localidades, exact : true },
  { path: '/localidades/localidades/edit', name: 'Crear/Editar Localidades', component: EditLocalidades, exact : true },
  { path: '/localidades/silos', name: 'silos', component: Silos, exact : true },
  { path: '/localidades/silos/edit', name: 'crear/editar silos', component: EditSilos, exact : true },
  { path: '/localidades/andenes', name: 'andenes', component: Andenes, exact : true },
  { path: '/localidades/andenes/edit', name: 'crear/editar andenes', component: EditAndenes, exact : true },
  { path: '/localidades/puertas', name: 'puertas', component: Puertas, exact : true },
  { path: '/localidades/puertas/edit', name: 'crear/editar puertas', component: EditPuertas, exact : true },
  { path: '/localidades/traffic-control', name: 'Traffic Control', component: TrafficControl, exact : true },
  { path: '/localidades/traffic-control/edit', name: 'Crear/Eeditar Traffic Control', component: EditTrafficControl, exact : true },
  { path: '/localidades/ciudad', name: 'Ciudad', component: Ciudad, exact : true },
  { path: '/localidades/ciudad/edit', name: 'Crear/Editar Ciudad', component: EditCiudad, exact : true },
  { path: '/localidades/provincia', name: 'Provincia', component: Provincia, exact : true },
  { path: '/localidades/provincia/edit', name: 'Crear/Editar Provincia', component: EditProvincia, exact : true },


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
  { path: '/cooperativas/marcas', name: 'Marcas', component: Marcas, exact : true },
  { path: '/cooperativas/marcas/edit', name: 'Crear/Editar Marca', component: EditMarcas, exact : true },

  { path: '/operaciones/rutas', name: 'Rutas', component: Rutas, exact: true },
  { path: '/operaciones/rutas/edit', name: 'Crear/Editar Rutas', component: EditRutas, exact: true },
  { path: '/operaciones/viajes', name: 'Viajes', component: Viajes, exact: true },
  { path: '/operaciones/viajes-planificados', name: 'Viajes Planificados', component: ViajesPlanificados, exact: true },
  { path: '/operaciones/viajes-planificados-silo', name: 'Viajes Planificados Silo', component: ViajesPlanificadosSilo, exact: true },
  { path: '/operaciones/frecuencias', name: 'Frecuencias', component: Frecuencias, exact: true },
  { path: '/operaciones/frecuencias/edit', name: 'Crear/Editar Frecuencias', component: EditFrecuencias, exact: true },
  { path: '/operaciones/frecuencias-extra', name: 'Jumbotrons', component: Page404 },
  { path: '/operaciones/frecuencias-lote', name: 'Creación Masiva de Frecuencias', component: CrearFrecuenciaLote },
  { path: '/operaciones/tasas-contingencia', name: 'Tasas de contingencia', component: Page404 },
  { path: '/operaciones/consulta-tasa', name: 'Consulta tasa', component: ConsultaTasa, exact: true },

  { path: '/operaciones/solicitudes/usuario', name: 'Solicitud de Usuario', component: SolicitudUsuario, exact: true },
  { path: '/operaciones/solicitudes/usuario/edit', name: 'Crear/Edita solicitud de usuario', component: EditSolicitudUsuario, exact: true },
  { path: '/operaciones/solicitudes/buses', name: 'Solicitud de Buses', component: SolicitudBuses, exact: true },
  { path: '/operaciones/solicitudes/buses/edit', name: 'Crear/Edita Solicitud de Buses', component: EditSolicitudBus, exact: true },
  { path: '/operaciones/solicitudes/frecuencias', name: 'Solicitud de Frecuencia', component: SolicitudFrecuencias, exact: true },
  { path: '/operaciones/solicitudes/frecuencias/edit', name: 'Crear/Edita solicitud de frecuencia', component: EditSolicitudFrecuencia, exact: true },
  { path: '/operaciones/solicitudes/modificaciones-buses', name: 'Tooltips', component: SolicitudDistribucionBuses, exact: true },
  { path: '/operaciones/solicitudes/conductores', name: 'Solicutud de Conductores', component: SolicitudConductores, exact: true },
  { path: '/operaciones/solicitudes/conductores/edit', name: 'Crear/Editar Solicutud de Conductores', component: EditSolicitudConductor, exact: true },
  { path: '/operaciones/solicitudes/tasas-contingencia', name: 'Solicitud de Tasas de Contingencia', component: SolicitudTasaContingencia, exact: true },
  { path: '/operaciones/solicitudes/tasas-contingencia/edit', name: 'Crear/Editar Solicitud de Tasas de Contingencia', component: EditSolicitudTasaContingencia, exact: true },
  { path: '/operaciones/solicitudes/tasas-contingencia/add', name: 'Crear Solicitud de Tasas de Contingencia', component: CrearSolicitudTasaContingencia, exact: true },

  { path: '/facturacion/pasajeros', name: 'Pasajeros', component: Pasajeros, exact: true },
  { path: '/facturacion/pasajeros/edit', name: 'Crear/Editar Pasajero', component: EditPasajero, exact: true },
  { path: '/facturacion/documentos', name: 'Documentos', component: Documentos, exact: true },

  { path: '/reportes/panel', name: 'Panel de Recaudaciones', component: PanelRecaudaciones, exact: true },
  { path: '/reportes/tasas-contingencia-general', name: 'Reporte tasas contingencia general', component: ReporteTasasContingenciaGeneral, exact: true },
  { path: '/reportes/reporte-tasas-vendidas', name: 'Tasas vendidas', component: ReporteTasasVendidas, exact: true },
  { path: '/reportes/reporte-tasas-generadas', name: 'Tasas generadas', component: ReporteTasasGeneradas, exact: true },
  { path: '/reportes/vendidos-cooperativa', name: 'Tasas vendidas', component: VendidosPorCooperativa, exact: true },
  { path: '/reportes/clientes-frecuentes', name: 'Brand Buttons', component: ReporteClientesFrecuentes, exact: true },
  { path: '/reportes/reporte-boletos-tasas',  name: 'Reporte Boletos y tasas', component: ReporteBoletosTasas, exact: true },
  { path: '/reportes/turnos-cooperativa', name: 'Reporte Turnos cooperativa', component: ReporteTurnosCooperativa, exact: true },
  { path: '/reportes/tasas-emitidas-vs-usadas', name: 'Tasas emitidas VS Usuadas por cooperativa', component: TasasEmitidasVSUsadasCooperativa, exact: true },
  { path: '/reportes/tasas-usadas-por-viaje', name: 'Tasas usadas por viaje', component: TasasUsadasPorViaje, exact: true },
  { path: '/reportes/recaudacion', name: 'Recaudación', component: Recaudacion, exact: true },
  { path: '/reportes/ventas-por-turno', name: 'Ventas por turnos', component: VendidosPorTurno, exact: true },
  { path: '/reportes/pasajeros-por-viaje', name: 'Pasajaros por viaje', component: PasajerosPorViaje, exact: true },
  { path: '/reportes/viajes-por-bus', name: 'Viajes por bus', component: ViajesBus, exact: true },
  { path: '/reportes/viajes-por-fecha', name: 'Viajes por fecha', component: ViajesPorFecha, exact: true },
  { path: '/reportes/viajes-semanales', name: 'Viajes semanales', component: ViajesSemanales, exact: true },
  { path: '/reportes/salida-de-viajes', name: 'Salida viajes', component: SalidaViajes, exact: true },
  { path: '/reportes/viajes-por-liquidar',  name: 'Users', component: Page404 },
  { path: '/reportes/kiosko',  name: 'Kiosko', component: Kiosko, exact: true },

  { path: '/recaudaciones/tasas-contingencia', name: 'Tasas contingencia', component: TasasContingencia, exact: true },
  { path: '/recaudaciones/diario', name: 'Diario', component: Diario, exact: true },
  { path: '/recaudaciones/pendientes', name: 'Pendientes', component: Pendientes, exact: true },
  { path: '/recaudaciones/consultas', name: 'Consultas', component: Consultas, exact: true },
  { path: '/recaudaciones/venta-tasas', name: 'Tasas contingencia', component: VentaTasas, exact: true },
  { path: '/recaudaciones/bandeja-tasas-cooperativa', name: 'Bandeja tasas cooperativa', component: BandejaTasaCooperativa, exact: true },

  { path: '/auditoria/reportes-detallados', name: 'User Details', component: Page404 },
  { path: '/auditoria/registro-acciones', name: 'Registro de Acciones', component: RegistroAccion },
  { path: '/auditoria/tipo-emision-cooperativas', name: 'User Details', component: Page404 },
  { path: '/auditoria/permisos-roles', name: 'User Details', component: Page404 },
  { path: '/auditoria-sri/registro-acciones', name: 'User Details', component: Page404 },
  { path: '/auditoria-sri/totalizados', name: 'User Details', component: Page404 },
];

export default routes;
