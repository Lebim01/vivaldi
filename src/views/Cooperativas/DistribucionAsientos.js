import React from 'react'
import { Card, CardBody, ListPage } from 'temeforest'

class DistribucionAsientos extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Distribución de Asientos"

                                    searchable={true}
                                    searchPlaceholder="Nombre"

                                    fieldNames={['Nombre', 'Asientos']}
                                    fields={['nombre', 'asientos']}

                                    endpoint='busTipo'
                                    urlFront='cooperativas/distribucion-asientos'
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

export default DistribucionAsientos