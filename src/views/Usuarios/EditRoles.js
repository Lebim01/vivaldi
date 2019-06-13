import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Label } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'

class MainView extends React.Component {

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
                        <Label className="col-sm-3">Nombre</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('name')} value={this.props.name} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Descripción</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('description')} value={this.props.description} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-4">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="aprobacion_usuario" name="aprobacion_usuario" checked={this.props.aprobacion_usuario} onChange={this.onChange('aprobacion_usuario')} />
                                <Label onlyClassName="custom-control-label" htmlFor="aprobacion_usuario">Aprobación Usuario</Label>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-4">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="genereacion_credenciales" name="genereacion_credenciales" checked={this.props.genereacion_credenciales} onChange={this.onChange('genereacion_credenciales')} />
                                <Label onlyClassName="custom-control-label" htmlFor="genereacion_credenciales">Generación Credenciales Usuario</Label>
                            </div>
                        </div>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

class EditRoles extends React.Component {

    state = {
        id : null,
        data : {}
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
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/rol/${id}/`)
        this.setState({
            id,
            data
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
                return axios.put(`${baseurl}/rol/${id ? `${id}/` : ``}`, data)
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
                this.props.history.push('/usuarios/roles/')
            }
        })
    }

    render(){
        const { data, id } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Rol</CardTitle>
                                <CardBody>
                                    <MainView {...data} onChange={this.onChange} />
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

export default EditRoles