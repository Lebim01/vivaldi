import React from 'react'
import { EditPage, FormGroup, Input, Label, FormValidate } from 'temeforest'
import { baseurl, getParameter, getResults } from 'utils/url'
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
                            <input type="checkbox" className="custom-control-input" name={`permiso_${view}`} id={`permiso_${view}`} checked={permissions.includes(view)} onChange={() => this.props.toggle(view, 'view')} />
                            <Label onlyClassName="custom-control-label" htmlFor={`permiso_${view}`}/>
                        </div>
                    }
                </td>
                <td className="text-center">
                    { add &&
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name={`permiso_${add}`} id={`permiso_${add}`} checked={permissions.includes(add)} onChange={() => this.props.toggle(add, 'add')} />
                            <Label onlyClassName="custom-control-label" htmlFor={`permiso_${add}`}/>
                        </div>
                    }
                </td>
                <td className="text-center">
                    { change &&
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name={`permiso_${change}`} id={`permiso_${change}`} checked={permissions.includes(change)} onChange={() => this.props.toggle(change, 'change')} />
                            <Label onlyClassName="custom-control-label" htmlFor={`permiso_${change}`}/>
                        </div>
                    }
                </td>
                <td className="text-center">
                    { this.props.delete &&
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name={`permiso_${this.props.delete}`} id={`permiso_${this.props.delete}`} checked={permissions.includes(this.props.delete)} onChange={() => this.props.toggle(this.props.delete, 'delete')} />
                            <Label onlyClassName="custom-control-label" htmlFor={`permiso_${this.props.delete}`}/>
                        </div>
                    }
                </td>
            </tr>
        )
    }
}

class MainView extends React.Component {

    toggle = (id, type = '') => {
        if(this.props.togglePermission){
            this.props.togglePermission(id, type)
        }
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    render(){
        const { categories, permissions } = this.props
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Nombre</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('name')} value={this.props.name} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Descripción</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('description')} 
                            value={this.props.description} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div id="table-container" className="col-sm-12" style={{overflowY:'auto'}}>
                            <table className="table table-hover table-striped header-fixed table-sm" id="table">
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
                                                <input type="checkbox" className="custom-control-input" name={`all_view`} id={`all_view`} checked={this.props.all_view} onChange={this.props.onChangeSelectAll('view')} />
                                                <Label onlyClassName="custom-control-label" htmlFor={`all_view`}/>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" name={`all_add`} id={`all_add`} checked={this.props.all_add} onChange={this.props.onChangeSelectAll('add')} />
                                                <Label onlyClassName="custom-control-label" htmlFor={`all_add`}/>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" name={`all_change`} id={`all_change`} checked={this.props.all_change} onChange={this.props.onChangeSelectAll('change')} />
                                                <Label onlyClassName="custom-control-label" htmlFor={`all_change`}/>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" name={`all_delete`} id={`all_delete`} checked={this.props.all_delete} onChange={this.props.onChangeSelectAll('delete')} />
                                                <Label onlyClassName="custom-control-label" htmlFor={`all_delete`}/>
                                            </div>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    { categories.map((record, i) =>
                                        [
                                            <tr key={i}>
                                                <th colSpan="5">{record.name}</th>
                                            </tr>,
                                            ...Object.keys(record.permisos).map((key, i2) => <_Row {...record.permisos[key]} key={`${i}-${i2}`} permissions={permissions} toggle={this.toggle} />)
                                        ]
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </FormGroup>
                </FormValidate>
            </div>
        )
    }
}

class EditRoles extends React.Component {

    state = {
        id : null,
        data : { permissions : [] },
        categories : [],
        all_add : false,
        all_view : false,
        all_change : false,
        all_delete : false
    }

    componentDidMount(){
        this.getPermisos()
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}/?full=1`)
        this.setState({
            id,
            data
        })
    }

    getPermisos = async () => {
        const results = await getResults(`${baseurl}/permiso/`, true)
        let categories = []

        // crear array de categorias ordenadas
        for(let i in results){
            let { category, category_name } = results[i]

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
        for(let i in results){
            let { id, name, codename, category } = results[i]

            let type = ''
            if(codename.includes('view')) type = 'view'
            if(codename.includes('add')) type = 'add'
            if(codename.includes('change')) type = 'change'
            if(codename.includes('delete')) type = 'delete'

            let permission_name_group = codename.replace('view', '').replace('add', '').replace('change', '').replace('delete', '')

            let indexCategory = categories.findIndex(r => r.id == category)

            if(!categories[indexCategory].permisos[permission_name_group]){
                categories[indexCategory].permisos[permission_name_group] = {}
            }

            categories[indexCategory].permisos[permission_name_group].type = name.startsWith('Can')
                ? name.split(' ').splice(2, name.split(' ').length-1).join(' ')
                : name
            categories[indexCategory].permisos[permission_name_group][type] = id
        }

        this.setState({
            categories
        })
    }

    onChange = (name, value) => {
        let data = this.state.data
        data[name] = value
        this.setState({
            data
        })
    }

    togglePermission = (id, type) => {
        let data = this.state.data
        let permissions = data.permissions

        let index = permissions.indexOf(id)
        if(index !== -1){
            permissions.splice(index, 1)
            if(type){
                // deseleccionar el checkbox de todos
                let _type = `all_${type}`
                this.setState({
                    [_type]: false
                })
            }
        }else{
            permissions.push(id)
        }

        data.permissions = permissions
        this.setState({
            data
        })
    }

    onChangeSelectAll = type => (e) => {
        let _type = `all_${type}`
        this.setState({
            [_type]: e.target.checked
        })
        if(e.target.checked){
            this.selectAll(type)
        }else{
            this.diselectAll(type)
        }
    }

    diselectAll = (type) => {
        let data = this.state.data
        let permissions = data.permissions

        for(let i in this.state.categories){
            let category = this.state.categories[i]
            for(let j in category.permisos){
                let permiso = category.permisos[j]
                let id_permiso = permiso[type]

                let index = permissions.indexOf(id_permiso)
                if(index > -1)
                    permissions.splice(index, 1)
            }
        }
        data.permissions = permissions
        this.setState({
            data
        })
    }

    selectAll = (type) => {
        let data = this.state.data
        let permissions = data.permissions

        for(let i in this.state.categories){
            let category = this.state.categories[i]
            for(let j in category.permisos){
                let permiso = category.permisos[j]
                let id_permiso = permiso[type]

                if(!permissions.includes(id_permiso))
                    permissions.push(id_permiso)
            }
        }
        data.permissions = permissions
        this.setState({
            data
        })
    }

    render(){
        const { data, categories, id, all_add, all_view, all_change, all_delete } = this.state
        return (
            <EditPage noValidate title={`${id ? 'Editar' : 'Crear'} Rol`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history} key_permission="group">
                <MainView
                    {...data}
                    categories={categories}
                    onChange={this.onChange}
                    togglePermission={this.togglePermission}
                    onChangeSelectAll={this.onChangeSelectAll}
                    all_add={all_add}
                    all_view={all_view}
                    all_change={all_change}
                    all_delete={all_delete}
                />
            </EditPage>
        )
    }
}

export default EditRoles
