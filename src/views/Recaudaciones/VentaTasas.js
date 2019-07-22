import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Select, Input, Button } from './../../temeforest'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import moment from 'moment'
import { baseurl } from './../../utils/url'

class RegistroTasa extends React.Component {

    state = {}

    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this)
        this.onChange = this.onChange.bind(this)
        this.guardar = this.guardar.bind(this)
    }

    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    optionsSupervisor = {
        url : `${baseurl}/supervisor/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    optionsVenta = [
        {label:'Seleccione', value:''}
    ]

    toggle() {
        if(this.props.toggle){
            this.props.toggle()
        }
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    guardar(){

    }

    render(){
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Crear/Editar Venta</ModalHeader>
                <ModalBody>
                    <form className="mt-4 form-horizontal">
                        <FormGroup className="row">
                            <Label className="col-sm-3">F. Venta</Label>
                            <div className="col-sm-6">
                                <Input type="date" onChange={this.onChange('fecha_venta')} value={this.state.fecha_venta} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cooperativa</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.cooperativa} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Localidad</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Turno</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('turno')} value={this.state.turno} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Supervisor</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsSuperviso} onChange={this.onChange('supervisor')} value={this.state.supervisor} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cantidad (unidades)</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('cantidad')} value={this.state.cantidad} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Precio</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('precio')} value={this.state.precio} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Total</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('total')} value={this.state.total} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Motivo de modificación</Label>
                            <div className="col-sm-6">
                                <Input onChange={this.onChange('motivo')} value={this.state.motivo} />
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

class VentaTasas extends React.Component {
    state = {
        fecha_inicio : moment().format('YYYY-MM-DD'),
        fecha_fin : moment().format('YYYY-MM-DD'),
        openModal: false
    }
    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id' 
    }

    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this)
    }

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    buscar(){
        this.setState({
            refresh: true
        })
    }

    toggle(){
        let state = !this.state.openModal
        this.setState({
            openModal: state
        })
    }
    
    render(){
        const { refresh } = this.state
        return (
            <div className="animated fadeIn">
                <RegistroTasa 
                    show={this.state.openModal}
                    toggle={this.toggle}
                />
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    Venta de tasas
                                    <Button className="pull-right" onClick={this.toggle}>
                                        <i className="fa fa-plus" /> Nueva venta
                                    </Button>
                                </CardTitle>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Cooperativa</Label>
                                            <div className="col-sm-8">
                                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Localidad</Label>
                                            <div className="col-sm-8">
                                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad}/>
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-sm-6">
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Fecha inicio</Label>
                                            <div className="col-sm-8">
                                                <Input type="date" onChange={this.onChange('fecha_inicio')} value={this.state.fecha_inicio} />
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Fecha fin</Label>
                                            <div className="col-sm-8">
                                                <Input type="date" onChange={this.onChange('fecha_fin')} value={this.state.fecha_fin} />
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <Button onClick={this.buscar.bind(this)}>
                                            Buscar
                                        </Button>
                                    </div>
                                </div>
                                <ListPage
                                    searchable={false}

                                    fieldNames={['Fecha venta', 'Turno', 'Localidad', 'Cooperativa', 'Cantidad', 'Valor unitario', 'Valor total', 'Acción']}
                                    fields={['', '', '', '', '', '', '' , '']}

                                    url='recaudaciones/venta_tasas'

                                    menu='recaudaciones'
                                    submenu='venta-tasas'
                                    parameters={this.state}
                                    
                                    history={this.props.history}
                                    refresh={refresh}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default VentaTasas