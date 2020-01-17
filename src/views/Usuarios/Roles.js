import React, {useState} from 'react'
import { Card, CardBody, ListPage , FormGroup, Select, Label} from 'temeforest'

function Roles (props) {
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
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Roles"

                                    key_permission="group"

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

                                    showStatus={true}
                                    searchable={true}
                                    searchPlaceholder="Rol, Descripción"
                                    searchFields={['name', 'description']}

                                    fieldNames={['Rol', 'Descripción']}
                                    fields={['name', 'description']}

                                    endpoint='rol'
                                    urlFront='usuarios/roles'
                                    history={props.history}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    
}

export default Roles