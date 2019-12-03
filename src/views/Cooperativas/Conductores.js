import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class Conductores extends React.Component {
    render(){
        return (
            <Permission key_permission="view_conductor" mode="redirect">
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
