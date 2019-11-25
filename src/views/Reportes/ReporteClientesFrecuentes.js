import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, Button, ReportPage, Permission } from 'temeforest'
import { baseurl } from 'utils/url'
class ReporteClientesFrecuentes extends React.Component {

    state = {
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
            <Permission key_permission="view_clientes_frecuentes" mode="redirect">
                <ReportPage title="Reporte de clientes frecuentes">
                    <div className="row">
                        <FormGroup className="row col-sm-4">
                            <Label className="col-sm-6">Cooperativa</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row col-sm-4">
                            <Label className="col-sm-6" >Fecha inicio</Label>
                            <div className="col-sm-6">
                                <Input type="date" onChange={this.onChange('fecha_inicio')} value={this.state.fecha_inicio} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row col-sm-4">
                            <Label className="col-sm-7" >Metodo de pago</Label>
                            <div className="col-sm-5">
                                <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('forma_de_pago')} value={this.state.forma_de_pago}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row col-sm-4">
                            <Label className="col-sm-6" style={{ marginLeft: '-20px' }} >Localidad</Label>
                            <div className="col-sm-6" style={{ marginLeft: '20px' }}>
                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row col-sm-4">
                            <Label className="col-sm-6" >Fecha fin</Label>
                            <div className="col-sm-6" >
                                <Input type="date" onChange={this.onChange('fecha_fin')} value={this.state.fecha_fin} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row col-sm-4" >
                            <Label className="col-sm-5" >Destino</Label>
                            <div className="col-sm-7" >
                                <Select asyncOptions={this.optionsDestino} onChange={this.onChange('destino')} value={this.state.destino} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row col-sm-4">
                            <Label className="col-sm-4" >Reporte</Label>
                            <div className="col-sm-8" >
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
                        exportExcel

                        fieldNames={this.state.reporte == 1 ?  ['Pasajero', 'Viajes'] : ['Cliente', 'Cédula/RUC', 'Viajes']}
                        fields={this.state.reporte == 1 ? ['nombre', 'viajes'] : ['nombre', 'identificacion', 'viajes']}

                        endpoint='venta/clientes-frecuentes'
                        parameters={this.state}
                        
                        history={this.props.history}
                        refresh={refresh}
                    />
                </ReportPage>
            </Permission>
        )
    }
}

export default ReporteClientesFrecuentes