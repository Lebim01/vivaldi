import React from 'react'
import { FormGroup, Input, Select, Label, DualList, EditPage, FormValidate } from 'temeforest'
import { baseurl, getParameter, getResults } from 'utils/url'
import axios from 'axios'
import 'react-dual-listbox/lib/react-dual-listbox.css';

const endpoint = 'puerta'
const urlFront = '/localidades/puertas'

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
    seleccione = [{label:'Seleccione', value:''}]
    state = {}

    optionsLocalidades = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    constructor(props){
        super(props)
        this.toggleAndenes = this.toggleAndenes.bind(this)
        this.getLocalidades = this.getLocalidades.bind(this)
        this.getNiveles = this.getNiveles.bind(this)
        this.getAndenes = this.getAndenes.bind(this)
    }

    componentDidMount(){
        this.getAndenes()
        this.getLocalidades()
    }


    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    getAndenes = async ()  => {
        const { data } = await axios.get(`${baseurl}/anden/`)
        let options = [...data.results.map((r) => { return { value : r.id, label : r.descripcion } })]
        this.setState({
            andenes : options
        })
    }

    toggleAndenes(selected){
        this.props.onChange('andenes', selected)
    }

    onChangeLocalidad = name => (e) => {
        if(this.props.onChange){
          this.getNiveles(e.target.value)
          this.props.onChange('localidad', e.target.value)
        }
    }

    getNiveles = async (id)  => {
        const results = await getResults(`${baseurl}/localidadnivel/?localidad=${id}`)
        let options = [...this.seleccione, ...results.map((r) => { return { value : r.id, label : r.nombre } })]
        this.setState({
          niveles : options
        })
    }

    getLocalidades = async (id)  => {
        const results = await getResults(`${baseurl}/localidad/`)
        let options = [...this.seleccione, ...results.map((r) => { return { value : r.id, label : r.nombre } })]
        this.setState({
            localidades : options
        }, ()=>{
            if(this.props.localidad === undefined){
                this.props.onChange('localidad', this.state.localidades[1].value)
                this.getNiveles(this.state.localidades[1].value)
            }else{
                this.getNiveles(this.props.localidad)
            }
        })
    }


    render(){
        const { andenes, niveles } = this.state
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Localidad</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChangeLocalidad('localidad')} value={this.props.localidad} asyncOptions={this.optionsLocalidades} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Nivel</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('localidad_nivel')} value={this.props.localidad_nivel} options={niveles} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">N&uacute;mero</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('numero')} value={this.props.numero} />
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
                </FormValidate>
            </div>
        )
    }
}

class EditPuertas extends React.Component {

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
        const { data, id } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Puerta`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <MainView  {...data} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default EditPuertas