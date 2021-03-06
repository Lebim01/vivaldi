import React from 'react'
import { ListPage, Button } from 'temeforest'
import { printHtml } from 'utils/exportData'
import { baseurl } from 'utils/url'
import moment from 'moment'
import 'moment/locale/es'
import axios from 'axios'

import store from 'store/auth'
const { user_info } = store.getState()

const formato = (props) => {
    return `
        <style>
            /* 
                Document   : print
                Created on : 18-nov-2010, 14:48:05
                Author     : fttg
                Description:
                    Purpose of the stylesheet follows.
            */
            
            /* 
            TODO customize this sample style
            Syntax recommendation http://www.w3.org/TR/REC-CSS2/
            */
            
            .imprimir {visibility: hidden}
            #tasa2 {width:35cm;}
            #notaC {width:490px;}
            .tableleft td, .tableleft th {
                text-align: left;
            }
            .tableright td, .tableright th {
                text-align: right;
            }
            .text-center {
                text-align: center;
            }
            * {
                font-family: Helvetica,sans-serif;
            }
        </style>
        <div style="width: 350px">
            <div class="text-center">
                <h3 style="margin:5px">${props.localidad_nombre}</h3>
                <h3 style="margin:5px">"${props.cooperativa_nombre}"</h3>
                <h3 style="margin:5px">Pasajeros en Viaje</h3>
                <table class="tableleft" style="margin-left:10px; margin-right:10px;">
                    <tbody>
                        <tr>
                            <th>Disco/Placa:</th>
                            <td>${props.bus_disco} / ${props.bus_placa}</td>
                        </tr>
                        <tr>
                            <th>Emisión:</th>
                            <td>${moment().format('DD/MM/YYYY HH:mm:ss')}</td>
                        </tr>
                        <tr>
                            <th>Destino:</th>
                            <td>${props.viaje_destino}</td>
                        </tr>
                        <tr>
                            <th>Viaje:</th>
                            <td>${props.viaje_codigo}</td>
                        </tr>
                        <tr>
                            <th>Salida:</th>
                            <td>
                            ${moment(`${props.fecha} ${props.hora_salida}`).format('DD/MM/YYYY HH:mm:ss')}
                                
                            </td>
                        </tr>
                        <tr>
                            <th>Dueño:</th>
                            <td>${props.bus_dueno}</td>
                        </tr>
                        <tr>
                            <th>Conductor:</th>
                            <td>${props.viaje_conductor}</td>
                        </tr>                        
                        <tr>
                            <th>Usuario:</th>
                            <td>${user_info.username}</td>
                        </tr>
                        <tr>
                            <th style="white-space: nowrap;">Forma de pago:</th>
                            <td>${props.forma_pago}</td>
                        </tr>
                        
                    </tbody>
                </table>
                </h4>
                <table frame="border" rules="groups" border="1" class="tableright" style="width:100%">
                    <colgroup></colgroup>
                    <colgroup></colgroup>
                    <colgroup></colgroup>
                    <thead>
                        <tr>
                            <th class="text-center">Num</th>
                            <th class="text-center">C.I./Nombre</th>
                            <th class="text-center">Parada/p.u.</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${props.pasajeros.map((p) => `
                            <tr>
                                <td rowspan="2">${p.asiento}</td>
                                <td>${p.identificacion}</td>
                                <td>${p.parada}</td>
                            </tr>
                            <tr style="border-bottom:1px solid">
                                <td>${p.persona}</td>
                                <td>$${p.precio}</td>
                            </tr>  
                        `)}
                    </tbody>
                </table>
                <table class="tableright" style="width:100%">
                    <tbody>
                        <tr>
                            <td>Total Pasajeros:</td>
                            <td>${props.pasajeros.length}</td>
                        </tr>
                        <tr>
                            <td>Total Vendido:</td>
                            <td>$${props.total}</td>
                        </tr>
                        <tr>
                            <td colspan="2">.</td>
                        </tr>
                        <tr>
                            <td colspan="2">.</td>
                        </tr>
                        <tr>
                            <td>_____________</td>
                            <td>_____________</td>
                        </tr>
                        <tr>
                            <td>Oficinista</td>
                            <td>Conductor</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
}

class ReportePasajeros extends React.Component {

    interval = null

    componentDidMount(){
        let time = (process.env.NODE_ENV !== 'production' ? 5 : 60) * 1000
        this.interval = setInterval(() => this.setState({ refresh: true }), time)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    getFormato = async (props) => {
        try {
            const response = await axios.get(`${baseurl}/venta/pasajeros-por-viaje/?viaje=${props.viaje}`)
            const formato_html = formato({ ...response.data[0], ...props })
            printHtml(formato_html)
        }catch(e){
            console.log(e)
        }
    }

    imprimir = (row) => {
        return (
            <Button outline onClick={() => this.getFormato(row)}>
                <i className="fa fa-print"/> Imprimir
            </Button>
        )
    }

    render(){
        return (
            <div className="text-center">
                <h5>Reporte pasajaeros - {this.props.cooperativa_nombre}</h5>
                <ListPage 
                    searchable={false}

                    fieldNames={['Disco', 'Hora entrada', 'Hora salida', 'Estado', 'Acción']}
                    fields={['disco', 'hora_entrada', 'hora_salida', 'estado', (row) => this.imprimir(row)]}

                    endpoint={'venta/viajes-planificados'}
                    parameters={{ cooperativa: this.props.cooperativa, localidad: this.props.localidad }}
                    
                    history={this.props.history}
                />
                <br/>
                <Button style={{backgroundColor: '#4798e8', height:50, width: 200}} onClick={this.props.back}>
                    Atrás
                </Button>
            </div>
        )
    }
}

export default ReportePasajeros