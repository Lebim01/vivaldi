import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, FormGroup, Label, Select } from './../../temeforest'
import axios from 'axios'
import { baseurl } from './../../utils/url'

class AddRol extends React.Component {

    seleccione = [{label:'Seleccione', value:''}]
    state = {
        errors : [],
        data : {}
    }
    optionsRol = {
        url : `${baseurl}/rol/`,
        labelName : 'name',
        valueName : 'id'
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
    async getRolName(id){
        const { data } = await axios.get(`${baseurl}/rol/${id}`)
        if(data.id){
            return data.name
        }
        return ''
    }

    onChange = name => async (e) => {
        let data = this.state.data
        data[name] = e.target.value
        if (name === 'rol') {
            data.id = e.target.value
            data.name = await this.getRolName(e.target.value)
        }
        this.setState({
            data
        })
    }

    guardar(){
        const required = ['rol']
        let errors = []
        for(let i in required){
            if(!this.state.data[required[i]]){
                errors.push(required[i])
            }
        }
        if(errors.length == 0){
            if(this.props.guardar){
                this.props.guardar(this.state.data)
                this.setState({
                    data : {}
                })
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
                <ModalHeader toggle={this.toggle}>Agregar Rol</ModalHeader>
                <ModalBody>
                    <form className="mt-4 form-horizontal">
                        <FormGroup className="row">
                            <Label className="col-sm-6">Rol</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsRol} onChange={this.onChange('rol')} value={this.state.data.rol} error={errors.includes('rol')} />
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

AddRol.defaultProps = {
    show : false,
    id_localidad : null,
    id_nivel : null
}

export default AddRol