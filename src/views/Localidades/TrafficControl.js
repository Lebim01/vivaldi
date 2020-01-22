import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class TrafficControl extends React.Component {
    render(){
        return(
            <Permission key_permission="trafficcontrol" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Traffic Control"

                                        key_permission="trafficcontrol"

                                        searchable={true}
                                        searchPlaceholder="Descripción, IP, Localidad"

                                        head={[['Descripción',
                                        {
                                            title:'Dirección IP', 
                                            style:{textAlign:"right", position: 'relative', right:'8%' }
                                        }, , 
                                         'Localidad']]}
                                        fields={['descripcion', 
                                        (row) => <span style={{ textAlign:"right", position: 'relative', right:'-40%'}}>{row.ip}</span>,, 
                                        'localidad_nombre']}

                                        endpoint='trafficControl'
                                        urlFront='localidades/traffic-control'
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

export default TrafficControl 
