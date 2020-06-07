import React from 'react'
import { FormGroup, Input, Label, ApprovePage, FormValidate, Select, SelectLocalidad} from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'

const urlFront = '/operaciones/solicitudes/tasas-contingencia/'
const endpoint = 'venta/solicitud_tasacontingencia'

class MainView extends React.Component {

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    optionsDescripcion = [
        { value:'0', label: 'descripcion 1' },
        { value:'1', label: 'descripcion 2' },
        { value:'2', label: 'descripcion 3' },
        { value:'3', label: 'descripcion 4' },
    ]

    optionsDescripciones = {
        url : `${baseurl}/venta/catalogo-detalle/?catalogo=&descripcion=&codigo=STC`, 
        labelName : 'descripcion', 
        valueName : 'descripcion'
    }

    onChangeCantidadAprobada = (e) => {
        this.props.onChangeCantidadAprobada(e.target.value)
    }

    render() {
        const { id } = this.props
        const readOnly = !id ? false : true
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select asyncOptions={this.optionsCooperativa} value={this.props.cooperativa} readOnly={readOnly} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo de cooperativa</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.tipo_cooperativa_nombre} readOnly={readOnly} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Usuario solicitante</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.usuario_solicitante_nombre} readOnly={readOnly} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo solicitud</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.tipo_solicitud_nombre} readOnly={readOnly} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Descripción</Label>
                        <div className="col-sm-5">
                           
                            <Input value={this.props.descripcion} readOnly={readOnly} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Fecha y hora</Label>
                        <div className="col-sm-5">
                            { readOnly
                                 ? <Input value={this.props.fecha} readOnly={readOnly} />
                                 : <Input type="date" value={this.props.fecha} readOnly={readOnly} />
                            }
                            
                        </div>
                    </FormGroup>
                    <fieldset>
                        <legend>Datos de la solicitud</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cantidad pedida</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.cantidad_pedida} readOnly={readOnly} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cantidad aprobada</Label>
                            <div className="col-sm-5">
                                <Input type="number" value={this.props.cantidad_aprobada} onChange={this.onChangeCantidadAprobada} min="1" />
                            </div>
                        </FormGroup>
                    </fieldset>
                </FormValidate>
            </div>
        )
    }
}

class EditSolicitudTasaContigencia extends React.Component {

    state = {
        cantidad_aprobada: 0,
        data: {}
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
            cantidad_aprobada: (data.estado == 1) ? data.cantidad_aprobada : data.cantidad_pedida,
            data
        })
    }

    render() {
        const { id, data, cantidad_aprobada } = this.state
        return (
            <ApprovePage 
                id={id} 
                data={data} 
                title={'Aceptar/Rechazar Solicitud de tasas de contingencia'} 
                history={this.props.history}
                endpoint={endpoint} 
                urlFront={urlFront}
                aprobarParams={{
                    cantidad_aprobada
                }}
            >
                <MainView {...data} id={id} cantidad_aprobada={cantidad_aprobada} onChangeCantidadAprobada={this.onChangeCantidadAprobada} />
            </ApprovePage>
        )
    }
}

export default EditSolicitudTasaContigencia
