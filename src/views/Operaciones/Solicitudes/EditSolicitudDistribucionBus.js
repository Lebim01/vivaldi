import React from 'react'
import { FormGroup, Input, Label, ApprovePage } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'
import moment from 'moment';

const urlFront = '/operaciones/solicitudes/distribucion-buses/'
const endpoint = 'venta/solicitud_plantilla'

class MainView extends React.Component {

    state = { optionsCooperativa: [] }

    optionTipoCooperativa = {
        url: `${baseurl}/tipoCooperativa/`,
        labelName: `nombre`,
        valueName: 'id'
    }
    
    tipoSolicitud = [
        { value:'', label: 'Seleccione' },
        { value:1, label: 'Habilitar' },
        { value:2, label: 'Inhabilitar' },
    ]

    componentDidMount(){
        this.getCooperativas = this.getCooperativas.bind(this)
        this.getCooperativas()
    }

    render(){
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Input readOnly value={this.props.cooperativa_nombre} readOnly />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo de cooperativa</Label>
                        <div className="col-sm-5">
                            <Input readOnly value={this.props.tipo_cooperativa} readOnly />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Usuario solicitante</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.usuario_solicitante} readOnly />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo solicitud</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.tipo_solicitud} readOnly />
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
                    <FormGroup className="row">
                        <Label className="col-sm-3">Observaciones</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.observaciones} readOnly />
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
                    { this.props.usuario_afectado &&
                        <fieldset>
                            <legend>Usuario afectado</legend>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Usuario</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.usuario_afectado.usuario} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Cédula</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.usuario_afectado.cedula} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Nombre</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.usuario_afectado.nombre} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Correo</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.usuario_afectado.correo} readOnly />
                                </div>
                            </FormGroup>
                        </fieldset>
                    }
                </form>
            </div>
        )
    }
}

class EditSolicitudDistribucionBus extends React.Component {

    state = {
        data:{
            fecha: moment().format('YYYY-MM-DD'),
            usuario_afectado: {}
        }
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
            <ApprovePage id={id} data={data} title={'Aceptar/Rechazar Solicitud de distribución bus'} history={this.props.history} endpoint={endpoint} urlFront={urlFront}>
                <MainView {...data} onChange={this.onChange} />
            </ApprovePage>
        )
    }
}

export default EditSolicitudDistribucionBus
