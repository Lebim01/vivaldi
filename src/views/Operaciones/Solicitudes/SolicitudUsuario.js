import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Select, Input } from './../../../temeforest'
import moment from 'moment'
import { baseurl } from './../../../utils/url'

class SolicitudUsuario extends React.Component {

    state = {
        fecha : moment().format('YYYY-MM-DD')
    }
    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    optionsEstado = [
        { value:'', label:'Seleccione' },
    ]
    optionsRazon = [
        { value:'', label:'Seleccione' },
    ]
    estados = [
        { value:'', label: 'Todos' },
        { value:1, label: 'Finalizados' }
    ]

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    render(){
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

                                    fieldNames={['Cooperativa', 'Fecha', 'Descripión', 'Tipo de Solicitud']}
                                    fields={['cooperativa_nombre', 'fecha', 'descripcion', 'tipo_solicitud']}

                                    url='venta/solicitud_usuario'

                                    menu='operaciones'
                                    submenu='solicitudes/usuario'
                                    parameters={this.state}
                                    
                                    history={this.props.history}
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