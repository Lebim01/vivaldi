import React from 'react'
import { ListPage, Card, CardBody, CardTitle, FormGroup, Input, Label, Select, Button, Permission } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'

class SolicitudTasaContingencia extends React.Component {

    interval = null
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
        { value:1, label: 'Aceptado' },
        { value:2, label: 'Rechazado' },
        { value:3, label: 'Impreso' },
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
        this.interval = setInterval(this.refresh.bind(this), 5000)
    }
    componentWillUnmount(){
        clearInterval(this.interval)
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

    add = () => {
        window.location = '/#/operaciones/solicitudes/tasas-contingencia/add'
    }

    render(){
        return (
            <Permission key_permission="view_solicitudtasacontingencia" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        Solicitud de tasa de contingencia
                                        <Button className="float-right" onClick={this.add}>
                                            <i className="fas fa-plus" /> Solicitud
                                        </Button>
                                    </CardTitle>
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Cooperativa</Label>
                                                <div className="col-sm-8">
                                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Fecha</Label>
                                                <div className="col-sm-8">
                                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha')} value={this.state.fecha} />
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

                                        fieldNames={['Cooperativa', 'Fecha', 'Descripión', 'Tipo de Solicitud', 'Cantidad', 'Estado']}
                                        fields={['cooperativa_nombre', 'fecha', 'descripcion', 'tipo_solicitud_nombre', 
                                        (row) => <span style={{textAlign:"right", position: 'relative', right:'-60%'}}>{row.cantidad_pedida}</span>,                     
                                         'estado_nombre']}


                                        key_permission="solicitudtasacontingencia"
                                        endpoint='venta/solicitud_tasacontingencia'
                                        urlFront='operaciones/solicitudes/tasas-contingencia'
                                        
                                        history={this.props.history}
                                        parameters={this.state}
                                        filters={{
                                            persist: true,
                                            callback: (parameters) => this.setState(parameters)
                                        }}
                                        refresh={this.state.refresh}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </Permission>
        )
    }
}

export default SolicitudTasaContingencia