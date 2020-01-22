import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Permission, SelectLocalidad } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'
import { moneyFormat } from 'utils/number'

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
                <ReportPage printButtons={false} timestamp={false}>
                    <ListPage

                        exportExcel
                        imprimirPantalla
                        id="report"
                        key_permission="salida_viajes"
                        title="Salida de viajes"
                        
                        filtersZone={
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
                            </div>
                        }
                        searchable={false}
                        head={[['Viaje', 'Cooperativa', 'Fecha salida', 'Destino', 'Parada', 
                         {
                            title:'Cantidad', 
                            style:{textAlign:"right", position: 'relative', right:'0%' }
                        },
                         {
                            title:'Total', 
                            style:{textAlign:"right", position: 'relative', right:'0%' }
                        } ]]}
                        fields={[
                            'viaje',
                            'cooperativa',
                            'fecha_salida',
                            'destino',
                            'parada',
                            (row) => <span style={{ textAlign:"right", position: 'relative', right:'-60%'}}>{row.pasajeros}</span>,
                            (row) => <span style={{ textAlign:"right", position: 'relative', right:'-50%'}}>${moneyFormat(row.total)}</span>
                            
                        ]}

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