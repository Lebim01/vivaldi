import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Permission } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'

class SalidaViajes extends React.Component {

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
            <Permission key_permission="view_salida_viajes" mode="redirect">
                <ReportPage title="Salida de viajes" printButtons={false} timestamp={false}>
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

                    <ListPage
                        searchable={false}

                        fieldNames={['Viaje', 'Fecha salida', 'Destino', 'Cantidad', 'Valor unitario', 'total']}
                        fields={['viaje', 'fecha_salida', 'destino', (row) => row.total/row.valor_unitario, 'valor_unitario', 'total']}

                        endpoint='venta/salida-de-viaje'
                        parameters={this.state}
                        
                        history={this.props.history}
                    />
                </ReportPage>
            </Permission>
        )
    }
}

export default SalidaViajes