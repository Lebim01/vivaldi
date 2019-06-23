import React from 'react'
import { ListPage, Card, CardBody } from './../../../temeforest'

class SolicitudUsuario extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Solicitud de usuario"

                                    searchable={false}

                                    fieldNames={['Cooperativa', 'Fecha', 'Descripión', 'Tipo de Solicitud']}
                                    fields={['cooperativa_nombre', 'fecha', 'descripcion', 'tipo_solicitud']}

                                    url='venta/solicitud_usuario'

                                    menu='operaciones'
                                    submenu='solicitudes/usuarios'
                                    
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

export default SolicitudUsuario