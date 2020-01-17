import React, {useState} from 'react'
import { ListPage, Card, CardBody, Permission, FormGroup, Label, Select } from 'temeforest'

function Andenes(props) {

    const [state, setState] = useState({})

    const optionsEstado = [
        { value:'', label: 'Todos'},
        { value:'true', label: 'Activo' },
        { value:'false', label: 'Inactivo' },
    ]

    const puertasAndenes = (row) => {
        return (
            <ul>
                {row.puertas_acceso.map((p) => 
                    <li>{p}</li>
                )}
            </ul>
        )
    }

    const onChange = name => (e) => {
        setState({
            [name]: e.target.value
        })
    }

    return (
        <Permission key_permission="view_anden" mode="redirect">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Andenes"

                                    key_permission="anden"

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
                                    searchPlaceholder="Descripción"

                                    fieldNames={['Descripcion', 'Silos', 'Puertas de acceso', 'Localidad', 'Nivel']}
                                    fields={['descripcion', 'silos_nombre', puertasAndenes, 'localidad_nombre','localidad_nivel_nombre']}

                                    endpoint='anden'
                                    urlFront='localidades/andenes'
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
export default Andenes
