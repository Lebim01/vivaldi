import React from 'react'
import { ListPage, Select, Label, FormGroup, Card, CardBody, CardTitle, Input } from './../../temeforest'
import { baseurl } from './../../utils/url'
import moment from 'moment'

class Viajes extends React.Component {

    state = {
        fecha_inicio : moment().format('YYYY-MM-DD'),
        fecha_fin : moment().format('YYYY-MM-DD')
    }
    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    optionsBus = {
        url : `${baseurl}/bus/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    tipoFrecuencia = [
        { value: '', label: 'Seleccione' },
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Extraordinaria' }
    ]
    estados = [
        { value:'', label: 'Todos' },
        { value:1, label: 'Finalizados' }
    ]

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    render(){
        const { cooperativa, bus, tipo_frecuencia, fecha_inicio, localidad, fecha_fin, estado } = this.state
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>Listado de Viajes</CardTitle>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Cooperativa</Label>
                                            <div className="col-sm-8">
                                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={cooperativa}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Fecha inicio</Label>
                                            <div className="col-sm-8">
                                                <Input type="date" onChange={this.onChange('fecha_inicio')} value={fecha_inicio} />
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Bus</Label>
                                            <div className="col-sm-8">
                                                <Select asyncOptions={this.optionsBus} onChange={this.onChange('bus')} value={bus}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Tipo Frecuencia</Label>
                                            <div className="col-sm-8">
                                                <Select options={this.tipoFrecuencia} onChange={this.onChange('tipo_frecuencia')} value={tipo_frecuencia} />
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-sm-6">
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Localidad</Label>
                                            <div className="col-sm-8">
                                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={localidad}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Fecha Fin</Label>
                                            <div className="col-sm-8">
                                                <Input type="date" onChange={this.onChange('fecha_fin')} value={fecha_fin} />
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Estado</Label>
                                            <div className="col-sm-8">
                                                <Select options={this.estados} onChange={this.onChange('estado')} value={estado} />
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <ListPage
                                        searchable={false}
                                        fieldNames={['Frecuencia','Cooperativa', 'Disco', 'Ruta', 'Salida']}
                                        fields={['frecuencia_nombre', 'cooperativa_nombre', 'bus_nombre', 'ruta_nombre', 'hora_salida']}

                                        url='viaje'
                                        parameters={this.state}

                                        history={this.props.history}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Viajes