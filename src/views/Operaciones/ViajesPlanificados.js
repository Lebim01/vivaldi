import React from 'react'
import { ListPage, Select, Label, FormGroup, Card, CardBody, CardTitle, Permission, SelectLocalidad } from 'temeforest'
import { baseurl } from 'utils/url'
import moment from 'moment'
import Clock  from 'utils/clock'
import ViajesModal from './ViajesModal'
import store from 'store/auth'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = `JWT ${store.getState().token}`

class ViajesPlanificados extends React.Component {

    interval = null
    state = {
        data : {
            fecha: moment().format('YYYY-MM-DD'),
            saldo : true
            
        },
        modal : {
            show: false
        }
        
    }

    componentDidMount(){
        this.interval = setInterval(this.refresh, 30 * 1000)
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }
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
            data : {
                ...this.state.data,
                [name]: value
            }
        })
    }

    refresh = () => {
        this.setState({
            refresh: true
        })
    }

    openDialog = (row) => {
        this.setState({
            modal : {
                show: true,
                id : row.viaje
            }
        })
    }

    toggle = () => {
        this.setState({
            modal : {
                ...this.state.modal,
                show :  !this.state.modal.show
            }
        })
    }

    render(){
        const { cooperativa, localidad, silo, estado } = this.state.data
        

        let headers = ['#','Cooperativa', 'Disco', 'Placa', 'Saldo', 'Duración', 'Salida', 'Destino']
        let fields = ['', 
            'cooperativa_nombre', 
            'disco', 
            'placa',
            'saldo', 
            'duracion', 
            'hora_salida',
            'destino'
        ]

        if(!this.state.data.saldo){
            fields.splice(fields.indexOf('saldo'), 1)
            headers.splice(headers.indexOf('Saldo'), 1)
        }

        if(!this.state.data.duracion){
            fields.splice(fields.indexOf('duracion'), 1)
            headers.splice(headers.indexOf('Duración'), 1)
        }
        return (
            <Permission key_permission="view_viajes_planificados" mode="redirect">

                <ViajesModal
                    {...this.state.modal}
                    toggle={this.toggle}
                />
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
                                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={cooperativa}/>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Localidad</Label>
                                                <div className="col-sm-8">
                                                    <SelectLocalidad onChange={this.onChange('localidad')} value={localidad}/>
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
                                                        <input type="checkbox" className="custom-control-input" id="saldo" name="saldo" checked={this.state.data.saldo} onChange={this.onChange('saldo')} />
                                                        <Label onlyClassName="custom-control-label" htmlFor="saldo">Mostrar saldo</Label>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <div className="col-sm-3"></div>
                                                <div className="col-sm-9">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="duracion" name="duracion" checked={this.state.duracion} onChange={this.onChange('duracion')} />
                                                        <Label onlyClassName="custom-control-label" htmlFor="duracion">Mostrar tiempo de viaje</Label>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 col-sm-6">
                                                <Clock className="d-inline-block"/>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                {' '}<div className="bg-orange d-inline-block" style={{width:20, height:10}}>{' '}</div>
                                                <span>{' '}No tiene saldo</span>
                                                <div className="bg-info d-inline-block" style={{width:20, height:10, marginLeft: 20}}>{' '}</div>
                                                <span>{' '}Viaje ya salió</span>
                                                <div className="bg-danger d-inline-block" style={{width:20, height:10, marginLeft: 20}}>{' '}</div>
                                                <span>{' '}Conductor sin puntos</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <ListPage
                                            searchable={false}
                                            fieldNames={headers}
                                            fields={fields}
                                            tdBodyClass="margin: 0 !important;padding: 0 !important;"
                                            tdBodyClass={(row) => {
                                                let hora_salida = moment(`${moment().format('YYYY-MM-DD')} ${row.hora_salida}`)
                                                let ahorita = moment()
                                                let ya_salio = hora_salida.isBefore(ahorita)

                                                if(row.conductor_puntos === 0) return 'bg-danger'
                                                if(row.saldo === 0) return 'bg-orange-300'
                                                if(ya_salio) return 'bg-info'
                                                return ''
                                            }}
                                            endpoint='venta/viajes-planificados'
                                            parameters={this.state.data}
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
