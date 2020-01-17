import React, {useState} from 'react'
import { Card, CardBody, ListPage, Permission, Select, FormGroup, Label } from 'temeforest'

function Provincias (props) {

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
            <Permission key_permission="view_provincia" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Provincias"

                                        key_permission='provincia'

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
                                        searchPlaceholder="Nombre"

                                        fieldNames={['Nombre']}
                                        fields={['nombre']}

                                        endpoint='provincia'
                                        urlFront='localidades/provincia'
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

export default Provincias
