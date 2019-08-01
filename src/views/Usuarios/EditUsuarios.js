import React from 'react'
import { Button, FormGroup, Input, Label, EditPage, Select, FormElementValidate, FormValidate } from './../../temeforest'
import EditPersona from './../Cooperativas/EditPersona'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import AddRol from './AddRol'
import AddRolCooperativa from './AddRolCooperativa'

const endpoint = 'usuario'
const urlFront = '/usuarios/usuarios'


class RowRol extends React.Component {

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
                    {this.props.rol_nombre}
                </td>
            </tr>
        )
    }
}

class RowCooperativa extends React.Component {

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
                    {this.props.cooperativa_nombre}
                </td>
                <td>{this.props.rol_nombre}</td>
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
            tipo : 1,
            persona : {},
            readOnlyPersona : true
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
        this.addRol = this.addRol.bind(this)
        this.onChange = this.onChange.bind(this)
        this.deleteRol = this.deleteRol.bind(this)
        this.agregarRol = this.agregarRol.bind(this)
        this.addCooperativa = this.addCooperativa.bind(this)
        this.onChangePersona = this.onChangePersona.bind(this)
        this.agregarCooperativa = this.agregarCooperativa.bind(this)
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
    onChangeData = (name, value) => {
        this.setState({
            data : {
                ...this.state.data,
                [name]: value
            }
        })
    }

    searchPersona = async (identificacion) => {
        const { data } = await axios.get(`${baseurl}/persona/?identificacion=${identificacion}`)
        if(data.length > 0){
            this.setState({
                data : {
                    ...this.state.data,
                    persona: data[0],
                }
            })
            return true
        }
        return false
    }

    editPersona(data = {}){
        this.onChangeData('readOnlyPersona', false)
        this.onChangeData('persona', data)
    }

    readOnlyPersona(){
        this.onChangeData('readOnlyPersona', true)
    }

    async onChangePersona(data){
        this.onChangeData('persona', data)
        if(data.identificacion !== this.state.data.persona.identificacion){
            let success = await this.searchPersona(data.identificacion)
            if(!success){
                this.onChangeData('persona', { identificacion: data.identificacion })

                if(data.identificacion.length === 13){
                    this.editPersona({ identificacion: data.identificacion })
                }else{
                    this.readOnlyPersona()
                }
            }
        }
    }

    addRol(){
        this.setState({
            modal_rol : {
                ...this.state.modal_rol,
                show : true
            }
        })
    }

    toggleModal = (show = null) => {
        this.setState({
            modal_rol : {
                ...this.state.modal_rol,
                show : show !== null ? show : !this.state.modal_rol.show
            }
        })
    }

    agregarRol(data){
        let roles = this.state.data.roles
        roles.push(data)
        this.setValue('roles', roles)
        this.toggleModal(false)
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

    addCooperativa(){
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
        this.onChangeData('roles_cooperativa', roles_cooperativa)
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
            this.onChangeData('roles_cooperativa', roles_cooperativa)
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
                        <EditPersona data={this.state.data.persona} readOnly={this.state.data.readOnlyPersona} onChange={this.onChangePersona} />
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
                                                    { data.roles.map((r, i) => <RowRol {...r} key={`rol_${i}`} delete={() => this.deleteRol(i)} />) }
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
                                                    { data.roles_cooperativa.map((r, i) => <RowCooperativa {...r} key={i} delete={() => this.deleteCooperativa(i)} />) }
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
                        <AddRol guardar={this.agregarRol} {...this.state.modal_rol} toggle={this.toggleModal} />
                        <AddRolCooperativa guardar={this.agregarCooperativa} {...this.state.modal_cooperativa} toggle={this.toggleModalCooperativa} />
                    </FormValidate>
                </div>
            </EditPage>
        )
    }
}

export default EditUsuarios