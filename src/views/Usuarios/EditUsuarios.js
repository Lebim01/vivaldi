import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Label } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import AddRolUsuario from './AddRolUsuario'


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
            <tr>
                <td>
                    <Button outline={true} type="danger" size="sm" rounded={true} onClick={this.delete}>
                        <i className="fa fa-times"></i>
                    </Button>{' '}
                     {/*this.props.cooperativa_nombre*/}
                    {this.props.name}
                </td>
                <td>{this.props.name}</td>
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
        this.addRol = this.addRol.bind(this)
        this.agregarRol = this.agregarRol.bind(this)
        this.deleteRol = this.deleteRol.bind(this)
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    addRol(){
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

    agregarRol(data){
        let roles = this.props.roles
        roles.push(data)
        this.props.onChange('roles', roles)
        this.toggleModal()
    }

    deleteRol = async (index) => {
        const {value} = await Swal.fire({
            title: 'Confirmar',
            text : '¿Seguro de borrar?',
            showCancelButton: true,
        })
        if(value){
            let roles = this.props.roles
            roles.splice(index, 1)
            this.props.onChange('roles', roles)
        }
    }

    render(){
        const { roles } = this.props
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Usuario</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('username')} value={this.props.username} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Identificación</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('cedula')} value={this.props.cedula} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Nombre</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('first_name')} value={this.props.first_name} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Apellidos</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('last_name')} value={this.props.last_name} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Correo</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('email')} value={this.props.email} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div class="col-sm-1">&nbsp;</div>
                        <Label className="col-sm-3 col-sm-offset-3">
                            Roles
                            <Button size="sm" style={{marginLeft:5}} onClick={this.addRol}>
                                <i className="fa fa-plus"></i>
                            </Button>
                        </Label>
                    </FormGroup>
                    <FormGroup className="row">
                        <div class="col-sm-3">&nbsp;</div>
                        <div className="col-sm-6 col-sm-offset-3">
                            <div className="table-responsive">
                                <table className="table table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Cooperativa</th>
                                            <th scope="col">Rol</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { roles.map((r, i) => <_Row {...r} key={i} delete={() => this.deleteRol(i)} />) }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </FormGroup>
                </form>
                <AddRolUsuario guardar={this.agregarRol} {...this.state.modal} toggle={this.toggleModal} />
            </div>
        )
    }
}

class EditUsuarios extends React.Component {

    state = {
        id : null,
        data : {
            roles: []
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
        const { data } = await axios.get(`${baseurl}/usuario/${id}/`)
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
                return axios.post(`${baseurl}/usuario/${id ? `${id}/` : ``}`, data)
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
                this.props.history.push('/usuarios/usuarios/')
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
                                <CardTitle>Crear/Editar Usuario</CardTitle>
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

export default EditUsuarios