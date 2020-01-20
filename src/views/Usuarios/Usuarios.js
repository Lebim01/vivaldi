import React, { useState } from 'react'
import { Card, CardBody, CardTitle, ListPage, FormGroup, Label, Select, Permission  } from 'temeforest'
import { htmlToXls } from 'utils/exportData'
import { baseurl } from 'utils/url'
import { moneyFormat } from 'utils/number'

function Usuarios(props) {

    const [state, setState] = useState({})

    const optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

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
                                    title="Listado de Usuarios"

                                    key_permission="users"
                                    //exportExcel
                                    //imprimirPantalla
                                    //id="report"
                               
                                    filtersZone = {
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <FormGroup className="row">
                                                <Label className="col-sm-5">Cooperativa</Label>
                                                <div className="col-sm-7">
                                                    <Select asyncOptions={optionsCooperativa} defaultOption="Todos" onChange={onChange('cooperativa')} value={state.cooperativa}/>
                                                </div>
                                            </FormGroup>
                                        </div>
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
    
                                    history={props.history}
                                    parameters={{
                                        ...state,
                                        type: 'list'
                                    }}
                                    filters={{
                                    persist: true,
                                    callback: setState
                                    }}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
    
    )
}

export default Usuarios
