import React, { Component } from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, FormValidate, Select, Input, Button ,Permission, SelectLocalidad} from 'temeforest'
import { baseurl, objectToUrl } from 'utils/url'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { printHtml } from 'utils/exportData'
import axios from 'axios'
import moment from 'moment'


class RegistroTasa extends React.Component {

    state ={
        from_date: moment().format('YYYY-MM-DD'),
        to_date: moment().format('YYYY-MM-DD'),
    }


    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id',
    }
    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    cantidad= (row) => {
        return (
            <ul>
            {row.object_json_repr.map(({ fields}, index) => 
                <li>{fields.cantidad}</li>
            )}
        </ul>
        
        )
        
    }
    

    toggle = () => {
        if(this.props.toggle){
            this.props.toggle()
        }
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

    guardar = () => {
        if(this.props.guardar){
            this.props.guardar()
        }
    }

    render(){
        const { refresh } = this.state      
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Detalle Registro Accion</ModalHeader>
                <ModalBody>
                <div className="row">
                                        
                    <div className="col-sm-6">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Fecha/Hora</Label>
                            <div className="col-sm-6">
                                <Input readOnly className="no-clear" type="datetime" onChange={this.onChange('datetime')} value={this.props.datetime} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Usuario</Label>
                            <div className="col-sm-6">
                                <Input readOnly value={this.props.user} />
                            </div>
                            
                        </FormGroup>
                    </div>
                    <div className="col-sm-6">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Model</Label>
                            <div className="col-sm-8">
                                
                                <Input readOnly className="no-clear" value={this.props.model}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-5">Evento</Label>
                            <div className="col-sm-6">
                                <Input readOnly value={this.props.event_type} />
                            </div>
                        </FormGroup>
                    </div>                      
                </div>
                <ListPage

                  
                    ref={this.table}
                    autoLoad={false}
                    searchable={false}


                    fieldNames={this.props.event_type == 'Create' ?  ['Id object', 'Valor'] : ['Cliente', 'Cédula/RUC', 'Viajes']}
                    fields={
                        this.state.reporte == 1 
                            ? ['nombre', (row) => <span style={{ float: 'right',position: 'relative', right:'75%'}}>{row.viajes}</span>] 
                            : ['nombre', 'identificacion', 'viajes']
                    }

                    endpoint='venta/clientes-frecuentes'
                    parameters={this.state}

                    history={this.props.history}
                />
                </ModalBody>
                <ModalFooter>
                    <Button type="success" onClick={this.guardar}>Aceptar</Button>{' '}
                    <Button type="secondary" onClick={this.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}


class RegistroAccion extends React.Component {

    state = {
        from_date: moment().format('YYYY-MM-DD'),
        to_date: moment().format('YYYY-MM-DD'),
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

    optionsTable = {
        url : `${baseurl}/tables/`,
        labelName: 'name',
        valueName: 'id'
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

    propietario= (row) => {
        return (
            <ul>
            {row.object_json_repr.map(({ fields}, index) => 
                <li>{fields.propietario}</li>
            )}
        </ul>
        
        )
        
    }

    PrimerNombre= (row) => {
        return (
            <ul>
            {row.object_json_repr.map(({ fields}, index) => 
                <li>{fields.first_name}</li>
            )}
        </ul>
        
        )
        
    }

    usuarioPrimero= (row) => {
        return (
            
        <ul>
            {row.object_json_repr.map(({fields}, index) => 
                <li>{fields.nombre}</li>
            )}
        </ul>
        
        )
        
    }

    todos = (row)=> {
        
            row.object_json_repr.map(({ fields}, index ) =>{
                return(
                <ul>
                    {Object.keys(fields).map(fieldNames => {
                        return(
                            <li>
                                {fieldNames} : {fields[fieldNames]}
                            </li>
                        )

                    })}
                </ul>
                )
              })      
    }

    fechaEmision = (row) => {
        return (
            <ul>
            {row.object_json_repr.map(({ fields}, index) => 
                <li>{fields.fecha_emision}</li>
            )}
        </ul>
        
        )
        
    }

    direccion = (row) => {
        return (
            <ul>
            {row.object_json_repr.map(({ fields}, index) => 
                <li>{fields.direccion}</li>
            )}
        </ul>
        
        )
        
    }

    identificacion= (row) => {
        return (
            <ul>
            {row.object_json_repr.map(({ fields}, index) => 
                <li>{fields.identificacion}</li>
            )}
        </ul>
        
        )
        
    }

    cantidad= (row) => {
        return (
            <ul>
            {row.object_json_repr.map(({ fields}, index) => 
                <li>{fields.cantidad}</li>
            )}
        </ul>
        
        )
        
    }

    editarVenta = (venta) => {
            this.setState({
                venta
            }, this.toggle)
        
    }

    fieldEditar = (row) => {
            return (
                <Button onClick={(e) => { this.editarVenta(row) }}>
                    Ver detalle
                </Button>
            )
        
        return null
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

    render() {
        const { refresh } = this.state      
        return (
            <Permission key_permission="view_diario" mode="redirect">
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
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <Button style={{ bottom: "-206px", }} onClick={this.buscar.bind(this)}>
                                            Buscar
                                        </Button>
                                    </div>
                                </div>
                                <ListPage

                                    exportExcel
                                    imprimirPantalla
                                    id="report"
                                    key_permission="diario"

                                    title= "Registro Acciones"
                                
                                filtersZone = {
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <FormGroup className="row">
                                                <Label className="col-sm-5">Cooperativa</Label>
                                                <div className="col-sm-6">
                                                    
                                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-5">Localidad</Label>
                                                <div className="col-sm-6">
                                                    <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.localidad}/>
                                                </div>
                                            </FormGroup>
                                        </div>
                                            <div className="col-sm-4">
                                                <FormGroup className="row">
                                                    <Label className="col-sm-4">Fecha Inicio</Label>
                                                    <div className="col-sm-6">
                                                        <Input className="no-clear" type="date" value={this.state.from_date} onChange={this.onChange('from_date')} />
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="row">
                                                    <Label className="col-sm-4">Fecha Fin</Label>
                                                    <div className="col-sm-6">
                                                        <Input className="no-clear" type="date" value={this.state.to_date} onChange={this.onChange('to_date')} />
                                                    </div>
                                                    <div >
                                                        <Label className="col-sm-4" style={{ bottom: "-290px",    margin: "0 10px 0 66px"}} ></Label>
                                                        <Label className="col-sm-4" style={{ bottom: "-290px",    margin: "0 10px 0 66px"}} ></Label>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                            <div className="col-sm-4">
                                                <FormGroup className="row">
                                                    <Label className="col-sm-3">Tabla</Label>
                                                    <div className="col-sm-6">
                                                        <Select asyncOptions={this.optionsTable} onChange={this.onChange('content_type')} value={this.state.cooperativa}/>
                                                    </div>
                                                    <div className="col-sm-2"></div>
                                                    
                                                </FormGroup>
                                                

                                            </div>
                                        
                                    </div>
                                        
                                }         
                                    
                                    //showStatus={true}
                                    ref={this.table}
                                    searchable={false}
                                    headerClass="text-center"
                                    head={[[
                                        'Fecha/Hora', 
                                        'username', 
                                        'model', 
                                        'Id tabla',
                                        //'Codigo',
                                        //'Propietario',
                                        //'Tabla', 
                                        //'Dirección',
                                        'Evento', 
                                        //'Identificación',
                                        //'Departamento', 
                                        /*'Descripción'*/
                                    //'Fecha emisión',
                                        'Detalle'
                                    ]]}
                                    fields = {[
                                        'datetime', 
                                        'user', 
                                        'model', 
                                        'object_id',
                                        //'object_id',
                                        //'placa',
                                        //'content_type',
                                    // this.direccion,
                                        'event_type', 
                                    // this.identificacion, 
                                        //'object_repr', 
                                        //this.fechaEmision
                                        this.fieldEditar
                                    ]}
                                    onRowDoubleClick={this.editarVenta}


                                    endpoint='auditcrud'
                                    parameters={this.state}

                                    history={this.props.history}
                                    refresh={refresh}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
            </Permission>
        )
    }
}

export default RegistroAccion
