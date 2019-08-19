import React from 'react'
import { Card, CardBody, ListPage } from 'temeforest'

class PuntoVenta extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Punto de venta"

                                    searchable={true}
                                    searchPlaceholder="Descripción, Cooperativa, Localidad"
                                    searchFields={['descripcion', '', 'localidad_nombre']}

                                    fieldNames={['Nombre', 'Cooperativa', 'Localidad']}
                                    fields={['descripcion', (row) => <ul>{row.puntoventa_cooperativas.map((r) => <li>{r.cooperativa_nombre}</li>)}</ul>, 'localidad_nombre']}

                                    url='venta/puntoventa'

                                    menu='cooperativas'
                                    submenu='punto-venta'

                                    history={this.props.history}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default PuntoVenta