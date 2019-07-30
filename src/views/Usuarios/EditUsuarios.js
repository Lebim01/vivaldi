import React from 'react'
import { Button, FormGroup, Input, Label, EditPage, Select, FormElementValidate, FormValidate } from './../../temeforest'
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
            </tr>
        )
    }
}

class _RowCooperativa extends React.Component {

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
                <td>{this.props.rol}</td>
            </tr>
        )
    }
}

class EditUsuarios extends React.Component {

    state = {
        id : null,
        data : {
            roles: [],
            roles_cooperativa: [],
            tipo : 1
        },
        modal_rol : {
            show : false
        },
        modal_cooperativa : {
            show : false
        }
    }

    tipos = [
        {value:1, label:'Administrativo'},
        {value:2, label:'Cooperativa'},
    ]

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
            modal_rol : {
                ...this.state.modal_rol,
                show : true
            }
        })
    }

    toggleModal = () => {
        let _modal = this.state.modal_rol
        _modal.show = !_modal.show
        this.setState({
            modal_rol : _modal
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

    addRol(){
        this.setState({
            modal_cooperativa : {
                ...this.state.modal_cooperativa,
                show : true
            }
        })
    }


    toggleModalCooperativa = () => {
        let _modal = this.state.modal_cooperativa
        _modal.show = !_modal.show
        this.setState({
            modal_cooperativa : _modal
        })
    }

    agregarCooperativa(data){
        let roles_cooperativa = this.state.data.roles_cooperativa
        roles_cooperativa.push(data)
        this.setValue('roles_cooperativa', roles_cooperativa)
        this.toggleModalCooperativa()
    }

    deleteCooperativa = async (index) => {
        const {value} = await Swal.fire({
            title: 'Confirmar',
            text : '¿Seguro de borrar?',
            showCancelButton: true,
        })
        if(value){
            let roles_cooperativa = this.state.data.roles_cooperativa
            roles_cooperativa.splice(index, 1)
            this.setValue('roles_cooperativa', roles_cooperativa)
        }
    }

    render(){
        const { data, id } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Usuario`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <div>
                    <FormValidate className="mt-4 form-horizontal">
                        <FormGroup className="row">
                            <Label className="col-sm-3">Usuario</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('username')} value={data.username} />
                            </div>
                        </FormGroup>
                        <FormElementValidate
                            label={{text:'Identificación'}}
                            input={{
                                name : 'cedula',
                                element: <Input onChange={this.onChange('cedula')} value={data.cedula} />
                            }}
                            validator={{
                                validationRules: {required:true, minLength:10, maxLength:10},
                                validationMessages: {required:"El campo es requerido", minLength:'El valor debe ser de 10 dígitos', maxLength:'El valor debe ser de 10 dígitos'}
                            }}
                        />
                        <FormElementValidate
                            label={{text:'Nombre'}}
                            input={{
                                name : 'first_name',
                                element: <Input onChange={this.onChange('first_name')} value={data.first_name} />
                            }}
                            validator={{
                                validationRules: {required:true, minLength:30, maxLength:30},
                                validationMessages: {required:"El campo es requerido", minLength:'', maxLength:'El valor debe ser máximo de 30 dígitos'}
                            }}
                        />
                        <FormElementValidate
                            label={{text:'Apellidos'}}
                            input={{
                                name : 'last_name',
                                element: <Input onChange={this.onChange('last_name')} value={data.last_name} />
                            }}
                            validator={{
                                validationRules: {required:true, minLength:30, maxLength:30},
                                validationMessages: {required:"El campo es requerido", minLength:'', maxLength:'El valor debe ser máximo de 150 dígitos'}
                            }}
                        />
                        <FormElementValidate
                            label={{text:'Correo'}}
                            input={{
                                name : 'correo',
                                element: <Input placeholder="example@gmail.com" onChange={this.onChange('email')} value={data.email} />
                            }}
                            validator={{
                                validationRules: { email: true },
                                validationMessages : { email: "El valor debe ser un correo" }
                            }}
                        />
                        <FormGroup className="row">
                            <Label className="col-sm-3">Contraseña</Label>
                            <div className="col-sm-5">
                                
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Tipo</Label>
                            <div className="col-sm-5">
                                <Select onChange={this.onChange('tipo')} value={data.tipo} options={this.tipos} />
                            </div>
                        </FormGroup>
                        { data.tipo == 1 &&
                            <div>
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
                            </div>
                        }
                        { data.tipo == 2 &&
                            <div>
                                <FormGroup className="row">
                                    <div class="col-sm-1">&nbsp;</div>
                                    <Label className="col-sm-3 col-sm-offset-3">
                                        Cooperativas
                                        <Button size="sm" style={{marginLeft:5}} onClick={this.addCooperativa}>
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
                                                        <th scope="col">Cooperativas</th>
                                                        <th scope="col">Rol</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { data.roles_cooperativa.map((r, i) => <_RowCooperativa {...r} key={i} delete={() => this.deleteCooperativa(i)} />) }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-3">
                                        <Button size="md">
                                            Subir Documentación
                                        </Button>
                                    </div>
                                    <div className="col-sm-3" style={{marginLeft: 5}}>
                                        <Button size="md">
                                            Descargar Documentación
                                        </Button>
                                    </div>
                                </FormGroup>
                            </div>
                        }
                        <AddRolUsuario guardar={this.agregarRol} {...this.state.modal} toggle={this.toggleModal} />
                    </FormValidate>
                </div>
            </EditPage>
        )
    }
}

export default EditUsuarios