import React from 'react'
import { FormGroup, Input, Select, Label, DualList, EditPage } from 'temeforest'
import { baseurl, getParameter, getResults } from 'utils/url'
import axios from 'axios'
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

    constructor(props){
        super(props)
        this.getAndenes = this.getAndenes.bind(this)
        this.toggleAndenes = this.toggleAndenes.bind(this)
    }

    componentDidMount(){
        this.getAndenes()
    }


    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    getAndenes = async ()  => {
        const results = await getResults(`${baseurl}/anden/`)
        let options = [...results.map((r) => { return { value : r.id, label : r.descripcion } })]
        this.setState({
            andenes : options
        })
    }

    toggleAndenes(selected){
        this.props.onChange('andenes', selected)
    }

    render(){
        const { andenes } = this.state
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Localidad</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('localidad')} value={this.props.localidad} asyncOptions={this.optionsLocalidades} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row" style={{display:'none'}}>
                        <Label className="col-sm-3">Descripci&oacute;n</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('descripcion')} value={this.props.descripcion} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Ip</Label>
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
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/silo/${id}/`)
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
        const { data, id } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Silo`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <MainView  {...data} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default EditSilo
