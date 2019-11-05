import React from 'react'
import { ListPage, Card, CardBody, Permission } from 'temeforest'

function Andenes(props) {
    return (
        <Permission key_permission="view_anden" mode="redirect">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Andenes"

                                    key_permission="anden"

                                    searchable={true}
                                    searchPlaceholder="Descripción"

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
        </Permission>
    )
}
export default Andenes
