import React from 'react'
import { Button, FormGroup, Input, Label, EditPage, Select, FormElementValidate, FormValidate } from 'temeforest'
import EditPersona from './../Cooperativas/EditPersona'
import { baseurl, getParameter, canDownload, downloadFile } from 'utils/url'
import { fileToBase64 } from 'utils/file'
import { confirmEndpoint } from 'utils/dialog'
import axios from 'axios'
import Swal from 'sweetalert2'
import AddRol from './AddRol'
import AddRolCooperativa from './AddRolCooperativa'

const endpoint = 'usuario'
const urlFront = '/usuarios/usuarios'

class RowRol extends React.Component {

    delete = () => {
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

class RowCooperativa extends React.Component {

    delete = () => {
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
                <td>{this.props.tipo_usuario_puntoventa_nombre}</td>
            </tr>
        )
    }
}

class EditUsuarios extends React.Component {

    _data = {}
    state = {
        id : null,
        data : {
            roles: [],
            roles_cooperativa: [],
            tipo : 1,
            persona : {},
            readOnlyPersona : true,
            documentacion : 'none'
        },
        modal_rol : {
            show : false
        },
        modal_cooperativa : {
            show : false
        },
        reset : false
    }

    tipos = [
        {value:1, label:'Administrativo'},
        {value:2, label:'Cooperativa'},
    ]

    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName : 'nombre',
        valueName : 'id'
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}/`)
        this._data = data
        this.setState({
            id,
            data
        })
    }

    onChange = name => (e) => {
        let data = {
            [name] : e.target.value
        }
        if(name === 'tipo'){
            data.roles = []
            data.roles_cooperativa = []
            if(e.target.value === 2){
                data.localidad = 'none'
                data.documentacion = 'none'
            }
        }
        this.setState({ 
            data : {
                ...this.state.data,
                ...data
            }
        })
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

    onChangePersona = async (data) => {
        this.onChangeData('persona', data)
    }

    // rol
    toggleModal = (show = null) => {
        this.setState({
            modal_rol : {
                ...this.state.modal_rol,
                show : show !== null ? show : !this.state.modal_rol.show
            }
        })
    }

    agregarRol = (data) => {
        // if rol is not selected
        if(!this.state.data.roles.some((r) => Number(r.id) === Number(data.id))){
            let roles = this.state.data.roles
            roles.push(data)
            this.onChangeData('roles', roles)
            this.toggleModal(false)
        }
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
            this.onChangeData('roles', roles)
        }
    }

    // cooperativa
    toggleModalCooperativa = (show = null) => {
        let _modal = this.state.modal_cooperativa
        _modal.show = !_modal.show
        this.setState({
            modal_cooperativa : _modal,
            show : show !== null ? show : !this.state.modal_cooperativa.show
        })
    }

    agregarRolCooperativa = (data) => {
        let roles = this.state.data.roles_cooperativa
        roles.push(data)
        this.onChangeData('roles_cooperativa', roles)
        this.toggleModalCooperativa(false)
    }

    deleteRolCooperativa = async (index) => {
        const {value} = await Swal.fire({
            title: 'Confirmar',
            text : '¿Seguro de borrar?',
            showCancelButton: true,
        })
        if(value){
            let roles = this.state.data.roles_cooperativa
            roles.splice(index, 1)
            this.onChangeData('roles_cooperativa', roles)
        }
    }

    onChangeFile = async (value) => {
        try {
            let data = this.state.data
            data.documentacion = await fileToBase64(value)
            this.setState({
                data
            })
        }catch(e){
            Swal.fire('Subir archivo', 'Hubo algún problema al querer subir el archivo', 'error')
        }
    }

    _onChangeFile = (e) => {
        if(this.onChangeFile){
            this.onChangeFile(e.target.files[0])
        }
    }

    uploadFile = (e) => {
        let el = document.getElementById("documentation");
        if (el) {
            el.click();
        }
    }

    resetPassword = async () => {
        const options = {
            text: '¿Seguro de restablecer?',
            endpoint: 'password_reset',
            params : {
                email: this._data.persona.correo
            }
        }

        if(await confirmEndpoint(options)){
            Swal.fire({
                text : `Contraseña restablecida`,
                type : 'success'
            })
        }
    }

    render(){
        const { data, id } = this.state
        
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Usuario`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <div>
                    <FormValidate className="mt-4 form-horizontal">
                        <FormElementValidate
                            label={{text:'Usuario'}}
                            input={{
                                name : 'username',
                                element: <Input onChange={this.onChange('username')} value={data.username} />
                            }}
                            validator={{
                                validationRules: {required:true},
                                validationMessages: {required:"El campo es requerido"}
                            }}
                        />
                        <FormElementValidate
                            label={{text:'Contraseña'}}
                            input={{
                                name : 'password',
                                element: (
                                    <div>
                                        <Input onChange={this.onChange('password')} value={data.password} type="password"/>
                                        { id && <Button onClick={this.resetPassword.bind(this)} disabled={!id || this.state.reset || !this.state.data.persona || (this.state.data.persona && !this.state.data.persona.correo)}>Restablecer contraseña</Button> }
                                    </div>
                                )
                            }}
                        />
                        <EditPersona 
                            lengthCedula={10} 
                            id={this.state.data.persona ? this.state.data.persona.id : null} 
                            persona={this.state.data.persona}
                            readOnly={this.state.data.readOnlyPersona} 
                            onChange={this.onChangePersona} 
                        />
                        <FormGroup className="row">
                            <Label className="col-sm-3">Tipo</Label>
                            <div className="col-sm-5">
                                <Select onChange={this.onChange('tipo')} value={data.tipo} options={this.tipos} />
                            </div>
                        </FormGroup>
                        { Number(data.tipo) === 1 &&
                            <FormGroup className="row">
                                <Label className="col-sm-3">Localidad</Label>
                                <div className="col-sm-5">
                                    <Select onChange={this.onChange('localidad')} value={data.localidad} asyncOptions={this.optionsLocalidad} />
                                </div>
                            </FormGroup>
                        }
                        { Number(data.tipo) === 1 &&
                            <div>
                                <FormGroup className="row">
                                    <div className="col-sm-1">&nbsp;</div>
                                    <Label className="col-sm-3 col-sm-offset-3">
                                        Roles
                                        <Button size="sm" style={{marginLeft:5}} onClick={() => this.toggleModal(true)}>
                                            <i className="fa fa-plus"></i>
                                        </Button>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="row">
                                    <div className="col-sm-3">&nbsp;</div>
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
                        { Number(data.tipo) === 2 &&
                            <div>
                                <FormGroup className="row">
                                    <div className="col-sm-1">&nbsp;</div>
                                    <Label className="col-sm-3 col-sm-offset-3">
                                        Cooperativas
                                        <Button size="sm" style={{marginLeft:5}} onClick={() => this.toggleModalCooperativa(true)}>
                                            <i className="fa fa-plus"></i>
                                        </Button>
                                    </Label>
                                </FormGroup>
                                <FormGroup className="row">
                                    <div className="col-sm-3">&nbsp;</div>
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
                                                    { data.roles_cooperativa.map((r, i) => <RowCooperativa {...r} key={i} delete={() => this.deleteRolCooperativa(i)} />) }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-3 text-right">
                                        <input id="documentation" type="file" style={{display:'none'}} onChange={this._onChangeFile}/>
                                        <Button type="success" style={{marginRight:5}} onClick={this.uploadFile}>Subir Documentación</Button>
                                    </div>
                                    <div className="col-sm-3" style={{marginLeft: 5}}>
                                        { this.state.data.documentacion_url &&
                                            <Button 
                                                type="success" 
                                                style={{marginLeft:5}} 
                                                onClick={() => downloadFile(this.state.data.documentacion_url)} 
                                                disabled={canDownload(this.state.data.documentacion_url)}
                                            >
                                                Ver Documentación
                                            </Button>
                                        }
                                    </div>
                                </FormGroup>
                            </div>
                        }
                        <AddRol guardar={this.agregarRol} {...this.state.modal_rol} toggle={this.toggleModal} />
                        <AddRolCooperativa guardar={this.agregarRolCooperativa} {...this.state.modal_cooperativa} toggle={this.toggleModalCooperativa} />
                    </FormValidate>
                </div>
            </EditPage>
        )
    }
}

export default EditUsuarios
