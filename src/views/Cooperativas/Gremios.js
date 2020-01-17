import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class Gremios extends React.Component {
    render(){
        return (
            <Permission key_permission="view_gremio" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Gremios"

                                        key_permission="gremio"

                                        showStatus={true}
                                        searchable={true}
                                        searchPlaceholder="Nombre, Descripcion"

                                        fieldNames={['Nombre', 'Descripción']}
                                        fields={['nombre', 'descripcion']}

                                        endpoint='gremio'
                                        urlFront='cooperativas/gremios'
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

export default Gremios
