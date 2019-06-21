import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Select, Label } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import AddParadaModal from './AddParadaModal'

class RecordRow extends React.Component {

    render(){
        const name_input = `activa_${this.props.ciudad}`
        return (
            <tr>
                <td>{this.props.ciudad_nombre}</td>
                <td>{this.props.orden_llegada}</td>
                <td>{this.props.tarifa_normal}</td>
                <td>{this.props.tarifa_media}</td>
                <td>{this.props.duracion}h</td>
                <td>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id={name_input} name={name_input} checked={this.props.is_enable} onChange={this.props.onChange('is_enable')} />
                        <Label onlyClassName="custom-control-label" htmlFor={name_input}></Label>
                    </div>
                </td>
            </tr>
        )
    }
}

class MainView extends React.Component {

    state = {
        modal : {
            show : false
        }
    }

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    optionsDestinos = {
        url : `${baseurl}/ciudad/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    constructor(props){
        super(props)
        this.toggleModal = this.toggleModal.bind(this)
        this.agregarParada = this.agregarParada.bind(this)
    }
    
    onChange = name => (e) => {
        if(this.props.onChange){
            let value = e.target.value
            this.props.onChange(name, value)
        }
    }

    onChangeParada = index => name => (e) => {
        let paradas = this.props.paradas
        let value = e.target.value
        if(name == 'is_enable') value = e.target.checked
        paradas[index][name] = value
        this.props.onChange('paradas', paradas)
    }

    toggleModal = () => {
        let _modal = this.state.modal
        _modal.show = !_modal.show
        this.setState({
            modal : _modal
        })
    }

    agregarParada({ onChange, ...data }){
        let paradas = this.props.paradas
        
        if(!data.id && !paradas.some((record) => record.ciudad == data.ciudad)){
            paradas.push({ ...data, is_enable: true })
        }
        else if(paradas.some((record) => record.ciudad == data.ciudad)){
            for(let i = 0; i < paradas.length; i++){
                if(paradas[i].ciudad === data.ciudad){
                    paradas[i] = data
                    break
                }
            }
        }
        this.props.onChange('paradas', paradas)
        this.toggleModal()
    }

    render(){
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('cooperativa')} value={this.props.cooperativa} asyncOptions={this.optionsCooperativa} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Destino</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('ciudad_destino')} value={this.props.ciudad_destino} asyncOptions={this.optionsDestinos} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Via</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('via')} value={this.props.via} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <h4>
                            Paradas
                            <Button style={{marginLeft: 10}} onClick={this.toggleModal}>
                                <i className="fa fa-plus"></i>
                            </Button>
                        </h4>
                        <div className="col-sm-12">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Parada</th>
                                        <th>Llegada</th>
                                        <th>Tarifa Normal</th>
                                        <th>Tarifa Media</th>
                                        <th>Tiempo</th>
                                        <th>Activa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.props.paradas.map((record, i) => <RecordRow key={i} {...record} onChange={this.onChangeParada(i)} />)}
                                </tbody>
                            </table>
                        </div>
                    </FormGroup>
                    <AddParadaModal 
                        guardar={(data) => this.agregarParada(data)}
                        {...this.state.modal} 
                        toggle={this.toggleModal} 
                    />
                </form>
            </div>
        )
    }
}

class EditRutas extends React.Component {

    state = {
        id : null,
        data : {
            paradas: []
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
        const { data } = await axios.get(`${baseurl}/ruta/${id}/`)
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
                return axios.post(`${baseurl}/ruta/${id ? `${id}/` : ''}`, data)
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
                this.props.history.push('/operaciones/rutas/')
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
                                <CardTitle>Crear/Editar Rutas</CardTitle>
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

export default EditRutas