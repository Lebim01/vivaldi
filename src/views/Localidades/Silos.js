import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class Silos extends React.Component {
    render(){
        return (
            <Permission key_permission="view_silo" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Silos"

                                        key_permission="silo"

                                        searchable={true}
                                        searchPlaceholder="Nombre, Dirección IP, localidad"

                                        head={[['Nombre', 
                                        {
                                            title:'Dirección IP', 
                                            style:{textAlign:"right", position: 'relative', right:'5%' }
                                        }, 
                                        'Localidad']]}
                                        fields={['nombre', 
                                        (row) => <span style={{ textAlign:"right", position: 'relative', right:'-45%'}}>{row.ip}</span>,
                                        'localidad_nombre']}

                                        endpoint='silo'
                                        urlFront='localidades/silos'
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

export default Silos
