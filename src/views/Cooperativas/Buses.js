import React, { useState } from 'react'
import { Card, CardBody, CardTitle, ListPage, FormGroup, Label, Select, Permission  } from 'temeforest'
import { htmlToXls } from 'utils/exportData'
import { baseurl } from 'utils/url'
import { moneyFormat } from 'utils/number'

class Buses extends React.Component{

    state = {}

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    /*const optionsEstado = {
        url : `${baseurl}/bus/cooperativa?`,
        labelName: 'is_enable', 
        valueName: 'id' , 

    }*/

    /*const optionsEstado = [

        { value : '1', label : 'Activo' },
        { value : '2', label : 'Inactivo' },
    ]*/

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

    exportExcel = (data) => {
        const html = `
            <table>
                <tr>
                    <th>Cooperativa</th>
                    <th>Placa</th>
                    <th>Disco</th>
                    <th>Estado</th>
                    <th>Capacidad</th>
                    <th>Fecha emisión matricula</th>
                    <th>Fecha vencimiento matricula</th>
                </tr>
                ${data.map((row) =>
                    `<tr>
                        <td>${row.cooperativa_nombre}</td>
                        <td>${row.placa}</td>
                        <td>${row.disco}</td>
                        <td>${row.is_enable ? 'Habilitado' : 'Deshabilitado'}</td>
                        <td>${row.capacidad}</td>
                        <td>${row.fecha_emision_matricula || ''}</td>
                        <td>${row.fecha_vencimiento_matricula || ''}</td>
                    </tr>`
                ).join('')}
            </table>
        `
        htmlToXls(html)
    }
    //const { estado } = this.state
    render(){
    return (
        <Permission key_permission="view_bus" mode="redirect">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <div className="col-sm-12">
                                    <ListPage
                                        exportExcel
                                        imprimirPantalla
                                        id="report"
                                        key_permission= "bus"

                                        title="Listado de Buses"
                                        filtersZone={
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

                                        showStatus={true}
                                        searchable={true}
                                        searchPlaceholder="Cooperativa, Placa, Disco"

                                        fieldNames={['Cooperativa', 'Placa', 'Disco', 'Tipo', 'Capacidad', 'Dueño', 'Saldo']}
                                        fields={[
                                            'cooperativa_nombre', 'placa',
                                            (row) => <span style={{textAlign:"right", position: 'relative', right:'-40%'}}>{row.disco}</span>,
                                            'tipo_servicio_nombre',
                                            (row) => <label style={{float:"center", position:"relative", left: "25%", fontWeight: 300}}>{row.capacidad}</label>,
                                            'propietario_nombre',
                                            (row) => <label style={{float:"center", position:"relative", left: "25%", fontWeight: 300}}>${moneyFormat(row.saldo)}</label>
                                        ]}

                                        endpoint='bus'
                                        urlFront='cooperativas/buses'

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
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                </div>
            </div>
        </Permission>
    )
}
}

export default Buses
