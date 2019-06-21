import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Select, Label } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'

class MainView extends React.Component {

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    optionsRutas = {
        url : `${baseurl}/ruta/`,
        labelName: (record) => `${record.origen.ciudad_nombre}-${record.destino.ciudad_nombre}`,
        valueName: 'id'
    }
    optionsDestinos = {
        url : `${baseurl}/ciudad/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    tipos = [
        { value: '', label : 'Seleccione' },
        { value: 1, label : 'Normal' },
        { value: 2, label : 'Extraordinaria' },
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
                        <Label className="col-sm-3">Hora salida</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('hora_salida')} value={this.props.hora_salida} type="time" />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('cooperativa')} value={this.props.cooperativa} asyncOptions={this.optionsCooperativa} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Ruta</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('ruta')} value={this.props.ruta} asyncOptions={this.optionsRutas} id="cmb_ruta" />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Destino</Label>
                        <div className="col-sm-5">
                            <Input readOnly value={this.props.destino} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('tipo')} value={this.props.tipo} options={this.tipos} />
                        </div>
                    </FormGroup>
                    { this.props.tipo == 2 &&
                        <FormGroup className="row">
                            <Label className="col-sm-3">Fecha</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('fecha_validez')} value={this.props.fecha_validez} type="date" />
                            </div>
                        </FormGroup>
                    }
                </form>
            </div>
        )
    }
}

class EditFrecuencias extends React.Component {

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
        const { data } = await axios.get(`${baseurl}/frecuencia/${id}`)
        this.setState({
            id,
            data
        }, ()=> this.setDestino())
    }

    onChange(name, value){
        let data = this.state.data
        data[name] = value
        if(name == 'ruta') this.setDestino()
        if(name == 'tipo') if(value == 1) data.fecha_validez = null
        this.setState({
            data
        })
    }

    setDestino(){
        setTimeout(() => {
            let select = document.getElementById('cmb_ruta')
            let index = select.selectedIndex
            if(index > 0){
                let text = select.options[index].text
                let destino = text.split('-')[1].trim()
                this.onChange('destino', destino)
            }else{
                this.onChange('destino', '')
            }
        }, 500)
    }

    confirmSave(){
        const { id, data } = this.state
        Swal.fire({
            title: 'Confirmar Guardar',
            text : '¿Seguro de guardar?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${baseurl}/frecuencia/${id ? `${id}/` : ''}`, data)
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
                this.props.history.push('/operaciones/frecuencias/')
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
                                <CardTitle>Crear/Editar Frecuencias</CardTitle>
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

export default EditFrecuencias