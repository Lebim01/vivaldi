import React from 'react'
import { EditPage } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'
import EditPersona from 'views/Cooperativas/EditPersona'

const endpoint = 'pasajero'
const urlFront = '/facturacion/pasajeros'

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
            <EditPage title={`${id ? 'Editar' : 'Crear'} Pasajero`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <EditPersona />
            </EditPage>
        )
    }
}

export default EditCiudad
