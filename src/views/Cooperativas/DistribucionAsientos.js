import React, { useState } from 'react'
import { Card, CardBody, CardTitle, ListPage, FormGroup, Label, Select, Permission } from 'temeforest'

class DistribucionAsientos extends React.Component {

    state = {
        status: 'true'
    }

    optionsEstado = [
        { value:'', label: 'Todos'},
        { value:'true', label: 'Activo' },
        { value:'false', label: 'Inactivo' },
    ]

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    render(){
        return (
            <Permission key_permission="view_bustipo" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Distribución de Asientos"

                                        showStatus={true}
                                        searchable={true}
                                        searchPlaceholder="Nombre"

                                        filtersZone = {
                                            <div className="col-sm-4">
                                                <FormGroup className="row">
                                                    <Label className="col-sm-5">Estado</Label>
                                                    <div className="col-sm-7">
                                                        <Select options={this.optionsEstado} defaultOption="Todos" onChange={this.onChange('status')} value={this.state.status} /> 
                                                    </div>
                                                </FormGroup>
                                            </div>
                                        }
                                        key_permission="bustipo"

                                        fieldNames={['Nombre', 'Capacidad']}
                                        fields={['nombre', 
                                            (row) => <span style={{textAlign:"right", position: 'relative', right:'-25%'}}>{row.capacidad}</span>
                                        ]}

                                        endpoint='busTipo'
                                        urlFront='cooperativas/distribucion-asientos'
                                        history={this.props.history}
                                        parameters={{
                                            ...this.state,
                                           
                                          }}
                            
                                        filters={{
                                            persist: true,
                                            callback: (parameters) => {
                                                this.setState(parameters)
                                            }
                                        }}
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

export default DistribucionAsientos
