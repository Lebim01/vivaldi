import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, TabContent, TabPane } from 'reactstrap';
import { Button, FormGroup, Label, FormValidate, RSelect, Tabs, InputIcon } from 'temeforest'
import { baseurl, getResults } from 'utils/url'
import axios from 'axios';

class ViajesModal extends React.Component {

    state = {}

    componentDidUpdate(prevProps){
        if(prevProps.show !== this.props.show && this.props.show && this.props.id){
            this.getData()
        }
    }

    getData = async () => {
        const { data } = await axios.get(`${baseurl}/viaje/${this.props.id}/`)
        this.setState({
            ...data
        })
    }

    render(){
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Viaje #{this.props.id}</ModalHeader>
                <ModalBody>
                    <FormValidate className="mt-4 form-horizontal">

                        <FormGroup className="row">
                            <Label className="col-sm-4">Localidad</Label>
                            <div className="col-sm-6">
                                { this.state.localidad_nombre }
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Cooperativa</Label>
                            <div className="col-sm-6">
                                { this.state.cooperativa_nombre }
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Fecha salida</Label>
                            <div className="col-sm-6">
                                { this.state.fecha }
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Destino</Label>
                            <div className="col-sm-6">
                                { this.state.destino_nombre }
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Frecuencia</Label>
                            <div className="col-sm-6">
                                { this.state.frecuencia_nombre }
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Tipo frecuencia</Label>
                            <div className="col-sm-6">
                                { this.state.tipo_frecuencia }
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Bus</Label>
                            <div className="col-sm-6">
                                { this.state.bus_disco }
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Conductor</Label>
                            <div className="col-sm-6">
                                { this.state.conductor_nombre }
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Motivo creación</Label>
                            <div className="col-sm-6">
                                { this.state.motivo }
                            </div>
                        </FormGroup>

                    </FormValidate>
                </ModalBody>
            </Modal>
        )
    }
}

export default ViajesModal 