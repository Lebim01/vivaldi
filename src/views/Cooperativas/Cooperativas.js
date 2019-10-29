import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class Cooperativas extends React.Component {
    render(){
        return (
            <Permission key_permission="cooperativa" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Cooperativas"

                                        key_permission="cooperativa"

                                        searchable={true}
                                        searchPlaceholder="Nombre, Gremio"
                                        searchFields={['nombre', 'gremio_nombre']}

                                        fieldNames={['Nombre', 'Gremio']}
                                        fields={['nombre', 'gremio_nombre']}

                                        endpoint='cooperativa'
                                        urlFront='cooperativas/cooperativas'
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

export default Cooperativas