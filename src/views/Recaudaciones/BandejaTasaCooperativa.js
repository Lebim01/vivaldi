import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Button, Permission } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'
import { printHtml } from 'utils/exportData'
import axios from 'axios'

const endpoint = 'venta/solicitud_tasacontingencia'

/**
 * TASAS DE CONTINGENCIA TIPO 1
 * LA CABEZA DE LA IMPRESION DEBE SER LA COOPERATIVA
 * PORQUE LAS COOPERATIVAS SON LAS QUE HACEN LA SOLICITUD
 * Y SALEN EN ESTE MODULO SOLO LAS APROBADAS PARA PODER IMPRIMIR
 */

class BandejaTasaCooperativa extends React.Component {
    state = {
        fecha : moment().format('YYYY-MM-DD'),
        estado : 1 // aceptado
    }
    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    componentDidMount(){
        this.interval = setInterval(this.buscar, 15 * 1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
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

    async rowToHtml(row, solicitud, tasa){
        try {
            return `
                <div style="margin-bottom: 10px; width: 300px; text-align: center;" class="pagebreak">
                    <p style="margin-top: 5px; margin-bottom: 5px;">Solicitud #${solicitud} Tasa #${tasa}</p>
                    <p style="margin-top: 5px; margin-bottom: 5px;">${row.localidad_nombre}</p>
                    <p style="margin-top: 5px; margin-bottom: 5px;">${row.cooperativa_nombre}</p>
                    <p style="margin-top: 5px; margin-bottom: 5px;">Contingencia</p>
                    <p style="margin-top: 5px; margin-bottom: 5px;">
                        <span style="width: 100px; text-align: left;">Fecha de Emisión: </span>
                        <span style="width: 100px; text-align: left;">${row.fecha_hora_venta}</span>
                    </p>
                    <p style="margin-top: 5px; margin-bottom: 5px;">
                        <span style="width: 100px; text-align: left;">Tasa: </span>
                        <span style="width: 100px; text-align: left;">$ ${row.valor}</span>
                    </p>
                    <p style="margin-top: 5px; margin-bottom: 5px;">
                        <span style="width: 100px; text-align: left;">Silo: ${row.silos}</span>
                        <span style="width: 100px; text-align: left;">Andenes: ${row.andenes}</span>
                    </p>
                    <p style="margin-top: 5px; margin-bottom: 5px;">
                        <span style="width: 100px; text-align: left;">Usuario: </span>
                        <span style="width: 100px; text-align: left;">${row.usuario_creacion_nombre}</span>
                    </p>
                    
                    <img width="140" src="${baseurl}/qr/?key=${row.codigo}"/>
                </div>
            `
        }catch(err){
            console.error(row.id, err)
        }
    }

    async toWord(row){
        const res = await axios.get(`${baseurl}/venta/solicitud_tasacontingencia/${row.id}/tasas/`)
        let valor = (res.data.tasas.length * res.data.tasas[0].valor).toFixed(2);
        let unitario = res.data.tasas[0].valor.toFixed(2);
        let html = `
            <style>
                .pagebreak { page-break-after: always; }
            </style>
            <div style="margin-bottom: 10px; border-bottom: 1px solid black; width: 300px; text-align: center;">
            <p style="margin-top: 5px; margin-bottom: 5px;">${res.data.localidad_razon_social}</p>
            <p style="margin-top: 5px; margin-bottom: 5px;">RUC: ${res.data.localidad_ruc}</p>
            <p style="margin-top: 5px; margin-bottom: 5px;">Direccion: ${res.data.localidad_direccion}</p>
            <div style="padding-top: 5px; margin-bottom: 10px; border-bottom: 0.5px dotted black; width: 300px; text-align:left">
                <p style="margin-top: 5px; margin-bottom: 5px;">Fecha: ${res.data.fecha_emision}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">Nombre: ${res.data.cooperativa_nombre}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">RUC: ${res.data.cooperativa_ruc}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">Factura: ${res.data.numero}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;word-break: break-all;">${res.data.clave_acceso}</p>
            </div>
            <div style="padding-top: 5px; margin-bottom: 10px; width: 300px; text-align:left">
                <table>
                    <thead>
                        <tr>
                        <th>Cant</th>
                        <th>Descripcion</th>
                        <th>Valor</th>
                        <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>${res.data.tasas.length}</td>
                        <td>TASAS DE CONTINGENCIA</td>
                        <td>${unitario}</td>
                        <td>$${valor}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="padding-top: 5px; margin-bottom: 10px; width: 300px; text-align:right;">
                <table style="margin:0 0 0 auto;">
                    <tr>
                        <th>Subtotal</th>
                        <td>$${valor}</td>
                    </tr>
                    <tr>
                        <th>IVA 12%</th>
                        <td>$0.00</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>$${valor}</td>
                    </tr>
                </table>
            </div>
        </div>`

        for(let i in res.data.tasas){
            let row = res.data.tasas[i]
            html += await this.rowToHtml(row, row.id, i)
        }

        const actualizar = await axios.post(`${baseurl}/venta/solicitud_tasacontingencia/${row.id}/`, { estado : 3 })

        printHtml(html)
    }

    fieldImprimir = (row) => {
        if(row.estado === 3) return null

        return (
            <React.Fragment>
                <Button outline onClick={() => this.toWord(row)}>Imprimir</Button>
            </React.Fragment>
        )
    }

    render(){
        const { refresh } = this.state
        return (
            <Permission key_permission="view_solicitudes_aprobadas" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        Tasa de contigencia de cooperativa (I)
                                    </CardTitle>
                                    <br/>
                                    {/*<div className="row">
                                        <div className="col-sm-6">
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Cooperativa</Label>
                                                <div className="col-sm-8">
                                                    <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Fecha</Label>
                                                <div className="col-sm-8">
                                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha')} value={this.state.fecha} />
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
                                    </div>*/}
                                    <ListPage
                                        searchable={false}

                                        fieldNames={['Cooperativa', 'Fecha', 'Descripcion', 'Usuario solicitante', 'Usuario aprobación', 'Cantidad', 'Acción']}
                                        fields={['cooperativa_nombre', 'fecha', 'descripcion', 'usuario_solicitante_username', 'usuario_aprobacion_username', 
                                        (row) => <span style={{textAlign:"right", position: 'relative', right:'-60%'}}>{row.cantidad_aprobada}</span>, , 
                                        this.fieldImprimir]}

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

export default BandejaTasaCooperativa