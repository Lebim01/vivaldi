import React from 'react'
import { Button, FormGroup, Input, Label, Select, FormElementValidate, FormValidate, EditPage } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import { generateHexadecimal } from 'utils/string'
import axios from 'axios'
import Swal from 'sweetalert2'
import AddCooperativaPuntoVentaModal from './AddCooperativaPuntoVentaModal'

const endpoint = 'venta/puntoventa'
const urlFront = '/cooperativas/punto-venta'

class _Row extends React.Component {

    constructor(props){
        super(props)
        this.delete = this.delete.bind(this)
    }

    delete(){
        if(this.props.delete){
            this.props.delete()
        }
    }

    render(){
        return (
            <tr onDoubleClick={this.props.onDoubleClick}>
                <td>
                    <Button outline={true} type="danger" size="sm" rounded={true} onClick={this.delete}>
                        <i className="fa fa-times"></i>
                    </Button>{' '}
                    {this.props.cooperativa_nombre}
                </td>
                <td>{this.props.punto_emision_tasa}</td>
                <td>{this.props.secuencia_tasa}</td>
                <td>{this.props.punto_emision_boleto}</td>
                <td>{this.props.secuencia_boleto}</td>
                <td>{this.props.punto_emision_nota_credito}</td>
                <td>{this.props.secuencia_nota_credito}</td>
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
    optionsLocalidades = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName : 'id'
    }
    constructor(props){
        super(props)
        this.addCooperativa = this.addCooperativa.bind(this)
        this.agregarCooperativa = this.agregarCooperativa.bind(this)
        this.deleteCooperativa = this.deleteCooperativa.bind(this)
        this.editCooperativa = this.editCooperativa.bind(this)
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            if(e.target.type === 'checkbox'){
                this.props.onChange(name, e.target.checked)
            }else{
                this.props.onChange(name, e.target.value)
            }
        }
    }

    addCooperativa(){
        this.setState({
            modal : {
                ...this.state.modal,
                show : true
            }
        })
    }

    toggleModal = () => {
        let _modal = this.state.modal
        _modal.show = !_modal.show
        this.setState({
            modal : _modal
        })
    }

    agregarCooperativa(data){
        let puntoventa_cooperativas = this.props.puntoventa_cooperativas
        if(data.id){
            for(let i = 0; i < puntoventa_cooperativas.length; i++){
                if(puntoventa_cooperativas[i].id === data.id){
                    puntoventa_cooperativas[i] = data
                    break
                }
            }
        }else{
            puntoventa_cooperativas.push(data)
        }
        this.props.onChange('puntoventa_cooperativas', puntoventa_cooperativas)
        this.toggleModal()
    }

    deleteCooperativa = async (index) => {
        const {value} = await Swal.fire({
            title: 'Confirmar',
            text : '¿Seguro de borrar?',
            showCancelButton: true,
        })
        if(value){
            let puntoventa_cooperativas = this.props.puntoventa_cooperativas
            puntoventa_cooperativas.splice(index, 1)
            this.props.onChange('puntoventa_cooperativas', puntoventa_cooperativas)
        }
    }

    editCooperativa = (row) => {
        let modal = {
            show : true,
            ...row
        }
        this.setState({
            modal,
        })
    }

    generateHexadecimal(){
        this.props.onChange('api_key', generateHexadecimal(32))
    }

    render(){
        const { puntoventa_cooperativas } = this.props
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormElementValidate
                        label={{text:'Descripción'}}
                        input={{
                            name : 'descripcion',
                            element: <Input onChange={this.onChange('descripcion')} value={this.props.descripcion} />
                        }}
                        validator={{
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Api Key'}}
                        input={{
                            name : 'api_key',
                            element: <Input onChange={this.onChange('api_key')} value={this.props.api_key} readOnly />,
                            button : <Button onClick={this.generateHexadecimal.bind(this)}>Generar</Button>
                        }}
                        validator={{
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Localidad'}}
                        input={{
                            name : 'localidad',
                            element: <Select asyncOptions={this.optionsLocalidades} onChange={this.onChange('localidad')} value={this.props.localidad} />
                        }}
                        validator={{
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Dirección IP'}}
                        input={{
                            name : 'ip',
                            element: <Input onChange={this.onChange('ip')} value={this.props.ip} placeholder="0.0.0.0" />
                        }}
                        validator={{
                            validationRules: { required:true, ip : true },
                            validationMessages: { required:"El campo es requerido", ip:"El campo debe ser una IP"}
                        }}
                    />
                    <FormGroup className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="offline" name="offline" checked={this.props.offline} onChange={this.onChange('offline')} />
                                <Label onlyClassName="custom-control-label" htmlFor="offline">Offline</Label>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-4">
                            Cooperativas e Información tribunaria
                            <Button size="sm" style={{marginLeft:5}} onClick={this.addCooperativa}>
                                <i className="fa fa-plus"></i>
                            </Button>
                        </Label>
                        <div className="col-sm-12">
                            <div className="table-responsive">
                                <table className="table table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Cooperativa</th>
                                            <th scope="col">Punto<br/>(tasa)</th>
                                            <th scope="col">Secuencia<br/>(tasa)</th>
                                            <th scope="col">Punto<br/>(boleto)</th>
                                            <th scope="col">Secuencia<br/>(boleto)</th>
                                            <th scope="col">Punto<br/>(nota de crédito)</th>
                                            <th scope="col">Secuencia<br/>(nota de crédito)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { puntoventa_cooperativas.map((r, i) => <_Row {...r} onDoubleClick={() => this.editCooperativa(r)} key={i} delete={() => this.deleteCooperativa(i)} />) }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </FormGroup>
                </FormValidate>
                <AddCooperativaPuntoVentaModal 
                    guardar={this.agregarCooperativa} 
                    {...this.state.modal} 
                    toggle={this.toggleModal} 
                />
            </div>
        )
    }
}

class EditPuntoVenta extends React.Component {

    seleccione = [{label:'Seleccione', value:''}]
    state = {
        data:{
            offline: false,
            puntoventa_cooperativas : []
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
        const { data } = await axios.get(`${baseurl}/venta/puntoventa/${id}/`)
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
        const { id, data } = this.state
        return (
            <EditPage 
                title={`${id ? 'Editar' : 'Crear'} Conductores`} 
                data={data} 
                id={id} 
                urlFront={urlFront} 
                endpoint={endpoint} 
                history={this.props.history}
            >
                <MainView {...data} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default EditPuntoVenta