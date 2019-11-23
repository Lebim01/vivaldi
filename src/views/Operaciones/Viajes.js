import React from 'react'
import { Button, ListPage, Select, Label, FormGroup, Card, CardBody, CardTitle, Input, RSelectAsync } from 'temeforest'
import { baseurl, objectToUrl } from 'utils/url'
import moment from 'moment'

class Viajes extends React.Component {
    state = {
        fecha_inicio : moment().format('YYYY-MM-DD') ,
        fecha_fin : moment().format('YYYY-MM-DD')
    }
    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    optionsBus = (obj) => ({
        url : `${baseurl}/bus/${objectToUrl(obj)}`,
        labelName: (row) => `${row.disco} / ${row.placa}`,
        valueName: 'id'
    })
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
        let value = e.target.value

        if(name === 'cooperativa' && !value){
            this.setState({
                bus : ''
            })
        }

        this.setState({
            [name]: value
        })
    }

    onValue = (name, value) => {
        this.setState({
            [name] : value
        })
    }

    nuevo = () => {
        this.props.history.push('/operaciones/viajes/edit?')
    }
    render(){
        const { cooperativa, bus, bus_label, tipo_frecuencia, fecha_inicio, localidad, fecha_fin, estado } = this.state
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    Listado de Viajes
                                    <Button className="pull-right" onClick={this.nuevo}>
                                        <i className="fa fa-plus" />

                                    </Button>
                                </CardTitle>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Cooperativa</Label>
                                            <div className="col-sm-8">
                                                <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={cooperativa}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Fecha inicio</Label>
                                            <div className="col-sm-8">
                                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={fecha_inicio} max="8" />
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Bus</Label>
                                            <div className="col-sm-8">
                                                { cooperativa 
                                                    ? (
                                                        <RSelectAsync
                                                            asyncOptions={this.optionsBus({ cooperativa })}
                                                            isDisabled={!cooperativa}
                                                            onChange={(value, label) => {
                                                                this.onValue('bus', value)
                                                            }}
                                                            placeholder={'Seleccione'}
                                                            value={bus}
                                                            isClearable
                                                            loadingMessage={() => 'Cargando, no cierre el menu'}
                                                            noOptionsMessage={() => 'No se encontraron resultados'}
                                                        />
                                                    ) : (
                                                        <Input readOnly placeholder="Seleccione una cooperativa" />
                                                    )
                                                }
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
                                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={fecha_fin} />
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
                                        exportExcel
                                        id="table-viajes"
                                        searchable={false}
                                        fieldNames={['Frecuencia','Cooperativa', 'Disco', 'Ruta']}
                                        fields={['frecuencia_nombre', 'cooperativa_nombre', 'bus_disco', 'ruta_nombre']}

                                        endpoint='viaje'
                                        urlFront={'operaciones/viajes'}
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
