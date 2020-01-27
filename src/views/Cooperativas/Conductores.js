import React, { useState } from 'react'
import { Card, CardBody, CardTitle, ListPage, FormGroup, Label, Select, Permission  } from 'temeforest'
import { htmlToXls } from 'utils/exportData'
import { baseurl } from 'utils/url'
import { moneyFormat } from 'utils/number'

class Conductores extends React.Component {

    state = {
        status: 'true'
    }

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
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

    render() {
    return (
        <Permission key_permission="view_conductor" mode="redirect">
        <div className="animated fadeIn">
            <div className="row">
                <div className="col-sm-12">
                    <Card>
                        <CardBody>
                            <ListPage
                                exportExcel
                                imprimirPantalla
                                id="conductor"
                                title="Listado de Conductores"
                                
                                key_permission="conductor"

                                filtersZone = {
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <FormGroup className="row">
                                                <Label className="col-sm-5">Cooperativa</Label>
                                                <div className="col-sm-7">
                                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div className="col-sm-4">
                                            <FormGroup className="row">
                                                <Label className="col-sm-5">Estado</Label>
                                                <div className="col-sm-7">
                                                    <Select options={this.optionsEstado} defaultOption="Todos" onChange={this.onChange('status')} value={this.state.status} /> 
                                                </div>
                                            </FormGroup>
                                        </div>
                                    </div>
                                }

                                showStatus= {true}
                                searchable={true}
                                searchPlaceholder="Cooperativa, Nombre, Identificación"

                                fieldNames={['Cooperativa', 'Nombre', 'Identificación']}
                                fields={['cooperativa_nombre', 'nombre', 'identificacion']}

                                endpoint='conductor'
                                urlFront='cooperativas/conductores'

                                //exportExcel={exportExcel}

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

export default Conductores
