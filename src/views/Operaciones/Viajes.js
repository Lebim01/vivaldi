import React from 'react'
import { Button, ListPage, Select, Label, FormGroup, Card, CardBody, CardTitle, Input, RSelectAsync, Permission, SelectLocalidad  } from 'temeforest'
import { baseurl, objectToUrl } from 'utils/url'
import moment from 'moment'

class Viajes extends React.Component {
    state = {
        fecha_inicio : moment().format('YYYY-MM-DD') ,
        fecha_fin : moment().format('YYYY-MM-DD')
    }
    optionsCooperativa = {
        url : `${baseurl}/cooperativa/?type=select`,
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
        const { cooperativa, bus, tipo_frecuencia, fecha_inicio, localidad, fecha_fin, estado } = this.state
        return (
            <Permission key_permission="view_viaje" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <div className="col-sm-12">
                                        <ListPage
                                            exportExcel
                                            imprimirPantalla
                                            id="table-viajes"

                                            key_permission="viaje"

                                            title='Listado de Viajes'

                                            actionsButtons={[
                                                <Permission key_permission="add_viaje">
                                                    <Button onClick={this.nuevo}>
                                                        <i className="fa fa-plus" />
                                                    </Button>
                                                </Permission>,
                                            ]}

                                            filtersZone={
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
                                                                <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.localidad}/>
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
                                            }

                                            searchable={false}
                                            fieldNames={['Fecha', 'Frecuencia','Hora salida', 'Disco', 'Placa', 'Cooperativa' ,'Destino/Via', 'Pasajero']}
                                            fields={[
                                                'fecha',
                                                'frecuencia_nombre', 
                                                'hora_salida',
                                                (row) => <span style={{textAlign:"right", position: 'relative', right:'-5%'}}>{row.bus_disco}</span>,
                                                'bus_placa', 
                                                'cooperativa_nombre', 
                                                'ruta_nombre',
                                                'pasajeros'
                                            ]}

                                            endpoint='viaje'
                                            urlFront={'operaciones/viajes'}

                                            parameters={{
                                              ...this.state,
                                              type: 'list'
                                            }}
                                            
                                            filters={{
                                                persist: true,
                                                callback: (parameters) => this.setState(parameters)
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

export default Viajes
