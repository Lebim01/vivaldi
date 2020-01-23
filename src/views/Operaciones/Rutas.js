import React from 'react'
import { ListPage, Card, CardBody, FormGroup, Label, Select, Permission } from 'temeforest'
import { baseurl } from 'utils/url'

class Rutas extends React.Component{

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

    render(){
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
                                            showStatus={true}
                                            key_permission="ruta"

                                            title='Listado de Rutas'

                                            filtersZone={
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <FormGroup className="row">
                                                            <Label className="col-sm-6">Cooperativa</Label>
                                                            <div className="col-sm-6">
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

                                            searchable={true}
                                            searchPlaceholder="Ciudad, Vía, Cooperativa"

                                            fieldNames={['Cooperativa', 'Destino', 'Vía']}
                                            fields={['cooperativa_nombre', 'ciudad_destino_nombre', 'via']}

                                            endpoint='ruta'
                                            urlFront='operaciones/rutas'
                                            

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

export default Rutas

