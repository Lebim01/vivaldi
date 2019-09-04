import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, InputIcon, ReportPage } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'

class ReporteTasasVendidas extends React.Component {
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
        return (
            <ReportPage title="Reporte de Tasas Vendidas">
                <div className="row">
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-3">Cooperativa</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Localidad</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad}/>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-3">Fecha inicio</Label>
                            <div className="col-sm-8">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.fecha_inicio} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Fecha fin</Label>
                            <div className="col-sm-8">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.fecha_fin} />
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-3">Medio de pago</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('medio_pago')} value={this.state.medio_pago} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Destino</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsDestino} onChange={this.onChange('destino')} value={this.state.destino}/>
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        
                    </div>
                    <div className="col-sm-3 text-center">
                        <InputIcon icon={<i className="fa fa-search"/>} placeholder="Bus" />
                    </div>
                    <div className="col-sm-3 text-center">
                        <InputIcon icon={<i className="fa fa-search"/>} placeholder="Viaje" />
                    </div>
                    <div className="col-sm-3">
                        
                    </div>
                </div>
                <ListPage
                    searchable={false}

                    fieldNames={['Tipo', 'Cantidad', 'Valor unitario', 'Subtotal']}
                    fields={['tipo', 'cantidad', 'valor_unitario', 'subtotal']}

                    endpoint='recaudaciones/vendidos_cooperativa'
                    parameters={this.state}
                    
                    history={this.props.history}
                />
            </ReportPage>
        )
    }
}

export default ReporteTasasVendidas