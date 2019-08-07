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
		    {this.props.estado === 2 &&
                    <FormGroup className="row">
                        <Label className="col-sm-3">Motivo</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.motivo} readOnly />
                        </div>
                    </FormGroup>
	            }
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
                    <fieldset>
                        <legend>Bus</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Bus</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_numero} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Placa</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_placa} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Marca</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_marca_nombre} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Propietario</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_propietario_apellidos + ' ' + this.props.bus_propietario_nombres} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Distribución</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_distribucion_nombre} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">F. emisión matricula</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_fecha_emision_matricula} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">F. vencimiento matricula</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_fecha_vencimiento_matricula} readOnly />
                            </div>
                        </FormGroup>
                    </fieldset>
                </form>
            </div>
        )
    }
}

class EditSolicitudBus extends React.Component {

    state = {
        data: {}
    }

    constructor(props){
        super(props)
        this.rechazar = this.rechazar.bind(this)
        this.aprobar = this.aprobar.bind(this)
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/venta/solicitud_bus/${id}/`)
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
                return axios.post(`${baseurl}/venta/solicitud_bus/${id ? `${id}/` : ``}`, { id, estado: 1 })
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
                this.props.history.push('/operaciones/solicitudes/buses/')
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
                return axios.post(`${baseurl}/venta/solicitud_bus/${id ? `${id}/` : ``}`, { id, estado: 2, motivo })
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
                this.props.history.push('/operaciones/solicitudes/buses/')
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
                                <CardTitle>Crear/Editar Solicitud de buses</CardTitle>
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

export default EditSolicitudBus
