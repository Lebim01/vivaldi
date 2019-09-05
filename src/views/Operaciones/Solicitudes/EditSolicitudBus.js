import React from 'react'
import { FormGroup, Input, Label, ApprovePage, FormValidate, Button } from 'temeforest'
import { baseurl, getParameter, canDownload, downloadFile } from 'utils/url'
import axios from 'axios'

const endpoint = 'venta/solicitud_bus'
const urlFront = '/operaciones/solicitudes/buses/'

class MainView extends React.Component {
    render(){
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
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
                    {this.props.estado === 2 &&
                        <FormGroup className="row">
                            <Label className="col-sm-3">Motivo</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.motivo} readOnly />
                            </div>
                        </FormGroup>
	                }
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
                        <legend>Bus</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Bus</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_numero} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Placa</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_placa} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Marca</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_marca_nombre} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Propietario</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_propietario_apellidos + ' ' + this.props.bus_propietario_nombres} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Distribución</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_distribucion_nombre} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">F. emisión matricula</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_fecha_emision_matricula} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">F. vencimiento matricula</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_fecha_vencimiento_matricula} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <div className="col-sm-12 text-center">
                                { this.props.documentacion_url &&
                                    <Button type="success" style={{marginLeft:5}} onClick={() => downloadFile(this.props.documentacion_url)} disabled={canDownload(this.props.documentacion_url)}>Ver Documentación</Button>
                                }
                            </div>
                        </FormGroup>
                    </fieldset>
                </FormValidate>
            </div>
        )
    }
}

class EditSolicitudBus extends React.Component {

    state = {
        data: {}
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
        const { data, id } = this.state
        return (
            <ApprovePage id={id} data={data} title={'Aceptar/Rechazar Solicitud de buses'} history={this.props.history} endpoint={endpoint} urlFront={urlFront}>
                <MainView {...data} onChange={this.onChange} />
            </ApprovePage>
        )
    }
}

export default EditSolicitudBus
