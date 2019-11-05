import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class Buses extends React.Component {
    render(){
        return (
            <Permission key_permission="bus" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Buses"

                                        key_permission="bus"

                                        searchable={true}
                                        searchPlaceholder="Cooperativa, Placa, Disco"

                                        fieldNames={['Cooperativa', 'Placa', 'Disco']}
                                        fields={['cooperativa_nombre', 'placa', 'disco']}

                                        endpoint='bus'
                                        urlFront='cooperativas/buses'

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

export default Buses
