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
          name: 'Personas',
          url: '/#/facturacion/personas'
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
          name : 'Tasas contingencia general',
          url : '/#/recaudaciones/tasas-contingencia'
        },
        {
          name : 'Venta de Tasas',
          url : '/#/recaudaciones/venta-tasas'
        },
        {
          name : 'Bandeja Tasas Cooperativa',
          url : '/#/recaudaciones/bandeja-tasas-cooperativa'
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
          name : 'Clientes frecuentes',
          url : '/#/reportes/clientes-frecuentes'
        },
        {
          name : 'Tasas Generadas y vendidas',
          url : '/#/reportes/tasas-contingencia-general'
        },
        /*{
          name : 'Vendidos por cooperativa',
          url : '/#/reportes/vendidos-cooperativa'
        },*/
        {
          name : 'Boletos y tasas',
          url : '/#/reportes/reporte-boletos-tasas'
        },
        {
          name : 'Tasas emitidas vs usadas por cooperativa',
          url : '/#/reportes/tasas-emitidas-vs-usadas'
        },
        {
          name : 'Tasas usadas por viaje',
          url : '/#/reportes/tasas-usadas-por-viaje'
        },
        {
          name : 'Salida de viajes',
          url : '/#/reportes/salida-de-viajes'
        },
        /*{
          name : 'Pasajeros por viaje',
          url : '/#/reportes/pasajeros-por-viaje'
        },*/
        {
          name : 'Viajes por bus',
          url : '/#/reportes/viajes-por-bus'
        },
        {
          name : 'Viajes por fecha',
          url : '/#/reportes/viajes-por-fecha'
        },
        {
          name : 'Kiosko',
          url : '/#/kiosko'
        }
      ]
    },
    {
      name : 'Auditoria',
      icon : 'fas fa-eye',
      children : [
        {
          name: 'Registro Acciones',
          url: '/#/auditoria/registro-acciones'
        },
        /*{
          name : 'Reportes Detallados',
          url : '/#/auditoria/reportes-detallados'
        },*/
        {
          name : 'Tipo Emisión Cooperativas',
          url : '/#/auditoria/tipo-emision-cooperativas'
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
