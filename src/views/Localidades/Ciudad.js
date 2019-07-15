import React from 'react'
import { Card, CardBody, ListPage } from './../../temeforest'

class Ciudades extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Ciudades"

                                    searchable={true}
                                    searchPlaceholder="Nombre, Provincia"
                                    searchFields={['nombre', 'provincia_nombre']}

                                    fieldNames={['Nombre', 'Provincia']}
                                    fields={['nombre', 'provincia_nombre']}

                                    url='ciudad'

                                    menu='localidades'
                                    submenu='ciudades'

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

export default Ciudades