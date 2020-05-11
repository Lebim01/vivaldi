import React from 'react'
import { FormGroup, Input, Label, ApprovePage, FormValidate, Button } from 'temeforest'
import { baseurl, getParameter, canDownload, downloadFile } from 'utils/url'
import axios from 'axios'

const urlFront = '/operaciones/solicitudes/usuario/'
const endpoint = 'venta/solicitud_usuario'

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
                            <Input readOnly value={this.props.cooperativa_nombre} readOnly />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo de cooperativa</Label>
                        <div className="col-sm-5">
                            <Input readOnly value={this.props.tipo_cooperativa_nombre} readOnly />
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
                        {this.props.tipo_solicitud_nombre === "Inhabilitar" ? <legend>Inhabilitar Usuario</legend> : <legend>Usuario nuevo</legend>  }
                        <FormGroup className="row">
                            <Label className="col-sm-3">Usuario</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_username} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cédula</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_cedula} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Nombre</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_nombre} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Correo</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_correo} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Teléfono</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.usuario_telefono} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                        <Label className="col-sm-3"></Label>
                        { this.props.documentacion_url && !this.props.documentacion_url.toLowerCase().includes('none')
                            ? (
                                <div className="col-sm-5">
                                    <a class="btn btn-success" style={{ color: 'white' }} href={this.props.documentacion_url} download> <i className="fa fa-download"/> Descargar Documentación</a>
                                </div>
                            ) : (
                                <Label className="text-danger">Sin documentación</Label>
                            )
                        }
                        </FormGroup>
                    </fieldset>
                </FormValidate>
            </div>
        )
    }
}

class EditSolicitudUsuario extends React.Component {

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
            <ApprovePage 
                id={id} 
                data={data} 
                title={'Aceptar/Rechazar Solicitud de usuario'} 
                history={this.props.history}
                endpoint={endpoint} 
                urlFront={urlFront}
            >
                <MainView {...data} onChange={this.onChange} />
            </ApprovePage>
        )
    }
}

export default EditSolicitudUsuario
