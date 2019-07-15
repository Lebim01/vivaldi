import React from 'react'
import { Card, CardBody, ListPage } from './../../temeforest'

class Silos extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Silos"

                                    searchable={true}
                                    searchPlaceholder="Nombre, Dirección IP"
                                    searchFields={['descripcion', 'ip']}

                                    fieldNames={['Nombre', 'Dirección IP']}
                                    fields={['descripcion', 'ip']}

                                    url='silo'

                                    menu='localidades'
                                    submenu='silos'

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

export default Silos