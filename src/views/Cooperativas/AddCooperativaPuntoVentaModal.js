import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, FormGroup, Input, Label, Select, FormValidate } from 'temeforest'
import { baseurl } from 'utils/url'

class AddCooperativaPuntoVentaModal extends React.Component {

    state = {
        errors : [],
        data : {}
    }

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this)
        this.onChange = this.onChange.bind(this)
        this.guardar = this.guardar.bind(this)
        this.getCooperativaName = this.getCooperativaName.bind(this)
    }

    componentWillReceiveProps(props){
        const { id, cooperativa, cooperativa_nombre, punto_emision_tasa, secuencia_tasa, punto_emision_boleto, secuencia_boleto, punto_emision_nota_credito, secuencia_nota_credito } = props
        this.setState({
            data : {
                id, cooperativa, cooperativa_nombre, punto_emision_tasa, secuencia_tasa, punto_emision_boleto, secuencia_boleto, punto_emision_nota_credito, secuencia_nota_credito
            }
        })
    }

    toggle() {
        if(this.props.toggle){
            this.props.toggle()
        }
    }

    getCooperativaName(e){
        let options = e.target.options
        for(let i in options){
            let opt = options[i]
            if(Number(opt.value) === Number(e.target.value)){
                return opt.label
            }
        }
        return ''
    }

    onChange = name => (e) => {
        let data = this.state.data
        data[name] = e.target.value
        if(name === 'cooperativa') data.cooperativa_nombre = this.getCooperativaName(e)
        this.setState({
            data
        })
    }

    guardar(){
        const required = ['cooperativa', 'punto_emision_tasa', 'secuencia_tasa', 'punto_emision_boleto', 'secuencia_boleto', 'punto_emision_nota_credito', 'secuencia_nota_credito']
        let errors = []
        for(let i in required){
            if(!this.state.data[required[i]]){
                errors.push(required[i])
            }
        }
        if(errors.length === 0){
            if(this.props.guardar){
                this.props.guardar(this.state.data)
            }
        }else{
            this.setState({
                errors
            })
        }
    }

    render(){
        const { errors } = this.state
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Agregar Cooperativa</ModalHeader>
                <ModalBody>
                    <FormValidate className="mt-4 form-horizontal">
                        <FormGroup className="row">
                            <Label className="col-sm-6">Cooperativa</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.data.cooperativa} error={errors.includes('cooperativa')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Punto de emisión (tasa)</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('punto_emision_tasa')} value={this.state.data.punto_emision_tasa} error={errors.includes('punto_emision_tasa')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Secuencia (tasa)</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('secuencia_tasa')} value={this.state.data.secuencia_tasa} error={errors.includes('secuencia_tasa')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Punto de emisión (boleto)</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('punto_emision_boleto')} value={this.state.data.punto_emision_boleto} error={errors.includes('punto_emision_boleto')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Secuencia (boleto)</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('secuencia_boleto')} value={this.state.data.secuencia_boleto} error={errors.includes('secuencia_boleto')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Punto de emisión (nota de crédito)</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('punto_emision_nota_credito')} value={this.state.data.punto_emision_nota_credito} error={errors.includes('punto_emision_nota_credito')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Secuencia (nota de crédito)</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('secuencia_nota_credito')} value={this.state.data.secuencia_nota_credito} error={errors.includes('secuencia_nota_credito')} />
                            </div>
                        </FormGroup>
                    </FormValidate>
                </ModalBody>
                <ModalFooter>
                    <Button type="success" onClick={this.guardar}>Aceptar</Button>{' '}
                    <Button type="secondary" onClick={this.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

AddCooperativaPuntoVentaModal.defaultProps = {
    show : false
}

export default AddCooperativaPuntoVentaModal