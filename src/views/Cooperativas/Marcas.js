import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class Provincias extends React.Component {
    render(){
        return (
            <Permission>
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Marcas"

                                        searchable={true}
                                        searchPlaceholder="Nombre"

                                        fieldNames={['Nombre']}
                                        fields={['nombre']}

                                        endpoint='marca'
                                        urlFront='cooperativas/marcas'
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

export default Provincias
