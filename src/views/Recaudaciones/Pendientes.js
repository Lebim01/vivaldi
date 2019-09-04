import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Button } from 'temeforest'
import { baseurl } from 'utils/url'
import moment from 'moment'

class Pendientes extends React.Component {
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
            <ReportPage title="Cobros Pendientes">
                <div className="row">
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Cooperativa</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Fecha</Label>
                            <div className="col-sm-8">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha')} value={this.state.fecha}/>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <div className="col-sm-12">
                                <Button onClick={this.onChange('refresh')}>
                                    Ver reporte
                                </Button>
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <ListPage
                    searchable={false}

                    fieldNames={['Cooperativa', 'Localidad', 'Fecha', 'Cobrar', 'Saldo', 'Emitido', 'Cobrado', 'N.O.', 'Acción']}
                    fields={['', '', '', '', '', '']}

                    endpoint='cobranza/pendiente'
                    urlFront='cobranza/pendientes'
                    parameters={this.state}
                    
                    history={this.props.history}
                    refresh={refresh}
                />
            </ReportPage>
        )
    }
}

export default Pendientes