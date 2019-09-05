import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'

class ViajesBus extends React.Component {

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
    buscar(){
        this.setState({
            refresh: true
        })
    }
    render(){
        return (
            <ReportPage title="Viajes Bus" printButtons={false} timestamp={false}>
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
                </div>

                <h3 className="text-center">Bus: 003 / MAA - 8284 </h3>
                <ListPage
                    searchable={false}

                    fieldNames={['Viaje', 'Fecha salida', 'Usuario', 'Pasajeros', 'Valor unitario', 'Total']}
                    fields={['', '', '', '', '', '']}

                    endpoint='viaje'
                    parameters={this.state}
                    
                    history={this.props.history}
                />

                <h3 className="text-center">Bus: 005 / MAA - 6664 </h3>
                <ListPage
                    searchable={false}

                    fieldNames={['Viaje', 'Fecha salida', 'Usuario', 'Pasajeros', 'Valor unitario', 'Total']}
                    fields={['', '', '', '', '', '']}

                    endpoint='viaje'
                    parameters={this.state}
                    
                    history={this.props.history}
                />

                <h3 className="text-center">Bus: 006 / MAU - 4284 </h3>
                <ListPage
                    searchable={false}

                    fieldNames={['Viaje', 'Fecha salida', 'Usuario', 'Pasajeros', 'Valor unitario', 'Total']}
                    fields={['', '', '', '', '', '']}

                    endpoint='viaje'
                    parameters={this.state}
                    
                    history={this.props.history}
                />
            </ReportPage>
        )
    }
}

export default ViajesBus