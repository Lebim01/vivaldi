import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Permission, Card, CardBody } from 'temeforest'
import { TabContent, TabPane } from 'reactstrap'
import moment from 'moment'
import { baseurl, objectToUrl } from 'utils/url'
import axios from 'axios'
import { moneyFormat } from 'utils/number'

class ReporteBoletosTasas extends React.Component {
    state = {
        tipo_tabla : "1",
        filters : {
            fecha_inicio : moment().format('YYYY-MM-DD'),
            fecha_fin : moment().format('YYYY-MM-DD')
        },
        data : []
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
    optionsFormapago = {
        url : `${baseurl}/formaDePago/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    onChange = name => (e) => {
        let state = {}

        if(name === 'cooperativa'){
            state.tipo_tabla = e.target.value === '' ? "1" : "2"
        }

        this.setState({
            filters : {
                ...this.state.filters,
                [name]: e.target.value
            },
            ...state
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.tipo_tabla === '2' && prevState.filters !== this.state.filters){
            this.loadListCooperativa()
        }
    }

    loadListCooperativa = async () => {
        try {
            const response = await axios.get(`${baseurl}/venta/reporte-ventas-por-cooperativa/${objectToUrl(this.state.filters)}`)
            this.setState({
                data: response.data[0].data
            }, this.buscar)
        }
        catch(e){
            console.error(e)
        }
    }

    buscar(){
        this.setState({
            refresh: true
        })
    }

    render(){
        const { refresh } = this.state

        return (
            <Permission key_permission="view_boletos_tasas" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <TabContent activeTab={this.state.tipo_tabla}>
                                        <TabPane tabId="1">
                                            <ListPage

                                                exportExcel
                                                id="boletos_tasas"
                                                imprimirPantalla
                                                title="Reporte de boletos por cooperativa"
                                                filtersZone= {
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-5" id='mylabel'>Cooperativa</Label>
                                                                <div className="col-sm-7">
                                                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.filters.cooperativa}/>
                                                                </div>
                                                            </FormGroup>
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-5" id='mylabel'>Localidad</Label>
                                                                <div className="col-sm-7">
                                                                    <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.filters.localidad}/>
                                                                </div>
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-4" id='mylabel'>Fecha inicio</Label>
                                                                <div className="col-sm-8">
                                                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.filters.fecha_inicio} />
                                                                </div>
                                                            </FormGroup>
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-4" id='mylabel'>Fecha fin</Label>
                                                                <div className="col-sm-8">
                                                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.filters.fecha_fin} />
                                                                </div>
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-6" id='mylabel'>Forma de pago</Label>
                                                                <div className="col-sm-6">
                                                                    <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('forma_de_pago')} value={this.state.filters.forma_de_pago} />
                                                                </div>
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                }
                                        
                                                searchable={false}
                                                

                                                fieldNames={['Cooperativa','Boleto normal', 'Boleto especial', 'Normal anulado', 'Especial anulado', 'Total boleto', 'Total tasa']}
                                                fields={[
                                                    'cooperativa',
                                                    (row) => <span style={{float:"right"}}>{row.boleto_normal}</span>,
                                                    (row) => <span style={{float:"right"}}>{row.boleto_especial}</span>,
                                                    (row) => <span style={{float:"right"}}>{row.normal_anulado}</span>,
                                                    (row) => <span style={{float:"right"}}>{row.especial_anulado}</span>,
                                                    (row) => <span style={{float:"right"}}>$ {moneyFormat(row.total_boleto)}</span>,
                                                    (row) => <span style={{float:"right"}}>$ {moneyFormat(row.total_tasa)}</span>,
                                                ]}

                                                endpoint='recaudaciones/boletos-tasas'
                                                parameters={this.state.filters}

                                                history={this.props.history}
                                                refresh={refresh}
                                            />
                                        </TabPane>
                                        <TabPane tabId="2">
                            
                                            <ListPage
                                                searchable={false}
                                                exportExcel
                                                id="boletos_tasas"
                                                imprimirPantalla
                                                title="Reporte de boletos por cooperativa"
                                                
                                            
                                                
                                                filtersZone= {
                                                    <div className="row" >
                                                        <div className="col-sm-4">
                                                            <FormGroup className="row" >
                                                                <Label className="col-sm-5" id='mylabel'>Cooperativa</Label>
                                                                <div className="col-sm-7">
                                                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.filters.cooperativa}/>
                                                                </div>
                                                            </FormGroup>
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-5" id='mylabel'>Localidad</Label>
                                                                <div className="col-sm-7">
                                                                    <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.filters.localidad}/>
                                                                </div>
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-4" id='mylabel'>Fecha inicio</Label>
                                                                <div className="col-sm-8">
                                                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.filters.fecha_inicio} />
                                                                </div>
                                                            </FormGroup>
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-4" id='mylabel'>Fecha fin</Label>
                                                                <div className="col-sm-8">
                                                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.filters.fecha_fin} />
                                                                </div>
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-6" id='mylabel'>Forma de pago</Label>
                                                                <div className="col-sm-6">
                                                                    <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('forma_de_pago')} value={this.state.filters.forma_de_pago} />
                                                                </div>
                                                            </FormGroup>
                                                        </div>
                                                        <Label className="col-sm-3" style={{fontWeight: "normal"}}>Vendidos por cooperativa</Label>
                                                    </div>
                                                    
                                                    
                                                    
                                                }

                                                fieldNames={['Tipo', 'Cantidad', 'Valor unitario', 'Subtotal']}
                                                fields={[
                                                    'tipo_boleto',
                                                    (row) => <span style={{float:"right"}}>{row.cantidad}</span>,
                                                    (row) => <span style={{float:"right"}}>$ {moneyFormat(row.valor_unitario)}</span>,
                                                    (row) => <span style={{float:"right"}}>$ {moneyFormat(row.subtotal)}</span>,
                                                ]}

                                                data={this.state.data}
                                                parameters={this.state.filters}

                                                history={this.props.history}
                                            />
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </Permission>
        )
    }
}

export default ReporteBoletosTasas
