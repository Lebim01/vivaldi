import React from 'react'
import { ListPage, Card, CardBody, Permission } from 'temeforest'

function Andenes(props) {

    const puertasAndenes = (row) => {
        return (
            <ul>
                {row.puertas_acceso.map((p) => 
                    <li>{p}</li>
                )}
            </ul>
        )
    }

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

                                    showStatus={true}
                                    searchable={true}
                                    searchPlaceholder="Descripción"

                                    fieldNames={['Descripcion', 'Silos', 'Puertas de acceso', 'Localidad', 'Nivel']}
                                    fields={['descripcion', 'silos_nombre', puertasAndenes, 'localidad_nombre','localidad_nivel_nombre']}

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
