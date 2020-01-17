import React, { useState } from 'react'
import { Card, CardBody, ListPage, Permission, Select, Label, FormGroup } from 'temeforest'


function Gremios(props) {

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
            <Permission key_permission="view_gremio" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Gremios"

                                        key_permission="gremio"

                                        filtersZone={

                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-5">Estado</Label>
                                                        <div className="col-sm-7">
                                                            <Select options={optionsEstado} defaultOption="Todos" onChange={onChange('status')} value={state.status} /> 
                                                        </div>
                                                    </FormGroup>
                                                </div>
                                            </div>
                                        }

                                        showStatus={true}
                                        searchable={true}
                                        searchPlaceholder="Nombre, Descripcion"

                                        fieldNames={['Nombre', 'Descripción']}
                                        fields={['nombre', 'descripcion']}

                                        endpoint='gremio'
                                        urlFront='cooperativas/gremios'
                                        history={props.history}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </Permission>
        )
    }


export default Gremios
