import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class PuntoVenta extends React.Component {

    renderCooperativas(row){
        return (
            <>
                { !row.externo &&
                    <ul>
                        {row.puntoventa_cooperativas.map((r, i) => 
                            <li key={i}>
                                {r.cooperativa_nombre}
                            </li>
                        )}
                    </ul>
                }
                { row.externo &&
                    row.cooperativa_nombre
                }
            </>
        )
    }

    render(){
        return (
            <Permission key_permission="view_puntoventa" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Punto de venta"

                                        key_permission="puntoventa"
                                        
                                        searchable={true}
                                        searchPlaceholder="Descripción, Cooperativa, Localidad"

                                        fieldNames={['Nombre', 'Cooperativa', 'Localidad']}
                                        fields={['descripcion', this.renderCooperativas /*'cooperativa_nombre'*/, 'localidad_nombre']}

                                        endpoint='venta/puntoventa'
                                        urlFront='cooperativas/punto-venta'
                                        history={this.props.history}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </Permission>
        )
    }
}

export default PuntoVenta