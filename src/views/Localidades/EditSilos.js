import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Select, Label, ListGroup, ListItem, Tabs } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios';
import Swal from 'sweetalert2'

class MainView extends React.Component {

    state = {
        localidades : []
    }
    
    sino = [
        { value : 'si', label : 'Si' },
        { value : 'no', label : 'No' }
    ]

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    render(){
        const { niveles } = this.props
        const { localidades } = this.state
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
                        <Label className="col-sm-3">Localidad</Label>
                        <div className="col-sm-5">
                            <Select options={localidades} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Representante legal</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('representante_legal')} value={this.props.representante_legal} />
                        </div>
                    </FormGroup>
                    <fieldset>
                        <legend>Información tribunaria</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Establecimiento</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('establecimiento')} value={this.props.establecimiento} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Razón Social</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('razon_social')} value={this.props.razon_social} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">RUC</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('ruc')} value={this.props.ruc} />
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
                                <Select options={this.sino} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Contribuyente Especial</Label>
                            <div className="col-sm-1">
                                <Select options={this.sino} />
                            </div>
                            <div className="col-sm-3">
                                <Input onChange={this.onChange('contribuyente_especial_desc')} value={this.props.contribuyente_especial_desc} />
                            </div>
                        </FormGroup>
                    </fieldset>
                    <fieldset>
                        <legend>
                            Niveles 
                            <Button style={{marginLeft: 10}} onClick={() => this.openModalNivel()}>
                                <i className="fa fa-plus"></i>
                            </Button>
                        </legend>
                        <ListGroup>
                            { (niveles || []).map((nivel) => 
                                <ListItem>{nivel.nombre}</ListItem>
                            )}
                        </ListGroup>
                    </fieldset>
                </form>
            </div>
        )
    }
}

class EditSilo extends React.Component {

    state = {
        id : null,
        tab : 'main',
        data : {},
        showConfirmSave : false
    }

    tabs = [
        {
            link : 'main',
            text : 'Crear/Editar Silo'
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
        const { data } = await axios.get(`${baseurl}/silo/${id}/`)
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
                return axios.put(`${baseurl}/silo/${id}/`, data)
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
                this.props.history.push('/localidades/silos/')
            }
        })
    }

    render(){
        const { tab, data, id } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Silos</CardTitle>
                                <Tabs tab={tab} tabs={this.tabs} onClickTab={this.changeTab}/>
                                <CardBody>
                                    { tab === 'main' && <MainView id_localidad={id} {...data} onChange={this.onChange} />}
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

export default EditSilo