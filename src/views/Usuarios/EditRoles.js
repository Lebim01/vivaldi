import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Label } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'

class _Row extends React.Component {
    render(){
        const { type, view, add, change, permissions } = this.props
        return (
            <tr>
                <td>{type}</td>
                <td className="text-center">
                    { view &&
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name={`permiso_${view}`} id={`permiso_${view}`} checked={permissions.includes(view)} onChange={() => this.props.toggle(view)} />
                            <Label onlyClassName="custom-control-label" htmlFor={`permiso_${view}`}></Label>
                        </div>
                    }
                </td>
                <td className="text-center">
                    { add &&
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name={`permiso_${add}`} id={`permiso_${add}`} checked={permissions.includes(add)} onChange={() => this.props.toggle(add)} />
                            <Label onlyClassName="custom-control-label" htmlFor={`permiso_${add}`}></Label>
                        </div>
                    }
                </td>
                <td className="text-center">
                    { change &&
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name={`permiso_${change}`} id={`permiso_${change}`} checked={permissions.includes(change)} onChange={() => this.props.toggle(change)} />
                            <Label onlyClassName="custom-control-label" htmlFor={`permiso_${change}`}></Label>
                        </div>
                    }
                </td>
                <td className="text-center">
                    { this.props.delete &&
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name={`permiso_${this.props.delete}`} id={`permiso_${this.props.delete}`} checked={permissions.includes(this.props.delete)} onChange={() => this.props.toggle(this.props.delete)} />
                            <Label onlyClassName="custom-control-label" htmlFor={`permiso_${this.props.delete}`}></Label>
                        </div>
                    }
                </td>
            </tr>
        )
    }
}

class MainView extends React.Component {

    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this)
    }

    toggle(id){
        if(this.props.togglePermission){
            this.props.togglePermission(id)
        }
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    render(){
        const { permisos, permissions } = this.props
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Nombre</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('name')} value={this.props.name} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Descripción</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('description')} value={this.props.description} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-sm-12" style={{height:300, overflowY:'auto'}}>
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Permisos disponibles</th>
                                        <th scope="col" className="text-center">Visualización</th>
                                        <th scope="col" className="text-center">Creación</th>
                                        <th scope="col" className="text-center">Edición</th>
                                        <th scope="col" className="text-center">Eliminación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { Object.keys(permisos).map((key, i) => <_Row {...permisos[key]} key={i} permissions={permissions} toggle={this.toggle} />)}
                                </tbody>
                            </table>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-4">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="aprobacion_usuario" name="aprobacion_usuario" checked={this.props.aprobacion_usuario} onChange={this.onChange('aprobacion_usuario')} />
                                <Label onlyClassName="custom-control-label" htmlFor="aprobacion_usuario">Aprobación Usuario</Label>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-4">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="genereacion_credenciales" name="genereacion_credenciales" checked={this.props.genereacion_credenciales} onChange={this.onChange('genereacion_credenciales')} />
                                <Label onlyClassName="custom-control-label" htmlFor="genereacion_credenciales">Generación Credenciales Usuario</Label>
                            </div>
                        </div>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

class EditRoles extends React.Component {

    state = {
        id : null,
        data : { permissions : [] },
        permisos : {}
    }

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.confirmSave = this.confirmSave.bind(this)
        this.getPermisos = this.getPermisos.bind(this)
        this.togglePermission = this.togglePermission.bind(this)
    }

    componentDidMount(){
        this.getPermisos()
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/rol/${id}/`)
        this.setState({
            id,
            data
        })
    }

    getPermisos = async () => {
        const { data } = await axios.get(`${baseurl}/permiso/`)
        let permisos = {}

        for(let i in data){
            let { id, content_type, name, codename } = data[i]
            if(!permisos[content_type]) permisos[content_type] = {}

            let type = ''
            if(codename.includes('view')) type = 'view'
            if(codename.includes('add')) type = 'add'
            if(codename.includes('change')) type = 'change'
            if(codename.includes('delete')) type = 'delete'

            permisos[content_type].type = name.split(' ')[name.split(' ').length-1]
            permisos[content_type][type] = id
        }

        this.setState({
            permisos : permisos
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
                return axios.post(`${baseurl}/rol/${id ? `${id}/` : ``}`, data)
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
                this.props.history.push('/usuarios/roles/')
            }
        })
    }

    togglePermission(id){
        let data = this.state.data
        let permissions = data.permissions

        let index = permissions.indexOf(id)
        if(index !== -1){
            permissions.splice(index, 1)
        }else{
            permissions.push(id)
        }

        data.permissions = permissions
        this.setState({
            data
        })
    }

    render(){
        const { data, permisos } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Rol</CardTitle>
                                <CardBody>
                                    <MainView {...data} permisos={permisos} onChange={this.onChange} togglePermission={this.togglePermission} />
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

export default EditRoles