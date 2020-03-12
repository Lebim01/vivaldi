import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Select, FormGroup, Label, Input, BarChart, PieChart, Table, Button, FormValidate, Permission, SelectLocalidad } from 'temeforest'
import { config } from 'config'
import { objectToUrl } from 'utils/url'
import axios from 'axios'
import moment from 'moment'

const { baseurl } = config

class FormularioFiltros extends React.Component {

    state = {
        filters : {
            fecha_inicio : moment().format('YYYY-MM-DD'),
            fecha_fin : moment().format('YYYY-MM-DD'),
            hora_inicio : moment("0000", "hhmm").format("HH:mm") ,
            hora_fin : moment("23:59", "hhmm").format('HH:mm') 
        }
    }

    
    optionsCooperativas = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    optionsFormapago = {
        url : `${baseurl}/formaDePago/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    onChange = name => (e) => {
        let state = {}

        this.setState({
            filters : {
                ...this.state.filters,
                [name]: e.target.value
            },
            ...state
        })
    }
    
    componentDidMount(){
        this.load()
    }

    load = async () => {
        const { data } = await axios.get(`${baseurl}/venta/panel-recaudaciones/${objectToUrl(this.state.filters)}`)
        this.setState({
            ...data
        })
    }

    
    buscar(){
        this.setState({
            refresh: true
        })
    }

    render(){
        const { refresh } = this.state
        return (
            <FormValidate className="form-horizontal">
                <Row>
                    <Col md="4" xs="6">
                        <FormGroup className="row">
                            <Label className="col-sm-6">Cooperativa</Label>
                            <div className="col-sm-6">
                                <Select onChange={this.onChange('cooperativa')} defaultOption="Todos" value={this.props.cooperativa} asyncOptions={this.optionsCooperativas} />
                            </div>
                        </FormGroup>
                    </Col>
                    <Col md="4" xs="6">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Fecha inicio</Label>
                            <div className="col-sm-8">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.filters.fecha_inicio} />
                            </div>
                        </FormGroup>
                    </Col>
                    <Col md="4" xs="6">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Forma pago</Label>
                            <div className="col-sm-8">
                                <Select onChange={this.onChange('forma_de_pago')} value={this.props.forma_de_pago} asyncOptions={this.optionsFormapago} />
                            </div>
                        </FormGroup>
                    </Col>
                    <Col md="4" xs="6">
                        <FormGroup className="row">
                            <Label className="col-sm-6">Localidad</Label>
                            <div className="col-sm-6">
                                <SelectLocalidad onChange={this.onChange('localidad')} value={this.props.localidad}/>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col md="4" xs="6">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Fecha fin</Label>
                            <div className="col-sm-8">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.filters.fecha_fin} />
                            </div>
                        </FormGroup>
                    </Col>
                    <Col md="4" xs="6">
                        <Button onClick={this.onChange('refresh')}>Actualizar</Button>
                    </Col>
                </Row>
            </FormValidate>
        )
    }
}

class GraficasBarras extends React.Component {
    render(){
        const { boleto, tasa, viaje } = this.props
        return (
            <Row>
                <Col md="4" xs="12">
                    <BarChart data={viaje} nameBars={['cantidad']} yAxis={{ label: {value:'Viajes',angle:-90, position:'insideLeft'} }} />
                </Col>
                <Col md="4" xs="12">
                    <BarChart data={boleto} nameBars={['cantidad']} yAxis={{ label: {value:'Boletos',angle:-90, position:'insideLeft'} }} />
                </Col>
                <Col md="4" xs="12">
                    <BarChart data={tasa} nameBars={['cantidad']} yAxis={{ label: {value:'Tasas',angle:-90, position:'insideLeft'} }} />
                </Col>
            </Row>
        )
    }
}

class Tablas extends React.Component {
    render(){
        const { boletos, tasas, viajes } = this.props
        return (
            <Row>
                <Col md="4" xs="12">
                    <Table data={viajes} columnsNames={['name', 'value']} columnsTitles={['Cooperativa', 'Viajes']} />
                </Col>
                <Col md="4" xs="12">
                    <Table data={boletos} columnsNames={['name', 'value']} columnsTitles={['Cooperativa', 'Boletos']} />
                </Col>
                <Col md="4" xs="12">
                    <Table data={tasas} columnsNames={['name', 'value']} columnsTitles={['Cooperativa', 'Tasas']} />
                </Col>
            </Row>
        )
    }
}

class GraficasPie extends React.Component {
    render(){
        const { cooperativa, formapago } = this.props
        return (
            <Row>
                <Col xs={{size:4, offset:2}} className="text-center">
                    <PieChart data={cooperativa} />
                    <h4>Boletos por cooperativa</h4>
                </Col>
                <Col xs={{size:4}} className="text-center">
                    <PieChart data={formapago} />
                    <h4>Boletos por forma de pago</h4>
                </Col>
            </Row>
        )
    }
}

class DashboardInit extends React.Component {

    state = {
        filters : {
            fecha_inicio : moment().format('YYYY-MM-DD'),
            fecha_fin : moment().format('YYYY-MM-DD'),
            hora_inicio : moment("0000", "hhmm").format("HH:mm") ,
            hora_fin : moment("23:59", "hhmm").format('HH:mm') 
        }
    }

    componentDidMount(){
        this.load()
    }

    load = async () => {
        const { data } = await axios.get(`${baseurl}/venta/panel-recaudaciones/${objectToUrl(this.state.filters)}`)
        this.setState({
            ...data
        })
    }

    onChange = (name, value) => {
        
        this.setState({
            filters: {
                ...this.state.filters,
                [name] : value
            }
        }, this.load)
    }

    render(){
        
        return (
            <Permission key_permission="view_panel_recaudacion" mode="redirect">
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" md="12">
                            <Card>
                                <CardBody>
                                    <CardTitle>Panel de Recaudaciones</CardTitle>
                                    <FormularioFiltros {...this.state.filters} onChange={this.onChange} />
                                    <GraficasBarras {...this.state.horario} />
                                    <br />
                                    <GraficasPie {...this.state.conteo} />
                                    <br />
                                    <Tablas {...this.state.top} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Permission>
        )
    }
}

export default DashboardInit