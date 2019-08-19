import React from 'react'
import { Button, FormGroup, Input, Select, Label, EditPage } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import AddParadaModal from './AddParadaModal'

const endpoint = 'ruta'
const urlFront = '/operaciones/rutas'

class RecordRow extends React.Component {

    delete(){
        if(this.props.delete){
            this.props.delete(this.props.index)
        }
    }

    render(){
        const name_input = `activa_${this.props.ciudad}`
        return (
            <tr onDoubleClick={this.props.edit}>
                <td>
                    <Button outline={true} type="danger" size="sm" rounded={true} onClick={this.delete.bind(this)}>
                        <i className="fa fa-times"></i>
                    </Button>{' '}
                    {this.props.ciudad_nombre}
                </td>
                <td>{this.props.orden_llegada}</td>
                <td>{this.props.tarifa_normal}</td>
                <td>{this.props.tarifa_media}</td>
                <td>{this.props.duracion}h</td>
                <td>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id={name_input} name={name_input} checked={this.props.is_enable} onChange={this.props.onChange('is_enable')} />
                        <Label onlyClassName="custom-control-label" htmlFor={name_input}></Label>
                    </div>
                </td>
            </tr>
        )
    }
}

class MainView extends React.Component {

    state = {
        modal : {
            show : false
        }
    }

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    optionsDestinos = {
        url : `${baseurl}/ciudad/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    constructor(props){
        super(props)
        this.toggleModal = this.toggleModal.bind(this)
        this.agregarParada = this.agregarParada.bind(this)
        this.deleteParada = this.deleteParada.bind(this)
    }
    
    onChange = name => (e) => {
        if(this.props.onChange){
            let value = e.target.value
            this.props.onChange(name, value)
        }
    }

    onChangeParada = index => name => (e) => {
        let paradas = this.props.paradas
        let value = e.target.value
        if(name == 'is_enable') value = e.target.checked
        paradas[index][name] = value
        this.props.onChange('paradas', paradas)
    }

    toggleModal = (data = {}) => {
        let _modal = this.state.modal
        _modal.show = !_modal.show
        _modal.data = data
        this.setState({
            modal : _modal
        })
    }

    agregarParada({ onChange, ...data }){
        let paradas = this.props.paradas
        let _continue = !paradas.some((r, i) => r.ciudad == data.ciudad && r.id != data.id && i != data.index)
        if(!_continue){
            return false
        }

        if(data.id){
            for(let i in paradas){
                if(paradas[i].id == data.id){
                    paradas[i] = data
                    break
                }
            }
        }
        else if(data.index){
            paradas[data.index] = data
        }
        else {
            paradas.push({ ...data, is_enable: true })
        }
        this.props.onChange('paradas', paradas)
        this.toggleModal({})
        return true
    }

    deleteParada = async (index) => {
        const { value } = await Swal.fire({
            title: 'Borrar parada',
            text: '¿Esta seguro de eliminar?',
            showCancelButton: true
        })
        if(value){
            let paradas = this.props.paradas
            paradas.splice(index, 1)
            this.props.onChange('paradas', paradas)
        }
    }

    editParada(data){
        this.toggleModal({ ...data })
    }

    render(){
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('cooperativa')} value={this.props.cooperativa} asyncOptions={this.optionsCooperativa} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Destino</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('ciudad_destino')} value={this.props.ciudad_destino} asyncOptions={this.optionsDestinos} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Via</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('via')} value={this.props.via} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <h4>
                            Paradas
                            <Button style={{marginLeft: 10}} onClick={this.toggleModal}>
                                <i className="fa fa-plus"></i>
                            </Button>
                        </h4>
                        <div className="col-sm-12">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Parada</th>
                                        <th>Llegada</th>
                                        <th>Tarifa Normal</th>
                                        <th>Tarifa Media</th>
                                        <th>Tiempo</th>
                                        <th>Activa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.props.paradas.map((record, i) => 
                                        <RecordRow 
                                            key={i}
                                            index={i}
                                            {...record}
                                            onChange={this.onChangeParada(i)} 
                                            delete={this.deleteParada} 
                                            edit={() => this.editParada({ ...record, index: i })}
                                        />
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </FormGroup>
                    <AddParadaModal 
                        guardar={(data) => this.agregarParada(data)}
                        {...this.state.modal} 
                        toggle={this.toggleModal} 
                    />
                </form>
            </div>
        )
    }
}

class EditRutas extends React.Component {

    state = {
        id : null,
        data : {
            paradas: []
        }
    }

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/ruta/${id}/`)
        this.setState({
            id,
            data
        })
    }

    onChange(name, value){
        let data = this.state.data
        data[name] = value
        this.setState({
            data
        })
    }

    render(){
        const { data, id } = this.state
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Rutas`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <MainView {...data} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default EditRutas
