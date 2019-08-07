import React from 'react'
import { Button, FormGroup, Input, Label, EditPage, Select, FormElementValidate, FormValidate } from './../../temeforest'
import EditPersona from './../Cooperativas/EditPersona'
import { baseurl, baseMediaUrl, getParameter } from './../../utils/url'
import { fileToBase64 } from './../../utils/file'
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
                    {this.props.name}
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

    constructor(props){
        super(props)
        this.addRol = this.addRol.bind(this)
        this.onChange = this.onChange.bind(this)
        this.deleteRol = this.deleteRol.bind(this)
        this.agregarRol = this.agregarRol.bind(this)
        this.onChangeFile = this.onChangeFile.bind(this)
        this.addCooperativa = this.addCooperativa.bind(this)
        this.onChangePersona = this.onChangePersona.bind(this)
        this.deleteRolCooperativa = this.deleteRolCooperativa.bind(this)
        this.agregarRolCooperativa = this.agregarRolCooperativa.bind(this)
        this.toggleModalCooperativa = this.toggleModalCooperativa.bind(this)
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

    setValue = (name, value) => {
        this.setState({
            data : {
                ...this.state.data,
                [name] : value
            }
        })
    }

    onChange = name => (e) => {
        let data = {
            [name] : e.target.value
        }
        if(name === 'tipo'){
            data.roles = []
            if(e.target.value === 1){
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

    async onChangePersona(data){
        if(data.identificacion !== this.state.data.persona.identificacion){
            if(data.identificacion.length === 10){
                let success = await this.searchPersona(data.identificacion)
                if(!success){
                    this.onChangeData('persona', { identificacion: data.identificacion })
                    this.readOnlyPersona()
                }else{
                    this.editPersona({ identificacion: data.identificacion })
                }
            }else{
                this.readOnlyPersona()
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

    // rol
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
        this.onChangeData('roles', roles)
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
            this.onChangeData('roles', roles)
        }
    }

    // cooperativa
    addCooperativa(){
        this.setState({
            modal_cooperativa : {
                ...this.state.modal_cooperativa,
                show : true
            }
        })
    }

    toggleModalCooperativa = (show = null) => {
        let _modal = this.state.modal_cooperativa
        _modal.show = !_modal.show
        this.setState({
            modal_cooperativa : _modal,
            show : show !== null ? show : !this.state.modal_cooperativa.show
        })
    }

    agregarRolCooperativa(data){
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
    UploadFile = (e) => {
        let el = document.getElementById("documentation");
        if (el) {
            el.click();
        }
    }
    DownloadFile = (url) => {
        if (url){
            let file_path = baseMediaUrl + url;
            let a = document.createElement('A');
            a.target = '_blank';
            a.download = true;
            a.href = file_path;
            a.click()
        }
    }
    canDownload = (url) => {
        if(url && url.includes('none')){
            return true
        }
        return false
    }

    resetPassword(){
        Swal.fire({
            title: 'Confirmar Restablecer contraseña',
            text : '¿Seguro de restablecer?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${baseurl}/password_reset/`, { email: this._data.persona.correo })
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
                    text : `Contraseña restablecida`,
                    type : 'success'
                })
            }
        })
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
                                        { id && <Button onClick={this.resetPassword.bind(this)} disabled={!id || this.state.reset || !this.state.data.persona.correo}>Restablecer contraseña</Button> }
                                    </div>
                                )
                            }}
                        />
                        <EditPersona lengthCedula={10} data={this.state.data.persona} readOnly={this.state.data.readOnlyPersona} onChange={this.onChangePersona} />
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
                                                    { data.roles_cooperativa.map((r, i) => <RowCooperativa {...r} key={i} delete={() => this.deleteRolCooperativa(i)} />) }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-3">
                                        <Input id="documentation" type="file" style={{display:'none'}} onChange={this._onChangeFile}/>
                                        <Button type="success" style={{marginRight:5}} onClick={this.UploadFile}>Subir Documentación</Button>
                                    </div>
                                    <div className="col-sm-3" style={{marginLeft: 5}}>
                                        { this.state.data.documentacion_url &&
                                            <Button type="success" style={{marginLeft:5}} onClick={() => this.DownloadFile(this.state.data.documentacion_url)} disabled={this.canDownload(this.state.data.documentacion_url)}>Ver Documentación</Button>
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
