import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class Puertas extends React.Component {
    render(){
        return (
            <Permission key="view_puerta" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Puertas"

                                        key_permission='puerta'

                                        searchable={true}
                                        searchPlaceholder="Nombre, Localidad, Nivel"
                                        searchFields={['nombre', 'localidad_nivel_nombre', 'localidad_nombre' ]}

                                        fieldNames={['Nombre', 'Localidad','Nivel']}
                                        fields={['nombre', 'localidad_nivel_nombre', 'localidad_nombre']}

                                        endpoint='puerta'
                                        urlFront='localidades/puertas'
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

export default Puertas
