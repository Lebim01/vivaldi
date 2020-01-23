import React from 'react'
import { Input, Select, FormValidate, EditPage, FormElementValidate, SelectLocalidad } from 'temeforest'
import { baseurl, getParameter, getResults } from 'utils/url'
import axios from 'axios'

const endpoint = 'anden'
const urlFront = '/localidades/andenes'

class MainView extends React.Component {

    seleccione = [{label:'Seleccione', value:''}]
    state = {
        modal : {
            show : false
        },
        niveles : [],
        localidades :[]
    }
    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            let value = e.target.value
            this.props.onChange(name, value)
        }
    }

    onChangeLocalidad = name => (e) => {
        if(this.props.onChange){
          this.getNiveles(e.target.value)
          this.props.onChange('localidad', e.target.value)
        }
    }

    getNiveles = async (id)  => {
        const results = await getResults(`${baseurl}/localidadnivel/?localidad=${id}/`)
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
        }, () => {
            if(this.props.localidad === undefined){
                this.props.onChange('localidad', this.state.localidades[1].value)
                this.getNiveles(this.state.localidades[1].value)
            }else{
                this.getNiveles(this.props.localidad)
            }
        })
    }

    componentDidMount(){
        this.getLocalidades()
    }

    render(){
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormElementValidate
                        label={{text:'Descripción'}}
                        input={{
                            name : 'descripcion',
                            element: <Input onChange={this.onChange('descripcion')} value={this.props.descripcion} />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                            },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Localidad'}}
                        input={{
                            name : 'localidad',
                            element: <SelectLocalidad onChange={this.onChangeLocalidad('localidad')} value={this.props.localidad} />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                            },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Nivel'}}
                        input={{
                            name : 'localidad_nivel',
                            element: <Select onChange={this.onChange('localidad_nivel')} value={this.props.localidad_nivel} options={this.props.localidad ? this.state.niveles : this.seleccione} />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                            },
                        }}
                    />
                  </FormValidate>
            </div>
        )
    }
}

class EditAndenes extends React.Component {

    state = {
        id : null,
        data : {
            localidad: '',
            localidad_nivel : ''
        }
    }

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
        const { data, id } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Anden`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history} key_permission="anden">
                <MainView {...data} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default EditAndenes
