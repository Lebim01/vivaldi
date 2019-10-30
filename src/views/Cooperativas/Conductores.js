import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class Conductores extends React.Component {
    render(){
        return (
            <Permission key_permission="conductor" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Conductores"

                                        key_permission="conductor"

                                        searchable={true}
                                        searchPlaceholder="Cooperativa, Nombre"
                                        searchFields={['cooperativa_nombre', 'nombre']}

                                        fieldNames={['Cooperativa', 'Nombre']}
                                        fields={['cooperativa_nombre', 'nombre']}

                                        endpoint='conductor'
                                        urlFront='cooperativas/conductores'
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

export default Conductores
