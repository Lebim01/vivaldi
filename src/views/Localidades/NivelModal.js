import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, FormGroup, Input, Label, FormValidate } from 'temeforest'
import Swal from 'sweetalert2'

class NivelModal extends React.Component {

    state = {
        nombre : ''
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.show !== this.props.show){
            this.setState({
                ...this.props
            })
        }
    }

    toggle = () => {
        if(this.props.toggle){
            this.props.toggle()
        }
    }

    onChange = name => (e) => {
        this.setState({
            [name] : e.target.value
        })
    }

    guardar = () => {
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
        const { nombre } = this.state
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Crear/Editar Nivel</ModalHeader>
                <ModalBody>
                    <FormValidate className="mt-4 form-horizontal">
                        <FormGroup className="row">
                            <Label className="col-sm-3">Nombre</Label>
                            <div className="col-sm-6">
                                <Input onChange={this.onChange('nombre')} value={nombre} />
                            </div>
                        </FormGroup>
                    </FormValidate>
                </ModalBody>
                <ModalFooter>
                    <Button type="success" onClick={this.guardar}>Aceptar</Button>
                    {' '}
                    <Button type="secondary" onClick={this.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

NivelModal.defaultProps = {
    show : false,
    id_localidad : null,
    id_nivel : null
}

export default NivelModal
