import React from 'react'
import { ListPage } from './../../temeforest'

function Rutas(props) {
  return (
    <ListPage
      title="Rutas"
      searchPlaceholder="Nombre"
      fieldNames={['Nombre']}
      fields={['descripcion']}
      searchFields={['descripcion']}
      url='ruta'
      menu='operaciones'
      submenu='rutas'
      history={props.history}
    />
  )
}

export default Rutas
