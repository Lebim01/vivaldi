import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Label } from './../../../temeforest'
import { baseurl, getParameter } from './../../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'

class MainView extends React.Component {

    constructor(props) {
        super(props)
        this.onChangeCantidadAprobada = this.onChangeCantidadAprobada.bind(this)
    }

    onChangeCantidadAprobada(e) {
        this.props.onChangeCantidadAprobada(e.target.value)
    }

    render() {
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
                        <legend>Datos de la solicitud</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cantidad pedida</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.cantidad_pedida} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cantidad aprobada</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.cantidad_aprobada} onChange={this.onChangeCantidadAprobada} />
                            </div>
                        </FormGroup>
                    </fieldset>
                </form>
            </div>
        )
    }
}

class EditSolicitudTasaContigencia extends React.Component {

    state = {
        cantidad_aprobada: 0,
        data: {}
    }

    constructor(props) {
        super(props)
        this.aprobar = this.aprobar.bind(this)
        this.rechazar = this.rechazar.bind(this)
        this.onChangeCantidadAprobada = this.onChangeCantidadAprobada.bind(this)
    }

    onChangeCantidadAprobada(cantidad_aprobada) {
        this.setState({
            cantidad_aprobada: cantidad_aprobada,
        })
    }

    componentDidMount() {
        let id = getParameter('id')
        if (id) {
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/venta/solicitud_tasacontingencia/${id}/`)
        this.setState({
            id,
            cantidad_aprobada: (data.estado == 1) ? data.cantidad_aprobada : 0,
            data
        })
    }

    aprobar() {
        const { id, data, cantidad_aprobada } = this.state
        Swal.fire({
            title: 'Confirmar Guardar',
            text: '¿Seguro de guardar?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${baseurl}/venta/solicitud_tasacontingencia/${id ? `${id}/` : ``}`, { id, estado: 1, cantidad_aprobada: cantidad_aprobada })
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
                    text: `Guardado`,
                    type: 'success'
                })
                this.props.history.push('/operaciones/solicitudes/tasas-contingencia/')
            }
        })
    }

    rechazar() {
        const { id } = this.state
        Swal.fire({
            title: 'Confirmar rechazar, escribe el motivo',
            input: 'textarea',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: (motivo) => {
                return axios.post(`${baseurl}/venta/solicitud_tasacontingencia/${id ? `${id}/` : ``}`, { id, estado: 2, motivo })
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
                    text: `Guardado`,
                    type: 'success'
                })
                this.props.history.push('/operaciones/solicitudes/tasas-contingencia/')
            }
        })
    }

    render() {
        const { data } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar solicitud de tasas de contingencia</CardTitle>
                                <CardBody>
                                    <MainView {...data} cantidad_aprobada={this.state.cantidad_aprobada} onChangeCantidadAprobada={this.onChangeCantidadAprobada} />
                                </CardBody>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        {data.estado === 0 &&
                                            <div>
                                                <Button type="success" style={{ marginRight: 5 }} onClick={() => this.aprobar()}>Aprobar</Button>
                                                <Button type="danger" style={{ marginLeft: 5 }} onClick={() => this.rechazar()}>Rechazar</Button>
                                            </div>
                                        }
                                        {data.estado === 1 && <div className="alert alert-success">Aprobado</div>}
                                        {data.estado === 2 && <div className="alert alert-danger">Rechazado</div>}
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

export default EditSolicitudTasaContigencia
