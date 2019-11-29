import React from 'react'
import { Input, Select, EditPage, FormElementValidate, FormValidate } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'
import { validate } from 'utils/validate'

const endpoint = 'trafficControl'
const urlFront = '/localidades/traffic-control'

class MainView extends React.Component {

    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName : 'nombre',
        valueName : 'id'
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    render(){
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormElementValidate
                        label={{text:'Descripción'}}
                        input={{
                            name : 'descripcion',
                            element: <Input onChange={this.onChange('descripcion')} value={this.props.descripcion} />
                        }}
                        validator={{
                            validationRules: {required:"El campo es requerido"}
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Localidad'}}
                        input={{
                            name : 'localidad',
                            element: <Select asyncOptions={this.optionsLocalidad} value={this.props.localidad} onChange={this.onChange('localidad')} />
                        }}
                        validator={{
                            validationRules: {required:"El campo es requerido"}
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
                            validationRules: {required:"El campo es requerido"}
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Contraseña'}}
                        input={{
                            name : 'password',
                            element: <Input type="password" onChange={this.onChange('password')} value={this.props.password} />
                        }}
                        validator={{
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
                        }}
                    />
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
            <EditPage title={`${id ? 'Editar' : 'Crear'} Traffic Control`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history} key_permission="trafficcontrol">
                <MainView id_localidad={id} {...data} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default EditSilo
