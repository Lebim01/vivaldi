import React, { useState } from 'react'
import { Card, CardBody, CardTitle, ListPage, FormGroup, Label, Select, Permission  } from 'temeforest'
import { htmlToXls } from 'utils/exportData'
import { baseurl } from 'utils/url'
import { moneyFormat } from 'utils/number'

function Buses(props) {

    const [state, setState] = useState({})

    const optionsCooperativa = {
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

   const optionsEstado = [
        { value:0, label: 'Pendiente' },
        { value:1, label: 'Aceptado' },
    ]

    const onChange = name => (e) => {
        setState({
            [name]: e.target.value
        })
    }

    const exportExcel = (data) => {
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
    return (
        <Permission key_permission="view_bus" mode="redirect">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                            <div className="col-sm-12">
                            <ListPage


                            //exportExcel
                            imprimirPantalla
                            id="report"
                            key_permission= "bus"

                            //title="Listado de Buses"
                            title="Listado de Buses"
                            filtersZone={

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
                                                <Select asyncOptions={optionsEstado} defaultOption="Todos" onChange={onChange('estado')} value={state.estado} /> 
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>
                                }


                                    searchable={true}
                                    searchPlaceholder="Cooperativa, Placa, Disco"

                                    //key_permission="bus"

                                    fieldNames={['Cooperativa', 'Placa', 'Disco', 'Tipo', 'Capacidad', 'Dueño', 'Saldo']}
                                    fields={['cooperativa_nombre', 'placa',
                                    (row) => <span style={{textAlign:"right", position: 'relative', right:'-40%'}}>{row.disco}</span>,
                                    'tipo_servicio_nombre',
                                    (row) => <label style={{float:"center", position:"relative", left: "25%", fontWeight: 300}}>{row.capacidad}</label>,
                                    'propietario_nombre',
                                    (row) => <label style={{float:"center", position:"relative", left: "25%", fontWeight: 300}}>${moneyFormat(row.saldo)}</label>]}

                                    endpoint='bus'
                                    urlFront='cooperativas/buses'

                                    exportExcel={exportExcel}

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
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                </div>
            </div>
        </Permission>
    )
}

export default Buses
