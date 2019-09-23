import React from 'react'
import classnames from 'classnames'

import Fila from 'views/Cooperativas/DistribucionAsientos/Fila'

import { CardTitle, Card, CardBody, FormValidate, Label, Input, FormGroup } from 'temeforest'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

class Piso extends React.Component {
    
    state = {
        _filas : []
    }

    llenarFilas = () => {
        let _filas = []
        for(let i = 0; i < this.props.filas; i++) { _filas.push(1) }

        this.setState({
            _filas
        })
    }

    componentDidMount(){
        if(this.props.filas){
            this.llenarFilas()
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.filas !== prevProps.filas){
            if(this.props.filas !== prevState._filas.length){
                this.llenarFilas()
            }
        }
    }

    render(){
        const { asientos, asientos_desactivados } = this.props
        const { _filas } = this.state

        return (
            <div>
                <div style={{width:234, border:'1px solid black', margin:'10px auto'}}>
                    { _filas.map((j, index) => 
                        <Fila 
                            asientos={asientos} 
                            asientos_desactivados={asientos_desactivados} 
                            index={index} 
                            key={index} 
                            isLast={_filas.length == index+1} 
                        />
                    )}
                </div>
            </div>
        )
    }
}

class SolicitudDistribucionBuses extends React.Component {

    state = {
        activeTab : '1'
    }

    toggle = (tab) => {
        this.setState({
            activeTab : tab
        })
    }

    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>

                                <CardTitle>Modifcación de buses</CardTitle>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <Nav tabs>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '1' })}
                                                    onClick={() => { this.toggle('1'); }}
                                                >
                                                Piso 1
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '2' })}
                                                    onClick={() => { this.toggle('2'); }}
                                                >
                                                Piso 2
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1">
                                                <Piso filas={20} asientos={[]} asientos_desactivados={[]} />
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <Piso />
                                            </TabPane>
                                        </TabContent>
                                    </div>

                                    <div className="col-sm-6">
                                        <FormValidate>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Localidad</Label>
                                                <div className="col-sm-5">
                                                    <Input value={this.props.localidad_nombre} readOnly />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Cooperativa</Label>
                                                <div className="col-sm-5">
                                                    <Input value={this.props.cooperativa_nombre} readOnly />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Tipo de cooperativa</Label>
                                                <div className="col-sm-5">
                                                    <Input value={this.props.tipo_cooperativa_nombre} readOnly />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Usuario solicitante</Label>
                                                <div className="col-sm-5">
                                                    <Input value={this.props.usuario_solicitante_nombre} readOnly />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Tipo solicitud</Label>
                                                <div className="col-sm-5">
                                                    <Input value={this.props.tipo_solicitud_nombre} readOnly />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Descripción</Label>
                                                <div className="col-sm-5">
                                                    <Input value={this.props.descripcion} readOnly />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Fecha y hora</Label>
                                                <div className="col-sm-5">
                                                    <Input value={this.props.fecha} readOnly />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Observaciones</Label>
                                                <div className="col-sm-5">
                                                    <Input value={this.props.observaciones} readOnly />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Capacidad original</Label>
                                                <div className="col-sm-5">
                                                    <Input value={this.props.capacidad_original} readOnly />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Capacidad actual</Label>
                                                <div className="col-sm-5">
                                                    <Input value={this.props.capacidad_actual} readOnly />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Motivo solicitud</Label>
                                                <div className="col-sm-5">
                                                    <Input value={this.props.motivo_solicitud} readOnly />
                                                </div>
                                            </FormGroup>
                                        </FormValidate>
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default SolicitudDistribucionBuses