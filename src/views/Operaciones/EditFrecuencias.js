import React from 'react'
import { FormGroup, Input, Select, Label, EditPage } from 'temeforest'
import { baseurl, getParameter, objectToUrl } from 'utils/url'
import axios from 'axios'

const endpoint = 'frecuencia'
const urlFront = '/operaciones/frecuencias'

class MainView extends React.Component {

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    optionsRutas = (obj) => {
        return {
            url : `${baseurl}/ruta/${objectToUrl(obj)}`,
            labelName: (record) => `${record.origen.ciudad_nombre}-${record.destino.ciudad_nombre}`,
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
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    render(){
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Hora salida</Label>
                        <div className="col-sm-5">
                            <Input className="no-clear" type="time" onChange={this.onChange('hora_salida')} value={this.props.hora_salida} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('cooperativa')} value={this.props.cooperativa} asyncOptions={this.optionsCooperativa} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Ruta</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('ruta')} value={this.props.ruta} asyncOptions={this.optionsRutas({ cooperativa: this.props.cooperativa })} id="cmb_ruta" />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Destino</Label>
                        <div className="col-sm-5">
                            <Input readOnly value={this.props.destino} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('tipo')} value={this.props.tipo} options={this.tipos} />
                        </div>
                    </FormGroup>
                    { Number(this.props.tipo) === 2 &&
                        <FormGroup className="row">
                            <Label className="col-sm-3">Fecha</Label>
                            <div className="col-sm-5">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_validez')} value={this.props.fecha_validez} />
                            </div>
                        </FormGroup>
                    }
                </form>
            </div>
        )
    }
}

class EditFrecuencias extends React.Component {

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
                let text = select.options[index].text
                let destino = text.split('-')[1].trim()
                this.onChange('destino', destino)
            }else{
                this.onChange('destino', '')
            }
        }, 500)
    }

    render(){
        const { data, id } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Frecuencias`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history} noValidate>
                <MainView {...data} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default EditFrecuencias