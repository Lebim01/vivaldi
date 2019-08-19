import React from 'react'
import { Card, CardBody, ListPage } from 'temeforest'

class Gremios extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Gremios"

                                    searchable={true}
                                    searchPlaceholder="Nombre, Descripcion"
                                    searchFields={['nombre', 'descripcion']}

                                    fieldNames={['Nombre', 'Descripción']}
                                    fields={['nombre', 'descripcion']}

                                    url='gremio'

                                    menu='cooperativas'
                                    submenu='gremios'

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

export default Gremios
