import React, { useState } from 'react'
import { Card, CardBody, CardTitle, ListPage, FormGroup, Label, Select, Permission, ReportPage  } from 'temeforest'
import { htmlToXls } from 'utils/exportData'
import { baseurl } from 'utils/url'
import { moneyFormat } from 'utils/number'


class Usuarios extends React.Component{

    state= {}

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

    render(){
    return (
    <ReportPage printButtons={true} timestamp={false}>
        
        <ListPage
            title="Listado de Usuarios"

            key_permission="user"
            exportExcel
            imprimirPantalla
            id="usuario"
        
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
        


            showStatus={true}
            searchable={true}
            searchPlaceholder="Usuario, Nombre"

            fieldNames={['Usuario', 'Nombre', 'Cooperativas']}
            fields={['username', 'first_name', (row) => 
                <ul>
                    { row.roles_cooperativa.map((r, i) => 
                        <li key={i}>{r.cooperativa_nombre}</li>
                    )}
                </ul>
            ]}

            endpoint='usuario'
            urlFront='usuarios/usuarios'

            //exportExcel={exportExcel}

            parameters={
                this.state
              }

            filters={{
                persist: true,
                callback: (parameters) => {
                    this.setState(parameters)
                }
            }}
            history={this.props.history}
        />
                    
        </ReportPage>
    )
}
}

export default Usuarios
