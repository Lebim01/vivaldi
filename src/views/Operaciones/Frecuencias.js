import React from 'react'
import { ListPage, Card, CardBody, CardTitle, FormGroup, Label, Select, Input } from 'temeforest'
import { baseurl } from 'utils/url'

class Frecuencias extends React.Component {

    state = {

    }

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    optionsCiudad = {
        url : `${baseurl}/ciudad/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
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

    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>Listado de Frecuencias</CardTitle>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <FormGroup className="row">
                                            <Label className="col-sm-4">Cooperativa</Label>
                                            <div className="col-sm-8">
                                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-4">Destino</Label>
                                            <div className="col-sm-8">
                                                <Select asyncOptions={this.optionsCiudad} onChange={this.onChange('ruta__ciudad_destino')} value={this.state.ruta__ciudad_destino}/>
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
                                    </div>
                                    <div className="col-sm-4">
                                        <FormGroup className="row">
                                            <Label className="col-sm-4">Fecha validez desde</Label>
                                            <div className="col-sm-8">
                                                <Input type="date" onChange={this.onChange('fecha_validez_desde')} value={this.state.fecha_validez_desde} />
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-4">Fecha validez hasta</Label>
                                            <div className="col-sm-8">
                                                <Input type="date" onChange={this.onChange('fecha_validez_hasta')} value={this.state.fecha_validez_hasta} />
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>
                                <ListPage
                                    fieldNames={['Hora', 'Cooperativa', 'Ruta', 'Tipo']}
                                    fields={['hora_salida', 'cooperativa_nombre', 'ruta_nombre', 'tipo_nombre']}
                                    parameters={this.state}

                                    endpoint='frecuencia'
                                    urlFront='operaciones/frecuencias'
                                    history={this.props.history}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Frecuencias
