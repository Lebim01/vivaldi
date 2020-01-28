import React, {useState} from 'react'
import { Card, CardBody, ListPage , FormGroup, Select, Label} from 'temeforest'

class Roles extends React.Component{
    
    state= {}

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
                                                    <Select options={this.optionsEstado} defaultOption="Todos" onChange={this.onChange('status')} value={this.state.status} /> 
                                                </div>
                                            </FormGroup>
                                        </div>
                                    }

                                    searchable={true}
                                    searchPlaceholder="Rol, Descripción"
                                    searchFields={['name', 'description']}

                                    fieldNames={['Rol', 'Descripción']}
                                    fields={['name', 'description']}

                                    endpoint='rol'
                                    urlFront='usuarios/roles'

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
        )
    }
}

export default Roles