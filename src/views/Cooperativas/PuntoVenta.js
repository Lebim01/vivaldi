import React from 'react'
import { Card, CardBody, CardTitle, ListPage, Permission, FormGroup, Label, Select } from 'temeforest'
import { htmlToXls } from 'utils/exportData'
import { baseurl, objectToUrl } from 'utils/url'
import { moneyFormat } from 'utils/number'

class PuntoVenta extends React.Component{

    state = {}
    

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

    renderCooperativas(row){
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
 
   
    render(){
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
                                        searchPlaceholder="Descripción, Cooperativa, Localidad"

                                        fieldNames={['Nombre', 'Cooperativa', 'Localidad']}
                                        fields={['descripcion', this.renderCooperativas /*, 'cooperativa_nombre',*/ ,'localidad_nombre']}

                                        endpoint='venta/puntoventa'
                                        urlFront='cooperativas/punto-venta'

                                        //exportExcel={exportExcel}

                                        
                                        parameters={{
                                            ...this.state,
                                            type: 'list'
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

export default PuntoVenta
