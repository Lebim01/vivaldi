import React from 'react'
import { Input, FormElementValidate, EditPage, FormValidate } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'

const endpoint = 'provincia'
const urlFront = '/localidades/provincia'

class MainView extends React.Component {

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
                </FormValidate>
                <FormValidate className="mt-4 form-horizontal">
                    <FormElementValidate
                        label={{text:'Pais'}}
                        input={{
                            name : 'pais',
                            element: <Input onChange={this.onChange('pais')} value={this.props.pais}
                           /* element: <Input onChange={this.onChange('pais')} value={this.props.pais}*/ />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                            },
                        }}
                    />
                </FormValidate>
            </div>
        )
    }
}

class EditProvincia extends React.Component {

    state = {data:{}}

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
        const { id, data } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Provincia`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history} key_permission="provincia">
                <MainView {...data} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default EditProvincia
