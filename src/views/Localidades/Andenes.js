import React, {useState} from 'react'
import { ListPage, Card, CardBody, Permission, FormGroup, Label, Select } from 'temeforest'

class Andenes extends React.Component {

    state = {}

    optionsEstado = [
        { value:'', label: 'Todos'},
        { value:'true', label: 'Activo' },
        { value:'false', label: 'Inactivo' },
    ]

    puertasAndenes= (row) => {
        return (
            
            <ul>
                {row.puertas_acceso.map((p) => 
                    <li>{p}</li>
                )}
            </ul>
            
        )
    }

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    render(){
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
                                                    <Select options={this.optionsEstado} defaultOption="Todos" onChange={this.onChange('status')} value={this.state.status} /> 
                                                </div>
                                            </FormGroup>
                                        </div>
                                    }

                                    showStatus={true}
                                    searchable={true}
                                    searchPlaceholder="Descripción"

                                    fieldNames={['Descripcion', 'Silos', 'Puertas de acceso', 'Localidad', 'Nivel']}
                                    fields={['descripcion', 'silos_nombre', this.puertasAndenes, 'localidad_nombre',
                                    (row) => <span style={{ textAlign:"right", position: 'relative', right:'-45%'}}>{row.localidad_nivel_nombre}</span>,
                                    ]}

                                    endpoint='anden'
                                    urlFront='localidades/andenes'

                                    parameters={{
                                        ...this.state,
                                       
                                      }}

                                    filters={{
                                        persist: true,
                                        callback: (parameters) => {
                                            this.setState(parameters)
                                        }
                                    }}

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
export default Andenes
