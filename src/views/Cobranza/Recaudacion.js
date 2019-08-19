import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage } from 'temeforest'
import { baseurl } from 'utils/url'
import moment from 'moment'

class Recaudacion extends React.Component {
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
            <ReportPage title="Recaudación">
                <div className="row">
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Cooperativa</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Localidad</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad}/>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Fecha inicio</Label>
                            <div className="col-sm-8">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.fecha_inicio} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Fecha fin</Label>
                            <div className="col-sm-8">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.fecha_fin} />
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Forma de pago</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('forma_pago')} value={this.state.forma_pago} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Destino</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsDestino} onChange={this.onChange('destino')} value={this.state.destino} />
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Bus</Label>
                            <div className="col-sm-8">
                                <Input />
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Viaje</Label>
                            <div className="col-sm-8">
                                <Input />
                            </div>
                        </FormGroup>
                    
                    </div>
                    <div className="col-sm-2"></div>
                </div>
                <ListPage
                    searchable={false}

                    fieldNames={['Cooperativa', 'Boleto normal', 'Boleto especial', 'Normal anulado', 'Total boleto', 'Total tasas']}
                    fields={['', '', '', '', '', '']}

                    //url del endpoint
                    url='cobranza/recaudacion'

                    // url del frontend
                    menu='cobranza'
                    submenu='recaudacion'
                    parameters={this.state}
                    
                    history={this.props.history}
                    refresh={refresh}
                />
            </ReportPage>
        )
    }
}

export default Recaudacion