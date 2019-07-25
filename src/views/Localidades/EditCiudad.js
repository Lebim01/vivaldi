import React from 'react'
import { FormGroup, Input, Label, Select, EditPage } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'

const endpoint = 'ciudad'
const urlFront = '/localidades/ciudad'

class EditCiudad extends React.Component {

    state = {data:{}}

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/ciudad/${id}/`)
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
                    <form className="mt-4 form-horizontal">
                        <FormGroup className="row">
                            <Label className="col-sm-3">Nombre</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('nombre')} value={this.state.data.nombre} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Provincia</Label>
                            <div className="col-sm-5">
                                <Select asyncOptions={this.optionsProvincias} onChange={this.onChange('provincia')} value={this.state.data.provincia} />
                            </div>
                        </FormGroup>

                    </form>
                </div>
            </EditPage>
        )
    }
}

export default EditCiudad
