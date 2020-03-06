import React from 'react'
import { ListPage, Card, CardBody, Label, FormGroup, Select, Input, Permission, SelectLocalidad } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'

class TasasUsadasPorViaje extends React.Component {
    state = {
        fecha_inicio : moment().format('YYYY-MM-DD'),
        fecha_fin : moment().format('YYYY-MM-DD'),
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
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

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    buscar(){
        this.setState({
            refresh: true
        })
    }
    
    render(){
        const { refresh } = this.state
        return (
            <Permission key_permission="view_tasas_viaje" mode="redirect">
<<<<<<< HEAD
                
=======
>>>>>>> 342ef96d... correccion imprimir todos en modulo reportes
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <ListPage
                                        exportExcel
                                        imprimirPantalla
<<<<<<< HEAD
                                        id= "tasas_viaje"
                                        key_permission= "tasas_viaje"
                                        title="Tasas usadas por viaje"
                                    
                                        filtersZone= {
                                            <div className="row">
=======
                                        id= "report"
                                        key_permission= "tasas_viaje"
                                        title = "Tasas Usadas por Viaje"

                                            filtersZone = {
                                                <div className="row">
>>>>>>> 342ef96d... correccion imprimir todos en modulo reportes
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
                                                            <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('forma_pago')} value={this.state.forma_pago} />
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-6">Viaje</Label>
                                                        <div className="col-sm-6">
                                                            <Select onChange={this.onChange('viaje')} value={this.state.viaje} />
                                                        </div>
                                                    </FormGroup>
                                                </div>
                                            
                                            
                                                <div className="col-sm-2"></div>
                                                <div className="col-sm-4">
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-4">Viaje</Label>
                                                        <div className="col-sm-8">
                                                            <Input />
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-4">Salida</Label>
                                                        <div className="col-sm-8">
                                                            <Input />
                                                        </div>
                                                    </FormGroup>
                                                </div>
                                                <div className="col-sm-4">
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-4">Destino</Label>
                                                        <div className="col-sm-8">
                                                            <Input />
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-6">Disco/Placa</Label>
                                                        <div className="col-sm-6">
                                                            <Input />
                                                        </div>
                                                    </FormGroup>
                                                    <br></br>
                                                </div>
                                                
                                                <div className="row">
                                                    <div className="col-md-12 text-center">
                                                        <Button style={{position:"relative", left: "-400px", bottom: "-105px"}} onClick={this.buscar}>
                                                            Consultar
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2"></div>
                                            </div>
<<<<<<< HEAD
                                        }
=======
                                            }
                                            
                                            
                                        
                                        ref={this.table}
                                        autoLoad={false}
>>>>>>> 342ef96d... correccion imprimir todos en modulo reportes
                                        searchable={false}
                                        

                                        fieldNames={['Tasa (Código)', 'Usada', '# Asiento']}
                                        fields={['', '', '']}

                                        endpoint='recaudaciones/tasas_emitidas_vs_usadas_cooperativa'
                                        parameters={this.state}
                                        
                                        history={this.props.history}
                                        refresh={refresh}
                                    />
                                   
                                    
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
<<<<<<< HEAD
                
=======
>>>>>>> 342ef96d... correccion imprimir todos en modulo reportes
            </Permission>
        )
    }
}

export default TasasUsadasPorViaje