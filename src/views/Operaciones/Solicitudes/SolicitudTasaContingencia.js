import React from 'react'
import { ListPage, Card, CardBody, CardTitle, FormGroup, Input, Label, Button, Select } from './../../../temeforest'
import moment from 'moment'
import { baseurl } from './../../../utils/url'

class SolicitudTasaContingencia extends React.Component {

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

    refresh(){
        this.setState({
            refresh: true
        })
    }

    componentDidMount(){
        setInterval(this.refresh.bind(this), 5000)
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
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>Solicitud de tasa de contingencia</CardTitle>
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
                                <ListPage
                                    searchable={false}

                                    fieldNames={['Cooperativa', 'Fecha', 'Descripión', 'Tipo de Solicitud', 'Cantidad']}
                                    fields={['cooperativa_nombre', 'fecha', 'descripcion', 'tipo_solicitud_nombre', 'cantidad']}

                                    url='venta/solicitud_tasacontingencia'

                                    menu='operaciones'
                                    submenu='solicitudes/tasas-contingencia'
                                    redirect={false}
                                    
                                    history={this.props.history}
                                    parameters={this.state}
                                    refresh={this.state.refresh}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default SolicitudTasaContingencia