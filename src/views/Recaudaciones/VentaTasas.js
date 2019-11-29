import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Select, Input, Button, FormValidate } from 'temeforest'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import moment from 'moment'
import { baseurl } from 'utils/url'
import { confirmEndpoint } from 'utils/dialog'
import axios from 'axios'
import Swal from 'sweetalert2'

/**
 * TASAS DE TIPO 2
 * Contingencia general
 */

class RegistroTasa extends React.Component {

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
        url : `${baseurl}/usuario/?tipo=1`,
        labelName: 'username',
        valueName: 'id'
    }
    optionsVenta = [
        {label:'Seleccione', value:''}
    ]

    toggle = () => {
        if(this.props.toggle){
            this.props.toggle()
        }
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    guardar = () => {
        if(this.props.guardar){
            this.props.guardar()
        }
    }

    render(){
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Crear/Editar Venta</ModalHeader>
                <ModalBody>
                    <FormValidate className="mt-4 form-horizontal">
                        <FormGroup className="row">
                            <Label className="col-sm-3">F. Venta</Label>
                            <div className="col-sm-6">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha')} value={this.props.fecha} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cooperativa</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.props.cooperativa} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Localidad</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.props.localidad} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Turno</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('turno')} value={this.props.turno} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Supervisor</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsSupervisor} onChange={this.onChange('supervisor')} value={this.props.supervisor} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cantidad (unidades)</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('cantidad')} value={this.props.cantidad} min="1" />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Precio</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('precio')} value={this.props.precio} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Total</Label>
                            <div className="col-sm-6">
                                <Input type="number" readOnly value={this.props.precio * this.props.cantidad || 0} />
                            </div>
                        </FormGroup>
                        { this.props.id &&
                            <FormGroup className="row">
                                <Label className="col-sm-3">Motivo de modificación</Label>
                                <div className="col-sm-6">
                                    <Input onChange={this.onChange('motivo_modificacion')} value={this.props.motivo_modificacion} />
                                </div>
                            </FormGroup>
                        }
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

class VentaTasas extends React.Component {
    state = {
        fecha_inicio : moment().format('YYYY-MM-DD'),
        fecha_fin : moment().format('YYYY-MM-DD'),
        openModal: false,
        venta : {}
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

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    buscar = () => {
        this.setState({
            refresh: true
        })
    }

    nuevaVenta = () => {
        this.setState({ venta: {} })
        this.toggle()
    }

    toggle = () => {
        let state = !this.state.openModal
        this.setState({
            openModal: state
        })
    }

    onChangeVenta = (name, value) => {
        let venta = this.state.venta
        venta[name] = value

        this.setState({
            venta
        })
    }

    guardarVenta = async () => {
        const options = {
            id : this.state.venta.id,
            endpoint : 'venta/venta_contingencia',
            text : '¿Seguro de guardar?',
            params : this.state.venta
        }
        if(await confirmEndpoint(options)){
            Swal.fire('Guardado', 'Guardado exitosamente!', 'success')
            this.nuevaVenta()
        }
    }

    editarVenta = (venta) => {
        if(venta.motivo_modificacion === null){
            this.setState({
                venta
            }, this.toggle)
        }
    }

    fieldEditar = (row) => {
        if(row.motivo_modificacion === null)
            return (
                <Button onClick={(e) => this.editarVenta(row)}>
                    Editar
                </Button>
            )
        return null
    }

    render(){
        const { refresh } = this.state
        return (
            <div className="animated fadeIn">
                <RegistroTasa
                    toggle={this.toggle}
                    guardar={this.guardarVenta}
                    show={this.state.openModal}
                    onChange={this.onChangeVenta}
                    {...this.state.venta}
                />
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    Venta de tasas
                                    <Button className="pull-right" onClick={this.nuevaVenta}>
                                        <i className="fa fa-plus" /> Nueva venta
                                    </Button>
                                </CardTitle>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <FormGroup className="row">
                                            <Label className="col-sm-4">Cooperativa</Label>
                                            <div className="col-sm-8">
                                                <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-4">Localidad</Label>
                                            <div className="col-sm-8">
                                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad}/>
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-sm-6">
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Fecha inicio</Label>
                                            <div className="col-sm-8">
                                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.fecha_inicio} />
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Fecha fin</Label>
                                            <div className="col-sm-8">
                                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.fecha_fin} />
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
                                    fields={['fecha', 'turno', 'localidad_nombre', 'cooperativa_nombre', 'cantidad', 'precio', 'total' , this.fieldEditar]}
                                    onRowDoubleClick={this.editarVenta}

                                    endpoint='venta/venta_contingencia'
                                    parameters={this.state}

                                    history={this.props.history }
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