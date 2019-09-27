import React from 'react'
import { ListPage, Button } from 'temeforest'
import { printHtml } from 'utils/exportData'
import moment from 'moment'

const formato = (props) => {
    return `
        <div>
            <div>
                <h3>TTG</h3>
                <h3>"7 de Noviembre"</h3>
                <h3>Pasajeros en Viaje</h3>
                <h4>
                    <table>
                        <tbody>
                            <tr>
                                <th>Disco/Placa:</th>
                                <td>${props.disco} / S/P</td>
                            </tr>
                            <tr>
                                <th>EmisiÃ³n:</th>
                                <td>26/09/2019 10:30</td>
                            </tr>
                            <tr>
                                <th>Destino:</th>
                                <td>Pajan</td>
                            </tr>
                            <tr>
                                <th>Viaje:</th>
                                <td>6890444</td>
                            </tr>
                            <tr>
                                <th>Salida:</th>
                                <td>
                                    ${moment(`${props.fecha} ${props.hora_salida}`).format('DD/MM/YYYY HH:mm:ss')}
                                </td>
                            </tr>
                            <tr>
                                <th>DueÃ±o:</th>
                                <td>generico</td>
                            </tr>
                            <tr>
                                <th>Conductor:</th>
                                <td>jonathan Prueba</td>
                            </tr>                        
                            <tr>
                                <th>Usuario:</th>
                                <td>skyrock</td>
                            </tr>
                            <tr>
                                <th>Forma de pago:</th>
                                <td>Todos</td>
                            </tr>
                            
                        </tbody>
                    </table>
                    </h4>
                    <table frame="border" rules="groups" border="1">
                        <colgroup></colgroup>
                        <colgroup></colgroup>
                        <colgroup></colgroup>
                        <thead>
                            <tr>
                                <th>Asiento</th>
                                <th>C.I./Nombre</th>
                                <th>Parada/p.u.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="2">3</td>
                                <td>0000000000</td>
                                <td>Cascol</td>
                            </tr>
                            <tr style="border-bottom:1px solid">
                                <td>Consumidor Final</td>
                                <td>$2,50</td>
                            </tr>
                        
                            <tr>
                                <td rowspan="2">8</td>
                                <td>0000000000</td>
                                <td>Cascol</td>
                            </tr>
                            <tr style="border-bottom:1px solid">
                                <td>Consumidor Final</td>
                                <td>$2,50</td>
                            </tr>
                            <tr>
                                <td rowspan="2">9</td>
                                <td>0000000000</td>
                                <td>Cascol</td>
                            </tr>
                            <tr style="border-bottom:1px solid">
                                <td>Consumidor Final</td>
                                <td>$2,50</td>
                            </tr>
                        
                            <tr>
                                <td rowspan="2">13</td>
                                <td>0000000000</td>
                                <td>Cascol</td>
                            </tr>
                            <tr style="border-bottom:1px solid">
                                <td>Consumidor Final</td>
                                <td>$2,50</td>
                            </tr>
                            <tr>
                                <td rowspan="2">14</td>
                                <td>0000000000</td>
                                <td>Cascol</td>
                            </tr>
                            <tr style="border-bottom:1px solid">
                                <td>Consumidor Final</td>
                                <td>$1,25</td>
                            </tr>
                            <tr>
                                <td rowspan="2">15</td>
                                <td>0000000000</td>
                                <td>Cascol</td>
                            </tr>
                            <tr style="border-bottom:1px solid">
                                <td>Consumidor Final</td>
                                <td>$1,25</td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody><tr>
                            <td>Total Pasajeros:</td>
                            <td>6</td>
                        </tr>
                        <tr>
                            <td>Total Vendido:</td>
                            <td>$12,50</td>
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
            <div><p>_</p></div>
        </div>
    `
}

class ReportePasajeros extends React.Component {

    imprimir = (row) => {
        return (
            <Button outline onClick={() => printHtml(formato(row))}>
                <i className="fa fa-print"/> Imprimir
            </Button>
        )
    }

    render(){
        return (
            <div className="text-center">
                <ListPage 
                    searchable={false}

                    fieldNames={['Disco', 'Hora entrada', 'Hora salida', 'Estado', 'Acción']}
                    fields={['disco', 'hora_entrada', 'hora_salida', 'estado', (row) => this.imprimir(row)]}

                    endpoint={'venta/viajes-planificados'}
                    parameters={{ cooperativa: this.props.cooperativa }}
                    
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