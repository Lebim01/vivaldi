import React from 'react'
import { ListPage, Select, Label, FormGroup, Card, CardBody, CardTitle, Button, Permission } from 'temeforest'
import { baseurl } from 'utils/url'
import moment from 'moment'
import Clock  from 'utils/clock'

class ViajesPlanificados extends React.Component {

    interval = null
    state = {
        fecha: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    componentDidMount(){
        this.interval = setInterval(this.refresh, 3 * 1000)
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    /*optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }*/
    optionsSilo = {
        url : `${baseurl}/silo/`,
        labelName: 'descripcion',
        valueName: 'id'
    }
    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    estados = [
        { value:'', label: 'Todos' },
        { value:1, label: 'Finalizados' }
    ]

    onChange = name => (e) => {
        let value = e.target.value
        if(e.target.type === 'checkbox') value = e.target.checked

        this.setState({
            [name]: value
        })
    }

    refresh = () => {
        this.setState({

            refresh: true
        })
    }

    render(){
        const { cooperativa_nombre, silo, localidad, estado, fecha } = this.state
        return (
            <Permission key_permission="view_viajes_planificados" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <CardTitle>Listado de Viajes Planificados</CardTitle>
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Cooperativa</Label>
                                                <div className="col-sm-8">
                                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa_nombre')} value={cooperativa_nombre}/>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Localidad</Label>
                                                <div className="col-sm-8">
                                                    <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={localidad}/>
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div className="col-sm-6">
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Estado</Label>
                                                <div className="col-sm-8">
                                                    <Select options={this.estados} onChange={this.onChange('estado')} value={estado} />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Silo</Label>
                                                <div className="col-sm-8">
                                                    <Select asyncOptions={this.optionsSilo} onChange={this.onChange('silo')} value={silo}/>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <div className="col-sm-3"></div>
                                                <div className="col-sm-9">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="saldo" name="saldo" checked={this.state.saldo} onChange={this.onChange('saldo')} />
                                                        <Label onlyClassName="custom-control-label" htmlFor="saldo">Mostrar saldo</Label>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <div className="col-sm-3"></div>
                                                <div className="col-sm-9">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="tiempo_viaje" name="tiempo_viaje" checked={this.state.tiempo_viaje} onChange={this.onChange('tiempo_viaje')} />
                                                        <Label onlyClassName="custom-control-label" htmlFor="tiempo_viaje">Mostrar tiempo de viaje</Label>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 text-center">
                                        <Button onClick={this.refresh.bind(this)}>Configurar</Button>
                                    </div>
                                    <br />
                                    <br />
                                    <div>
                                    <Clock/>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="col-sm-12">
                                        <ListPage
                                            
                                            

                                            searchable={false}
                                            fieldNames={['#','Cooperativa', 'Disco', 'Placa', 'Saldo', 'Vlts', 'Costo', 'Salida', 'Destino']}
                                            fields={['', 
                                            'cooperativa_nombre', 
                                            'disco', 
                                            'placa',
                                            /*tdBodyClass={(row) => `no-padding-top-bottom ${row.saldo === 0 ? 'bg-orange' : ''}`},*/ 
                                            'saldo', 
                                            'vlts', 
                                            'costo', 
                                            'hora_salida',
                                            'destino']}

                                            tdBodyClass={(row) => `no-padding-top-bottom ${row.saldo === 0 ? 'bg-orange' : ''}`}

                                            endpoint='venta/viajes-planificados'
                                            parameters={this.state}
                                            tdBodyClass="no-padding-top-bottom"

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

export default ViajesPlanificados
