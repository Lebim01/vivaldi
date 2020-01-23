import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Input, Button, FormValidate, SelectLocalidad } from 'temeforest'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import moment from 'moment'
import Swal from 'sweetalert2'
import { baseurl } from 'utils/url'
import { moneyFormat } from 'utils/number'
import { confirmEndpoint } from 'utils/dialog'

const style_money_label = {
    float:'right'
}

/**
 * TASAS DE TIPO 2
 * Contingencia general
 */

class RegistroTasa extends React.Component {

    state = {
        cantidad : '',
        bloques : '',
        localidad: 0
    }

    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    toggle = () => {
        if(this.props.toggle){
            this.props.toggle()
        }
    }

    onChange = name => (e) => {
        let value = e.target.value
        this.setState({
            [name]: value,
            ...(name === 'bloques' ? { cantidad: value*100 } : {})
        })
    }

    guardar = async () => {
        const data = this.state
        const endpoint = 'venta/generacion_contingencia'
        const options = {
            endpoint,
            params : data,
            text : '¿Seguro de guardar?'
        }

        if(await confirmEndpoint(options)){
            Swal.fire({
                text : `Guardado`,
                type : 'success'
            })
            this.toggle()
        }
    }

    render(){
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Registro tasas contingencia general</ModalHeader>
                <ModalBody>
                    <FormValidate className="mt-4 form-horizontal">
                        <FormGroup className="row">
                            <Label className="col-sm-3">Bloques</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('bloques')} value={this.state.bloques} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cantidad</Label>
                            <div className="col-sm-6">
                                <Input type="number" value={this.state.cantidad} readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Localidad</Label>
                            <div className="col-sm-6">
                                <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.localidad}/>
                            </div>
                        </FormGroup>
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

class TasasContingencia extends React.Component {
    state = {
        fecha_inicio : moment().format('YYYY-MM-DD'),
        fecha_fin : moment().format('YYYY-MM-DD'),
        openModal: false
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

    toggle = () => {
        let state = !this.state.openModal
        this.setState({
            openModal: state
        })
    }

    print = async (row) => {
        const link = document.createElement('a')
        link.download = true
        link.href = `${baseurl}/venta/generacion_contingencia/${row.id}/imprimir`
        link.click()
    }

    imprimir = (row) => {
        return (
            <Button onClick={() => this.print(row)}>
                Imprimir
            </Button>
        )
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
                                    Tasas contingencia
                                    <Button className="pull-right" onClick={this.toggle}>
                                        <i className="fa fa-plus" /> Contingencia general
                                    </Button>
                                </CardTitle>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Localidad</Label>
                                            <div className="col-sm-8">
                                                <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.localidad}/>
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

                                    headerClass="text-center"
                                    tdBodyClass="text-center"

                                    head={[['Fecha', 'Localidad', 
                                    {
                                        title:'Precio', 
                                        style:{textAlign:"right", position: 'relative', right:'0%' }
                                    }, 
                                    {
                                        title:'Cantidad', 
                                        style:{textAlign:"right", position: 'relative', right:'0%' }
                                    },
                                    {
                                        title:'Total', 
                                        style:{textAlign:"right", position: 'relative', right:'0%' }
                                    }, 
                                    {
                                        title:'Acción', 
                                        style:{textAlign:"right", position: 'relative', right:'8%' }
                                    }
                                ]]}
                                    fields={[
                                        'fecha', 
                                        'localidad_nombre', 
                                        (row) => <span style={style_money_label}>${moneyFormat(row.precio)}</span>, 
                                        (row) => <span style={style_money_label}>${moneyFormat(row.cantidad)}</span>, 
                                        (row) => <span style={style_money_label}>${moneyFormat(row.total)}</span>, 
                                        this.imprimir
                                    ]}

                                    endpoint='venta/generacion_contingencia'
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

export default TasasContingencia
