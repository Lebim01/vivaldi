import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Select, Label, Tabs, DualList } from './../../temeforest'
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios';
import Swal from 'sweetalert2'  

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

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
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
                            <Input onChange={this.onChange('nombre')} value={this.props.nombre} />
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
                            <Input onChange={this.onChange('establecimiento')} value={this.props.establecimiento} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Ventanilla</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('ventanilla')} value={this.props.ventanilla} />
                        </div>
                    </FormGroup>
                    <fieldset>
                        <legend>Información tribunaria</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Representante legal</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('representante_legal')} value={this.props.representante_legal} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Razón Social</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('razon_social')} value={this.props.razon_social} />
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
                                <Input onChange={this.onChange('nombre_comercial')} value={this.props.nombre_comercial} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Dirección Matriz</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('direccion_matriz')} value={this.props.direccion_matriz} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Correo</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('correo')} value={this.props.correo} />
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
                                <Input onChange={this.onChange('contribuyente_especial_desc')} value={this.props.contribuyente_especial_desc} />
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
        id : null,
        tab : 'main',
        data : {},
        showConfirmSave : false
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

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.changeTab = this.changeTab.bind(this)
        this.confirmSave = this.confirmSave.bind(this)
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/Cooperativa/${id}/`)
        this.setState({
            id,
            data
        })
    }

    changeTab(tab){
        this.setState({ tab })
    }

    onChange(name, value){
        let data = this.state.data
        data[name] = value
        this.setState({
            data
        })
    }

    confirmSave(){
        const { id, data } = this.state
        Swal.fire({
            title: 'Confirmar Guardar',
            text : '¿Seguro de guardar?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.put(`${baseurl}/Cooperativa/${id}/`, data)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error(response.statusText)
                    }
                    return response
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Petición fallida: ${error}`
                    )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    text : `Guardado`,
                    type : 'success'
                })
                this.props.history.push('/cooperativas/cooperativas/')
            }
        })
    }

    render(){
        const { tab, data } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Cooperativas</CardTitle>
                                <Tabs tab={tab} tabs={this.tabs} onClickTab={this.changeTab}/>
                                <CardBody>
                                    { tab === 'main' && <MainView {...data} onChange={this.onChange} />}
                                </CardBody>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <Button type="success" style={{marginRight:5}} onClick={() => this.confirmSave() }>Guardar</Button>
                                        <Button type="danger" style={{marginLeft:5}}>Eliminar</Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EditCooperativas