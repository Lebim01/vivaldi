import React from 'react'
import { FormGroup, Input, Label, ApprovePage, FormValidate } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'

const endpoint = 'venta/solicitud_conductor'
const urlFront = '/operaciones/solicitudes/conductores/'

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
                            <Input readOnly value={this.props.cooperativa_nombre} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo de cooperativa</Label>
                        <div className="col-sm-5">
                            <Input readOnly value={this.props.tipo_cooperativa_nombre} />
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
                        <Label className="col-sm-3">Descripci??n</Label>
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
                    {this.props.estado === 2 &&
                        <FormGroup className="row">
                            <Label className="col-sm-3">Motivo</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.motivo} readOnly />
                            </div>
                        </FormGroup>
                    }
                    <fieldset>
                        <legend>Conductor afectado</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">C??dula/RUC</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.conductor_cedula} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Nombres</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.conductor_nombre} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Direcci??n</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.conductor_direccion} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Tipo</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.conductor_tipo_nombre} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">F. emisi??n licencia</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.conductor_fecha_emision_licencia} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">F. validez licencia</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.conductor_fecha_vencimiento_licencia} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                        <Label className="col-sm-3"></Label>
                            <div className="col-sm-5">
                                <a class="btn btn-success" style={{ color: 'white' }} href={this.props.documentacion_url} download> <i className="fa fa-download"/> Descargar Documentaci??n</a>
                            </div>
                        </FormGroup>
                    </fieldset>
                </FormValidate>
            </div>
        )
    }
}

class EditSolicitudConductor extends React.Component {

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

    onChange(name, value){
        let data = this.state.data
        data[name] = value
        this.setState({
            data
        })
    }

    render(){
        const { id, data } = this.state
        return (
            <ApprovePage id={id} data={data} title={'Aceptar/Rechazar Solicitud de conductor'} history={this.props.history} endpoint={endpoint} urlFront={urlFront}>
                <MainView {...data} onChange={this.onChange} />
            </ApprovePage>
        )
    }
}

export default EditSolicitudConductor
