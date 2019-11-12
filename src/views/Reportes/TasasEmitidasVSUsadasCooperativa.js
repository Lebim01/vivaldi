import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Permission } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'

class TasasEmitidasVSUsadasCooperativa extends React.Component {
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

    buscar(){
        this.setState({
            refresh: true
        })
    }
    
    render(){
        const { refresh } = this.state
        return (
            <Permission key_permission="view_tasas_emitidas_usadas" mode="redirect">
                <ReportPage title="Tasas emitidas VS Usadas por cooperativa">
                    <div className="row">
                        <div className="col-sm-4">
                            <FormGroup className="row">
                                <Label className="col-sm-4">Cooperativa</Label>
                                <div className="col-sm-8">
                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
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
                                    <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('forma_de_pago')} value={this.state.forma_de_pago} />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-4">Reporte</Label>
                                <div className="col-sm-8">
                                    <Select options={this.optionsReporte} onChange={this.onChange('reporte')} value={this.state.reporte} />
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <ListPage
                        searchable={false}

                        fieldNames={[(this.state.reporte === 2) ? 'Viaje' : 'Boletero' , 'Emitidas', 'Usadas']}
                        fields={[(this.state.reporte === 2) ? 'viaje' : 'boletero', 'tasas_emitidas', 'tasas_usadas']}

                        endpoint='recaudaciones/tasas-emitidas-usadas'
                        parameters={this.state}
                        
                        history={this.props.history}
                        refresh={refresh}
                    />
                </ReportPage>
            </Permission>
        )
    }
}

export default TasasEmitidasVSUsadasCooperativa