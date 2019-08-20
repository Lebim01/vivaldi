import React from 'react'
import { ListPage, Card, CardBody } from 'temeforest'

function Andenes(props) {
    return (
        <div className="animated fadeIn">
            <div className="row">
                <div className="col-sm-12">
                    <Card>
                        <CardBody>
                            <ListPage
                                title="Listado de Andenes"

                                searchable={true}
                                searchPlaceholder="Descripcion, silos, puertas de acceso"

                                searchFields={['descripcion', 'silos_nombre', 'puertas_nombre', 'localidad_nombre','localidad_nivel_nombre']}
                                fieldNames={['Descripcion', 'Silos', 'Puertas de acceso', 'Localidad', 'Nivel']}
                                fields={['descripcion', 'silos_nombre', 'puertas_nombre', 'localidad_nombre','localidad_nivel_nombre']}

                                endpoint='anden'
                                urlFront='localidades/andenes'
                                history={props.history}
                            />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default Andenes
