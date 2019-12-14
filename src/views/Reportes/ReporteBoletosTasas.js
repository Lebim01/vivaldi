import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Permission } from 'temeforest'
import { TabContent, TabPane } from 'reactstrap'
import moment from 'moment'
import { baseurl, objectToUrl } from 'utils/url'
import axios from 'axios'

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
                <ReportPage title="Reporte de boletos por cooperativa">
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

                    <TabContent activeTab={this.state.tipo_tabla}>
                        <TabPane tabId="1">
                            <ListPage
                                searchable={false}
                                exportExcel
                                id="boletos_tasas"
                                imprimirPantalla

                                fieldNames={['Cooperativa','Boleto normal', 'Boleto especial', 'Normal anulado', 'Especial anulado', 'Total boleto', 'Total tasa']}
                                fields={['cooperativa','boleto_normal', 'boleto_especial', 'normal_anulado', 'especial_anulado', 'total_boleto', 'total_tasa']}

                                endpoint='recaudaciones/boletos-tasas'
                                parameters={this.state.filters}

                                history={this.props.history}
                                refresh={refresh}
                            />
                        </TabPane>
                        <TabPane tabId="2">
                            Vendidos por cooperativa
                            <ListPage
                                searchable={false}


                                fieldNames={['Tipo', 'Cantidad', 'Valor unitario', 'Subtotal']}
                                fields={['tipo_boleto', 'cantidad', 'valor_unitario', 'subtotal']}

                                data={this.state.data}
                                parameters={this.state.filters}

                                history={this.props.history}
                            />
                        </TabPane>
                    </TabContent>
                </ReportPage>
            </Permission>
        )
    }
}

export default ReporteBoletosTasas
