import React, { useState } from 'react'
import { ListPage, Card, CardBody, CardTitle, FormGroup, Label, Select, Permission } from 'temeforest'
import { baseurl } from 'utils/url'

function Rutas(props) {

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

    return (
        <Permission key_permission="view_ruta" mode="redirect">
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    Listado de Rutas
                                </CardTitle>
                                <br/>
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
                                    searchable={true}
                                    searchPlaceholder="Ciudad, Vía, Cooperativa"

                                    key_permission="ruta"

                                    fieldNames={['Cooperativa', 'Destino', 'Vía']}
                                    fields={['cooperativa_nombre', 'ciudad_destino_nombre', 'via']}

                                    endpoint='ruta'
                                    urlFront='operaciones/rutas'
                                    history={props.history}
                                    parameters={state}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </Permission>
    )
}
export default Rutas
