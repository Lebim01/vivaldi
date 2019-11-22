import React from 'react'
import { ListPage, Card, CardBody, CardTitle, FormGroup, Label, Select, ReportPage, Input, Button } from 'temeforest'
import { baseurl, objectToUrl } from 'utils/url'

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
            <ReportPage title="Listado de Frecuencias">       
                <CardTitle>
                    
                    <Button className="pull-right" onClick={this.nuevo}>
                        <i className="fa fa-plus" />
                    </Button>
                </CardTitle>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-6">Cooperativa</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Destino</Label>
                            <div className="col-sm-6">
                                <Select 
                                    {...this.state.cooperativa
                                        ? { asyncOptions : this.optionsCiudad({ cooperativa: this.state.cooperativa })}
                                        : { options : [{ label: 'Seleccione una cooperativa' }] }
                                    }
                                    onChange={this.onChange('ruta')} 
                                    value={this.state.ruta}
                                />
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Tipo</Label>
                            <div className="col-sm-8">
                                <Select options={this.optionsTipo} onChange={this.onChange('tipo')} value={this.state.tipo}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Localidad</Label>
                            <div className="col-sm-8">
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
                    id="report"
                    fieldNames={['Hora', 'Cooperativa', 'Destino', 'Vía', 'Tipo', 'Localidad', 'Fecha']}
                    fields={['hora_salida', 'cooperativa_nombre', 'ciudad_destino', 'ruta_via', 'tipo_nombre', 'localidad_nombre', 'fecha_validez']}
                    parameters={this.state}

                    endpoint='frecuencia'
                    urlFront='operaciones/frecuencias'
                    history={this.props.history}
                />
                            
                   
            </ReportPage>
        )
    }
}

export default Frecuencias
