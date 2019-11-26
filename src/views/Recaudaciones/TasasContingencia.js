import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Select, Input, Button, FormValidate } from 'temeforest'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import moment from 'moment'
import Swal from 'sweetalert2'
import axios from 'axios'
import { baseurl } from 'utils/url'
import { moneyFormat } from 'utils/number'
import { confirmEndpoint } from 'utils/dialog'
import { printHtml, barcodeToPng } from 'utils/exportData'

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
                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad} />
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

    rowToHtml(row, id){
        return `
            <div style="margin-bottom: 10px; border-bottom: 1px solid black; width: 300px; text-align: center;">
                <p style="margin-top: 5px; margin-bottom: 5px;">${row.localidad_nombre}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">Contingencia general</p>
                <p style="display:none; margin-top: 5px; margin-bottom: 5px;">Bloque #${row.bloque} - Tasa #${id}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Emisión: </span>
                    <span style="width: 100px; text-align: left;">${moment().format('DD/MM/YYYY')}</span>
                </p>
                <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Tasa: </span>
                    <span style="width: 100px; text-align: left;">$ ${row.valor}</span>
                </p>
                <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Oficinista: </span>
                    <span style="width: 100px; text-align: left;">${row.usuario_creacion_nombre}</span>
                </p>
                <img src="${barcodeToPng(row.codigo)}" width="300"/>
            </div>
        `
    }

    print = async (row) => {
        const res = await axios.get(`${baseurl}/venta/generacion_contingencia/${row.id}/tasas`)
        const html = res.data.map((row) => this.rowToHtml(row, row.id))
        printHtml(html)
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

                                    headerClass="text-center"
                                    tdBodyClass="text-center"

                                    fieldNames={['Fecha', 'Localidad', 'Precio', 'Cantidad', 'Total', 'Acción']}
                                    fields={[
                                        'fecha', 
                                        'localidad_nombre', 
                                        (row) => <label style={style_money_label}>${moneyFormat(row.precio)}</label>, 
                                        'cantidad', 
                                        (row) => <label style={style_money_label}>${moneyFormat(row.total)}</label>, 
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
