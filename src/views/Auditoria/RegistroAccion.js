import React from 'react'
import { ListPage, Card, CardBody, Label, FormGroup, Select, Input, Button ,Permission, SelectLocalidad} from 'temeforest'
import { baseurl } from 'utils/url'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import moment from 'moment'


class ModalDetalle extends React.Component {

    state = {

    }

    toggle = () => {
        if(this.props.toggle){
            this.props.toggle()
        }
    }

    render(){
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle} size={'lg'}>
                <ModalHeader toggle={this.toggle}>Detalle Registro Accion <b>{this.props.event_type}</b></ModalHeader>
                <ModalBody>
                    <div className="row">        
                        <div className="col-sm-6">
                            <FormGroup className="row">
                                <Label className="col-sm-4">Fecha/Hora</Label>
                                <div className="col-sm-6">
                                    <Input readOnly className="no-clear" type="datetime" value={this.props.datetime} />
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
                                <div className="col-sm-6">
                                    
                                    <Input readOnly className="no-clear" value={this.props.model}/>
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-4">Evento</Label>
                                <div className="col-sm-6">
                                    <Input readOnly value={this.props.event_type} />
                                </div>
                            </FormGroup>
                        </div>

                        { this.props.event_type === 'Create' &&
                            <div className="col-sm-12">
                                <label className="col-sm-12 text-center">Campos</label>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Clave</th>
                                            <th>Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.props.object_json_repr && this.props.object_json_repr[0] && this.props.object_json_repr[0].fields &&
                                            Object.keys(this.props.object_json_repr[0].fields).map((key) => 
                                                <tr>
                                                    <td style={{"padding" : "0.1rem"}}>{key}</td>
                                                    <td style={{"padding" : "0.1rem"}}>{this.props.object_json_repr[0].fields[key]}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }

                        { this.props.event_type === 'Update' &&
                            <div className="col-sm-12">
                                <label className="col-sm-12 text-center">Campos</label>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Objeto</th>
                                            <th>Anterior</th>
                                            <th>Actual</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.props.changes  && 
                                            Object.keys(this.props.changes).map((key) => 
                                                <tr >
                                                    <td style={{"padding" : "0.1rem"}}>{key}</td>
                                                    <td style={{"padding" : "0.1rem"}}>{this.props.changes[key][0]}</td>
                                                    <td style={{"padding" : "0.1rem"}}>{this.props.changes[key][1]}</td>
                                                </tr>
                                            )
                                        }
                                        { (this.props.changes === 'Sin Cambios' || this.props.changes === null) && 
                                            <tr>
                                                <td style={{"padding" : "0.1rem"}}>{""}</td>
                                                <td style={{"padding" : "0.1rem"}}>{"Sin cambios"}</td>
                                                <td style={{"padding" : "0.1rem"}}>{"Sin cambios"}</td>
                                            </tr>
                                        
                                            
                                        }
                                        
                                    </tbody>
                                    
                                </table>
                            </div>
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="secondary" onClick={this.toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}


class RegistroAccion extends React.Component {

    table = React.createRef()
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

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    buscar = () => {
        
            this.table.current.refresh()
    
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
    }

    render() {
        const { refresh } = this.state      
        return (
            <Permission key_permission="view_diario" mode="redirect">
                <div className="animated fadeIn">
                 <ModalDetalle
                    toggle={this.toggle}
                    show={this.state.openModal}
                    {...this.state.venta}
                />
                <div className="row">
                    <div className="col-sm-12">
                         <Card>
                            <CardBody>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                            <Button style={{ bottom: "-206px", }} onClick={this.buscar}>
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
                                                            <Select asyncOptions={this.optionsTable} onChange={this.onChange('content_type')} value={this.state.content_type}/>
                                                        </div>
                                                        <div className="col-sm-2"></div>
                                                    </FormGroup>
                                                </div>
                                            </div>
                                        }
                                        ref={this.table}
                                        autoLoad={false}
                                        searchable={false}
                                        headerClass="text-center"
                                        head={[[
                                            'Fecha/Hora', 
                                            'username', 
                                            'model', 
                                            'Id tabla',
                                            'Evento', 
                                            'Detalle'
                                        ]]}
                                        fields = {[
                                            'datetime', 
                                            'user', 
                                            'model', 
                                            'object_id',
                                            'event_type', 
                                            this.fieldEditar
                                        ]}
                                        onClick={this.editarVenta}

                                        
                                        endpoint='auditcrud'
                                        parameters={this.state}
                                        

                                        history={this.props.history}
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
