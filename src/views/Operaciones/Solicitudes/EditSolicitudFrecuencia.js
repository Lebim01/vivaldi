import React from 'react'
import { FormGroup, Input, Label, ApprovePage, FormValidate } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'

const urlFront = '/operaciones/solicitudes/frecuencias/'
const endpoint = 'venta/solicitud_frecuencia'

class MainView extends React.Component {

    render(){
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Localidad</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.localidad_nombre} readOnly />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.cooperativa_nombre} readOnly />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo de cooperativa</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.tipo_cooperativa_nombre} readOnly />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Usuario solicitante</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.usuario_solicitante_nombre} readOnly />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo solicitud</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.tipo_solicitud_nombre} readOnly />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Descripción</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.descripcion} readOnly />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Fecha y hora</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.fecha} readOnly />
                        </div>
                    </FormGroup>
                    <fieldset>
                        <legend>Datos de la frecuencia</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Fecha salida</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.frecuencia_fecha_validez} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Hora salida</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.frecuencia_hora_salida} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cooperativa</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.cooperativa_nombre} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Ruta</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.frecuencia_ruta_nombre} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Destino</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.frecuencia_ruta_destino_nombre} readOnly />
                            </div>
                        </FormGroup>
                    </fieldset>
                </FormValidate>
            </div>
        )
    }
}

class EditSolicitudFrecuencia extends React.Component {

    state = {
        data:{}
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

    render(){
        const { id, data } = this.state
        return (
            <ApprovePage id={id} data={data} title={'Aceptar/Rechazar Solicitud de frecuencias'} history={this.props.history} endpoint={endpoint} urlFront={urlFront}>
                <MainView {...data} onChange={this.onChange} />
            </ApprovePage>
        )
    }
}

export default EditSolicitudFrecuencia
