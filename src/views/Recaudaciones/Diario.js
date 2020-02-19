import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, Button, Permission, Card, CardBody, SelectLocalidad } from 'temeforest'
import { baseurl } from 'utils/url'
import { checkPermission } from 'temeforest/base/Permission'
import { confirmEndpoint } from 'utils/dialog'
import { printHtml } from 'utils/exportData'
import { moneyFormat } from 'utils/number'
import moment from 'moment'
import store from 'store/auth'
import axios from 'axios'
import Swal from 'sweetalert2';
import { connect } from 'react-redux'

axios.defaults.headers.common['Authorization'] = `JWT ${store.getState().token}`

const style_money_label = {
    float:'right'
}

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
        }
    }

    fieldCobrar = (row) => {
        return (
            
                <React.Fragment>
                    { row.a_cobrar > 0 && row.cooperativa !== "(TOTAL)" &&
                        <Button outline onClick={() => this.cobrar(row)}>Cobrar</Button>
                    }
                </React.Fragment>
            
        )
    }


    rowToHtml = (row) => {
        return `
            <div style="margin: 0; padding: 0; font-family: Verdana; break-after: always;">
            <div style="margin-bottom: 10px; border-bottom: 1px solid black; width: 300px; text-align: center; border:unset;">
                <p style="margin-top: 5px; margin-bottom: 5px;">${row.localidad_nombre}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">${row.cooperativa_nombre}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">Ventas por Cooperativa</p>
            </div>
            <div style="margin-bottom: 10px; border-bottom: 1px solid black; width: 300px; border:unset;">
                <table>
                    <tr>
                        <td>Usuario</td>
                        <td>${this.props.user_info.username}</td>
                    </tr>
                    <tr>
                        <td>Fecha de Emisión</td>
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
                    <tr>
                        <td></td>
                        <td></td>
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
                        <td style="text-align:right; border-top: 1px solid black;">${row.cantidad}</td>
                        <td style="text-align:right; border-top: 1px solid black;">${row.valor_unitario}</td>
                        <td style="text-align:right; border-top: 1px solid black;">$${moneyFormat(row.a_cobrar)}</td>
                    </tr>
                </table>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
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
          </div>
        `
    }

    toWord = (row) => {
        printHtml(this.rowToHtml(row))
    }

    imprimirTodos = () => {
        let rows = this.table.current.state.filtered
        let html = rows.filter((row) => row.a_cobrar !== 0 && row.cooperativa !== "(TOTAL)").map((row) => this.rowToHtml(row)).join('')
        printHtml(html)
    }

    fieldImprimir = (row) => {
        return (
            
                <React.Fragment>
                    { row.a_cobrar !== 0 && row.cooperativa !== "(TOTAL)" &&
                        <Button outline onClick={() => this.toWord(row)}>Imprimir</Button>
                    }
                    {
                        row.a_cobrar!== 0 && row.cooperativa === "(TOTAL)" &&
                        <Button outline onClick={() => this.imprimirTodos()}>Imprimir Todos</Button>
                    }
                </React.Fragment>
            
        )
    }

    render(){
        const { refresh } = this.state


        /*let headers=[
            <span style={{float:"left"}}>{('Cooperativa')}</span>,
            <span style={{float:"left"}}>{('Localidad')}</span>,
            <span style={{float:"left"}}>{('Fecha venta')}</span>,
            'Cobrar',
            <span style={{float:"right"}}>{('A cobrar')}</span>,
            <span style={{float:"right"}}>{('Cobrado')}</span>, 
            <span style={{float:"left"}}>{('Fecha Cobro')}</span>,
            <span style={{float:"right", textAlign: "right"}}>{('N.c')}</span>,  
            <span style={{textAlign:"center", position: 'relative', right:'-17%'}}>{('Accion')}</span>     
            
        ]

            let fields=[
                (row) => <span style={{float:"left"}}>{(row.cooperativa_nombre)}</span>,
                (row) => <span style={{float:"left"}}>{(row.localidad_nombre)}</span>,
                (row) => <span style={{float:"left"}}>{(row.fecha_venta)}</span>,
                this.fieldCobrar,
                (row) => <span  style={{float: "right" }}>${moneyFormat(row.a_cobrar)}</span>,
                (row) => <span style={{float:"right"}}>${moneyFormat(row.cobrado)}</span>,
                (row) => <span style={{float:"left"}}>{(row.fecha_cobro)}</span>,
                (row) => <span style={{float: "right"}}>${moneyFormat(row.nc)}</span>,
                this.fieldImprimir
            ]

            if(!checkPermission('can_add')) {
                fields.splice(fields.indexOf(this.fieldCobrar), 1)
                headers.splice(headers.indexOf('Cobrar'), 1)
            }

            if(!checkPermission('can_print_cobro')) {
                fields.splice(fields.indexOf(this.fieldImprimir), 1)
                headers.splice(headers.indexOf('Accion'), 1)
            }*/

        return (
            <Permission key_permission="view_cobros_diarios" mode="redirect">
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
                                   

                                    title= "Cobros Diarios"

                                    filtersZone={
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <FormGroup className="row">
                                                    <Label className="col-sm-6">Cooperativa</Label>
                                                    <div className="col-sm-6">
                                                        <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="row">
                                                    <Label className="col-sm-6">Localidad</Label>
                                                    <div className="col-sm-6">
                                                        <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.localidad}/>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                            <div className="col-sm-4">
                                                <FormGroup className="row">
                                                    <Label className="col-sm-5">Dia</Label>
                                                    <div className="col-sm-7">
                                                        <Input className="no-clear" type="date" onChange={this.onChange('fecha')} value={this.state.fecha}/>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="row">
                                                    <Label className="col-sm-5">Tipo</Label>
                                                    <div className="col-sm-7">
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

                                    
                                    /*fieldNames={headers}
                                    
                                    fields={fields}*/

                                    //tdBodyClass="margin: 0 !important;padding: 0 !important;"
                                    headerClass="text-center"
                                    tdBodyClass="text-right"

                                    
                                   
                                    head={[['Cooperativa', 'Localidad', 'Fecha venta', 
                                    
                                    {
                                        title:'Cobrar', 
                                        style:{textAlign:"center", position: 'relative', right:'0%' }
                                    },
                                    {
                                        title:'A cobrar', 
                                        style:{textAlign:"right", position: 'relative', right:'0%' }
                                    },
                                    {
                                        title:'Cobrado', 
                                        style:{float: "right" }
                                    },
                                    'Fecha cobro', 
                                    {
                                        title:'N.c', 
                                        style:{textAlign:"right", position: 'relative', right:'-2%' }
                                    },
                                    {
                                        title:'Acción', 
                                        style:{textAlign:"center", position: 'relative', right:'0%' }
                                    }
                                ]]}
                                    fields={[
                                        (row) => <span style={{float:"left", fontWeight: 300}}>{(row.cooperativa_nombre)}</span>,
                                        'localidad_nombre',
                                        'fecha_venta',
                                        this.fieldCobrar,
                                        (row) => <span  style={{float: "right" }}>${moneyFormat(row.a_cobrar)}</span>,
                                        (row) => <span style={{float: "right"}}>${moneyFormat(row.cobrado)}</span>,
                                        'fecha_cobro',
                                        (row) => <span style={{textAlign:"right", position: 'absolute', right:'16%'}}>${moneyFormat(row.nc)}</span>,
                                        this.fieldImprimir
                                    ]}

                                    endpoint='venta/cobros-diarios'
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