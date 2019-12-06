import React, { useState } from 'react'
import { Card, CardBody, ListPage, CardTitle, FormGroup, Label, Select, Permission  } from 'temeforest'
import { htmlToXls } from 'utils/exportData'
import { baseurl } from 'utils/url'

const Buses = (props) => {

    const [state, setState] = useState({})

    const optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

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

    return (
        <Permission key_permission="view_bus" mode="redirect">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                            <div className="row">
                                    <div className="col-sm-4">
                                        <FormGroup className="row">
                                            <Label className="col-sm-6">Cooperativa</Label>
                                            <div className="col-sm-6">
                                                <Select asyncOptions={optionsCooperativa} defaultOption="Todos" onChange={onChange('cooperativa')} value={state.cooperativa}/>
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>
                                <ListPage
                                    title="Listado de Buses"

                                    key_permission="bus"

                                    searchable={true}
                                    searchPlaceholder="Cooperativa, Placa, Disco"

                                    fieldNames={['Cooperativa', 'Placa', 'Disco']}
                                    fields={['cooperativa_nombre', 'placa', 'disco']}

                                    endpoint='bus'
                                    urlFront='cooperativas/buses'

                                    exportExcel={exportExcel}
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

export default Buses
