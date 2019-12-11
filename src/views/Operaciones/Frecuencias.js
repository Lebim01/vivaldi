import React from 'react'
import { ListPage, Card, CardBody, CardTitle, FormGroup, Label, Select, ReportPage,Input, Button, Permission } from 'temeforest'
import { baseurl, objectToUrl } from 'utils/url'
import { confirmEndpoint } from 'utils/dialog'
import { checkPermission } from 'temeforest/base/Permission'
import moment from 'moment'
import Swal from 'sweetalert2';

class Frecuencias extends React.Component {

    state = {}

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    optionsCiudad = (obj) => ({
        url : `${baseurl}/ruta/${objectToUrl(obj)}`,
        labelName: 'nombre',
        valueName: 'id'
    })
    optionsTipo = [
        { value:'', label: 'Todas' },
        { value:1, label: 'Normal' },
        { value:2, label: 'Extraordinaria' },
    ]

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    nuevo = () => {
        this.props.history.push('/operaciones/frecuencias/edit?')
    }

    render(){
        return (
            <Permission key_permission="view_frecuencia" mode="redirect">
                
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                    <CardTitle>
                                        Listado de Frecuencias
                                        <Permission key_permission="add_frecuencia">
                                            <Button className="pull-right" onClick={this.nuevo}>
                                                <i className="fa fa-plus" />
                                            </Button>
                                        </Permission>
                                    </CardTitle>
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <FormGroup className="row">
                                                <Label className="col-sm-5">Cooperativa</Label>
                                                <div className="col-sm-7">
                                                   <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-5">Destino</Label>
                                                <div className="col-sm-7">
                                                    <Select 
                                                        { ...this.state.cooperativa
                                                            ? { asyncOptions : this.optionsCiudad({ cooperativa: this.state.cooperativa })  }
                                                            : { options : [{ label : 'Seleccione una cooperativa', value : '' }] }
                                                        }
                                                        onChange={this.onChange('ruta')} 
                                                        value={this.state.ruta}
                                                    />
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div className="col-sm-4">
                                            <FormGroup className="row">
                                                <Label className="col-sm-5">Tipo</Label>
                                                <div className="col-sm-7">
                                                    <Select options={this.optionsTipo} onChange={this.onChange('tipo')} value={this.state.tipo}/>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-5">Localidad</Label>
                                                <div className="col-sm-7">
                                                    <Select asyncOptions={this.optionsLocalidad} defaultOption="Todos" onChange={this.onChange('localidad')} value={this.state.localidad}/>
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div className="col-sm-4">
                                            <FormGroup className="row">
                                                <Label className="col-sm-6">Fecha validez desde</Label>
                                                <div className="col-sm-6">
                                                    <Input type="date" onChange={this.onChange('fecha_validez_desde')} value={this.state.fecha_validez_desde} />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-6">Fecha validez hasta</Label>
                                                <div className="col-sm-6">
                                                    <Input type="date" onChange={this.onChange('fecha_validez_hasta')} value={this.state.fecha_validez_hasta} />
                                                </div>
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <ListPage
                                        exportExcel
                                        id="frecuencia"

                                        key_permission="frecuencia"
                                        searchable={false}
                                        ref={this.table}

                                        
                                        fieldNames={['Hora', 'Cooperativa', 'Destino', 'Vía', 'Fecha' ,'Tipo', 'Localidad']}
                                        fields={['hora_salida', 'cooperativa_nombre', 'ciudad_destino', 'ruta_via', 'fecha_validez','tipo_nombre', 'localidad_nombre']}
                                        
                                        endpoint='frecuencia'
                                        urlFront={'operaciones/frecuencias'}
                                        parameters={this.state}
                                        /*filters={{
                                            persist: true,
                                            callback: (parameters) => this.setState(parameters)
                                        }}*/
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

export default Frecuencias
