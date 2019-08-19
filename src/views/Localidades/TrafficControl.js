import React from 'react'
import { Card, CardBody, ListPage } from 'temeforest'

class TrafficControl extends React.Component {
    render(){
        return(
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Traffic Control"

                                    searchable={true}
                                    searchPlaceholder="Descripción, IP, Localidad"
                                    searchFields={['descripcion', 'ip', 'localidad_nombre']}

                                    fieldNames={['Descripción', 'Dirección IP', 'Localidad']}
                                    fields={['descripcion', 'ip', 'localidad_nombre']}

                                    url='trafficControl'

                                    menu='localidades'
                                    submenu='traffic-control'

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

export default TrafficControl 
