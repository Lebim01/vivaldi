import React from 'react'
import { Card, CardBody, ListPage } from 'temeforest'

class Pasajeros extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Pasajeros"

                                    searchable={true}
                                    searchPlaceholder="Identificación, Apellidos, Nombres"
                                    searchFields={['identificacion', 'apellidos', 'nombres']}

                                    fieldNames={['Identificación', 'Apellidos', 'Nombres']}
                                    fields={['identificacion', 'apellidos', 'nombres']}

                                    endpoint='pasajero'
                                    urlFront='facturacion/pasajeros'
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

export default Pasajeros
