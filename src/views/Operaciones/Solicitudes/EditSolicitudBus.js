import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Label, TextArea, Select as SingleSelect } from './../../../temeforest'
import { baseurl, getParameter } from './../../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import Select from 'react-select'
import moment from 'moment';

class MainView extends React.Component {

    state = { optionsCooperativa: [] }

    optionTipoCooperativa = {
        url: `${baseurl}/tipoCooperativa/`,
        labelName: `nombre`,
        valueName: 'id'
    }
    
    tipoSolicitud = [
        { value:'', label: 'Seleccione' },
        { value:1, label: 'Habilitar' },
        { value:2, label: 'Inhabilitar' },
    ]

    componentDidMount(){
        //this.getCooperativas = this.getCooperativas.bind(this)
        this.getCooperativas()
    }

    onChange = name => (e) => {
        if(name === 'cooperativas'){
            this.props.onChange(name, e)
        }
        else if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    render(){
        const { optionsCooperativa } = this.state
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
                            <Input value={this.props.tipo_cooperativa} readOnly />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Usuario solicitante</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.usuario_solicitante} readOnly />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo solicitud</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.tipo_solicitud} readOnly />
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
                    { this.props.bus &&
                        <fieldset>
                            <legend>Bus</legend>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Bus</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus.bus} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Placa</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus.placa} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Marca</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus.marca} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Propietario</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus.propietario} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Capacidad</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus.capacidad} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Distribución</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus.distribucion} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">F. emisión matricula</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus.fecha_emision_matricula} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">F. vencimiento matricula</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus.fecha_vensimiento_matricula} readOnly />
                                </div>
                            </FormGroup>
                        </fieldset>
                    }
                </form>
            </div>
        )
    }
}

class EditSolicitudBus extends React.Component {

    state = {
        data:{
            fecha: moment().format('YYYY-MM-DD'),
            usuario_afectado: {}
        }
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
        const { data } = await axios.get(`${baseurl}/venta/solicitud_bus/${id}/`)
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
        data.cooperativas = data.cooperativas.map((record) => record.value)
        Swal.fire({
            title: 'Confirmar Guardar',
            text : '¿Seguro de guardar?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${baseurl}/venta/solicitud_bus/${id ? `${id}/` : ``}`, data)
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
                                        <Button type="success" style={{marginRight:5}} onClick={() => this.confirmSave() }>Aceptar</Button>
                                        <Button type="danger" style={{marginLeft:5}}>Rechazar</Button>
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