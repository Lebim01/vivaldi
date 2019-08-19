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
                                    searchFields={['nombre']}

                                    fieldNames={['Nombre', 'Asientos']}
                                    fields={['nombre', 'asientos']}

                                    url='busTipo'

                                    menu='cooperativas'
                                    submenu='distribucion-asientos'

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