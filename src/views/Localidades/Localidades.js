import React from 'react'
import { Card, CardBody, ListPage } from 'temeforest'

class Localidades extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Localidades"

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
        )
    }
}

export default Localidades