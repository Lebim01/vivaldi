import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Button, Permission, Card, CardBody } from 'temeforest'
import { baseurl } from 'utils/url'
import { confirmEndpoint } from 'utils/dialog'
import { printHtml } from 'utils/exportData'
import { moneyFormat } from 'utils/number'
import moment from 'moment'
import Swal from 'sweetalert2';
import { connect } from 'react-redux'

class Diario extends React.Component {

    constructor(props){
        super(props)
        this.table = React.createRef();
    }

    state = {
        fecha : moment().format('YYYY-MM-DD'),
        tipo: 'p'
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
    optionsTipos = [
        {value:'t', label:'Todos'},
        {value:'p', label:'Pendientes'},
        {value:'c', label:'Cobrados'},
    ]

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    refresh = () => {
        this.setState({
            refresh: true
        })
    }

    cobrar = async ({ localidad, cooperativa, fecha_venta }) => {
        const options = {
            params : {
                localidad,
                cooperativa,
                fecha_venta
            },
            text : '¿Seguro de cobrar?',
            endpoint: 'venta/cobro/crear_cobro_por_fecha'
        }
        if(await confirmEndpoint(options)){
            this.refresh()
            Swal.fire('Cobrado', 'Exitosamente', 'success')
        }
    }

    fieldCobrar = (row) => {
        return (
            <React.Fragment>
                { row.a_cobrar > 0 &&
                    <Button outline onClick={() => this.cobrar(row)}>Cobrar</Button>
                }
            </React.Fragment>
        )
    }


    rowToHtml = (row) => {
        return `
            <div style="margin-bottom: 10px; border-bottom: 1px solid black; width: 300px; text-align: center; border:unset;">
                <p style="margin-top: 5px; margin-bottom: 5px;">${row.localidad_nombre}</p>
                <p style="display:none; margin-top: 5px; margin-bottom: 5px;">${row.cooperativa_nombre}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">Ventas por Cooperativa</p>
            </div>
            <div style="margin-bottom: 10px; border-bottom: 1px solid black; width: 300px; border:unset;">

                <table>
                    <tr>
                        <td>Emisior</td>
                        <td>${this.props.user_info.username}</td>
                    </tr>
                    <tr>
                        <td>Emisión</td>
                        <td>${moment().format('YYYY-MM-DD')}</td>
                    </tr>
                    <tr>
                        <td>Fecha venta</td>
                        <td>${row.fecha_venta}</td>
                    </tr>
                    <tr>
                        <td>Forma de pago:</td>
                        <td>Todos</td>
                    </tr>
                </table>
                <br/>
                <table style="width:100%">
                    <tr>
                        <th style="text-align:left">Tipo</th>
                        <th style="text-align:right">Cant.</th>
                        <th style="text-align:right">v/u</th>
                        <th style="text-align:right">SubTotal</th>
                    </tr>
                    <tr>
                        <td style="text-align:left">Tasas</td>
                        <td style="text-align:right">${row.cantidad}</td>
                        <td style="text-align:right">${row.valor_unitario}</td>
                        <td style="text-align:right">$${moneyFormat(row.a_cobrar)}</td>
                    </tr>
                    <tr><td colspan="4"><br/></td></tr>
                    <tr>
                        <th style="text-align:left">TOTAL</th>
                        <td style="text-align:right;border-top: 1px solid black;">${row.cantidad}</td>
                        <td style="text-align:right;border-top: 1px solid black;">${row.valor_unitario}</td>
                        <td style="text-align:right; border-top: 1px solid black;">$${moneyFormat(row.a_cobrar)}</td>
                    </tr>
                </table>

                <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Anulados </span>
                    <span style="width: 100px; text-align: left;">0</span>
                </p>
            </div>
            <br/>
            <br/>
            <br/>
            <div style="margin-bottom: 10px; border-bottom: 1px solid black; width: 300px; text-align: center; border:unset;">
                <p style="margin-top: 5px; margin-bottom: 5px;">
                    _______________________
                    <br/>
                    Firma Cliente
                </p>
            </div>
        `
    }

    toWord = (row) => {
        printHtml(this.rowToHtml(row))
    }

    imprimirTodos = () => {
        let rows = this.table.current.state.filtered
        let html = rows.filter((row) => row.a_cobrar !== 0).map((row) => this.rowToHtml(row)).join('')
        printHtml(html)
    }

    fieldImprimir = (row) => {
        return (
            <React.Fragment>
                { row.a_cobrar !== 0 &&
                    <Button outline onClick={() => this.toWord(row)}>Imprimir</Button>
                }
            </React.Fragment>
        )
    }

    render(){
        const { refresh } = this.state
        return (
            <Permission key_permission="view_cobros_" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    exportExcel
                                    imprimirPantalla
                                    id="report"
                                    key_permission="diario"

                                    title= "Cobros "

                                    filtersZone={
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <FormGroup className="row">
                                                    <Label className="col-sm-5">Dia</Label>
                                                    <div className="col-sm-7">
                                                        <Input className="no-clear" type="date" onChange={this.onChange('fecha')} value={this.state.fecha}/>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="row">
                                                    <Label className="col-sm-5">Localidad</Label>
                                                    <div className="col-sm-7">
                                                        <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad}/>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                            <div className="col-sm-4">
                                                <FormGroup className="row">
                                                    <Label className="col-sm-6">Cooperativa</Label>
                                                    <div className="col-sm-6">
                                                        <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="row">
                                                    <Label className="col-sm-6">Tipo</Label>
                                                    <div className="col-sm-6">
                                                        <Select options={this.optionsTipos} onChange={this.onChange('tipo')} value={this.state.tipo}/>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                            <div className="col-sm-4 text-right">

                                            </div>
                                        </div>
                                    }


                                    searchable={false}
                                    ref={this.table}

                                    fieldNames={['Cooperativa', 'Localidad', 'Fecha venta', 'Cobrar', 'A cobrar', 'Cobrado', 'Fecha cobro', 'N.C', 'Acción']}
                                    fields={[
                                        'cooperativa_nombre',
                                        'localidad_nombre',
                                        'fecha_venta',
                                        this.fieldCobrar,
                                        (row) => <label style={{float:"right", fontWeight: 300}}>$ {moneyFormat(row.a_cobrar)}</label>,
                                        (row) => <label style={{float:"right", fontWeight: 300}}>$ {moneyFormat(row.cobrado)}</label>,
                                        (row) => <label style={{float:"right", fontWeight: 300}}>{(row.fecha_cobro)}</label>,
                                        (row) => <label style={{float:"right", fontWeight: 300}}>$ {moneyFormat(row.nc)}</label>,
                                        this.fieldImprimir
                                    ]}

                                    endpoint='venta/cobros-'
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

const mapStateToProps = (state) => {
    return {
        user_info : state.user_info
    }
}

export default connect(mapStateToProps)(Diario)
