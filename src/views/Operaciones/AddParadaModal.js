import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, FormGroup, InputIcon, Label, Select, FormValidate } from 'temeforest'
import { baseurl } from 'utils/url'

class AddParadaModal extends React.Component {

    state = { errors: [], data: {} }
    constructor(props){
        super(props)
        this.guardar = this.guardar.bind(this)
    }

    optionsParada = {
        url : `${baseurl}/ciudad/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    componentWillReceiveProps(props){
        const { show, ...data } = props
        this.setState({
            ...data,
            errors: []
        })
    }

    onChange = name => (e) => {
        let data = this.state.data
        data[name] = e.target.value
        if(name === 'ciudad'){
            data.ciudad_nombre = e.target.options[e.target.selectedIndex].text
        }
        this.setState({
            data
        })
    }

    toggle() {
        if(this.props.toggle){
            this.props.toggle()
        }
    }

    guardar(){
        const { ciudad, ciudad_nombre, orden_llegada, tarifa_normal, tarifa_media, duracion, index, id } = this.state.data
        if(this.props.guardar){
            let _exito = this.props.guardar({ ciudad, ciudad_nombre, orden_llegada, tarifa_media, tarifa_normal, duracion, index, id})
            if(_exito){
                this.setState({
                    data : {},
                    errors: []
                })
            }else{
                this.setState({
                    errors : ['repetido']
                })
            }
        }
    }

    render(){
        const { errors } = this.state
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>Agregar Parada</ModalHeader>
                <ModalBody>
                    <FormValidate className="mt-4 form-horizontal">
                        { errors.includes('repetido') &&
                            <div className="alert alert-danger">
                                No se puede duplicar paradas
                            </div>
                        }
                        <FormGroup className="row">
                            <Label className="col-sm-4">Parada</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsParada} onChange={this.onChange('ciudad')} value={this.state.data.ciudad} error={errors.includes('ciudad')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Llegada</Label>
                            <div className="col-sm-6">
                                <InputIcon icon={<span>#</span>} type="number" onChange={this.onChange('orden_llegada')} value={this.state.data.orden_llegada} error={errors.includes('orden_llegada')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Tarifa Normal</Label>
                            <div className="col-sm-6">
                                <InputIcon icon={<i className="fas fa-dollar-sign"/>} type="number" onChange={this.onChange('tarifa_normal')} value={this.state.data.tarifa_normal} error={errors.includes('tarifa_normal')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Tarifa Media</Label>
                            <div className="col-sm-6">
                                <InputIcon icon={<i className="fas fa-dollar-sign"/>} type="number" onChange={this.onChange('tarifa_media')} value={this.state.data.tarifa_media} error={errors.includes('tarifa_media')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Duración</Label>
                            <div className="col-sm-6">
                                <InputIcon icon={<span>Horas</span>} type="number" onChange={this.onChange('duracion')} value={this.state.data.duracion} error={errors.includes('duracion')} />
                            </div>
                        </FormGroup>
                    </FormValidate>
                </ModalBody>
                <ModalFooter>
                    <Button type="success" onClick={this.guardar}>Aceptar</Button>{' '}
                    <Button type="secondary" onClick={this.toggle.bind(this)}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default AddParadaModal