import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, FormGroup, Input, Label } from './../../temeforest'

class PuertaModal extends React.Component {

    state = {
        numero : ''
    }

    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this)
        this.onChange = this.onChange.bind(this)
        this.guardar = this.guardar.bind(this)
    }

    toggle() {
        if(this.props.toggle){
            this.props.toggle()
        }
    }

    onChange = name => (e) => {
        this.setState({
            [name] : e.target.value
        })
    }

    guardar(){
        const { nombre, index, id } = this.state
        if(this.props.guardar){
            let _exito = this.props.guardar({nombre, index, id})
            if(_exito){
                this.setState({
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
        const { numero } = this.state
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Crear/Editar Puerta</ModalHeader>
                <ModalBody>
                    <form className="mt-4 form-horizontal">
                        <FormGroup className="row">
                            <Label className="col-sm-3">N&uacute;mero</Label>
                            <div className="col-sm-6">
                                <Input onChange={this.onChange('numero')} value={numero} />
                            </div>
                        </FormGroup>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button type="success" onClick={this.guardar}>Aceptar</Button>{' '}
                    <Button type="secondary" onClick={this.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

PuertaModal.defaultProps = {
    show : false,
    id_localidad_nivel : null,
}

export default PuertaModal
