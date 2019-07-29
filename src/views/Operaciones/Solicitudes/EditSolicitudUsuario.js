import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Label } from './../../../temeforest'
import { baseurl, getParameter } from './../../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'

class MainView extends React.Component {
    render(){
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Input readOnly value={this.props.cooperativa_nombre} readOnly />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo de cooperativa</Label>
                        <div className="col-sm-5">
                            <Input readOnly value={this.props.tipo_cooperativa_nombre} readOnly />
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
                        <Label className="col-sm-3">Motivo</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.motivo} readOnly />
                        </div>
                    </FormGroup>
                    <fieldset>
                        <legend>Usuario afectado</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Usuario</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_username} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cédula</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_cedula} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Nombre</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_nombres} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Correo</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_correo} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Teléfono</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_telefono} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Dirección</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_direccion} readOnly />
                            </div>
                        </FormGroup>
                    </fieldset>
                </form>
            </div>
        )
    }
}

class EditSolicitudUsuario extends React.Component {

    state = {
        data:{}
    }

    constructor(props){
        super(props)
        this.aprobar = this.aprobar.bind(this)
        this.rechazar = this.rechazar.bind(this)
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/venta/solicitud_usuario/${id}/`)
        this.setState({
            id,
            data
        })
    }

    aprobar(){
        const { id, data } = this.state
        Swal.fire({
            title: 'Confirmar Guardar',
            text : '¿Seguro de guardar?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${baseurl}/venta/solicitud_usuario/${id ? `${id}/` : ``}`, { id, estado: 1 })
                .then(response => {
                    if (response.status !== 200 && response.status !== 201) {
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
                this.props.history.push('/operaciones/solicitudes/usuario/')
            }
        })
    }

    rechazar(){
        const { id } = this.state
        Swal.fire({
            title: 'Confirmar rechazar, escribe el motivo',
            input : 'textarea',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: (motivo) => {
                return axios.post(`${baseurl}/venta/solicitud_usuario/${id ? `${id}/` : ``}`, { id, estado: 2, motivo })
                .then(response => {
                    if (response.status !== 200 && response.status !== 201) {
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
                this.props.history.push('/operaciones/solicitudes/usuario/')
            }
        })
    }

    render(){
        const { data } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Solicitud de usuario</CardTitle>
                                <CardBody>
                                    <MainView {...data} onChange={this.onChange} />
                                </CardBody>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        { data.estado === 0 && 
                                            <div>
                                                <Button type="success" style={{marginRight:5}} onClick={() => this.aprobar() }>Aprobar</Button>
                                                <Button type="danger" style={{marginLeft:5}} onClick={() => this.rechazar() }>Rechazar</Button>
                                            </div>
                                        }
                                        { data.estado === 1 && <div className="alert alert-success">Aprobado</div> }
                                        { data.estado === 2 && <div className="alert alert-danger">Rechazado</div> }
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

export default EditSolicitudUsuario