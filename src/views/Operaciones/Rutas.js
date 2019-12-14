import React, { useState } from 'react'
import { ListPage, Card, CardBody, CardTitle, FormGroup, Label, Select, Button, Permission } from 'temeforest'
import { baseurl, objectToUrl } from 'utils/url'

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
                            <div className="col-sm-12">
                                    <ListPage
                                        exportExcel
                                        imprimirPantalla
                                        id="report"

                                        key_permission="viajes"

                                        title='Listado de Rutas'

                                        filtersZone={
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
                                        }

                                        searchable={true}
                                        searchPlaceholder="Ciudad, Vía, Cooperativa"

                                        fieldNames={['Cooperativa', 'Destino', 'Vía']}
                                        fields={['cooperativa_nombre', 'ciudad_destino_nombre', 'via']}

                                        endpoint='ruta'
                                        urlFront='operaciones/rutas'
                                        history={props.history}
                                        parameters={state}
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
export default Rutas

