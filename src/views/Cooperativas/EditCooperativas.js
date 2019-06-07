import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Select, Label, Tabs, DualList } from './../../temeforest'
import 'react-dual-listbox/lib/react-dual-listbox.css';

class ListTTG extends React.Component {
    andenes = [
        { label : '1', value : 1},
        { label : '2', value : 2},
        { label : '3', value : 3},
        { label : '4', value : 4}
    ]

    render(){
        return (
            <FormGroup className="row">
                <div className="col-sm-10">
                    <DualList options={this.andenes} />
                </div>
            </FormGroup>
        )
    }
}

class ListTTMP extends React.Component {
    andenes = [
        { label : '4', value : 1},
        { label : '5', value : 2},
        { label : '6', value : 3},
        { label : '7', value : 4}
    ]
    
    render(){
        return (
            <FormGroup className="row">
                <div className="col-sm-10">
                    <DualList options={this.andenes} />
                </div>
            </FormGroup>
        )
    }
}

class MainView extends React.Component {

    state = {
        tabAndenes : 'ttg'
    }

    tipos = [
        {
            value : 1,
            label : 'Intraprovicional'
        }
    ]
    sino = [
        { value : 'si', label : 'Si' },
        { value : 'no', label : 'No' }
    ]
    tabsAndenes = [
        {
            link : 'ttg',
            text : 'TTG'
        },
        {
            link : 'ttmp',
            text : 'TTMP'
        }
    ]

    changeTab(tab){
        this.setState({ tabAndenes : tab })
    }


    render(){
        const tipos = this.tipos, sino = this.sino
        const { tabAndenes } = this.state
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Nombre</Label>
                        <div className="col-sm-5">
                            <Input />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo</Label>
                        <div className="col-sm-5">
                            <Select options={tipos} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Gremio</Label>
                        <div className="col-sm-5">
                            <Input />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Ventanilla</Label>
                        <div className="col-sm-5">
                            <Input />
                        </div>
                    </FormGroup>
                    <fieldset>
                        <legend>Información tribunaria</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Representante legal</Label>
                            <div className="col-sm-5">
                                <Input />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Razón Social</Label>
                            <div className="col-sm-5">
                                <Input />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">RU</Label>
                            <div className="col-sm-5">
                                <Input />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Nombre Comercial</Label>
                            <div className="col-sm-5">
                                <Input />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Dirección Matriz</Label>
                            <div className="col-sm-5">
                                <Input />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Correo</Label>
                            <div className="col-sm-5">
                                <Input />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Obligado a llevar contabilidad</Label>
                            <div className="col-sm-1">
                                <Select options={sino} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Contribuyente Especial</Label>
                            <div className="col-sm-1">
                                <Select options={sino} />
                            </div>
                            <div className="col-sm-3">
                                <Input />
                            </div>
                        </FormGroup>
                    </fieldset>
                    <fieldset>
                        <legend>Venta</legend>
                        <FormGroup className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-4">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" />
                                    <Label onlyClassName="custom-control-label">Asume tasa</Label>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-4">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" />
                                    <Label onlyClassName="custom-control-label">Anulación Boleto</Label>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-4">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" />
                                    <Label onlyClassName="custom-control-label">Usa API</Label>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Sistema externo</Label>
                            <div className="col-sm-3">
                                <Select options={[{label:'Boleteria3000',value:''}]} />
                            </div>
                        </FormGroup>
                    </fieldset>

                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">
                            <Tabs tab={tabAndenes} tabs={this.tabsAndenes} onClickTab={this.changeTab.bind(this)} />
                            { tabAndenes === 'ttg' && <ListTTG /> }
                            { tabAndenes === 'ttmp' && <ListTTMP/> }
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

class EditCooperativas extends React.Component {

    state = {
        tab : 'main'
    }

    tabs = [
        {
            link : 'main',
            text : 'Crear/Editar Cooperativa'
        },
        {
            link : 'firma',
            text : 'Firma electronica'
        },
        {
            link : 'correos',
            text : 'Configuración de correos'
        }
    ]

    changeTab(tab){
        this.setState({ tab })
    }

    render(){
        const { tab } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Cooperativas</CardTitle>
                                <Tabs tab={tab} tabs={this.tabs} onClickTab={this.changeTab.bind(this)}/>
                                <CardBody>
                                    { tab === 'main' && <MainView />}
                                </CardBody>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EditCooperativas