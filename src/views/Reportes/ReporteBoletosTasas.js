import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Permission, Card, CardBody, Button, SelectLocalidad } from 'temeforest'
import { TabContent, TabPane } from 'reactstrap'
import moment from 'moment'
import { baseurl, objectToUrl } from 'utils/url'
import axios from 'axios'
import { moneyFormat } from 'utils/number'

class ReporteBoletosTasas extends React.Component {

    table = React.createRef()
    table2 = React.createRef()
    table3 = React.createRef()
    state = {
        tipo_tabla : "1",
        filters : {
            fecha_inicio : moment().format('YYYY-MM-DD'),
            fecha_fin : moment().format('YYYY-MM-DD'), 
            hora_inicio : moment("00:00", "h:mm").format("HH:mm"), 
            hora_fin : moment("23:59", "h:mm").format("HH:mm") 
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
            })
        }
        catch(e){
            console.error(e)
        }
    }

    buscar=()=>{
        console.log(this.table)
        
        this.table.current.refresh()
       
    }

    buscar2 =() =>{
        console.log(this.table2)
        
        this.table2.current.refresh()
    }


    render(){
        return (
            <Permission key_permission="view_boletos_tasas" mode="redirect">
                 <ReportPage  timestamp={false} >
                        
                                    <TabContent activeTab={this.state.tipo_tabla}>
                                        <TabPane tabId="1">
                                            <ListPage 

                                                exportExcel
                                                 //id="boletos_tasas"
                                                id="boletos"
                                                imprimirPantalla
                                                title="Reporte de boletos por cooperativa" 

                                                    filtersZone ={
                                                        <div className="row">
                                                        <div className="col-sm-3">
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-6" id='mylabel'>Cooperativa</Label>
                                                                <div className="col-sm-6">
                                                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.filters.cooperativa}/>
                                                                </div>
                                                            </FormGroup>
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-5" id='mylabel'>Localidad</Label>
                                                                <div className="col-sm-7">
                                                                    <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.filters.localidad}/>
                                                                </div>
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-5">
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-3" id='mylabel'>Fecha inicio</Label>
                                                                <div className="col-sm-5">
                                                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.filters.fecha_inicio} />
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <Input className="no-clear" type="time" onChange={this.onChange('hora_inicio')} value={this.state.filters.hora_inicio} />
                                                                </div>
                                                            </FormGroup>
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-3" id='mylabel'>Fecha fin</Label>
                                                                <div className="col-sm-5">
                                                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.filters.fecha_fin} />
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <Input className="no-clear" type="time" onChange={this.onChange('hora_fin')} value={this.state.filters.hora_fin} />
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
                                                        <div className="row">
                                                            <div className="col-md-12 text-center">
                                                                <Button style={{position:"relative", left: "397px", bottom: "0px"}}onClick={this.buscar}>
                                                                    Consultar
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    }
                                                    
                                                    
                                                
                                                
                                                ref={this.table}
                                                autoLoad={false}
                                               
                                                //
                                        
                                                searchable={false}
                                                

                                                fieldNames={['Cooperativa',
                                                'Boleto normal', 'Boleto especial', 'Normal anulado', 'Especial anulado', 'Total boleto', 'Total tasa']}
                                                fields={[
                                                    'cooperativa',
                                                    (row) => <span style={{ textAlign:"right", position: 'relative', right:'-70%'}}>{row.boleto_normal}</span>,

                                                    (row) => <span style={{textAlign:"right", position: 'relative', right:'-80%'}}>{row.boleto_especial}</span>,
                                                    (row) => <span style={{textAlign:"right", position: 'relative', right:'-80%'}}>{row.normal_anulado}</span>,
                                                    (row) => <span style={{textAlign:"right", position: 'relative', right:'-80%'}}>{row.especial_anulado}</span>,
                                                    (row) => <span style={{float:"right"}}>$ {moneyFormat(row.total_boleto)}</span>,
                                                    (row) => <span style={{float:"right"}}>$ {moneyFormat(row.total_tasa)}</span>,
                                                ]}

                                                endpoint='recaudaciones/boletos-tasas'
                                                parameters={this.state.filters}

                                                history={this.props.history}
                                                //refresh={refresh}
                                            />
                                        </TabPane>
                                        <TabPane tabId="2">
                                             <ListPage
                                                
                                                exportExcel
                                                id="boletos_tasas"
                                                //key_permission= "boletos_tasas"
                                                imprimirPantalla
                                                title="Reporte de boletos por cooperativa"

                                                    filtersZone = {
                                                        <div className="row" >
                                                        <div className="col-sm-3">
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-6" id='mylabel'>Cooperativa</Label>
                                                                <div className="col-sm-6">
                                                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.filters.cooperativa}/>
                                                                </div>
                                                            </FormGroup>
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-5" id='mylabel'>Localidad</Label>
                                                                <div className="col-sm-7">
                                                                    <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.filters.localidad}/>
                                                                </div>
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-sm-5">
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-3" id='mylabel'>Fecha inicio</Label>
                                                                <div className="col-sm-5">
                                                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.filters.fecha_inicio} />
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <Input className="no-clear" type="time" onChange={this.onChange('hora_inicio')} value={this.state.filters.hora_inicio} />
                                                                </div>
                                                            </FormGroup>
                                                            <FormGroup className="row">
                                                                <Label className="col-sm-3" id='mylabel'>Fecha fin</Label>
                                                                <div className="col-sm-5">
                                                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.filters.fecha_fin} />
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <Input className="no-clear" type="time" onChange={this.onChange('hora_fin')} value={this.state.filters.hora_fin} />
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
                                                        <div className="row">
                                                            <div className="col-md-12 text-center">
                                                                <Button style={{position:"relative", left: "400px", bottom: "0px"}} onClick={this.buscar2}>
                                                                    Consultar
                                                                </Button>
                                                                
                                                            </div>
                                                            <br></br>
                                                            <br></br>
                                                        </div>
                                                        <br></br>
                                                        <br></br>
                                                        <Label className="col-sm-3" style={{position:"relative", left: "-100px", bottom: "-20px",fontWeight: "normal"}}>Vendidos por cooperativa</Label>
                                                    </div>
                                                    
                                                    }
                                                   
                                                    


                                                
                                                ref={this.table2}
                                                autoLoad={false}
                                                searchable={false}
                                                
                                               

                                                head={[['Tipo',
                                                {
                                                    title:'Cantidad', 
                                                    style:{textAlign:"right", position: 'relative', right:'0%' }
                                                }, 
                                                {
                                                    title: 'Cantidad anulado', 
                                                    style:{textAlign:"right", position: 'relative', right:'0%' }
                                                },
                                                {
                                                    title: 'Total boleto',
                                                    style:{textAlign:"right", position: 'relative', right:'0%' }
                                                },
                                                {
                                                    title: 'Total tasa', 
                                                    style:{textAlign:"right", position: 'relative', right:'0%' }
                                                }
                                                ]]}
                                                fields={[
                                                    'tipo_boleto',
                                                    (row) => <span style={{float:"right"}}>{row.cantidad}</span>,
                                                    (row) => <span style={{float:"right"}}>{row.cantidad_anulado}</span>,
                                                    (row) => <span style={{float:"right"}}>$ {moneyFormat(row.total_boleto)}</span>,
                                                    (row) => <span style={{float:"right"}}>$ {moneyFormat(row.total_tasa)}</span>,
                                                ]}
                                                
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