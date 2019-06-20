import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Select, Label } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import AddParadaModal from './AddParadaModal'

class RecordRow extends React.Component {
    render(){
        return (
            <tr>
                <td>{this.props.parada_nombre}</td>
                <td>{this.props.llegada}</td>
                <td>{this.props.tarifa_normal}</td>
                <td>{this.props.tarifa_media}</td>
                <td>{this.props.tiempo}</td>
                <td>
                    <Input type="checkbox" />
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
    }
    
    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    toggleModal = () => {
        let _modal = this.state.modal
        _modal.show = !_modal.show
        this.setState({
            modal : _modal
        })
    }

    agregarParada(){

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
                            <Select onChange={this.onChange('destino')} value={this.props.destino} asyncOptions={this.optionsDestinos} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Via</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('representante_legal')} value={this.props.representante_legal} />
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
                                    { (this.props.paradas || []).map((record) => <RecordRow {...record} />)}
                                </tbody>
                            </table>
                        </div>
                    </FormGroup>
                    <AddParadaModal 
                        guardar={this.agregarParada} 
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
                return axios.put(`${baseurl}/ruta/${id}/`, data)
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
                                    <MainView id_localidad={id} {...data} onChange={this.onChange} />
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