import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Label, Select } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import { generateHexadecimal } from './../../utils/string'
import axios from 'axios'
import Swal from 'sweetalert2'
import AddCooperativaPuntoVentaModal from './AddCooperativaPuntoVentaModal'

class _Row extends React.Component {

    constructor(props){
        super(props)
        this.delete = this.delete.bind(this)
    }

    delete(){
        if(this.props.delete){
            this.props.delete()
        }
    }

    render(){
        return (
            <tr onDoubleClick={this.props.onDoubleClick}>
                <td>
                    <Button outline={true} type="danger" size="sm" rounded={true} onClick={this.delete}>
                        <i className="fa fa-times"></i>
                    </Button>{' '}
                    {this.props.cooperativa_nombre}
                </td>
                <td>{this.props.punto_emision_tasa}</td>
                <td>{this.props.secuencia_tasa}</td>
                <td>{this.props.punto_emision_boleto}</td>
                <td>{this.props.secuencia_boleto}</td>
                <td>{this.props.punto_emision_nota_credito}</td>
                <td>{this.props.secuencia_nota_credito}</td>
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
    constructor(props){
        super(props)
        this.addCooperativa = this.addCooperativa.bind(this)
        this.agregarCooperativa = this.agregarCooperativa.bind(this)
        this.deleteCooperativa = this.deleteCooperativa.bind(this)
        this.editCooperativa = this.editCooperativa.bind(this)
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    addCooperativa(){
        this.setState({
            modal : {
                ...this.state.modal,
                show : true
            }
        })
    }

    toggleModal = () => {
        let _modal = this.state.modal
        _modal.show = !_modal.show
        this.setState({
            modal : _modal
        })
    }

    agregarCooperativa(data){
        let puntoventa_cooperativas = this.props.puntoventa_cooperativas
        if(data.id){
            for(let i = 0; i < puntoventa_cooperativas.length; i++){
                if(puntoventa_cooperativas[i].id === data.id){
                    puntoventa_cooperativas[i] = data
                    break
                }
            }
        }else{
            puntoventa_cooperativas.push(data)
        }
        this.props.onChange('puntoventa_cooperativas', puntoventa_cooperativas)
        this.toggleModal()
    }

    deleteCooperativa = async (index) => {
        const {value} = await Swal.fire({
            title: 'Confirmar',
            text : '¿Seguro de borrar?',
            showCancelButton: true,
        })
        if(value){
            let puntoventa_cooperativas = this.props.puntoventa_cooperativas
            puntoventa_cooperativas.splice(index, 1)
            this.props.onChange('puntoventa_cooperativas', puntoventa_cooperativas)
        }
    }

    editCooperativa = (row) => {
        let modal = {
            show : true,
            ...row
        }
        this.setState({
            modal,
        })
    }

    generateHexadecimal(){
        this.props.onChange('api_key', generateHexadecimal(32))
    }

    render(){
        const { localidades, puntoventa_cooperativas } = this.props
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Descripción</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('descripcion')} value={this.props.descripcion} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Api Key</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('api_key')} value={this.props.api_key} readOnly />
                        </div>
                        <div className="col-sm-3">
                            <Button onClick={this.generateHexadecimal.bind(this)}>Generar</Button>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Localidad</Label>
                        <div className="col-sm-5">
                            <Select options={localidades} onChange={this.onChange('localidad')} value={this.props.localidad} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Dirección IP</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('ip')} value={this.props.ip} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-4">
                            Cooperativas e Información tribunaria
                            <Button size="sm" style={{marginLeft:5}} onClick={this.addCooperativa}>
                                <i className="fa fa-plus"></i>
                            </Button>
                        </Label>
                        <div className="col-sm-12">
                            <div className="table-responsive">
                                <table className="table table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Cooperativa</th>
                                            <th scope="col">Punto<br/>(tasa)</th>
                                            <th scope="col">Secuencia<br/>(tasa)</th>
                                            <th scope="col">Punto<br/>(boleto)</th>
                                            <th scope="col">Secuencia<br/>(boleto)</th>
                                            <th scope="col">Punto<br/>(nota de crédito)</th>
                                            <th scope="col">Secuencia<br/>(nota de crédito)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { puntoventa_cooperativas.map((r, i) => <_Row {...r} onDoubleClick={() => this.editCooperativa(r)} key={i} delete={() => this.deleteCooperativa(i)} />) }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </FormGroup>
                </form>
                <AddCooperativaPuntoVentaModal 
                    guardar={this.agregarCooperativa} 
                    {...this.state.modal} 
                    toggle={this.toggleModal} 
                />
            </div>
        )
    }
}

class EditPuntoVenta extends React.Component {

    seleccione = [{label:'Seleccione', value:''}]
    state = {
        data:{
            puntoventa_cooperativas : []
        }, 
        localidades:[]
    }

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.confirmSave = this.confirmSave.bind(this)
        this.getLocalidades = this.getLocalidades.bind(this)
    }

    componentDidMount(){
        this.getLocalidades()
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/venta/puntoventa/${id}/`)
        this.setState({
            id,
            data
        })
    }

    getLocalidades = async () => {
        const { data } = await axios.get(`${baseurl}/localidad/`)
        this.setState({
            localidades : [...this.seleccione, ...data.map((row) => { return { label: row.nombre, value: row.id } })]
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
        data.cooperativas = data.puntoventa_cooperativas.map((r) => r.cooperativa)
        Swal.fire({
            title: 'Confirmar Guardar',
            text : '¿Seguro de guardar?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${baseurl}/venta/puntoventa/${id ? `${id}/` : ``}`, data)
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
                this.props.history.push('/cooperativas/punto-venta/')
            }
        })
    }

    confirmDelete(){
        const { id, data } = this.state
        if(id){
            Swal.fire({
                title: 'Confirmar Eliminar',
                text : '¿Seguro de eliminar?',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return axios.delete(`${baseurl}/venta/puntoventa/${id}`, data)
                    .then(response => {
                        if (response.status !== 204) {
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
            }).then(() => {
                Swal.fire({
                    text : `Eliminado`,
                    type : 'success'
                })
                this.props.history.push('/cooperativas/punto-venta/')
            })
        }
    }

    render(){
        const { id, data, localidades } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Punto de Venta</CardTitle>
                                <CardBody>
                                    <MainView {...data} localidades={localidades} onChange={this.onChange} />
                                </CardBody>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <Button type="success" style={{marginRight:5}} onClick={() => this.confirmSave() }>Guardar</Button>
                                        <Button type="danger" style={{marginLeft:5}} disabled={!id} onClick={() => this.confirmDelete()}>Eliminar</Button>
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

export default EditPuntoVenta