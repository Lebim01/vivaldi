import React from 'react'
import { FormGroup, Input, Select, Label, EditPage, FormValidate, FormElementValidate } from 'temeforest'
import { baseurl, getParameter, objectToUrl } from 'utils/url'
import axios from 'axios'

const endpoint = 'frecuencia'
const urlFront = '/operaciones/frecuencias'

const dias = [
    'Lunes',
    'Martes',
    'Miercolés',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
]

class MainView extends React.Component {

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    optionsRutas = (obj) => {
        return {
            url : `${baseurl}/ruta/${objectToUrl(obj)}`,
            labelName: 'ciudad_destino_nombre',
            valueName: 'id'
        }
    }
    optionsDestinos = {
        url : `${baseurl}/ciudad/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    tipos = [
        { value: '', label : 'Seleccione' },
        { value: 1, label : 'Normal' },
        { value: 2, label : 'Extraordinaria' },
    ]

    onChange = name => (e) => {

        if(name === 'cooperativa'){
            this.props.onChange('ruta', '')
        }

        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    onChangeDias = index => {
        let _dias = this.props.dias


        if(_dias.includes(index)){
            _dias.splice(_dias.indexOf(index), 1)
        }else{
            _dias.push(index)
        }

        this.props.onChange('dias', _dias)
    }

    render(){
        return (
            <EditPage title={`${this.props.id ? 'Editar' : 'Crear'} Frecuencias`} data={this.props.data} id={this.props.id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <FormValidate className="mt-4 form-horizontal">
                    <FormElementValidate
                        label={{text:'Hora salida'}}
                        input={{
                            name : 'hora_salida',
                            element: <Input className="no-clear" type="time" onChange={this.onChange('hora_salida')} value={this.props.hora_salida} />
                        }}
                        validator={{
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Cooperativa'}}
                        input={{
                            name : 'cooperativa',
                            element: <Select onChange={this.onChange('cooperativa')} value={this.props.cooperativa} asyncOptions={this.optionsCooperativa} />
                        }}
                        validator={{
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Ruta'}}
                        input={{
                            name : 'ruta',
                            element: <Select onChange={this.onChange('ruta')} value={this.props.ruta} asyncOptions={this.optionsRutas({ cooperativa: this.props.cooperativa })} id="cmb_ruta" />
                        }}
                        validator={{
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
                        }}
                    />
                    <FormGroup className="row">
                        <Label className="col-sm-3">Destino</Label>
                        <div className="col-sm-5">
                            <Input readOnly value={this.props.destino} />
                        </div>
                    </FormGroup>
                    <FormElementValidate
                        label={{text:'Tipo'}}
                        input={{
                            name : 'tipo',
                            element: <Select onChange={this.onChange('tipo')} value={this.props.tipo} options={this.tipos} />
                        }}
                        validator={{
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
                        }}
                    />
                    { Number(this.props.tipo) === 1 &&
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <FormGroup className="row">
                                    { dias.map((nombre, index) => 
                                        <div className="col-sm-3">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id={nombre} name={nombre} checked={this.props.dias.includes(index)} onChange={() => this.onChangeDias(index)} />
                                                <Label onlyClassName="custom-control-label" htmlFor={nombre}>{nombre}</Label>
                                            </div>
                                        </div>
                                    )}
                                </FormGroup>
                            </div>
                        </div>
                    }
                    { Number(this.props.tipo) === 2 &&
                        <FormGroup className="row">
                            <Label className="col-sm-3">Fecha</Label>
                            <div className="col-sm-5">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_validez')} value={this.props.fecha_validez} />
                            </div>
                        </FormGroup>
                    }
                </FormValidate>
            </EditPage>
        )
    }
}

class EditFrecuencias extends React.Component {

    state = {
        id : null,
        data : {
            dias : [
                0,1,2,3,4,5,6
            ]
        }
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}`)
        this.setState({
            id,
            data
        }, () => this.setDestino())
    }

    onChange = (name, value) => {
        let data = this.state.data
        data[name] = value
        if(name === 'ruta') this.setDestino()
        if(name === 'tipo') if(Number(value) === 1) data.fecha_validez = null
        this.setState({
            data
        })
    }

    setDestino(){
        setTimeout(() => {
            let select = document.getElementById('cmb_ruta')
            let index = select.selectedIndex
            if(index > 0){
                this.onChange('destino', select.options[index].text)
            }else{
                this.onChange('destino', '')
            }
        }, 500)
    }

    render(){
        const { data, id } = this.state
        return (
            <MainView id={id} data={data} history={this.props.history} {...data} onChange={this.onChange} />
        )
    }
}

export default EditFrecuencias