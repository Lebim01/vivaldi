import React from 'react'
import { FormGroup, Input, Select, Label, EditPage } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'

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
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row" style={{display:'none'}}>
                        <Label className="col-sm-3">Descipción</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('descripcion')} value={this.props.descripcion} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Localidad</Label>
                        <div className="col-sm-5">
                            <Select asyncOptions={this.optionsLocalidad} value={this.props.localidad}  onChange={this.onChange('localidad')} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">IP</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('ip')} value={this.props.ip} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">URL</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('url')} value={this.props.url} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Usuario</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('user')} value={this.props.user} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Contraseña</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('password')} value={this.props.password} />
                        </div>
                    </FormGroup>

                </form>
            </div>
        )
    }
}

class EditSilo extends React.Component {

    state = {
        id : null,
        data : {}
    }

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.changeTab = this.changeTab.bind(this)
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/trafficControl/${id}/`)
        this.setState({
            id,
            data
        })
    }

    changeTab(tab){
        this.setState({ tab })
    }

    onChange(name, value){
        let data = this.state.data
        data[name] = value
        this.setState({
            data
        })
    }

    render(){
        const { data, id } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Traffic Control`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <MainView id_localidad={id} {...data} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default EditSilo
