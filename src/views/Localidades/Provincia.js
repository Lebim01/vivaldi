import React from 'react'
import { Card, CardBody, ListPage } from 'temeforest'

class Provincias extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Provincias"

                                    searchable={true}
                                    searchPlaceholder="Nombre"
                                    searchFields={['nombre']}

                                    fieldNames={['Nombre']}
                                    fields={['nombre']}

                                    endpoint='provincia'
                                    urlFront='localidades/provincia'
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

export default Provincias
