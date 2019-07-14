import React from 'react'
import { Button, FormGroup, Input, Label, EditPage } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import AddRolUsuario from './AddRolUsuario'

const endpoint = 'usuario'
const urlFront = '/usuarios/usuarios'


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
                    {this.props.name}
                </td>
                <td>{this.props.name}</td>
            </tr>
        )
    }
}

class EditUsuarios extends React.Component {

    state = {
        id : null,
        data : {
            roles: []
        },
        modal : {
            show : false
        }
    }

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.addRol = this.addRol.bind(this)
        this.agregarRol = this.agregarRol.bind(this)
        this.deleteRol = this.deleteRol.bind(this)
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}/`)
        this.setState({
            id,
            data
        })
    }

    setValue = (name, value) => {
        this.setState({
            data : {
                ...this.state.data,
                [name] : value
            }
        })
    }

    onChange = name => (e) => {
        this.setValue(name, e.target.value)
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
        let roles = this.state.data.roles
        roles.push(data)
        this.setValue('roles', roles)
        this.toggleModal()
    }

    deleteRol = async (index) => {
        const {value} = await Swal.fire({
            title: 'Confirmar',
            text : '¿Seguro de borrar?',
            showCancelButton: true,
        })
        if(value){
            let roles = this.state.data.roles
            roles.splice(index, 1)
            this.setValue('roles', roles)
        }
    }

    render(){
        const { data, id } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Usuario`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <div>
                    <form className="mt-4 form-horizontal">
                        <FormGroup className="row">
                            <Label className="col-sm-3">Usuario</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('username')} value={data.username} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Identificación</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('cedula')} value={data.cedula} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Nombre</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('first_name')} value={data.first_name} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Apellidos</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('last_name')} value={data.last_name} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Correo</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('email')} value={data.email} />
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
                                            { data.roles.map((r, i) => <_Row {...r} key={i} delete={() => this.deleteRol(i)} />) }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </FormGroup>
                    </form>
                    <AddRolUsuario guardar={this.agregarRol} {...this.state.modal} toggle={this.toggleModal} />
                </div>
            </EditPage>
        )
    }
}

export default EditUsuarios