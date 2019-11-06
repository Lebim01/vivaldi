import React from 'react'
import { ListPage, Card, CardBody } from 'temeforest'

function Rutas(props) {
    return (
        <div className="animated fadeIn">
            <div className="row">
                <div className="col-sm-12">
                    <Card>
                        <CardBody>
                            <ListPage
                                title="Listado de Rutas"

                                searchable={true}
                                searchPlaceholder="Ciudad, Vía"

                                fieldNames={['Cooperativa', 'Destino', 'Vía']}
                                fields={['cooperativa_nombre', 'ciudad_destino_nombre', 'via']}

                                endpoint='ruta'
                                urlFront='operaciones/rutas'
                                history={props.history}
                            />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default Rutas
