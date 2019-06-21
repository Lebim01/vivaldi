import React from 'react'
import { ListPage, Card, CardBody } from './../../temeforest'

function Rutas(props) {
    return (
        <div className="animated fadeIn">
            <div className="row">
                <div className="col-sm-12">
                    <Card>
                        <CardBody>
                            <ListPage
                                title="Rutas"
                                searchable={true}
                                searchPlaceholder="Cooperativa, Ruta, Destino"
                                searchFields={['cooperativa_nombre', 'via', 'ciudad_destino_nombre']}

                                fieldNames={['Cooperativa', 'Ruta', 'Destino']}
                                fields={['cooperativa_nombre', 'via', 'ciudad_destino_nombre']}
                                
                                url='ruta'
                                menu='operaciones'
                                submenu='rutas'
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