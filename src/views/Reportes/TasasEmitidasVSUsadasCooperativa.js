import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Permission, SelectLocalidad, Card, CardBody, Button } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'

class TasasEmitidasVSUsadasCooperativa extends React.Component {
    table = React.createRef()
    state = {
        fecha_inicio : moment().format('YYYY-MM-DD'),
        fecha_fin : moment().format('YYYY-MM-DD')
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
        { value: 1, label: 'Boletero' },
        { value: 2, label: 'Viaje' },
    ]

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    buscar = () =>{
        this.table.current.refresh()
    }
    
    render(){
        
        return (
            <Permission key_permission="view_tasas_emitidas_usadas" mode="redirect">
                <div className="animated fadeIn">
                        <div className="row">
                            <div className="col-sm-12">
                                <Card>
                                    <CardBody>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <Button style={{ bottom: "-210px"}} onClick={this.buscar}>
                                            Consultar
                                        </Button>
                                    </div>
                                </div>
                                <ListPage

                                    exportExcel
                                    imprimirPantalla
                                    id= "report"
                                    key_permission= "emitidas_usadas" 
                                    title="Tasas emitidas VS Usadas por cooperativa"

                                    filtersZone = {
                                        <div className="row">
                                        <div className="col-sm-4">
                                            <FormGroup className="row">
                                                <Label className="col-sm-5">Cooperativa</Label>
                                                <div className="col-sm-7">
                                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-5">Localidad</Label>
                                                <div className="col-sm-7">
                                                    <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.localidad}/>
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div className="col-sm-4">
                                            <FormGroup className="row">
                                                <Label className="col-sm-5">Fecha inicio</Label>
                                                <div className="col-sm-7">
                                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.fecha_inicio} />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-5">Fecha fin</Label>
                                                <div className="col-sm-7">
                                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.fecha_fin} />
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div className="col-sm-4">
                                            <FormGroup className="row">
                                                <Label className="col-sm-6">Forma de pago</Label>
                                                <div className="col-sm-6">
                                                    <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('forma_de_pago')} value={this.state.forma_de_pago} />
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-6">Reporte</Label>
                                                <div className="col-sm-6">
                                                    <Select options={this.optionsReporte} onChange={this.onChange('reporte')} value={this.state.reporte} />
                                                </div>
                                            </FormGroup>
                                            <br></br><br></br>
                                        </div>
                                        
                                    </div>
                                    }  
                                        ref= {this.table}
                                        autoLoad={false}
                                        searchable={false}
                                        

                                        head={[[(this.state.reporte === 2) ? 'Viaje' : 'Boletero' , 
                                        {
                                            title:'Emitidas', 
                                            style:{textAlign:"right", position: 'relative', right:'0%' }
                                        },
                                        {
                                            title:'Usadas', 
                                            style:{textAlign:"right", position: 'relative', right:'0%' }
                                        }
                                        ]]}
                                        fields={[(this.state.reporte === 2) ? 'viaje' : 'boletero', 
                                        (row) => <span style={{ textAlign:"right", position: 'relative', right:'-90%'}}>{row.tasas_emitidas}</span>,
                                        (row) => <span style={{ textAlign:"right", position: 'relative', right:'-90%'}}>{row.tasas_usadas}</span>, 
                                        ]}

                                        endpoint='recaudaciones/tasas-emitidas-usadas'
                                        parameters={this.state}
                                        
                                        history={this.props.history}
                                        //refresh={refresh}
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

export default TasasEmitidasVSUsadasCooperativa