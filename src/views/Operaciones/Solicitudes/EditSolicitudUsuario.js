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

    getCooperativas = async () => {
        const {data} = await axios.get(`${baseurl}/cooperativa/`)
        this.setState({
            optionsCooperativa : data.map((r) => { return { value: r.id, label: r.nombre } })
        })
    }

    componentDidMount(){
        this.getCooperativas = this.getCooperativas.bind(this)
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
                        <Label className="col-sm-3">Cooperativas</Label>
                        <div className="col-sm-5">
                            <Select 
                                onChange={this.onChange('cooperativas')} 
                                value={this.props.cooperativas} 
                                options={optionsCooperativa} 
                                isMulti 
                                placeholder="Seleccione"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo de cooperativa</Label>
                        <div className="col-sm-5">
                            <SingleSelect onChange={this.onChange('tipo_cooperativa')} value={this.props.tipo_cooperativa} asyncOptions={this.optionTipoCooperativa} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Usuario solicitante</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('usuario_solicitante')} value={this.props.usuario_solicitante} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo solicitud</Label>
                        <div className="col-sm-5">
                            <SingleSelect onChange={this.onChange('tipo_solicitud')} value={this.props.tipo_solicitud} options={this.tipoSolicitud} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Descripción</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('descripcion')} value={this.props.descripcion} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Fecha y hora</Label>
                        <div className="col-sm-5">
                            <Input type="datetime-local" onChange={this.onChange('fecha')} value={this.props.fecha} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Observaciones</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('observaciones')} value={this.props.observaciones} />
                        </div>
                    </FormGroup>
                    <fieldset>
                        <legend>Usuario afectado</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Usuario</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_afectado.usuario} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cédula</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_afectado.cedula} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Nombre</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_afectado.nombre} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Correo</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_afectado.correo} readOnly />
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
        const { data } = await axios.get(`${baseurl}/venta/solicitud_usuario/${id}/`)
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
                return axios.post(`${baseurl}/venta/solicitud_usuario/${id ? `${id}/` : ``}`, data)
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

export default EditSolicitudUsuario