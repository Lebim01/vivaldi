import React, { useState, useEffect } from 'react'
import { ListPage, Card, CardBody, Label, FormGroup, Select, Input, Permission, SelectLocalidad, InputIcon, Button, ReportPage } from 'temeforest'
import moment from 'moment'
import { baseurl, getParameter, objectToUrl } from 'utils/url'
import axios from 'axios'

class TasasUsadasPorViaje extends React.Component {
    table = React.createRef()

    state = {
        fecha_inicio : moment().format('YYYY-MM-DD'),
        fecha_fin : moment().format('YYYY-MM-DD'),
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'), 
        viaje : '',
        error : '',
        data : {}
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

    optionsViaje = {
        url : `${baseurl}/viaje/?full=1`,
        labelName: 'hora_salida',
        valueName: 'id', 
    }

    optionsViajes  = (obj) => ({
        url : `${baseurl}/viaje/${objectToUrl(obj)}`,
        labelName: 'hora_salida', 
        valueName: 'id' , 
        optionProps: ['ruta']
    })


    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value,
            ruta: this.state.ruta
        })
        
          
        
    }
    
    
    buscar= () =>{
       this.table.current.refresh()
    }

    enterViaje = (e) => {
        
        this.searchViaje()
        
    }

    searchViaje = async () => {
        const { viaje } = this.state
        if(viaje){
            try {
                const res = await axios.get(`${baseurl}/viaje/${viaje}`)
                this.setState({
                    error: '',
                    data : res.data
                })
            }
            catch({ response }){
                this.setState({
                    error: response.data.detail
                })
            }
        }
    }
    
    
    render(){
        const { refresh } = this.state
        return (
            <Permission key_permission="view_tasas_viaje" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <div className="row">
                                        <div className="col-sm-12 text-center">
                                            <Button style={{bottom: "-300px"}} onClick={this.buscar}>
                                                Consultar
                                            </Button>
                                        </div>
                                    </div>
                                    <ListPage
                                        exportExcel
                                        imprimirPantalla
                                        id= "report"
                                        key_permission= "tasas_viaje"
                                        title = "Tasas Usadas por Viaje"

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
                                                            <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('forma_pago')} value={this.state.forma_pago} />
                                                        </div>
                                                    </FormGroup>
                                                    
                                                    <FormGroup className="row">
                                                    <Label className="col-sm-6">Viaje</Label>
                                                    <div className="col-sm-6">
                                                        <Select 
                                                            { ...this.state.cooperativa && this.state.localidad && this.state.fecha_inicio && this.state.fecha_fin
                                                                ? { asyncOptions : this.optionsViajes({ cooperativa: this.state.cooperativa, 
                                                                    localidad: this.state.localidad, fecha_inicio : this.state.fecha_inicio, 
                                                                fecha_fin: this.state.fecha_fin})  }
                                                                : { options : [{ label : 'Seleccione un viaje', value : '' }] } 
                                                                /*ruta = select_tipo.options[select_tipo.options.selectedIndex].attributes['data-ruta'].value
                                                                this.props.onChange('ruta', ruta)*/
                                                               
                                                            }
                                                            onChange={this.onChange('viaje')} 
                                                            onClick={this.enterViaje}
                                                            value={this.state.viaje}

                                                        />

                                                    </div>
                                                    </FormGroup>
                                                </div>
                                            
                                            
                                                <div className="col-sm-1"></div>
                                                <div className="col-sm-3">
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-5" style={{fontSize: '12px'}}>Viaje: </Label>
                                                        <Label className="col-sm-2" style={{fontSize: '12px'}}>{this.state.data.ruta}</Label>
                                                    </FormGroup>
                                                </div>
                                                <div className="col-sm-3">
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-5">Disco/Placa: </Label>
                                                        <Label className="col-sm-2">{this.state.data.bus_disco}</Label>
                                                    </FormGroup>
                                                </div>
                                                <div className="col-sm-3">
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-5">Destino: </Label>
                                                        <Label className="col-sm-7">{this.state.data.ruta_nombre}</Label>
                                                    </FormGroup>
                                                    <br></br>
                                                </div>
                                                
                                               
                                                <div className="col-sm-2"></div>
                                            </div>
                                            }
                                            
                                            
                                        
                                        ref={this.table}
                                        autoLoad={false}
                                        searchable={false}
                                        

                                        fieldNames={['Tasa (Código)', 'Usada', '# Asiento']}
                                        fields={['codigo', 'usado', 'asiento']}

                                        endpoint='recaudaciones/tasas_emitidas_vs_usadas_cooperativa'
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


export default TasasUsadasPorViaje

