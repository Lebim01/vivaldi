import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'

class ReporteBoletosTasas extends React.Component {
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
            <ReportPage title="Reporte de boletos por cooperativa">
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
                            <Label className="col-sm-3">Forma de pago</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('forma_de_pago')} value={this.state.forma_de_pago} />
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <ListPage
                    searchable={false}

                    fieldNames={['Boleto normal', 'Boleto especial', 'Normal anulado', 'Especial anulado', 'Total boleto', 'Total tasa']}
                    fields={['boleto_normal', 'boleto_especial', 'normal_anulado', 'especial_anulado', 'total_boleto', 'total_tasa']}

                    url='recaudaciones/boletos-tasas'

                    menu='recaudaciones'
                    submenu='reporte-boletos-tasas'
                    parameters={this.state}
                    
                    history={this.props.history}
                    refresh={refresh}
                    redirect={false}
                />
            </ReportPage>
        )
    }
}

export default ReporteBoletosTasas