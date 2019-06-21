import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, FormGroup, Input, InputIcon, Label, Select } from './../../temeforest'
import { baseurl } from './../../utils/url'

class AddParadaModal extends React.Component {

    state = { errors: [], data: {} }

    optionsParada = {
        url : `${baseurl}/ciudad/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    onChange = name => (e) => {
        let data = this.state.data
        data[name] = e.target.value
        if(name === 'parada') data.parada_nombre = e.target.options[e.target.selectedIndex].text
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
        if(this.props.guardar){
            this.props.guardar(this.state.data)
            this.setState({
                data : {}
            })
        }
    }

    render(){
        const { errors } = this.state
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>Agregar Parada</ModalHeader>
                <ModalBody>
                    <form className="mt-4 form-horizontal">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Parada</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsParada} onChange={this.onChange('parada')} value={this.state.data.parada} error={errors.includes('parada')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Llegada</Label>
                            <div className="col-sm-6">
                                <InputIcon icon={<span>#</span>} type="number" onChange={this.onChange('llegada')} value={this.state.data.llegada} error={errors.includes('parada')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Tarifa Normal</Label>
                            <div className="col-sm-6">
                                <InputIcon icon={<i className="fas fa-dollar-sign"/>} type="price" onChange={this.onChange('tarifa_normal')} value={this.state.data.tarifa_normal} error={errors.includes('tarifa_normal')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Tarifa Media</Label>
                            <div className="col-sm-6">
                                <InputIcon icon={<i className="fas fa-dollar-sign"/>} type="number" onChange={this.onChange('tarifa_media')} value={this.state.data.tarifa_media} error={errors.includes('tarifa_media')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Horas</Label>
                            <div className="col-sm-6">
                                <InputIcon icon={<span>Horas</span>} type="number" onChange={this.onChange('horas')} value={this.state.data.horas} error={errors.includes('horas')} />
                            </div>
                        </FormGroup>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button type="success" onClick={this.guardar.bind(this)}>Aceptar</Button>{' '}
                    <Button type="secondary" onClick={this.toggle.bind(this)}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default AddParadaModal