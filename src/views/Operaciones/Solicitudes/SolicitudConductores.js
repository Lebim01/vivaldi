import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Button } from './../../../temeforest'

class SolicitudConductores extends React.Component {
    state = {}

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    onRowDoubleClick = () => {
        this.props.history.push('/operaciones/solicitudes/conductores/edit')
    }

    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    Listado de Solicitud de conductores
                                    <Button style={{'float': 'right'}} onClick={this.onRowDoubleClick.bind(this)}>
                                        <i className="fa fa-plus"></i>
                                    </Button>
                                </CardTitle>
                                <br />
                                <ListPage
                                    searchable={false}

                                    fieldNames={['Cooperativa', 'Fecha', 'Descripión', 'Tipo de Solicitud']}
                                    fields={['cooperativa_nombre', 'fecha', 'descripcion', 'tipo_solicitud']}

                                    url='venta/solicitud_conductor'

                                    menu='operaciones'
                                    submenu='solicitudes/conductores'
                                    parameters={this.state}
                                    
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

export default SolicitudConductores