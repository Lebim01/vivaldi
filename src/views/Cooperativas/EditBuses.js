import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Label, Select } from './../../temeforest'
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
        const { cooperativas, marcas, distribucion, busTipos, busTiposServicios, conductores, propietarios } = this.props
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Número</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('numero')} value={this.props.numero} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Placa</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('placa')} value={this.props.placa} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select options={cooperativas} onChange={this.onChange('cooperativa')} value={this.props.cooperativa} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo</Label>
                        <div className="col-sm-5">
                            <Select options={busTipos} onChange={this.onChange('bus_tipo')} value={this.props.bus_tipo} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo servicio</Label>
                        <div className="col-sm-5">
                            <Select options={busTiposServicios} onChange={this.onChange('bus_tipo_servicio')} value={this.props.bus_tipo_servicio} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Marca</Label>
                        <div className="col-sm-5">
                            <Select options={marcas} onChange={this.onChange('marca')} value={this.props.marca} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Propietario</Label>
                        <div className="col-sm-5">
                            <Select options={propietarios} onChange={this.onChange('propietario')} value={this.props.propietario} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Conductor</Label>
                        <div className="col-sm-5">
                            <Select options={conductores} onChange={this.onChange('conductor')} value={this.props.conductor} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Capacidad</Label>
                        <div className="col-sm-5">
                            <Input type="number" onChange={this.onChange('capacidad')} value={this.props.capacidad} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Precio</Label>
                        <div className="col-sm-5">
                            <Input type="number" onChange={this.onChange('precio_boleto')} value={this.props.precio_boleto} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Distribución</Label>
                        <div className="col-sm-5">
                            <Select options={distribucion} onChange={this.onChange('distribucion')} value={this.props.distribucion} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Año Fabricación</Label>
                        <div className="col-sm-5">
                            <Input type="number" onChange={this.onChange('anio_fabricacion')} value={this.props.anio_fabricacion} />
                        </div>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

class EditBuses extends React.Component {

    seleccione = [{label:'Seleccione', value:''}]
    state = {data:{}, cooperativas: [], distribucion:this.seleccione, marcas:[],
             conductores:[], propietarios:[], busTipos:[], busTiposServicios:[]}

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.confirmSave = this.confirmSave.bind(this)
        this.getCooperativas = this.getCooperativas.bind(this)
        this.getMarcas = this.getMarcas.bind(this)
        this.getBusTipoServicios = this.getBusTipoServicios.bind(this)
        this.getBusTipos = this.getBusTipos.bind(this)
        this.getPropietarios = this.getPropietarios.bind(this)
        this.getConductores = this.getConductores.bind(this)
    }

    componentDidMount(){
        this.getCooperativas()
        this.getMarcas()
        this.getBusTipos()
        this.getBusTipoServicios()
        this.getPropietarios()
        this.getConductores()
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/bus/${id}/`)
        this.setState({
            id,
            data
        })
    }

    getCooperativas = async () => {
        const { data } = await axios.get(`${baseurl}/cooperativa/`)
        let options = [...this.seleccione, ...data.map((r) => { return { value : r.id, label : r.nombre } })]
        this.setState({
            cooperativas : options
        })
    }

    getMarcas = async () => {
        const { data } = await axios.get(`${baseurl}/marca/`)
        let options = [...this.seleccione, ...data.map((r) => { return { value : r.id, label : r.nombre } })]
        this.setState({
            marcas : options
        })
    }
    getPropietarios = async () => {
        const { data } = await axios.get(`${baseurl}/persona/`)
        let options = [...this.seleccione, ...data.map((r) => { return { value : r.id, label : r.nombres } })]
        this.setState({
            propietarios : options
        })
    }

    getConductores = async () => {
        const { data } = await axios.get(`${baseurl}/conductor/`)
        let options = [...this.seleccione, ...data.map((r) => { return { value : r.id, label : `${r.nombres} ${r.apellidos}` } })]
        this.setState({
            conductores : options
        })
    }

    getBusTipos = async () => {
        const { data } = await axios.get(`${baseurl}/busTipo/`)
        let options = [...this.seleccione, ...data.map((r) => { return { value : r.id, label : r.nombre } })]
        this.setState({
            busTipos : options
        })
    }

    getBusTipoServicios = async () => {
        const { data } = await axios.get(`${baseurl}/busTipoServicio/`)
        let options = [...this.seleccione, ...data.map((r) => { return { value : r.id, label : r.nombre } })]
        this.setState({
            busTiposServicios : options
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
                return axios.post(`${baseurl}/bus/${id ? `${id}/` : ``}`, data)
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
                this.props.history.push('/cooperativas/buses/')
            }
        })
    }

    render(){
        const { data, cooperativas, marcas, distribucion, busTiposServicios, busTipos, propietarios, conductores } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Bus</CardTitle>
                                <CardBody>
                                    <MainView {...data} onChange={this.onChange} cooperativas={cooperativas} marcas={marcas} distribucion={distribucion} busTiposServicios={busTiposServicios} busTipos={busTipos} propietarios={propietarios} conductores={conductores} />
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

export default EditBuses
