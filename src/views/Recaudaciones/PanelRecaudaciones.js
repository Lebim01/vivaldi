import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Select, FormGroup, Label, Input, BarChart, PieChart, Table, Button } from './../../temeforest'
import { config } from './../../config'
import { objectToUrl } from './../../utils/url'
import moment from 'moment'
import axios from '../../utils/axios';

const { baseurl } = config

class FormularioFiltros extends React.Component {

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
        if(this.props.onChange){
            let value = e.target.value
            this.props.onChange(name, value)
        }
    }

    render(){
        return (
            <form className="form-horizontal">
                <Row>
                    <Col xs="4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Cooperativa</Label>
                            <div className="col-sm-8">
                                <Select onChange={this.onChange('cooperativa')} value={this.props.cooperativa} asyncOptions={this.optionsCooperativas} />
                            </div>
                        </FormGroup>
                    </Col>
                    <Col xs="4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Fecha inicio</Label>
                            <div className="col-sm-8">
                                <Input onChange={this.onChange('fecha_inicio')} value={this.props.fecha_inicio} type="date" />
                            </div>
                        </FormGroup>
                    </Col>
                    <Col xs="4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Forma pago</Label>
                            <div className="col-sm-8">
                                <Select onChange={this.onChange('cooperativa')} value={this.props.cooperativa} asyncOptions={this.optionsFormapago} />
                            </div>
                        </FormGroup>
                    </Col>
                    <Col xs="4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Localidad</Label>
                            <div className="col-sm-8">
                                <Select onChange={this.onChange('localidad')} value={this.props.localidad} asyncOptions={this.optionsLocalidad} />
                            </div>
                        </FormGroup>
                    </Col>
                    <Col xs="4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Fecha fin</Label>
                            <div className="col-sm-8">
                                <Input onChange={this.onChange('fecha_fin')} value={this.props.fecha_fin} type="date" />
                            </div>
                        </FormGroup>
                    </Col>
                    <Col xs="4">
                        <Button onClick={this.onChange('refresh')}>Actualizar</Button>
                    </Col>
                </Row>
            </form>
        )
    }
}

class GraficasBarras extends React.Component {
    render(){
        const { boleto, tasa, viaje } = this.props
        return (
            <Row>
                <Col xs="4">
                    <BarChart data={viaje} nameBars={['cantidad']} yAxis={{ label: {value:'Viajes',angle:-90, position:'insideLeft'} }} />
                </Col>
                <Col xs="4">
                    <BarChart data={boleto} nameBars={['cantidad']} yAxis={{ label: {value:'Boletos',angle:-90, position:'insideLeft'} }} />
                </Col>
                <Col xs="4">
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
                <Col xs="4">
                    <Table data={viajes} columnsNames={['name', 'value']} columnsTitles={['Cooperativa', 'Viajes']} />
                </Col>
                <Col xs="4">
                    <Table data={boletos} columnsNames={['name', 'value']} columnsTitles={['Cooperativa', 'Boletos']} />
                </Col>
                <Col xs="4">
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

class PanelRecaudaciones extends React.Component {

    state = {
        filtros : {
            fecha_inicio : moment().format('YYYY-MM-DD'),
            fecha_fin : moment().format('YYYY-MM-DD')
        }
    }

    componentDidMount(){
        this.load()
    }

    load = async () => {
        const { data } = await axios.get(`${baseurl}/venta/panel-recaudaciones/${objectToUrl(this.state.filtros)}`)
        this.setState({
            ...data
        })
    }

    onChange = (name, value) => {
        this.setState({
            filtros: {
                ...this.state.filtros,
                [name] : value
            }
        }, this.load)
    }

    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Panel de Recaudaciones</CardTitle>
                                <FormularioFiltros {...this.state.filtros} onChange={this.onChange} />
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
        )
    }
}

export default PanelRecaudaciones