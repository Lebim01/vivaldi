import React from 'react'
import { FormGroup, Input, Label, DualList, EditPage, FormElementValidate, FormValidate, Select } from 'temeforest'
import { baseurl, getParameter, getResults } from 'utils/url'
import axios from 'axios'
import { validate } from 'utils/validate'
import 'react-dual-listbox/lib/react-dual-listbox.css';

const endpoint = 'silo'
const urlFront = '/localidades/silos'

class ListAndenes extends React.Component {
    render(){
        const { andenes } = this.props
        return (
            <FormGroup className="row">
                <div className="col-sm-10">
                    <DualList options={andenes} onChange={this.props.onChange} selected={this.props.selected} />
                </div>
            </FormGroup>
        )
    }
}

class MainView extends React.Component {
    state = {}
    optionsLocalidades = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    componentDidMount(){
        this.getAndenes()
    }

    componentDidUpdate(prevProps){
        if(prevProps.localidad !== this.props.localidad){
            this.getAndenes()
        }
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    getAndenes = async ()  => {
        const results = await getResults(`${baseurl}/anden/?localidad=${this.props.localidad}`)
        let options = [...results.map((r) => { return { value : r.id, label : r.descripcion } })]
        this.setState({
            andenes : options
        })
    }

    toggleAndenes = (selected) => {
        this.props.onChange('andenes', selected)
    }

    render(){
        const { andenes } = this.state
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormElementValidate
                        label={{text:'Nombre'}}
                        input={{
                            name : 'nombre',
                            element: <Input onChange={this.onChange('nombre')} value={this.props.nombre} />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                            },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Localidad'}}
                        input={{
                            name : 'localidad',
                            element: <Select asyncOptions={this.optionsLocalidades} onChange={this.onChange('localidad')} value={this.props.localidad} />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                            },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Descripción'}}
                        input={{
                            name : 'descripcion',
                            element: <Input onChange={this.onChange('descripcion')} value={this.props.descripcion} />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                            },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'IP'}}
                        input={{
                            name : 'ip',
                            element: <Input onChange={this.onChange('ip')} value={this.props.ip} placeholder="0.0.0.0" />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                                validate: validate({
                                    ip: 'El valor debe ser una IP válida'
                                })
                            },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'URL'}}
                        input={{
                            name : 'url',
                            element: <Input onChange={this.onChange('url')} value={this.props.url} />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                                validate: validate({
                                    url: 'El valor debe ser una URL válida'
                                })
                            },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Usuario'}}
                        input={{
                            name : 'user',
                            element: <Input onChange={this.onChange('user')} value={this.props.user} />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                            },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Contraseña'}}
                        input={{
                            name : 'password',
                            element: <Input type="password" onChange={this.onChange('password')} value={this.props.password} />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                            },
                        }}
                    />
                    <FormGroup className="row">
                        <Label className="col-sm-4">Andenes Disponibles</Label>
                        <Label className="col-sm-4">Andenes Habilitados</Label>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">
                            <ListAndenes
                                selected={this.props.andenes}
                                onChange={this.toggleAndenes}
                                andenes={andenes}
                            />
                        </div>
                    </FormGroup>
                </FormValidate>
            </div>
        )
    }
}

class EditSilo extends React.Component {

    state = {
        id : null,
        data : {}
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

    onChange = (name, value) => {
        let data = this.state.data
        data[name] = value
        this.setState({
            data
        })
    }

    render(){
        const { data, id } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Silo`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <MainView  {...data} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default EditSilo
