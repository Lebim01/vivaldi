import React from 'react'
import { Card, CardBody, ListPage } from 'temeforest'

class Usuarios extends React.Component {

    render(){
        return(
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Usuarios"

                                    searchable={true}
                                    searchPlaceholder="Usuario, Nombre, Cooperativa"
                                    searchFields={['username', 'first_name', 'last_name']}

                                    fieldNames={['Usuario', 'Apellidos', 'Nombres', 'Cooperativas']}
                                    fields={['username', 'last_name', 'first_name', (row) => 
                                        <ul>
                                            { row.roles_cooperativa.map((r, i) => 
                                                <li key={i}>{r.cooperativa_nombre}</li>
                                            )}
                                        </ul>
                                    ]}

                                    endpoint='usuario'
                                    urlFront='usuarios/usuarios'
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

export default Usuarios