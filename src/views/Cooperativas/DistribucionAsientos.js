import React, { useState } from 'react'
import { Card, CardBody, CardTitle, ListPage, FormGroup, Label, Select, Permission } from 'temeforest'

function DistribucionAsientos(props) {

    const [state, setState] = useState({})

    const optionsEstado = [
        { value:'', label: 'Todos'},
        { value:'true', label: 'Activo' },
        { value:'false', label: 'Inactivo' },
    ]

    const onChange = name => (e) => {
        setState({
            [name]: e.target.value
        })
    }
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
                                                        <Select options={optionsEstado} defaultOption="Todos" onChange={onChange('status')} value={state.status} /> 
                                                    </div>
                                                </FormGroup>
                                            </div>
                                        }
                                        key_permission="bustipo"

                                        fieldNames={['Nombre', 'Capacidad']}
                                        fields={['nombre', 
                                            (row) => <span style={{textAlign:"right", position: 'relative', right:'-15%'}}>{row.capacidad}</span>
                                        ]}

                                        endpoint='busTipo'
                                        urlFront='cooperativas/distribucion-asientos'
                                        history={props.history}
                                        parameters={{
                                          type: 'list'
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

export default DistribucionAsientos
