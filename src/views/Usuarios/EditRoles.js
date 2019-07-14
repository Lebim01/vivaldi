import React from 'react'
import { EditPage, FormGroup, Input, Label } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'

const endpoint = 'rol'
const urlFront = '/usuarios/roles'

class _Row extends React.Component {
    render(){
        const { type, view, add, change, permissions } = this.props
        return (
            <tr>
                <td style={{paddingLeft: 50}}>{type}</td>
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
        const { categories, permissions, all_view, all_edit, } = this.props
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
                        <div className="col-sm-12">
                            <table id="header-fixed" className="table" style={{marginBottom:0}}>
                                <thead>
                                    <tr>
                                        <th width="50%" scope="col">Permisos disponibles</th>
                                        <th width="12.5%" scope="col" className="text-center">Visualización</th>
                                        <th width="12.5%" scope="col" className="text-center">Creación</th>
                                        <th width="12.5%" scope="col" className="text-center">Edición</th>
                                        <th width="12.5%" scope="col" className="text-center">Eliminación</th>
                                    </tr>
                                    <tr>
                                        <td>Seleccionar todo</td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" name={`all_view`} id={`all_view`} checked={all_view} />
                                                <Label onlyClassName="custom-control-label" htmlFor={`all_view`}></Label>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div id="table-container" className="col-sm-12" style={{height:300, overflowY:'auto'}}>
                            <table className="table table-hover table-striped header-fixed" id="table">
                                <thead>
                                    <tr>
                                        <th width="50%" scope="col"></th>
                                        <th width="12.5%" scope="col"></th>
                                        <th width="12.5%" scope="col"></th>
                                        <th width="12.5%" scope="col"></th>
                                        <th width="12.5%" scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { categories.map((record, i) => 
                                        [
                                            <tr key={i}>
                                                <th colSpan="5">{record.name}</th>
                                            </tr>,
                                            ...Object.keys(record.permisos).map((key, i) => <_Row {...record.permisos[key]} key={i} permissions={permissions} toggle={this.toggle} />)
                                        ]
                                    )}
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
        categories : []
    }

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
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
        let categories = []

        // crear array de categorias ordenadas
        for(let i in data){
            let { category, category_name } = data[i]

            if(category){
                if(!categories.some(r => r.id == category)){
                    categories.push({
                        id : category,
                        name : category_name,
                        permisos: {}
                    })
                }
            }
        }
        categories.push({
            id: null,
            name: 'Otros',
            permisos : []
        })

        // setear permisos por categoria
        for(let i in data){
            let { id, content_type, name, codename, category } = data[i]
            let type = ''
            if(codename.includes('view')) type = 'view'
            if(codename.includes('add')) type = 'add'
            if(codename.includes('change')) type = 'change'
            if(codename.includes('delete')) type = 'delete'

            let indexCategory = categories.findIndex(r => r.id == category)

            if(!categories[indexCategory].permisos[content_type]){
                categories[indexCategory].permisos[content_type] = {}
            }

            categories[indexCategory].permisos[content_type].type = name.split(' ').splice(2, name.split(' ').length-1).join(' ')
            categories[indexCategory].permisos[content_type][type] = id
        }

        this.setState({
            categories
        })
    }

    onChange(name, value){
        let data = this.state.data
        data[name] = value
        this.setState({
            data
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
        const { data, categories, id } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Rol`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <MainView {...data} categories={categories} onChange={this.onChange} togglePermission={this.togglePermission} />
            </EditPage>
        )
    }
}

export default EditRoles