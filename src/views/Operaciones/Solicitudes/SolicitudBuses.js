import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Select, Input, Button } from './../../../temeforest'
import moment from 'moment'
import { baseurl } from './../../../utils/url'

class SolicitudBuses extends React.Component {
    state = {
        fecha : moment().format('YYYY-MM-DD'),
        estado: 0
    }
    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    optionsEstado = [
        { value:0, label: 'Pendiente' },
        { value:1, label: 'Aprobado' },
        { value:2, label: 'Rechazado' },
    ]
    optionsRazon = [
        { value:'', label:'Seleccione' },
    ]
    estados = [
        { value:0, label: 'Pendiente' },
        { value:1, label: 'Aprobado' },
        { value:2, label: 'Rechazado' },
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
                                <CardTitle>Solicitud de buses</CardTitle>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Cooperativa</Label>
                                            <div className="col-sm-8">
                                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Fecha</Label>
                                            <div className="col-sm-8">
                                                <Input type="date" onChange={this.onChange('fecha')} value={this.state.fecha} />
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-sm-6">
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Razón</Label>
                                            <div className="col-sm-8">
                                                <Select options={this.optionsRazon} onChange={this.onChange('razon')} value={this.state.razon}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Estado</Label>
                                            <div className="col-sm-8">
                                                <Select options={this.optionsEstado} onChange={this.onChange('estado')} value={this.state.estado} />
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

                                    fieldNames={['Cooperativa', 'Fecha', 'Descripión', 'Tipo de Solicitud']}
                                    fields={['cooperativa_nombre', 'fecha', 'descripcion', 'tipo_solicitud_nombre']}

                                    url='venta/solicitud_bus'

                                    menu='operaciones'
                                    submenu='solicitudes/buses'
                                    parameters={this.state}
                                    
                                    history={this.props.history}
                                    refresh={refresh}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default SolicitudBuses