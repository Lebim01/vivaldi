import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, Button, ReportPage } from 'temeforest'
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
            <ReportPage title="Reporte de Tasas Vendidas">
                <div className="row">
                    <div className="col-sm-6">
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
                    <div className="col-sm-6">
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
                </div>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <Button onClick={this.buscar.bind(this)}>
                            Buscar
                        </Button>
                    </div>
                </div>
                <ListPage
                    searchable={false}

                    fieldNames={['Fecha', 'Cooperativa', 'Silo', 'Tipo', 'Cant.', 'Cantidad', 'Precio', 'Total', 'Localidad', '', '']}
                    fields={['fecha', 'cooperativa_nombre', 'silo', 'tipo', 'cant', 'cantidad', 'precio', 'total', 'localidad_nombre', '', '']}

                    url='recaudaciones/venta_tasas'

                    menu='recaudaciones'
                    submenu='reporte-tasas-vendidas'
                    parameters={this.state}
                    
                    history={this.props.history}
                    refresh={refresh}
                />
            </ReportPage>
        )
    }
}

export default ReporteTasasVendidas