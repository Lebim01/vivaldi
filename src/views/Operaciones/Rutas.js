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
                                searchPlaceholder="Nombre"
                                searchFields={['descripcion']}
                                fieldNames={['Nombre']}
                                fields={['descripcion']}
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
