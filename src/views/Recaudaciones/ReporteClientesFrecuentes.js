import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Select, Input, Button } from './../../temeforest'
import moment from 'moment'
import { baseurl } from './../../utils/url'

class ReporteClientesFrecuentes extends React.Component {

    state = {
        fecha_inicio : moment().format('YYYY-MM-DD'),
        fecha_fin : moment().format('YYYY-MM-DD'),
        reporte: 1
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
        { value: 1, label: 'Pasajero' },
        { value: 2, label: 'Comprador' },
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
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>Reporte de clientes frecuentes</CardTitle>
                                <br/>
                                <div className="row">
                                    <FormGroup className="row col-sm-4">
                                        <Label className="col-sm-4">Cooperativa</Label>
                                        <div className="col-sm-8">
                                            <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="row col-sm-4">
                                        <Label className="col-sm-4">Fecha inicio</Label>
                                        <div className="col-sm-8">
                                            <Input type="date" onChange={this.onChange('fecha_inicio')} value={this.state.fecha_inicio} />
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="row col-sm-4">
                                        <Label className="col-sm-4">Metodo de pago</Label>
                                        <div className="col-sm-8">
                                            <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('forma_de_pago')} value={this.state.forma_de_pago}/>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="row col-sm-4">
                                        <Label className="col-sm-4">Localidad</Label>
                                        <div className="col-sm-8">
                                            <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad} />
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="row col-sm-4">
                                        <Label className="col-sm-4">Fecha fin</Label>
                                        <div className="col-sm-8">
                                            <Input type="date" onChange={this.onChange('fecha_fin')} value={this.state.fecha_fin} />
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="row col-sm-4">
                                        <Label className="col-sm-4">Destino</Label>
                                        <div className="col-sm-8">
                                            <Select asyncOptions={this.optionsDestino} onChange={this.onChange('destino')} value={this.state.destino} />
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="row col-sm-4">
                                        <Label className="col-sm-4">Reporte</Label>
                                        <div className="col-sm-8">
                                            <Select options={this.optionsReporte} onChange={this.onChange('reporte')} value={this.state.reporte} />
                                        </div>
                                    </FormGroup>
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

                                    fieldNames={this.state.reporte == 1 ?  ['Pasajero', 'Viajes'] : ['Cliente', 'Cédula/RUC', 'Viajes']}
                                    fields={this.state.reporte == 1 ? ['nombre', 'viajes'] : ['nombre', 'identificacion', 'viajes']}

                                    url='venta/clientes-frecuentes'

                                    menu='recaudaciones'
                                    submenu='clientes-frecuentes'
                                    parameters={this.state}
                                    
                                    history={this.props.history}
                                    refresh={refresh}
                                />

                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <Button type="success" style={{marginRight:5}}>Imprimir</Button>
                                        <Button type="info" style={{marginLeft:5}}>Exportar</Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReporteClientesFrecuentes