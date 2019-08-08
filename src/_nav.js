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
    // {
    //   name: 'Facturación',
    //   icon: 'fas fa-file-alt',
    //   children: [
    //     {
    //       name: 'Clientes',
    //       url: '/#/facturacion/clientes'
    //     },
    //     {
    //       name: 'Documentos',
    //       url: '/#/facturacion/documentos'
    //     },
    //   ],
    // },
    {
      name: 'Recaudaciones',
      icon: 'fas fa-dollar-sign',
      children : [
        {
          name : 'Tasas contingencia',
          url : '/#/recaudaciones/tasas-contingencia'
        },
        {
          name : 'Venta de tasas',
          url : '/#/recaudaciones/venta-tasas'
        },
        {
          name : 'Reporte Tasas Vendidas',
          url : '/#/recaudaciones/reporte-tasas-vendidas'
        },
        {
          name : 'Reporte Tasas Contingencia General',
          url : '/#/recaudaciones/tasas-contingencia-general'
        },
        {
          name : 'Reporte Tasas Generadas',
          url : '/#/recaudaciones/reporte-tasas-generadas'
        },
        {
          name : 'Panel de recaudación',
          url : '/#/recaudaciones/panel'
        },
        {
          name : 'Vendidos por cooperativa',
          url : '/#/recaudaciones/vendidos-cooperativa'
        },
        {
          name : 'Reporte de clientes frecuentes',
          url : '/#/recaudaciones/clientes-frecuentes'
        },
        {
          name : 'Reporte boletos y tasas',
          url : '/#/recaudaciones/reporte-boletos-tasas'
        },
        {
          name : 'Turnos por cooperativa',
          url : '/#/recaudaciones/turnos-cooperativa'
        },
        {
          name : 'Tasas emitidas vs usadas',
          url : '/#/recaudaciones/tasas-emitidas-vs-usadas'
        },
        {
          name : 'Tasas usadas por viaje',
          url : '/#/recaudaciones/tasas-usadas-por-viaje'
        },
        {
          name : 'Recaudación',
          url : '/#/recaudaciones/recaudacion'
        },
        {
          name : 'Ventas por turno',
          url : '/#/recaudaciones/ventas-por-turno'
        },
        {
          name : 'Salida de viajes',
          url : '/#/recaudaciones/salida-de-viajes'
        },
        {
          name : 'Pasajeros por viaje',
          url : '/#/recaudaciones/pasajeros-por-viaje'
        },
        {
          name : 'Viajes por bus',
          url : '/#/recaudaciones/viajes-por-bus'
        },
        {
          name : 'Viajes diario',
          url : '/#/recaudaciones/viajes-diario'
        },
        {
          name : 'Viajes semanales',
          url : '/#/recaudaciones/viajes-semanales'
        },
        {
          name : 'Viajes por liquidar',
          url : '/#/recaudaciones/viajes-por-liquidar'
        }
      ]
    },
    {
      name : 'Cobranza',
      icon : 'far fa-money-bill-alt',
      children : [
        {
          name : 'Recaudacion',
          url : '/#/cobranza/recaudacion'
        },
        {
          name : 'Diarios',
          url : '/#/cobranza/diario'
        },
        /*{
          name : 'Pendientes',
          url : '/#/cobranza/pendientes'
        },*/
        {
          name : 'Consultas',
          url : '/#/cobranza/consultas'
        }
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
          name : 'Registro de Acciones',
          url : '/#/auditoria/registro-acciones'
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
