import React from 'react'
import { Card, CardBody, ListPage } from './../../temeforest'

class Cooperativas extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Cooperativas"

                                    searchable={true}
                                    searchPlaceholder="Nombre, Gremio"
                                    searchFields={['nombre', 'gremio_nombre']}

                                    fieldNames={['Nombre', 'Gremio']}
                                    fields={['nombre', 'gremio_nombre']}

                                    url='cooperativa'

                                    menu='cooperativas'
                                    submenu='cooperativas'

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

export default Cooperativas