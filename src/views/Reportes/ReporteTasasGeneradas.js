import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, Button, ReportPage } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'

class ReporteTasasGeneradas extends React.Component {
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
            <ReportPage title="Reporte de Tasas Generadas">
                <div className="row">
                    <div className="col-sm-6">
                        <FormGroup className="row">
                            <Label className="col-sm-3">Fecha</Label>
                            <div className="col-sm-8">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha')} value={this.state.fecha} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Creador</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsCreador} onChange={this.onChange('creador')} value={this.state.creador}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Localidad</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Tipo</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsTipo} onChange={this.onChange('tipo')} value={this.state.tipo}/>
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

                    fieldNames={['Silo', '# De Bloques', 'Bloque inicial', 'Bloque final', 'Total tasas', 'Fecha creación', 'Nombre creador', 'Localidad']}
                    fields={['silo', 'numero_bloques', 'bloque_inicial', 'bloque_final', 'total_tasas', 'fecha_creacion', 'nombre_creador', 'localidad_nombre']}

                    endpoint='recaudaciones/reporte-tasas-generadas'
                    parameters={this.state}
                    
                    history={this.props.history}
                    refresh={refresh}
                />
            </ReportPage>
        )
    }
}

export default ReporteTasasGeneradas