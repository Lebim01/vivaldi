import React from 'react'
import { FormGroup, Input, Label, EditPage } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'

const endpoint = 'provincia'
const urlFront = '/cooperativas/provincia'

class MainView extends React.Component {

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    render(){
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Nombre</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('nombre')} value={this.props.nombre} />
                        </div>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

class EditProvincia extends React.Component {

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

    onChange(name, value){
        let data = this.state.data
        data[name] = value
        this.setState({
            data
        })
    }

    render(){
        const { id, data } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Provincia`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <MainView {...data} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default EditProvincia
