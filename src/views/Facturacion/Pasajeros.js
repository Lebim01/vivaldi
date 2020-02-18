import React from 'react'
import { Card, CardBody, ListPage, Button } from 'temeforest'

class Pasajeros extends React.Component {

    buscar = () => {
        this.setState({
            refresh: true
        })
    }
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Personas"

                                    searchable={true}
                                    searchPlaceholder="Identificación, Nombre"


                                    fieldNames={['Identificación', 'Nombre']}
                                    fields={['identificacion', 'nombre']}

                                    endpoint='persona'
                                    urlFront='facturacion/personas'
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

export default Pasajeros
