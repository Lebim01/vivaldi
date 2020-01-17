import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class Ciudades extends React.Component {
    render(){
        return (
            <Permission key_permission="view_ciudad" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Ciudades"

                                        key_permission="ciudad"

                                        showStatus={true}
                                        searchable={true}
                                        searchPlaceholder="Nombre, Provincia"

                                        fieldNames={['Nombre', 'Provincia']}
                                        fields={['nombre', 'provincia_nombre']}

                                        endpoint='ciudad'
                                        urlFront='localidades/ciudad'
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

export default Ciudades
