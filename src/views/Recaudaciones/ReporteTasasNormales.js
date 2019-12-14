import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Select, ReportPage, Input, Permission, Button, FormValidate } from 'temeforest'
import moment from 'moment'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { baseurl } from 'utils/url'
import { printHtml, barcodeToPng } from 'utils/exportData'
import axios from 'axios'
import { moneyFormat } from 'utils/number'

const endpoint = 'venta/solicitud_tasacontingencia'

/**
 * TASAS DE CONTINGENCIA TIPO 1
 * LA CABEZA DE LA IMPRESION DEBE SER LA COOPERATIVA
 * PORQUE LAS COOPERATIVAS SON LAS QUE HACEN LA SOLICITUD
 * Y SALEN EN ESTE MODULO SOLO LAS APROBADAS PARA PODER IMPRIMIR
 */

class ReporteTasasNormales extends React.Component {
    state = {
        //fecha : moment().format('YYYY-MM-DD'),
        fecha_inicio : moment().format('YYYY-MM-DD'),
        fecha_fin : moment().format('YYYY-MM-DD'),
        estado : 1, // aceptado
        
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

    optionsFecha= {
        url : `${baseurl}/venta/generacion_contingencia/`,
        labelName: 'fecha',
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

    rowToHtml(row){
        return `
            <div style="margin-bottom: 10px; border-bottom: 1px solid black; width: 300px; text-align: center;">
                <p style="margin-top: 5px; margin-bottom: 5px;">${row.localidad_nombre}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">${row.cooperativa_nombre}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">Contingencia</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Emisión: </span>
                    <span style="width: 100px; text-align: left;">${row.fecha_hora_venta}</span>
                </p>
                <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Tasa: </span>
                    <span style="width: 100px; text-align: left;">$ ${row.valor}</span>
                </p>
                <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Oficinista: </span>
                    <span style="width: 100px; text-align: left;">${row.usuario_creacion_nombre}</span>
                </p>
                 <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Cantidad: </span>
                    <span style="width: 100px; text-align: left;">${row.cantidad_aprobada}</span>
                </p>
                <img width="300" src="${barcodeToPng(row.codigo)}"/>
            </div>
        `
    }

    async toWord(row){
        const res = await axios.get(`${baseurl}/venta/solicitud_tasacontingencia/${row.id}/tasas`)
        const html = res.data.map((row) => this.rowToHtml(row))
        printHtml(html)
    }

    /*fieldImprimir = (row) => {
        return (
            <React.Fragment>
                <Button outline onClick={() => this.toWord(row)}>Imprimir</Button>
            </React.Fragment>
        )
    }*/

    render(){
        const { refresh } = this.state
        return (

            <Permission key_permission="view_reporte_tasas_normales" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage

                                        exportExcel
                                        imprimirPantalla
                                        id="report"
                                        title= "Reporte Tasas Normales"

                                        filtersZone={
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
                                                        <Input asyncOptions={this.optionsFecha} className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.fecha_inicio} />
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="row">
                                                    <Label className="col-sm-3">Fecha fin</Label>
                                                    <div className="col-sm-8">
                                                        <Input asyncOptions={this.optionsFecha} className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.fecha_fin} />
                                                    </div>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        }

                                        /*actionsButtons={[
                                        <div className="row">
                                            <div className="col-sm-12 text-center">
                                                <Button onClick={this.buscar.bind(this)}>
                                                    Buscar
                                                </Button>
                                            </div>
                                        </div>
                                        ]}*/                                        
                                        
                                            searchable={false}
                                            
                                            ref={this.table}

                                            fieldNames={['Localidad', 'Cooperativa','Fecha', 'Usuario', 'Cantidad', 'Valor']}
                                            fields={[
                                                'localidad_nombre',
                                                'cooperativa_nombre', 
                                                'fecha',
                                                'usuario_solicitante_nombre',
                                                (row)=> <label style={{fontWeight: 300}}>{("  " + row.cantidad_aprobada || 0)}</label>,
                                                (row)=> <label style={{float:"right", fontWeight: 300}}>${moneyFormat(row.valor || 0)}</label>,
                                                /*this.fieldImprimir*/
                                            ]}

                                            endpoint={endpoint}
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

export default ReporteTasasNormales