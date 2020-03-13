import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Select, Input, Button , SelectLocalidad} from 'temeforest'
import { baseurl } from 'utils/url'

class RegistroAccion extends React.Component {

    state = {}

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

    optionsTable = {
        url : `${baseurl}/tables/`,
        labelName: 'name',
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

    render() {
        const { refresh } = this.state
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>Registro de Acciones</CardTitle>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <FormGroup className="row">
                                            <Label className="col-sm-5">Cooperativa</Label>
                                            <div className="col-sm-6">
                                                
                                                <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-5">Localidad</Label>
                                            <div className="col-sm-6">
                                                <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.localidad}/>
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-sm-4">
                                        <FormGroup className="row">
                                            <Label className="col-sm-4">Fecha Inicio</Label>
                                            <div className="col-sm-6">
                                                <Input className="no-clear" type="date" value={this.state.from_date} onChange={this.onChange('from_date')} />
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-4">Fecha Fin</Label>
                                            <div className="col-sm-6">
                                                <Input className="no-clear" type="date" value={this.state.to_date} onChange={this.onChange('to_date')} />
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="col-sm-4">
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Tabla</Label>
                                            <div className="col-sm-6">
                                                <Select asyncOptions={this.optionsTable} onChange={this.onChange('content_type')} value={this.state.cooperativa}/>
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
                                    fieldNames={[
                                        'Fecha/Hora', 
                                        'Usuario', 
                                        'Nombre', 
                                        'Departamento',
                                        'Tabla', 
                                        'Evento', 
                                        'Usuario Afectado',
                                        'Área Modificada', 
                                        'Descripción'
                                    ]}
                                    fields = {[
                                        'datetime', 
                                        'user', 
                                        'object_repr', 
                                        '', 
                                        'content_type',
                                        'event_type', 
                                        '', 
                                        '', 
                                        '' 
                                    ]}

                                    endpoint='auditcrud'
                                    history={this.props.history}
                                    parameters={{
                                        ...this.state,
                                        type: 'list'
                                    }}
                                    filters={{
                                        persist: true,
                                        callback: (parameters) => this.setState(parameters)
                                    }}

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

export default RegistroAccion
