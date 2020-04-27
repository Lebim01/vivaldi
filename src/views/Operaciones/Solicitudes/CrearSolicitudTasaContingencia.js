import React from 'react'
import { FormGroup, Input, Label, EditPage, FormValidate, Select, SelectLocalidad } from 'temeforest'
import { baseurl, getParameter, objectToUrl } from 'utils/url'
import axios from 'axios'

const urlFront = '/operaciones/solicitudes/tasas-contingencia/'
const endpoint = 'venta/solicitud_tasacontingencia'

class MainView extends React.Component {

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    optionsUsuario = (obj) => {
        return {
            url : `${baseurl}/usuario/${objectToUrl(obj)}`,
            labelName: 'username',
            valueName: 'id'
        }
    }

    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    optionsTipoSolicitud = [
        { value : 'NUE', label : 'Nuevo' }
    ]

    optionsEstado = [
        { value : '0', label : 'Pendiente' },
        { value : '1', label : 'Aceptado' },
        { value : '2', label : 'Rechazado' },
    ]

    optionsDescripcion = [
        { value: 0, label: 'descripcion 1' },
        { value: 1, label: 'descripcion 2' },
        { value: 2, label: 'descripcion 3' },
        { value: 3, label: 'descripcion 4' },
    ]

    optionsDescripciones = {
        url : `${baseurl}/venta/catalogo-detalle/?catalogo=&descripcion=&codigo=STC`, 
        labelName : 'descripcion', 
        valueName : 'descripcion'
    }

    onChangeCantidadAprobada = (e) => {
        this.props.onChangeCantidadAprobada(e.target.value)
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    render() {
        const { id } = this.props
        const readOnly = !id ? false : true
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Localidad</Label>
                        <div className="col-sm-5">
                            <SelectLocalidad onChange={this.onChange('localidad')} value={this.props.localidad}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select asyncOptions={this.optionsCooperativa} value={this.props.cooperativa} onChange={this.onChange('cooperativa')} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Descripción</Label>
                        <div className="col-sm-5">
                            <Select asyncOptions={this.optionsDescripciones} onChange={this.onChange('descripcion')} value={this.props.descripcion} />
                        </div>
                    </FormGroup>
                    <fieldset>
                        <legend>Datos de la solicitud</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Usuario solicitante</Label>
                            <div className="col-sm-5">
                                <Select asyncOptions={this.optionsUsuario({ cooperativa: this.props.cooperativa, tipo: 2 })} value={this.props.usuario_solicitante} onChange={this.onChange('usuario_solicitante')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cantidad pedida</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.cantidad_pedida} onChange={this.onChange('cantidad_pedida')} />
                            </div>
                        </FormGroup>
                    </fieldset>
                </FormValidate>
            </div>
        )
    }
}

class CrearSolicitudTasaContigencia extends React.Component {

    state = {
        cantidad_aprobada: 0,
        data: {
            tipo_solicitud : 'NUE',
            estado : 0
        }
    }

    onChangeCantidadAprobada = (cantidad_aprobada) => {
        this.setState({
            cantidad_aprobada: cantidad_aprobada,
        })
    }

    componentDidMount() {
        let id = getParameter('id')
        if (id) {
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}/`)
        this.setState({
            id,
            cantidad_aprobada: (data.estado == 1) ? data.cantidad_aprobada : 0,
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

    render() {
        const { id, data, cantidad_aprobada } = this.state
        return (
            <EditPage 
                id={id} 
                data={data} 
                title={'Crear Solicitud de tasas de contingencia'} 
                history={this.props.history}
                endpoint={endpoint} 
                urlFront={urlFront}
                btnDelete={{
                    show: false
                }}
                btnEnable={{
                    show: false
                }}
                btnSave={{
                    text : 'Guardar'
                }}
                key_permission="solicitudtasacontingencia"
            >
                <MainView {...data} id={id} cantidad_aprobada={cantidad_aprobada} onChangeCantidadAprobada={this.onChangeCantidadAprobada} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default CrearSolicitudTasaContigencia
