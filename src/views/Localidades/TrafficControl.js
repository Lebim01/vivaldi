import React from 'react'
import { Card, CardBody, ListPage, Permission } from 'temeforest'

class TrafficControl extends React.Component {
    render(){
        return(
            <Permission key="trafficcontrol" mode="redirect">
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
                                        searchFields={['descripcion', 'ip', 'localidad_nombre']}

                                        fieldNames={['Descripción', 'Dirección IP', 'Localidad']}
                                        fields={['descripcion', 'ip', 'localidad_nombre']}

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
