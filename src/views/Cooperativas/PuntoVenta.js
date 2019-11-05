import React from 'react'
import { Card, CardBody, ListPage } from 'temeforest'

class PuntoVenta extends React.Component {

    renderCooperativas(row){
        return (
            <ul>
                {row.puntoventa_cooperativas.map((r, i) => 
                    <li key={i}>
                        {r.cooperativa_nombre}
                    </li>
                )}
            </ul>
        )
    }

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

                                    fieldNames={['Nombre', 'Cooperativa', 'Localidad']}
                                    fields={['descripcion', this.renderCooperativas, 'localidad_nombre']}

                                    endpoint='venta/puntoventa'
                                    urlFront='cooperativas/punto-venta'
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