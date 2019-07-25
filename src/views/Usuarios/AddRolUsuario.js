import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, FormGroup, Label, Select } from './../../temeforest'
import axios from 'axios'
import { baseurl } from './../../utils/url'

class AddRolUsuario extends React.Component {

    seleccione = [{label:'Seleccione', value:''}]
    state = {
        errors : [],
        data : {}
    }
    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id' 
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
        this.getCooperativaName = this.getCooperativaName.bind(this)
    }

    componentDidMount(){
        this.getCooperativas()
        this.getRoles()
    }

    toggle() {
        if(this.props.toggle){
            this.props.toggle()
        }
    }

    getCooperativaName(id){
        for(let i in this.state.cooperativas){
            let row = this.state.cooperativas[i]
            if(row.value == id)
                return row.label
        }
        return ''
    }

    getRolName(id){
        for(let i in this.state.roles){
            let row = this.state.roles[i]
            if(row.value == id)
                return row.label
        }
        return ''
    }

    onChange = name => (e) => {
        let data = this.state.data
        data[name] = e.target.value
        if (name === 'cooperativa') {
            data.cooperativa_nombre = this.getCooperativaName(e.target.value)
        }
        if (name === 'rol') {
            data.id = e.target.value
            data.name = this.getRolName(e.target.value)
        }
        this.setState({
            data
        })
    }

    guardar(){
        const required = ['cooperativa', 'rol']
        let errors = []
        for(let i in required){
            if(!this.state.data[required[i]]){
                errors.push(required[i])
            }
        }
        if(errors.length == 0){
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
                    <form className="mt-4 form-horizontal">
                        <FormGroup className="row">
                            <Label className="col-sm-6">Cooperativa</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.data.cooperativa} error={errors.includes('cooperativa')} />
                            </div>
                        </FormGroup>
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

AddRolUsuario.defaultProps = {
    show : false,
    id_localidad : null,
    id_nivel : null
}

export default AddRolUsuario
