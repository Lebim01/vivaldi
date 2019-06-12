import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Label, Select } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios';
import Swal from 'sweetalert2'

class MainView extends React.Component {

    tipos = [
        {
            value : 1,
            label : 'Conductor'
        },
        {
            value : 2,
            label : 'Asistente'
        }
    ]

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    render(){
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select options={this.props.cooperativas} onChange={this.onChange('cooperativa')} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cédula/RUC</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('descripcion')}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Apellidos</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('apellidos')}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Nombres</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('nombres')}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo</Label>
                        <div className="col-sm-5">
                            <Select options={this.tipos} onChange={this.onChange('tipo')} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Correo</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('correo')}/>
                        </div>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

class EditConductores extends React.Component {

    state = {
        id : null,
        data : {},
        cooperativas : []
    }

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.confirmSave = this.confirmSave.bind(this)
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
        this.getCooperativas()
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/conductor/${id}/`)

        this.setState({
            id,
            data
        })
    }

    getCooperativas = async () => {
        const { data } = await axios.get(`${baseurl}/cooperativa/`)
        let _cooperativas = data.map((c) => { return { label : c.nombre, value : c.id } })
        this.setState({
            cooperativas : _cooperativas
        })
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
                return axios.post(`${baseurl}/conductor/${id ? `${id}/` : ``}`, data)
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
                this.props.history.push('/cooperativas/conductores/')
            }
        })
    }

    render(){
        const { data, cooperativas } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Conductor</CardTitle>
                                <CardBody>
                                    <MainView {...data} onChange={this.onChange} cooperativas={cooperativas} />
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

export default EditConductores