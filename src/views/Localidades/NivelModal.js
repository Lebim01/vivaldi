import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, FormGroup, Input, Label } from './../../temeforest'
import AddPuertaModal from './PuertaModal'
import axios from 'axios'
import Swal from 'sweetalert2'


class RecordRow extends React.Component {

    delete(){
        if(this.props.delete){
            this.props.delete(this.props.index)
        }
    }

    render(){
        return (
            <tr onDoubleClick={this.props.edit}>
                <td>{this.props.numero}</td>
                <td>
                    <Button outline={true} type="danger" size="sm" rounded={true} onClick={this.delete.bind(this)}>
                        <i className="fa fa-times"></i>
                    </Button>{' '}
                </td>
            </tr>
        )
    }
}
class NivelModal extends React.Component {

    state = {
        nombre : '',
        modal : {
            show : false,
            id_nivel : null,
            id_localidad : null
        },
        puertas :[]

    }

    constructor(props){
        super(props)
        console.log(props)
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
        const { nombre, index, id, puertas } = this.state
        if(this.props.guardar){
            let _exito = this.props.guardar({nombre, index, id, puertas})
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


  onChangePuerta = index => name => (e) => {
        let puertas = this.state.puertas
        let value = e.target.value
        puertas[index][name] = value
        this.onChange('puertas', puertas)
    }

    toggleModal = (data = {}) => {
        let _modal = this.state.modal
        _modal.show = !_modal.show
        _modal.data = data
        this.setState({
            modal : _modal
        })
    }

    agregarPuerta({ onChange, ...data }){
        let puertas = this.state.puertas
        let _continue = !puertas.some((r, i) => r.numero == data.numero && r.id != data.id && i != data.index)
        if(!_continue){
            return false
        }

        if(data.id){
            for(let i in puertas){
                if(puertas[i].id == data.id){
                    puertas[i] = data
                    break
                }
            }
        }
        else if(data.index){
            puertas[data.index] = data
        }
        else {
            puertas.push({ ...data, is_enable: true })
        }
        this.onChange('puertas', puertas)
        this.toggleModal({})
        return true
    }

    deletePuerta = async (index) => {
        const { value } = await Swal.fire({
            title: 'Borrar puerta',
            text: '¿Esta seguro de eliminar?',
            showCancelButton: true
        })
        if(value){
            let puertas = this.state.puertas
            puertas.splice(index, 1)
            this.props.onChange('puertas', puertas)
        }
    }

    editPuerta(data){
        this.toggleModal({ ...data })
    }

    render(){
        const { nombre, puertas } = this.state
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Crear/Editar Nivel</ModalHeader>
              <ModalBody>
                <form className="mt-4 form-horizontal">
                  <FormGroup className="row">
                    <Label className="col-sm-3">Nombre</Label>
                    <div className="col-sm-6">
                      <Input onChange={this.onChange('nombre')} value={nombre} />
                    </div>
                  </FormGroup>
                  <AddPuertaModal
                    guardar={(data) => this.agregarPuerta(data)}
                    {...this.state.modal}
                    toggle={this.toggleModal}
                  />
                  <FormGroup className="row">
                    <h4>
                      Puertas
                      <Button style={{marginLeft: 10}} onClick={this.toggleModal}>
                        <i className="fa fa-plus"></i>
                      </Button>
                    </h4>
                    <div className="col-sm-12">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>N&uacute;mero</th>
                          </tr>
                        </thead>
                        <tbody>
                          { puertas && puertas.map((record, i) =>
                          <RecordRow
                            key={i}
                            index={i}
                            {...record}
                            onChange={this.onChangePuerta(i)}
                            delete={this.deletePuerta}
                            edit={() => this.editPuerta({ ...record, index: i })}
                          />
                          )}
                        </tbody>
                      </table>
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

NivelModal.defaultProps = {
    show : false,
    id_localidad : null,
    id_nivel : null
}

export default NivelModal
