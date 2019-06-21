export default {
  items: [
    {
      name: 'Localidades',
      //icon: 'icon-map',
      children : [
        {
          name : 'Localidades',
          url : '/#/localidades/localidades'
        },
        {
          name : 'Silos',
          url : '/#/localidades/silos'
        },
        {
          name : 'Traffic Control',
          url : '/#/localidades/traffic-control'
        }
      ]
    },
    {
      name: 'Usuarios',
      //icon: 'icon-user',
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
      //icon: 'icon-home',
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
      //icon: 'icon-desktop',
      children: [
        {
          name: 'Rutas',
          url: '/#/operaciones/rutas',
          icon: 'icon-puzzle',
        },
        {
          name: 'Viajes',
          url: '/#/operaciones/viajes',
          icon: 'icon-puzzle',
        },
        {
          name: 'Viajes Planificados',
          url: '/#/operaciones/viajes-planificados',
          icon: 'icon-puzzle',
        },
        {
          name: 'Frecuencias',
          url: '/#/operaciones/frecuencias',
          icon: 'icon-puzzle',
        },
        {
          name: 'Frecuencias por lote',
          url: '/#/operaciones/frecuencias-lote',
          icon: 'icon-puzzle',
        },
        {
          name: 'Consulta Tasa',
          url: '/#/operaciones/consulta-tasa',
          icon: 'icon-puzzle',
        },
        {
          name: 'Solicitudes',
          icon: 'icon-puzzle',
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
              name : 'Choferes',
              url : '/#/operaciones/solicitudes/choferes'
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
      //icon: 'icon-calculator',
      children: [
        {
          name: 'Clientes',
          url: '/#/facturacion/clientes',
          icon: 'icon-cursor',
        },
        {
          name: 'Documentos',
          url: '/#/facturacion/documentos',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Recaudaciones',
      //icon: 'icon-wallet',
      children : [
        {
          name : 'Panel de recaudación',
          url : '/#/recaudaciones/panel'
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
      icon : '',
      children : [
        {
          name : 'Diarios',
          url : '/#/cobranza/diarios'
        },
        {
          name : 'Pendientes',
          url : '/#/cobranza/pendientes'
        },
        {
          name : 'Consultas',
          url : '/#/cobranza/consultas'
        }
      ]
    },
    {
      name : 'Auditoria',
      icon : '',
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
      icon : '',
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
    }
  ],
};
