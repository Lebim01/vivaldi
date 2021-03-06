import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Select, Input, Button } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'

class SolicitudUsuario extends React.Component {

    constructor(props){
        super(props)
        this.table = React.createRef();
    }

    state = {
        fecha : moment().format('YYYY-MM-DD'),
        estado: 0, 
        tipo_solicitud_nombre: "Nuevo"
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
       // { value:3, label: 'Impreso' },
    ]
    optionsRazon = [
        { value:'', label:'Seleccione' },
    ]
    estados = [
        { value:0, label: 'Pendiente' },
        { value:1, label: 'Aceptado' },
        { value:2, label: 'Rechazado' },
        { value:3, label: 'Impreso' },
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
                                <CardTitle>Solicitud de usuario</CardTitle>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <FormGroup className="row">
                                            <Label className="col-sm-4">Cooperativa</Label>
                                            <div className="col-sm-8">
                                                <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-4">Fecha</Label>
                                            <div className="col-sm-8">
                                                <Input className="no-clear" type="date" onChange={this.onChange('fecha')} value={this.state.fecha} />
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-sm-6">
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Raz??n</Label>
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
                                    ref={this.table}
                                    searchable={false}

                                    fieldNames={ this.state.tipo_solicitud_nombre == "Nuevo" ? 
                                    ['Cooperativa', 'Fecha', 'Tipo de Solicitud', 'Estado'] : 
                                    ['Cooperativa', 'Fecha', 'Descripci??n', 'Tipo de Solicitud', 'Estado']}
                                    fields={this.state.tipo_solicitud_nombre == "Nuevo" ?
                                    ['cooperativa_nombre', 'fecha', 'tipo_solicitud_nombre', 'estado_nombre'] :
                                    ['cooperativa_nombre', 'fecha', 'descripcion', 'tipo_solicitud_nombre', 'estado_nombre']}

                                    endpoint='venta/solicitud_usuario'
                                    urlFront='operaciones/solicitudes/usuario'
                                    parameters={this.state}
                                    filters={{
                                        persist: true,
                                        callback: (parameters) => this.setState(parameters)
                                    }}

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

export default SolicitudUsuario
