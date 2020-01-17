import React, {useState} from 'react'
import { Card, CardBody, CardTitle, ListPage, Permission, FormGroup, Label, Select } from 'temeforest'
import { htmlToXls } from 'utils/exportData'
import { baseurl, objectToUrl } from 'utils/url'
import { moneyFormat } from 'utils/number'

function PuntoVenta(props) {

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

    const renderCooperativas= (row)=>{
        return (
            <>
                { !row.externo &&
                    <ul>
                        {row.puntoventa_cooperativas.map((r, i) => 
                            <li key={i}>
                                {r.cooperativa_nombre}
                            </li>
                        )}
                    </ul>
                }
                { row.externo &&
                    <ul>
                        { row.cooperativa_nombre &&
                            <li>
                                {row.cooperativa_nombre}
                            </li>
                        }
                    </ul>
                }
            </>
        )
    }
 
   
        
        return (
        <Permission key_permission="view_puntoventa" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        title="Listado de Punto de venta"
                                        exportExcel
                                        imprimirPantalla
                                        id="puntoventa"
                                        key_permission="puntoventa"

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
                                        searchPlaceholder="Descripción, Cooperativa, Localidad"

                                        fieldNames={['Nombre', 'Cooperativa', 'Localidad']}
                                        fields={['descripcion', /*this.renderCooperativas*/, 'cooperativa_nombre', ,'localidad_nombre']}

                                        endpoint='venta/puntoventa'
                                        urlFront='cooperativas/punto-venta'

                                        //exportExcel={exportExcel}

                                        
                                        parameters={
                                            state
                                          }

                                        filters={{
                                            persist: true,
                                            callback: (parameters) => {
                                                setState(parameters)
                                            }
                                        }}
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



export default PuntoVenta
