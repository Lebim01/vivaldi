import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class Silos extends React.Component {
    render(){
        return (
            <Permission key="view_silo" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Silos"

                                        key_permission="silo"

                                        searchable={true}
                                        searchPlaceholder="Nombre, Dirección IP, localidad"
                                        searchFields={['descripcion', 'ip', 'localidad']}

                                        fieldNames={['Nombre', 'Dirección IP', 'Localidad']}
                                        fields={['descripcion', 'ip', 'localidad_nombre']}

                                        endpoint='silo'
                                        urlFront='localidades/silos'
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

export default Silos
