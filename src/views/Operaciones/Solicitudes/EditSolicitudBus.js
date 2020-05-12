import React from 'react'
import { FormGroup, Input, Label, ApprovePage, FormValidate, Button } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'

const endpoint = 'venta/solicitud_bus'
const urlFront = '/operaciones/solicitudes/buses/'

const textoBus = {
    'INH' : 'a inactivar',
    'REE' : 'Nuevo',
}

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
                    {this.props.estado === 2 &&
                        <FormGroup className="row">
                            <Label className="col-sm-3">Motivo</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.motivo} readOnly />
                            </div>
                        </FormGroup>
                    }
                    { ['Inhabilitar', 'Cambio plantilla'].includes(this.props.tipo_solicitud_nombre) &&
                        <FormGroup className="row">
                            <Label className="col-sm-3">Descripción</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.descripcion} readOnly />
                            </div>
                        </FormGroup>
                    }
                    <FormGroup className="row">
                        <Label className="col-sm-3">Fecha y hora</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.fecha} readOnly />
                        </div>
                    </FormGroup>

                    <fieldset>
                        <legend>Bus {textoBus[this.props.tipo_solicitud]}</legend>
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
                            <Label className="col-sm-3">Identificación propietario</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_propietario_cedula} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Propietario</Label>
                            <div className="col-sm-5">
                                <Input value={this.props.bus_propietario_nombre} readOnly />
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
                            { this.props.documentacion_url && !this.props.documentacion_url.toLowerCase().includes('none')
                                ? (
                                    <div className="col-sm-12 text-center">
                                        <a class="btn btn-success" style={{ color: 'white' }} href={this.props.documentacion_url} download> <i className="fa fa-download"/> Descargar Documentación</a>
                                    </div>
                                ) : (
                                    <Label className="text-danger col-sm-12 text-center">Sin documentación</Label>
                                )
                            }
                        </FormGroup>
                    </fieldset>

                    { this.props.tipo_solicitud === 'REE' &&
                        <fieldset>
                            <legend>
                                <a href={`#/cooperativas/buses/edit?id=${this.props.bus_detalle.id}`} target="_blank">Bus a inactivar</a>
                            </legend>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Bus</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus_detalle.disco} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Placa</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus_detalle.placa} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Marca</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus_detalle.marca_nombre} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Propietario</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus_detalle.propietario.identificacion} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Propietario</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus_detalle.propietario_nombre} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Distribución</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus_detalle ? this.props.bus_detalle.bus_tipo_nombre : ''} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">F. emisión matricula</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus_detalle.fecha_emision_matricula} readOnly />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-3">F. vencimiento matricula</Label>
                                <div className="col-sm-5">
                                    <Input value={this.props.bus_detalle.fecha_vencimiento_matricula} readOnly />
                                </div>
                            </FormGroup>

                            <FormGroup className="row">
                                { this.props.bus_detalle.documentacion_url && !this.props.bus_detalle.documentacion_url.toLowerCase().includes('none')
                                    ? (
                                        <div className="col-sm-12 text-center">
                                            <a class="btn btn-success" style={{ color: 'white' }} href={this.props.bus_detalle.documentacion_url} download> <i className="fa fa-download"/> Descargar Documentación</a>
                                        </div>
                                    ) : (
                                        <Label className="text-danger col-sm-12 text-center">Sin documentación</Label>
                                    )
                                }
                            </FormGroup>
                        </fieldset>
                    }
                    
                    { this.props.tipo_solicitud === 'CPR' &&
                        <>
                            <fieldset>
                                <legend>
                                    Propietario nuevo
                                </legend>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Nombre</Label>
                                    <div className="col-sm-5">
                                        <Input value={this.props.bus_propietario_nombre} readOnly />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Correo</Label>
                                    <div className="col-sm-5">
                                        <Input value={this.props.bus_propietario_correo} readOnly />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Identificación</Label>
                                    <div className="col-sm-5">
                                        <Input value={this.props.bus_propietario_cedula} readOnly />
                                    </div>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <legend>
                                    Propietario anterior
                                </legend>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Nombre</Label>
                                    <div className="col-sm-5">
                                        <Input value={this.props.bus_detalle.propietario.nombre} readOnly />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Correo</Label>
                                    <div className="col-sm-5">
                                        <Input value={this.props.bus_detalle.propietario.correo} readOnly />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Identificación</Label>
                                    <div className="col-sm-5">
                                        <Input value={this.props.bus_detalle.propietario.identificacion} readOnly />
                                    </div>
                                </FormGroup>
                            </fieldset>
                        </>
                    }
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
