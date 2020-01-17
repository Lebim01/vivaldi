import React from 'react'
import { Input, EditPage, FormElementValidate, FormValidate } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'

const endpoint = 'marca'
const urlFront = '/cooperativas/marcas'

class MainView extends React.Component {

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    render(){
        const {data, id} = this.props 
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Marca`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history} key_permission="marca">
                <FormValidate className="mt-4 form-horizontal" onSubmit={false}>
                    <FormElementValidate
                        label={{text:'Nombre'}}
                        input={{
                            name : 'nombre',
                            element: <Input onChange={this.onChange('nombre')} value={this.props.nombre} />
                        }}
                        validator={{
                            validationRules: {required:"El campo es requerido"},
                        }}
                    />
                </FormValidate>
            </EditPage>
        )
    }
}

class EditMarcas extends React.Component {

    state = {data:{}}

    componentDidMount(){
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
            <MainView id={id} data={data} {...data} history={this.props.history} onChange={this.onChange} />
        )
    }
}

export default EditMarcas
