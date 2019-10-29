import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class Localidades extends React.Component {
    render(){
        return (
            <Permission key_permission="view_localidad" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Localidades"

                                        key_permission='localidad'

                                        searchable={true}
                                        searchPlaceholder="Nombre, Ciudad"
                                        searchFields={['nombre', 'ciudad_nombre']}

                                        fieldNames={['Nombre', 'Ciudad', 'Puertas', '# Andenes']}
                                        fields={['nombre', 'ciudad_nombre', 'puertas_nombre', 'andenes_nombre']}

                                        endpoint='localidad'
                                        urlFront='localidades/localidades'
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

export default Localidades