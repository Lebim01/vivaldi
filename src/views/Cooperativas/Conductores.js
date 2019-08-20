import React from 'react'
import { Card, CardBody, ListPage } from 'temeforest'

class Conductores extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Conductores"

                                    searchable={true}
                                    searchPlaceholder="Cooperativa, Apellidos, Nombres"
                                    searchFields={['cooperativa_nombre', 'apellidos', 'nombres']}

                                    fieldNames={['Cooperativa', 'Apellidos', 'Nombres']}
                                    fields={['cooperativa_nombre', 'apellidos', 'nombres']}

                                    endpoint='conductor'
                                    urlFront='cooperativas/conductores'
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

export default Conductores
