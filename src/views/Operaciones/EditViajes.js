import React, { useState, useEffect } from 'react'
import { Input, Select, EditPage, TextArea, FormValidate, FormElementValidate, RSelect, Permission } from 'temeforest'
import { baseurl, getParameter, objectToUrl } from 'utils/url'
import axios from 'axios'

const endpoint = 'viaje'
const urlFront = '/operaciones/viajes'

const getTipoFrecuencia = async (id_frecuencia) => {
    try {
        const res = await axios.get(`${baseurl}/frecuencia/${id_frecuencia}/`)
        return res.data.tipo_nombre
    }catch(e){
        return ''
    }
}

class MainView extends React.Component {
    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    optionsDestinos = (obj) => ({
        url : `${baseurl}/ruta/${objectToUrl(obj)}`,
        labelName: 'nombre',
        valueName: 'id'
    })
    optionsFrecuencia = (obj) => ({
        url : `${baseurl}/frecuencia/${objectToUrl(obj)}`,
        labelName : 'hora_salida',
        valueName : 'id'
    })
    optionsBus = (obj) => ({
        url : `${baseurl}/bus/${objectToUrl(obj)}`,
        labelName : ({ disco, placa }) => `${disco} / ${placa}`,
        valueName : 'id'
    })
    optionsConductor = (obj) => ({
        url : `${baseurl}/conductor/${objectToUrl(obj)}`,
        labelName : ({ nombre }) => `${nombre}`,
        valueName : 'id'
    })

    onChange = name => (e) => {
        if(this.props.onChange){
            let value = e.target.value
            this.props.onChange(name, value)

            if(name === 'cooperativa'){
                this.clearFieldsByCooperativa()
            }
        }
    }

    onChangeValue = async (name, value) => {
        if(name === 'frecuencia'){
            let tipo = await getTipoFrecuencia(value)
            this.props.onChange('tipo_frecuencia', tipo)
        }
        this.props.onChange(name, value)
    }

    clearFieldsByCooperativa = () => {
        this.props.onChange('bus', '')
        this.props.onChange('conductor', '')
        this.props.onChange('frecuencia', '')
        this.props.onChange('tipo_frecuencia', '')
    }

    render(){
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormElementValidate
                        label={{text:'Localidad'}}
                        input={{
                            name : 'localidad_origen',
                            element: <Select onChange={this.onChange('localidad_origen')} value={this.props.localidad_origen} asyncOptions={this.optionsLocalidad} />
                        }}
                        validator={{
                            validationRules: { required:"El campo es requerido", },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Cooperativa'}}
                        input={{
                            name : 'cooperativa',
                            element: <Select onChange={this.onChange('cooperativa')} value={this.props.cooperativa} asyncOptions={this.optionsCooperativa} />
                        }}
                        validator={{
                            validationRules: { required:"El campo es requerido", },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Fecha salida'}}
                        input={{
                            name : 'fecha_salida',
                            element: <Input onChange={this.onChange('fecha_salida')} value={this.props.fecha} type="date" maxLength="8"/>
                        }}
                        validator={{
                            validationRules: { required:"El campo es requerido", },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Destino'}}
                        input={{
                            name : 'ruta',
                            element: 
                                <Select 
                                    onChange={this.onChange('ruta')} 
                                    value={this.props.ruta} 
                                    { ...(this.props.cooperativa
                                        ? { asyncOptions : this.optionsDestinos({ cooperativa: this.props.cooperativa }) }
                                        : { options : [{ label: 'Seleccione un cooperativa', value : '' }] }
                                    )}
                                />
                        }}
                        validator={{
                            validationRules: {  },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Frecuencia'}}
                        input={{
                            name : 'frecuencia',
                            element: (
                                <RSelect
                                    onChange={(value) => this.onChangeValue('frecuencia', value)}
                                    value={this.props.frecuencia}
                                    { ...(this.props.cooperativa && this.props.ruta
                                        ? { asyncOptions : this.optionsFrecuencia({ cooperativa: this.props.cooperativa, ruta: this.props.ruta }) }
                                        : { options : [{ label: 'Seleccione un cooperativa y destino', value : '' }] }
                                    )}
                                />
                            )
                        }}
                        validator={{
                            validationRules: { required:"El campo es requerido", },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Tipo frecuencia'}}
                        input={{
                            name : 'tipo_frecuencia',
                            element: <span>{this.props.tipo_frecuencia}</span>
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Bus'}}
                        input={{
                            name : 'bus',
                            element: (
                                <Select
                                    onChange={this.onChange('bus')}
                                    value={this.props.bus}
                                    { ...(this.props.cooperativa
                                        ? { asyncOptions : this.optionsBus({ cooperativa: this.props.cooperativa }) }
                                        : { options : [{ label: 'Seleccione un cooperativa', value : '' }] }
                                    )}
                                />
                            )
                        }}
                        validator={{
                            validationRules: { required:"El campo es requerido", },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Conductor'}}
                        input={{
                            name : 'conductor',
                            element: (
                                <Select
                                    onChange={this.onChange('conductor')}
                                    value={this.props.conductor}
                                    { ...(this.props.cooperativa
                                        ? { asyncOptions : this.optionsConductor({ cooperativa: this.props.cooperativa }) }
                                        : { options : [{ label: 'Seleccione un cooperativa', value : '' }] }
                                    )}
                                />
                            )
                        }}
                        validator={{
                            validationRules: { required:"El campo es requerido", },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Motivo creación'}}
                        input={{
                            name : 'causa_creacion_administrativa',
                            element: (
                                <TextArea
                                    onChange={this.onChange('causa_creacion_administrativa')}
                                    value={this.props.causa_creacion_administrativa}
                                />
                            )
                        }}
                        validator={{
                            validationRules: { required:"El campo es requerido", },
                        }}
                    />
                </FormValidate>
            </div>
        )
    }
}

function EditViajes(props){
    const [state, setState] = useState({
        id : null,
        data : {

        }
    })

    useEffect(() => {
        let id = getParameter('id')
        if(id){
            getData(id)
        }
    }, [])

    const getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}/`)

        if(data.frecuencia){
            let tipo = await getTipoFrecuencia(data.frecuencia)
            data.tipo_frecuencia = tipo
        }

        setState({
            id,
            data
        })
    }

    const onChange = (name, value) => {
        let data = state.data
        data[name] = value
        setState({
            data
        })
    }

    const validation = (data) => {
        if(!data.paradas.length > 0){
            return {
                result : false,
                message : 'Debe tener almenos una parada'
            }
        }
        return true
    }

    const { data, id } = state

    return (
        <Permission key_permission={id ? 'change_viaje' : 'add_viaje'} mode="redirect">
            <EditPage title={`${id ? 'Editar' : 'Crear'} Viajes`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={props.history} customValidation={validation}>
                <MainView {...data} onChange={onChange} />
            </EditPage>
        </Permission>
    )
}

export default EditViajes
