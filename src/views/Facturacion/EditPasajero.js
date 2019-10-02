import React from 'react'
import { EditPage } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'
import EditPersona from 'views/Cooperativas/EditPersona'

const endpoint = 'persona'
const urlFront = '/facturacion/personas'

class EditPasajero extends React.Component {

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
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}/`)
        this.setState({
            id,
            data
        })
    }

    onChange = async (value) => {
        const data = value;
        this.setState({data})
    }

    optionsProvincias = {
        url : `${baseurl}/provincia/`,
        labelName : 'nombre',
        valueName : 'id'
    }

    render(){
        const { id, data } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Persona`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <EditPersona 
                    id={this.state.data.id ? this.state.data.id : null} 
                    editable={true} 
                    persona={this.state.data}
                    onChange={this.onChange}
                /> 
            </EditPage>
        )
    }
}

export default EditPasajero
