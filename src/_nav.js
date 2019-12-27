export default {
  items: [
    {
      name: 'Localidades',
      icon: 'fas fa-home',
      children : [
        {
          name : 'Localidades',
          url : '/#/localidades/localidades',
          permission : 'view_localidad'
        },
        {
          name : 'Puertas',
          url : '/#/localidades/puertas',
          permission : 'view_puerta'
        },
        {
          name : 'Andenes',
          url : '/#/localidades/andenes',
          permission : 'view_anden'
        },
        {
          name : 'Traffic Control',
          url : '/#/localidades/traffic-control',
          permission : 'view_trafficcontrol'
        },
        {
          name : 'Silos',
          url : '/#/localidades/silos',
          permission : 'view_silo'
        },
        {
          name : 'Ciudad',
          url : '/#/localidades/ciudad',
          permission : 'view_ciudad'
        },
        {
          name : 'Provincia',
          url : '/#/localidades/provincia',
          permission : 'view_provincia'
        }
      ]
    },
    {
      name: 'Usuarios',
      icon: 'fas fa-user',
      children : [
        {
          name : 'Usuarios',
          url : '/#/usuarios/usuarios',
          permission : 'view_usuariocooperativa'
        },
        {
          name : 'Roles',
          url : '/#/usuarios/roles',
          permission : 'view_group'
        }
      ]
    },
    {
      name: 'Cooperativas',
      icon: 'fas fa-bus',
      children : [
        {
          name : 'Cooperativas',
          url : '/#/cooperativas/cooperativas',
          permission : 'view_cooperativa'
        },
        {
          name : 'Gremios',
          url : '/#/cooperativas/gremios',
          permission : 'view_gremio'
        },
        {
          name : 'Marcas',
          url : '/#/cooperativas/marcas',
          permission : 'view_marca'
        },
        {
          name : 'Buses',
          url : '/#/cooperativas/buses',
          permission : 'view_bus'
        },
        {
          name : 'Distribución de Asientos',
          url : '/#/cooperativas/distribucion-asientos',
          permission : 'view_bustipo'
        },
        {
          name : 'Conductores',
          url : '/#/cooperativas/conductores',
          permission : 'view_conductor'
        },
        {
          name : 'Punto de Venta',
          url : '/#/cooperativas/punto-venta',
          permission : 'view_puntoventa'
        }
      ]
    },
    {
      name: 'Operaciones',
      icon: 'fas fa-cog',
      children: [
        {
          name: 'Rutas',
          url: '/#/operaciones/rutas',
          permission : 'view_ruta'
        },
        {
          name: 'Viajes',
          url: '/#/operaciones/viajes',
          permission : 'view_viaje'
        },
        {
          name: 'Viajes Planificados',
          url: '/#/operaciones/viajes-planificados',
          permission : 'view_viajes_planificados'
        },
        {
          name: 'Viajes Planificados Silo',
          url: '/#/operaciones/viajes-planificados-silo',
          permission : 'view_viajes_planificados_silo'
        },
        {
          name: 'Frecuencias',
          url: '/#/operaciones/frecuencias',
          permission : 'view_frecuencia'
        },
        {
          name: 'Frecuencias por lote',
          url: '/#/operaciones/frecuencias-lote',
          permission : 'view_frecuencia'
        },
        /*{
          name: 'Consulta Tasa',
          url: '/#/operaciones/consulta-tasa',
        },*/
        {
          name: 'Solicitudes',
          children : [
            {
              name : 'Usuario',
              url : '/#/operaciones/solicitudes/usuario',
              permission : 'view_solicitudusuario'
            },
            {
              name : 'Frecuencias',
              url : '/#/operaciones/solicitudes/frecuencias',
              permission : 'view_solicitudfrecuencia'
            },
            {
              name : 'Buses',
              url : '/#/operaciones/solicitudes/buses',
              permission : 'view_solicitudbus'
            },
           /* {
              name : 'Modificación de buses',
              url : '/#/operaciones/solicitudes/modificaciones-buses',
              permission : 'view_solicitudbus'
            },*/
            {
              name : 'Conductores',
              url : '/#/operaciones/solicitudes/conductores',
              permission : 'view_solicitudconductor'
            },
            {
              name : 'Tasas de contigencia',
              url : '/#/operaciones/solicitudes/tasas-contingencia',
              permission : 'view_solicitudtasacontingencia'
            },
          ]
        },
      ],
    },
    {
      name: 'Facturación',
      icon: 'fas fa-file-alt',
      children: [
        {
          name: 'Personas',
          url: '/#/facturacion/personas',
          permission : 'view_persona'
        },
        {
          name: 'Documentos',
          url: '/#/facturacion/documentos',
          permission : 'view_detalleventa'
        },
      ],
    },
    {
      name: 'Recaudaciones',
      icon: 'fas fa-dollar-sign',
      children : [
        {
          name : 'Diarios',
          url : '/#/recaudaciones/diario',
          permission : 'view_cobros_diarios'
        },
        {
          name : 'Tasas contingencia general',
          url : '/#/recaudaciones/tasas-contingencia',
          permission : 'view_generacioncontingencia'
        },
        {
          name : 'Venta de Tasas',
          url : '/#/recaudaciones/venta-tasas',
          permission : 'view_ventacontingencia'
        },
        {
          name : 'Bandeja Tasas Cooperativa',
          url : '/#/recaudaciones/bandeja-tasas-cooperativa',
          permission : 'view_solicitudes_aprobadas'
        }, 
        {
          name : 'Reporte de tasas normales',
          url : '/#/recaudaciones/reporte-tasas-normales',
          permission : 'view_reporte_tasas_normales'
        }
      ]
    },
    {
      name : 'Reportes',
      icon : 'fas fa-chart-area',
      children : [
        {
          name : 'Panel de recaudación',
          url : '/#/reportes/panel',
          permission : 'view_panel_recaudacion'
        },
        {
          name : 'Clientes frecuentes',
          url : '/#/reportes/clientes-frecuentes',
          permission : 'view_clientes_frecuentes'
        },
        {
          name : 'Tasas Generadas y vendidas',
          url : '/#/reportes/tasas-contingencia-general',
          permission : 'view_reporte_contigencia_general'
        },
        /*{
          name : 'Vendidos por cooperativa',
          url : '/#/reportes/vendidos-cooperativa'
        },*/
        {
          name : 'Boletos y tasas',
          url : '/#/reportes/reporte-boletos-tasas',
          permission : 'view_boletos_tasas'
        },
        {
          name : 'Tasas emitidas vs usadas por cooperativa',
          url : '/#/reportes/tasas-emitidas-vs-usadas',
          permission : 'view_tasas_emitidas_usadas'
        },
        {
          name : 'Tasas usadas por viaje',
          url : '/#/reportes/tasas-usadas-por-viaje',
          permission : 'view_tasas_viaje'
        },
        {
          name : 'Salida de viajes',
          url : '/#/reportes/salida-de-viajes',
          permission : 'view_salida_viajes'
        },
        /*{
          name : 'Pasajeros por viaje',
          url : '/#/reportes/pasajeros-por-viaje'
        },*/
        {
          name : 'Viajes por bus',
          url : '/#/reportes/viajes-por-bus',
          permission : 'view_viajes_bus'
        },
        {
          name : 'Viajes por fecha',
          url : '/#/reportes/viajes-por-fecha',
          permission : 'view_viajes_fecha'
        },
        {
          name : 'Kiosko',
          url : '/#/kiosko',
          permission : 'view_kiosko'
        }
      ]
    },
    {
      name : 'Auditoria',
      icon : 'fas fa-eye',
      children : [
        {
          name: 'Registro Acciones',
          url: '/#/auditoria/registro-acciones',
          permission : 'view_auditoria'
        },
        /*{
          name : 'Reportes Detallados',
          url : '/#/auditoria/reportes-detallados'
        },*/
        {
          name : 'Tipo Emisión Cooperativas',
          url : '/#/auditoria/tipo-emision-cooperativas',
          permission : 'view_auditoria'
        },
        /*{
          name : 'Permisos Roles',
          url : '/#/auditoria/permisos-roles'
        }*/
      ]
    },
    {
      name : 'Auditoria SRI',
      icon : 'fas fa-eye',
      children : [
        /*{
          name : 'Totalizados',
          url : '/#/auditoria-sri/totalizados'
        }*/
      ]
    },
  ],
};
