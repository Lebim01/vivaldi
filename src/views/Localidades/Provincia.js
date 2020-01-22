import React, {useState} from 'react'
import { Card, CardBody, ListPage, Permission, Select, FormGroup, Label } from 'temeforest'

class Provincias extends React.Component{

    state = {}

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
                                                        <Select options={this.optionsEstado} defaultOption="Todos" onChange={this.onChange('status')} value={this.state.status} /> 
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

export default Provincias
