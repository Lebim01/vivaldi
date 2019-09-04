export default {
  items: [
    {
      name: 'Localidades',
      icon: 'fas fa-home',
      children : [
        {
          name : 'Localidades',
          url : '/#/localidades/localidades',
        },
        {
          name : 'Puertas',
          url : '/#/localidades/puertas'
        },
        {
          name : 'Andenes',
          url : '/#/localidades/andenes'
        },
        {
          name : 'Traffic Control',
          url : '/#/localidades/traffic-control'
        },
        {
          name : 'Silos',
          url : '/#/localidades/silos'
        },
        {
          name : 'Ciudad',
          url : '/#/localidades/ciudad'
        },
        {
          name : 'Provincia',
          url : '/#/localidades/provincia'
        }
      ]
    },
    {
      name: 'Usuarios',
      icon: 'fas fa-user',
      children : [
        {
          name : 'Usuarios',
          url : '/#/usuarios/usuarios'
        },
        {
          name : 'Roles',
          url : '/#/usuarios/roles'
        }
      ]
    },
    {
      name: 'Cooperativas',
      icon: 'fas fa-bus',
      children : [
        {
          name : 'Cooperativas',
          url : '/#/cooperativas/cooperativas'
        },
        {
          name : 'Gremios',
          url : '/#/cooperativas/gremios'
        },
        {
          name : 'Marcas',
          url : '/#/cooperativas/marcas'
        },
        {
          name : 'Buses',
          url : '/#/cooperativas/buses'
        },
        {
          name : 'Distribución de Asientos',
          url : '/#/cooperativas/distribucion-asientos'
        },
        {
          name : 'Conductores',
          url : '/#/cooperativas/conductores'
        },
        {
          name : 'Punto de Venta',
          url : '/#/cooperativas/punto-venta'
        }
      ]
    },
    {
      name: 'Operaciones',
      icon: 'fas fa-cog',
      children: [
        {
          name: 'Rutas',
          url: '/#/operaciones/rutas'
        },
        {
          name: 'Viajes',
          url: '/#/operaciones/viajes'
        },
        {
          name: 'Viajes Planificados',
          url: '/#/operaciones/viajes-planificados'
        },
        {
          name: 'Viajes Planificados Silo',
          url: '/#/operaciones/viajes-planificados-silo'
        },
        {
          name: 'Frecuencias',
          url: '/#/operaciones/frecuencias'
        },
        {
          name: 'Frecuencias por lote',
          url: '/#/operaciones/frecuencias-lote',
        },
        {
          name: 'Consulta Tasa',
          url: '/#/operaciones/consulta-tasa',
        },
        {
          name: 'Solicitudes',
          children : [
            {
              name : 'Usuario',
              url : '/#/operaciones/solicitudes/usuario'
            },
            {
              name : 'Frecuencias',
              url : '/#/operaciones/solicitudes/frecuencias'
            },
            {
              name : 'Buses',
              url : '/#/operaciones/solicitudes/buses'
            },
            {
              name : 'Modificación de buses',
              url : '/#/operaciones/solicitudes/modificaciones-buses'
            },
            {
              name : 'Conductores',
              url : '/#/operaciones/solicitudes/conductores'
            },
            {
              name : 'Tasas de contigencia',
              url : '/#/operaciones/solicitudes/tasas-contingencia'
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
          name: 'Pasajeros',
          url: '/#/facturacion/pasajeros'
        },
        {
          name: 'Documentos',
          url: '/#/facturacion/documentos'
        },
      ],
    },
    {
      name: 'Recaudaciones',
      icon: 'fas fa-dollar-sign',
      children : [
        {
          name : 'Diarios',
          url : '/#/recaudaciones/diario'
        },
        {
          name : 'Pendientes',
          url : '/#/recaudaciones/pendientes'
        },
        {
          name : 'Consultas',
          url : '/#/recaudaciones/consultas'
        },
        {
          name : 'Tasas contingencia',
          url : '/#/recaudaciones/tasas-contingencia'
        }
      ]
    },
    {
      name : 'Reportes',
      icon : 'fas fa-chart-area',
      children : [
        {
          name : 'Panel de recaudación',
          url : '/#/reportes/panel'
        },
        {
          name : 'Reporte Tasas Generadas',
          url : '/#/reportes/reporte-tasas-generadas'
        },
        {
          name : 'Vendidos por cooperativa',
          url : '/#/reportes/vendidos-cooperativa'
        },
        {
          name : 'Reporte de clientes frecuentes',
          url : '/#/reportes/clientes-frecuentes'
        },
        {
          name : 'Reporte boletos y tasas',
          url : '/#/reportes/reporte-boletos-tasas'
        },
        {
          name : 'Tasas emitidas vs usadas',
          url : '/#/reportes/tasas-emitidas-vs-usadas'
        },
        {
          name : 'Tasas usadas por viaje',
          url : '/#/reportes/tasas-usadas-por-viaje'
        },
        {
          name : 'Ventas por cooperativa',
          url : '/#/reportes/ventas-por-cooperartiva'
        },
        {
          name : 'Salida de viajes',
          url : '/#/reportes/salida-de-viajes'
        },
        {
          name : 'Pasajeros por viaje',
          url : '/#/reportes/pasajeros-por-viaje'
        },
        {
          name : 'Viajes por bus',
          url : '/#/reportes/viajes-por-bus'
        },
        {
          name : 'Viajes por fecha',
          url : '/#/reportes/viajes-por-fecha'
        },
        {
          name : 'Logs Auditoria',
          url : '/#/reportes/logs-auditoria'
        },
      ]
    },
    {
      name : 'Auditoria',
      icon : 'fas fa-eye',
      children : [
        {
          name : 'Reportes Detallados',
          url : '/#/auditoria/reportes-detallados'
        },
        {
          name : 'Tipo Emisión Cooperativas',
          url : '/#/auditoria/tipo-emision-cooperativas'
        },
        {
          name : 'Permisos Roles',
          url : '/#/auditoria/permisos-roles'
        }
      ]
    },
    {
      name : 'Auditoria SRI',
      icon : 'fas fa-eye',
      children : [
        {
          name : 'Registro Acciones',
          url : '/#/auditoria-sri/registro-acciones'
        },
        {
          name : 'Totalizados',
          url : '/#/auditoria-sri/totalizados'
        }
      ]
    },
  ],
};
