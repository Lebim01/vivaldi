import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Select, Label, ListGroup, ListItem, DualList } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import AddPuertaModal from './PuertaModal'
import 'react-dual-listbox/lib/react-dual-listbox.css';

/*
 * Traer localidades
 * onchangelocalidades
 * traerniveles, filtrar por id localidad
 * traersilos filtrar por id localidad
 * crear puertas_acceso
 *
*/
class ListSilos extends React.Component {
    render(){
        const { silos } = this.props
        return (
            <FormGroup className="row">
                <div className="col-sm-10">
                    <DualList options={silos} onChange={this.props.onChange} selected={this.props.selected} />
                </div>
            </FormGroup>
        )
    }
}


class RecordRow extends React.Component {

    delete(){
        if(this.props.delete){
            this.props.delete(this.props.index)
        }
    }

    render(){
        return (
            <tr onDoubleClick={this.props.edit}>
                <td>{this.props.numero}</td>
                <td>
                    <Button outline={true} type="danger" size="sm" rounded={true} onClick={this.delete.bind(this)}>
                        <i className="fa fa-times"></i>
                    </Button>{' '}
                </td>
            </tr>
        )
    }
}

class MainView extends React.Component {

    seleccione = [{label:'Seleccione', value:''}]
    state = {
        modal : {
            show : false
        },
        niveles : []
    }
    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id'
    }


    optionsNivel = {
        url : `${baseurl}/localidad_nivel/?localidad=${this.props.localidad_id ? `${this.props.localidad_id}/` : ''}`,
        labelName: 'nombre',
        valueName: 'id'
    }

    optionsSilos = {
        url : `${baseurl}/silo/`,
        labelName: 'descripcion',
        valueName: 'id'
    }

    constructor(props){
        super(props)
        this.toggleModal = this.toggleModal.bind(this)
        this.agregarPuerta = this.agregarPuerta.bind(this)
        this.getNiveles = this.getNiveles.bind(this)
        this.deletePuerta = this.deletePuerta.bind(this)
        this.getSilos = this.getSilos.bind(this)
        this.toggleSilos = this.toggleSilos.bind(this)
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            let value = e.target.value
            this.props.onChange(name, value)
        }
    }

    onChangeLocalidad = name => (e) => {
        if(this.props.onChange){
          this.getNiveles(e.target.value)
        }
    }

    getNiveles = async (id)  => {
        const { data } = await axios.get(`${baseurl}/localidadnivel/?localidad=${id}`)
        let options = [...this.seleccione, ...data.map((r) => { return { value : r.id, label : r.nombre } })]
        this.setState({
          niveles : options
        })

    }

    getSilos = async ()  => {
        const { data } = await axios.get(`${baseurl}/silo/`)
        let options = [...data.map((r) => { return { value : r.id, label : r.descripcion } })]
        this.setState({
          silos : options
        })
    }

    componentDidMount(){
      this.getSilos()
    }


    onChangePuerta = index => name => (e) => {
        let puertas_acceso = this.props.puertas_acceso
        let value = e.target.value
        if(name == 'is_enable') value = e.target.checked
        puertas_acceso[index][name] = value
        this.props.onChange('puertas_acceso', puertas_acceso)
    }

    toggleModal = (data = {}) => {
        let _modal = this.state.modal
        _modal.show = !_modal.show
        _modal.data = data
        this.setState({
            modal : _modal
        })
    }

    agregarPuerta({ onChange, ...data }){
        let puertas_acceso = this.props.puertas_acceso
        let _continue = !puertas_acceso.some((r, i) => r.numero == data.numero && r.id != data.id && i != data.index)
        if(!_continue){
            return false
        }

        if(data.id){
            for(let i in puertas_acceso){
                if(puertas_acceso[i].id == data.id){
                    puertas_acceso[i] = data
                    break
                }
            }
        }
        else if(data.index){
            puertas_acceso[data.index] = data
        }
        else {
            puertas_acceso.push({ ...data, is_enable: true })
        }
        this.props.onChange('puertas_acceso', puertas_acceso)
        this.toggleModal({})
        return true
    }

    deletePuerta = async (index) => {
        const { value } = await Swal.fire({
            title: 'Borrar puerta',
            text: '¿Esta seguro de eliminar?',
            showCancelButton: true
        })
        if(value){
            let puertas_acceso = this.props.puertas_acceso
            puertas_acceso.splice(index, 1)
            this.props.onChange('puertas_acceso', puertas_acceso)
        }
    }

    editPuerta(data){
        this.toggleModal({ ...data })
    }

    toggleSilos(selected){
        this.props.onChange('silos', selected)
    }

    render(){
        const { niveles, silos } = this.state
        const { puertas_acceso }  = this.props
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Descripcion</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('descripcion')} value={this.props.descripcion} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Localidad</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChangeLocalidad('localidad')} value={this.props.localidad} asyncOptions={this.optionsLocalidad} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Nivel</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('localidad_nivel')} value={this.props.localidad_nivel} options={niveles} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Silos</Label>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">
                            <ListSilos
                                selected={this.props.silos}
                                onChange={this.toggleSilos}
                                silos={silos}
                            />
                        </div>
                    </FormGroup>
                    <AddPuertaModal
                        guardar={(data) => this.agregarPuerta(data)}
                        {...this.state.modal}
                        toggle={this.toggleModal}
                    />
                    <FormGroup className="row">
                        <h4>
                            Puertas
                            <Button style={{marginLeft: 10}} onClick={this.toggleModal}>
                                <i className="fa fa-plus"></i>
                            </Button>
                        </h4>
                        <div className="col-sm-12">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>N&uacute;mero</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.props.puertas_acceso.map((record, i) =>
                                        <RecordRow
                                            key={i}
                                            index={i}
                                            {...record}
                                            onChange={this.onChangePuerta(i)}
                                            delete={this.deletePuerta}
                                            edit={() => this.editPuerta({ ...record, index: i })}
                                        />
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

class EditAndenes extends React.Component {

    state = {
        id : null,
        data : {
            puertas_acceso: []
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
        const { data } = await axios.get(`${baseurl}/anden/${id}/`)
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
                return axios.post(`${baseurl}/anden/${id ? `${id}/` : ''}`, data)
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
                this.props.history.push('/localidades/andenes/')
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
                                <CardTitle>Crear/Editar Andenes</CardTitle>
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

export default EditAndenes
