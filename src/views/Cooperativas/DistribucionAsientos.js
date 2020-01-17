import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class DistribucionAsientos extends React.Component {
    render(){
        return (
            <Permission key_permission="view_bustipo" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Distribución de Asientos"

                                        showStatus={true}
                                        searchable={true}
                                        searchPlaceholder="Nombre"

                                        fieldNames={['Nombre', 'Capacidad']}
                                        fields={['nombre', 
                                        (row) => <span style={{textAlign:"right", position: 'relative', right:'-15%'}}>{row.capacidad}</span>
                                        ]}

                                        endpoint='busTipo'
                                        urlFront='cooperativas/distribucion-asientos'
                                        history={this.props.history}
                                        parameters={{
                                          type: 'list'
                                        }}
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

export default DistribucionAsientos
