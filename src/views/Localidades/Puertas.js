import React from 'react'
import { Card, CardBody, ListPage } from './../../temeforest'

class Puertas extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Puertas"

                                    searchable={true}
                                    searchPlaceholder="Nombre, Localidad, Nivel"
                                    searchFields={['numero', 'localidad_nivel_nombre', 'localidad_nombre' ]}

                                    fieldNames={['Nombre', 'Localidad','Nivel']}
                                    fields={['numero', 'localidad_nivel_nombre', 'localidad_nombre']}

                                    url='puerta'

                                    menu='localidades'
                                    submenu='puertas'

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

export default Puertas
