import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Select, FormGroup, Label, Input, BarChart, PieChart, Table } from './../../temeforest'
import { baseurl } from './../../utils/url'
import moment from 'moment'

/** BARS */
const barsViajes = [
    {name: '00:00', cantidad: 20},
    {name: '04:00', cantidad: 30},
    {name: '08:00', cantidad: 100},
    {name: '12:00', cantidad: 150},
    {name: '16:00', cantidad: 85},
    {name: '20:00', cantidad: 200},
    {name: '24:00', cantidad: 100},
];
const barsBoletos = [
    {name: '00:00', cantidad: 400},
    {name: '04:00', cantidad: 700},
    {name: '08:00', cantidad: 1500},
    {name: '12:00', cantidad: 2800},
    {name: '16:00', cantidad: 1200},
    {name: '20:00', cantidad: 2500},
    {name: '24:00', cantidad: 1100},
];
const barsTasas = [
    {name: '00:00', cantidad: 400},
    {name: '04:00', cantidad: 700},
    {name: '08:00', cantidad: 1500},
    {name: '12:00', cantidad: 2800},
    {name: '16:00', cantidad: 1200},
    {name: '20:00', cantidad: 2500},
    {name: '24:00', cantidad: 1100},
];

/** PIES */
const dataCooperativa = [
    { name: 'Cooperativa 1', value: 400 }, 
    { name: 'Cooperativa 2', value: 300 },
    { name: 'Cooperatvia 3', value: 300 },
];
const dataFormaPago = [
    { name: 'Efectivo', value: 400 }, 
    { name: 'Tarjeta', value: 300 },
    { name: 'Criptomoneda', value: 300 }, 
    { name: 'Cheque', value: 200 },
];

/** TABLES */
const cooperativasViajes = [ 
    { cooperativa_nombre: 'Cooperativa1', viajes: 1000 },
    { cooperativa_nombre: 'Cooperativa2', viajes: 900 },
    { cooperativa_nombre: 'Cooperativa3', viajes: 800 },
    { cooperativa_nombre: 'Cooperativa4', viajes: 700 },
    { cooperativa_nombre: 'Cooperativa5', viajes: 600 },
    { cooperativa_nombre: 'Cooperativa6', viajes: 500 },
    { cooperativa_nombre: 'Cooperativa7', viajes: 400 },
    { cooperativa_nombre: 'Cooperativa8', viajes: 300 },
    { cooperativa_nombre: 'Cooperativa9', viajes: 200 },
    { cooperativa_nombre: 'Cooperativa10', viajes: 100 },
    { cooperativa_nombre: 'Cooperativa11', viajes: 50 },
]
const cooperativasBoletos = [ 
    { cooperativa_nombre: 'Cooperativa1', boletos: 1000 },
    { cooperativa_nombre: 'Cooperativa2', boletos: 900 },
    { cooperativa_nombre: 'Cooperativa3', boletos: 800 },
    { cooperativa_nombre: 'Cooperativa4', boletos: 700 },
    { cooperativa_nombre: 'Cooperativa5', boletos: 600 },
    { cooperativa_nombre: 'Cooperativa6', boletos: 500 },
    { cooperativa_nombre: 'Cooperativa7', boletos: 400 },
    { cooperativa_nombre: 'Cooperativa8', boletos: 300 },
    { cooperativa_nombre: 'Cooperativa9', boletos: 200 },
    { cooperativa_nombre: 'Cooperativa10', boletos: 100 },
    { cooperativa_nombre: 'Cooperativa11', boletos: 50 },
]
const cooperativasTasas = [ 
    { cooperativa_nombre: 'Cooperativa2', tasas: 1000 },
    { cooperativa_nombre: 'Cooperativa4', tasas: 900 },
    { cooperativa_nombre: 'Cooperativa6', tasas: 800 },
    { cooperativa_nombre: 'Cooperativa1', tasas: 700 },
    { cooperativa_nombre: 'Cooperativa5', tasas: 600 },
    { cooperativa_nombre: 'Cooperativa9', tasas: 500 },
    { cooperativa_nombre: 'Cooperativa10', tasas: 400 },
    { cooperativa_nombre: 'Cooperativa33', tasas: 300 },
    { cooperativa_nombre: 'Cooperativa12', tasas: 200 },
    { cooperativa_nombre: 'Cooperativa22', tasas: 100 },
    { cooperativa_nombre: 'Cooperativa8', tasas: 50 },
]


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
                                <Select onChange={this.onChange('cooperativa')} value={this.props.cooperativa} />
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
                </Row>
            </form>
        )
    }
}

class GraficasBarras extends React.Component {
    render(){
        return (
            <Row>
                <Col xs="4">
                    <BarChart data={barsViajes} nameBars={['cantidad']} yAxis={{ label: {value:'Viajes',angle:-90, position:'insideLeft'} }} />
                </Col>
                <Col xs="4">
                    <BarChart data={barsBoletos} nameBars={['cantidad']} yAxis={{ label: {value:'Boletos',angle:-90, position:'insideLeft'} }} />
                </Col>
                <Col xs="4">
                    <BarChart data={barsTasas} nameBars={['cantidad']} yAxis={{ label: {value:'Tasas',angle:-90, position:'insideLeft'} }} />
                </Col>
            </Row>
        )
    }
}

class Tablas extends React.Component {
    render(){
        return (
            <Row>
                <Col xs="4">
                    <Table data={cooperativasViajes} columnsNames={['cooperativa_nombre', 'viajes']} columnsTitles={['Cooperativa', 'Viajes']} />
                </Col>
                <Col xs="4">
                    <Table data={cooperativasBoletos} columnsNames={['cooperativa_nombre', 'boletos']} columnsTitles={['Cooperativa', 'Boletos']} />
                </Col>
                <Col xs="4">
                    <Table data={cooperativasTasas} columnsNames={['cooperativa_nombre', 'tasas']} columnsTitles={['Cooperativa', 'Tasas']} />
                </Col>
            </Row>
        )
    }
}

class GraficasPie extends React.Component {
    render(){
        return (
            <Row>
                <Col xs={{size:4, offset:2}} className="text-center">
                    <PieChart data={dataCooperativa} />
                    <h4>Boletos por cooperativa</h4>
                </Col>
                <Col xs={{size:4}} className="text-center">
                    <PieChart data={dataFormaPago} />
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
        },
        graficasBarras : {},
        graficasPie : {},
        tablas : {}
    }

    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Panel de Recaudaciones</CardTitle>
                                <FormularioFiltros {...this.state.filtros} />
                                <GraficasBarras {...this.state.graficasBarras} />
                                <br />
                                <GraficasPie {...this.state.graficasPie} />
                                <br />
                                <Tablas {...this.state.tablas} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PanelRecaudaciones