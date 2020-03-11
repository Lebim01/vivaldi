import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, Button, ReportPage, Permission,Card, CardBody, SelectLocalidad} from 'temeforest'
import { baseurl } from 'utils/url'
import moment from 'moment'
class ReporteClientesFrecuentes extends React.Component {

    table = React.createRef()
    state = {
        fecha_inicio : moment().format('YYYY-MM-DD'), 
        fecha_fin : moment().format('YYYY-MM-DD'),
        reporte: 1
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
    optionsDestino = {
        url : `${baseurl}/ciudad/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    optionsFormapago = {
        url : `${baseurl}/formaDePago/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    optionsReporte = [
        { value: 1, label: 'Pasajero' },
        { value: 2, label: 'Comprador' },
    ]

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    buscar = () => {
        console.log(this.table)
        this.table.current.refresh()
    }

    render(){
        return (
            <Permission key_permission="view_clientes_frecuentes" mode="redirect">
               <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody> 
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <Button style={{ bottom: "-250px",    margin: "0 10px 0 0px",}} onClick={this.buscar}>
                                            Consultar
                                        </Button>
                                    </div>
                                </div>
                                <ListPage
                                        
                                        id="report"
                                        key_permission="clientes_frecuentes"
                                        title="Reporte de clientes frecuentes"
                                        exportExcel
                                        imprimirPantalla


                                    filtersZone = {
                                        <div className="row">
                                        <FormGroup className="row col-sm-4">
                                            <Label className="col-sm-6">Cooperativa</Label>
                                            <div className="col-sm-6">
                                                <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row col-sm-4">
                                            <Label className="col-sm-4" >Fecha inicio</Label>
                                            <div className="col-sm-8">
                                                <Input type="date" onChange={this.onChange('fecha_inicio')} value={this.state.fecha_inicio} />
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row col-sm-4">
                                            <Label className="col-sm-7" >Metodo de pago</Label>
                                            <div className="col-sm-5">
                                                <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('forma_de_pago')} value={this.state.forma_de_pago}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row col-sm-4">
                                            <Label className="col-sm-6" style={{ marginLeft: '-20px' }} >Localidad</Label>
                                            <div className="col-sm-6" style={{ marginLeft: '20px' }}>
                                            <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.localidad}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row col-sm-4">
                                            <Label className="col-sm-4" >Fecha fin</Label>
                                            <div className="col-sm-8" >
                                                <Input type="date" onChange={this.onChange('fecha_fin')} value={this.state.fecha_fin} />
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row col-sm-4" >
                                            <Label className="col-sm-5" >Destino</Label>
                                            <div className="col-sm-7" >
                                                <Select asyncOptions={this.optionsDestino} onChange={this.onChange('destino')} value={this.state.destino} />
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row col-sm-4">
                                            <Label className="col-sm-4" >Reporte</Label>
                                            <div className="col-sm-8" >
                                                <Select options={this.optionsReporte} onChange={this.onChange('reporte')} value={this.state.reporte} />
                                            </div>
                                            <div >
                                                <Label className="col-sm-4" style={{ bottom: "-290px",    margin: "0 10px 0 66px"}} ></Label>
                                                <Label className="col-sm-4" style={{ bottom: "-290px",    margin: "0 10px 0 66px"}} ></Label>
                                            </div>
                                        
                                        </FormGroup>
                                        
                                        
                                        
                                        
                                    </div>
                                

                                    }
                                    
                                        ref={this.table}
                                        autoLoad={false}
                                        searchable={false}
                                        

                                        fieldNames={this.state.reporte == 1 ?  ['Pasajero', 'Viajes'] : ['Cliente', 'Cédula/RUC', 'Viajes']}
                                        fields={
                                            this.state.reporte == 1 
                                                ? ['nombre', (row) => <span style={{ float: 'right',position: 'relative', right:'75%'}}>{row.viajes}</span>] 
                                                : ['nombre', 'identificacion', 'viajes']
                                        }

                                        endpoint='venta/clientes-frecuentes'
                                        parameters={this.state}
                                        
                                        history={this.props.history}
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

export default ReporteClientesFrecuentes