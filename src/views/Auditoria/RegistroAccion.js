import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Select, Input, Button } from './../../temeforest'
import moment from 'moment'
import { baseurl } from './../../utils/url'

class RegistroAccion extends React.Component {

  state = {
    fecha : moment().format('YYYY-MM-DD'),
    estado: 0
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

  optionsTable = {
    url : `${baseurl}/auditcrud`,
    labelName: 'content_type',
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
                                    <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-5">Localidad</Label>
                                <div className="col-sm-6">
                                    <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.cooperativa}/>
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-4">
                            <FormGroup className="row">
                                <Label className="col-sm-4">Fecha Inicio</Label>
                                <div className="col-sm-6">
                                    <Input type="date" onChange={this.onChange('fecha')} value={this.state.fecha} />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-4">Fecha Fin</Label>
                                <div className="col-sm-6">
                                <Input type="date" onChange={this.onChange('fecha')} value={this.state.fecha} />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-4">
                            <FormGroup className="row">
                                <Label className="col-sm-3">Tabla</Label>
                                <div className="col-sm-6">
                                    <Select asyncOptions={this.optionsTable} onChange={this.onChange('table')} value={this.state.cooperativa}/>
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
                        fieldNames={['Fecha/Hora', 'Usuario', 'Nombre', 'Departamento',
                                     'Tabla', 'Evento', 'Usuario Afectado',
                                     'Área Modificada', 'Descripción']}
                        fields = {['datetime', 'user', 'object_repr', '', 'content_type',
                                   'event_type', '', '', '' ]}

                        url='auditcrud'

                        //menu='operaciones'
                        //submenu='solicitudes/usuario'
                        //parameters={this.state}

                        //history={this.props.history}
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
