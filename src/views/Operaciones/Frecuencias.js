import React from 'react'
import { ListPage, Card, CardBody } from './../../temeforest'

function Frecuencias(props) {
    return (
        <div className="animated fadeIn">
            <div className="row">
                <div className="col-sm-12">
                    <Card>
                        <CardBody>
                            <ListPage
                                title="Frecuencias"

                                searchable={true}
                                searchPlaceholder="Cooperativa, Ruta, Tipo"
                                searchFields={['cooperativa_nombre', 'ruta', 'tipo']}

                                fieldNames={['Hora', 'Cooperativa', 'Ruta', 'Tipo']}
                                fields={['hora_salida', 'cooperativa_nombre', 'ruta', 'tipo']}

                                url='frecuencia'
                                menu='operaciones'
                                submenu='frecuencias'
                                
                                history={props.history}
                            />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Frecuencias
