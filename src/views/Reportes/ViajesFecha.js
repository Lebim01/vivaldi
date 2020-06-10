import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Permission, SelectLocalidad, Card, CardBody, Button } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'
import { moneyFormat } from 'utils/number'

class ViajesFecha extends React.Component {

    table = React.createRef()
    state = {
        fecha_inicio : moment().format('YYYY-MM-DD'),
        fecha_fin : moment().format('YYYY-MM-DD'),
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
            <Permission key_permission="view_viajes_fecha" mode="redirect">
                 <div className="animated fadeIn">
                        <div className="row">
                            <div className="col-sm-12">
                                <Card>
                                    <CardBody>
                        
                                    <div className="row">
                                        <div className="col-sm-12 text-center">
                                            <Button style={{ bottom: "-205px"}} onClick={this.buscar}>
                                                Consultar
                                            </Button>
                                        </div>
                                    </div>
                                    <ListPage 
                                            exportExcel
                                            imprimirPantalla
                                            id="report"
                                            key_permission="viaje_fecha"
                                            title="Viajes por fecha"

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
                                                    <br></br><br></br>
                                                </div>
                                                
                                            </div>
                                            
                                            } 
                                            
                                        
                                            ref={this.table}
                                            autoLoad={false}    
                                            searchable={false}

                                            head={[
                                                [
                                                    'Viaje',
                                                    'Fecha',
                                                    'Frecuencia',
                                                    'Localidad',
                                                    'Anden', 
                                                    'Disco', 
                                                    'Placa', 
                                                    'Cooperativa', 
                                                    'Destino', 
                                                    'Pasajeros', 
                                                    'Total',
                                                    'Fecha creación', 
                                                    'Usuario',                           
                                                    {
                                                        title:'Via', 
                                                        style:{ maxWidth: '20%' }
                                                    }, 
                                                    
                                                    
                                                   
                                                ]
                                            ]}
                                            fields={[
                                                'viaje',
                                                'fecha',
                                                'frecuencia',
                                                'localidad',
                                                (row) => <span style={{ textAlign:"right", position: 'relative', right:'-60%'}}>{row.anden}</span>,
                                                (row) => <span style={{ textAlign:"right", position: 'relative', right:'-60%'}}>{row.disco}</span>,
                                                'placa',
                                                'cooperativa',
                                                'destino',
                                                (row) => <span style={{ textAlign:"right", position: 'relative', right:'-60%'}}>{row.pasajeros}</span>,
                                                (row) => <span style={{ textAlign:"right", position: 'relative', right:'0%'}}>${moneyFormat(row.total)}</span>,
                                                'fecha_creacion',
                                                'usuario', 
                                                'via',
                                               
                                                
                                                
                                            ]}

                                            endpoint='venta/viajes-por-fecha'
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

export default ViajesFecha