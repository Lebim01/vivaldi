import React, { useState } from 'react'
import { Card, CardBody, CardTitle, ListPage, FormGroup, Label, Select, Permission  } from 'temeforest'
import { htmlToXls } from 'utils/exportData'
import { baseurl } from 'utils/url'
import { moneyFormat } from 'utils/number'

function Conductores(props) {

    const [state, setState] = useState({})

    const optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    const optionsEstado = [
        { value:'', label: 'Todos'},
        { value:'true', label: 'Habilitado' },
        { value:'false', label: 'Deshabilitado' },
    ]

    const onChange = name => (e) => {
        setState({
            [name]: e.target.value
        })
    }

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

                                showStatus= {true}
                                searchable={true}
                                searchPlaceholder="Cooperativa, Nombre, Identificación"

                                fieldNames={['Cooperativa', 'Nombre', 'Identificación']}
                                fields={['cooperativa_nombre', 'nombre', 'identificacion']}

                                endpoint='conductor'
                                urlFront='cooperativas/conductores'

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
    </Permission>
    )
}

export default Conductores
