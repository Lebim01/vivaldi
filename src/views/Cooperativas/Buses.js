import React from 'react'
import { Card, CardBody, ListPage } from 'temeforest'

class Buses extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Buses"

                                    searchable={true}
                                    searchPlaceholder="Cooperativa, Placa, Disco"
                                    searchFields={['cooperativa_nombre', 'placa', 'numero']}

                                    fieldNames={['Cooperativa', 'Placa', 'Disco']}
                                    fields={['cooperativa_nombre', 'placa', 'numero']}

                                    endpoint='bus'
                                    urlFront='cooperativas/buses'

                                    history={this.props.history}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Buses
