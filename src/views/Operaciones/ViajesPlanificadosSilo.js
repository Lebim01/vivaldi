import React from 'react'
import { ListPage, Select, Label, FormGroup, Card, CardBody, CardTitle, Button, SelectLocalidad } from 'temeforest'
import { baseurl } from 'utils/url'
import moment from 'moment'
import Clock  from 'utils/clock'
import store from 'store/auth'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = `JWT ${store.getState().token}`

class ViajesPlanificadosSilo extends React.Component {

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
        //if(e.target.type === 'checkbox') value = e.target.checked

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
        const { cooperativa, silo, localidad, estado, fecha } = this.state
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>Listado de Viajes Planificados Silo</CardTitle>
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
                                                <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.localidad}/>
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
                                    </div>
                                </div>
                                <div className="col-md-12 text-center">
                                    <Clock/>
                                </div>
                                <div className="col-sm-12">
                                    <ListPage
                                        searchable={false}
                                        fieldNames={['Hora','Cooperativa', 'Disco', 'Destino', 'Anden', 'Estado']}
                                        fields={['hora_salida', 'cooperativa', 'disco', 'destino', 'anden', 'estado']}

                                        endpoint='venta/viajes-planificados-silos'
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

export default ViajesPlanificadosSilo
