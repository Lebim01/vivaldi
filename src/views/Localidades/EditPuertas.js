import React from 'react'
import { FormGroup, Input, Select, Label, DualList, EditPage, FormValidate, FormElementValidate, SelectLocalidad } from 'temeforest'
import { baseurl, getParameter, getResults } from 'utils/url'
import axios from 'axios'
import { validate } from 'utils/validate'
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

    componentDidMount(){
        this.getLocalidades()
    }

    componentDidUpdate(prevProps){
        if(prevProps.id !== this.props.id){
            this.getAndenes(this.props.localidad_nivel)
        }
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)

            if(name === 'localidad'){
                this.getNiveles(e.target.value)
                this.setState({
                    andenes : []
                })
            }

            if(name === 'localidad_nivel'){
                // limpiar andenes seleccionados
                this.props.onChange('andenes', [])

                if(e.target.value){
                    // cargar nueva lista de andenes
                    this.getAndenes(e.target.value)
                }else{
                    this.setState({
                        andenes : []
                    })
                }
            }
        }
    }

    getAndenes = async (localidad_nivel)  => {
        const { data } = await axios.get(`${baseurl}/anden/?localidad_nivel=${localidad_nivel}`)
        let options = [...data.results.map((r) => { return { value : r.id, label : r.descripcion } })]
        this.setState({
            andenes : options
        })
    }

    toggleAndenes = (selected) => {
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
            <EditPage title={`${this.props.id ? 'Editar' : 'Crear'} Puerta`} data={this.props.data} id={this.props.id} urlFront={urlFront} endpoint={endpoint} history={this.props.history} key_permission="puerta">
                <FormValidate className="mt-4 form-horizontal">
                    <FormElementValidate
                        label={{text:'Localidad'}}
                        input={{
                            name : 'localidad',
                            element: <SelectLocalidad onChange={this.onChangeLocalidad('localidad')} value={this.props.localidad} />
                        }}
                        validator={{
                            validationRules: { 
                                required: 'El campo es requerido'
                            }
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Nivel'}}
                        input={{
                            name : 'localidad_nivel',
                            element: (
                                <Select 
                                    onChange={this.onChange('localidad_nivel')} 
                                    value={this.props.localidad_nivel} 
                                    options={this.props.localidad ? niveles : this.seleccione} 
                                />
                            )
                        }}
                        validator={{
                            validationRules: { 
                                required: 'El campo es requerido'
                            }
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Nombre'}}
                        input={{
                            name : 'nombre',
                            element: <Input onChange={this.onChange('nombre')} value={this.props.nombre} />
                        }}
                        validator={{
                            validationRules: { 
                                required: 'El campo es requerido'
                            }
                        }}
                    />
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
            </EditPage>
        )
    }
}

class EditPuertas extends React.Component {

    state = {
        id : null,
        data : {}
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

    onChange = (name, value) => {
        let data = this.state.data
        data[name] = value
        this.setState({
            data
        })
    }

    render(){
        const { data, id } = this.state
        return (
            <MainView id={id} data={data} history={this.props.history} {...data} onChange={this.onChange} key_permission="puerta" />
        )
    }
}

export default EditPuertas