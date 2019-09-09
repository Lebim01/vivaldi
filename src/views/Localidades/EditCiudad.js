import React from 'react'
import { Input, Select, EditPage, FormElementValidate, FormValidate } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'

const endpoint = 'ciudad'
const urlFront = '/localidades/ciudad'

class EditCiudad extends React.Component {

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

    onChange = name => (e) => {
        let data = this.state.data
        data[name] = e.target.value
        this.setState({
            data
        })
    }

    optionsProvincias = {
        url : `${baseurl}/provincia/`,
        labelName : 'nombre',
        valueName : 'id'
    }

    render(){
        const { id, data } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Ciudad`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <div>
                    <FormValidate className="mt-4 form-horizontal">
                        <FormElementValidate
                            label={{text:'Nombre'}}
                            input={{
                                name : 'nombre',
                                element: <Input onChange={this.onChange('nombre')} value={this.state.data.nombre} />
                            }}
                            validator={{
                                validationRules: {required:true},
                                validationMessages: {required:"El campo es requerido"}
                            }}
                        />
                        <FormElementValidate
                            label={{text:'Provincia'}}
                            input={{
                                name : 'provincia',
                                element: <Select asyncOptions={this.optionsProvincias} onChange={this.onChange('provincia')} value={this.state.data.provincia} />
                            }}
                            validator={{
                                validationRules: {required:true},
                                validationMessages: {required:"El campo es requerido"}
                            }}
                        />
                    </FormValidate>
                </div>
            </EditPage>
        )
    }
}

export default EditCiudad
