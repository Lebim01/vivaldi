import React from 'react'
import { ListPage, Select, Label, FormGroup, Card, CardBody, CardTitle, Input, Permission } from 'temeforest'
import { baseurl, objectToUrl } from 'utils/url'
import moment from 'moment'

class ConsultaTasa extends React.Component {

    state = {
        fecha: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    optionsBus = {
        url : `${baseurl}/bus/`,
        labelName: (row) => `${row.disco} / ${row.placa}`,
        valueName: 'id' 
    }
    optionsAndenes = {
        url : `${baseurl}/anden/`,
        labelName: 'descripcion',
        valueName: 'id' 
    }
    optionsFrecuencias = (params) => {
        return {
            url : `${baseurl}/frecuencia/${objectToUrl(params)}`,
            labelName: 'hora_salida',
            valueName: 'id' 
        }
    }

    onChange = name => (e) => {
        let value = e.target.value
        if(e.target.type === 'checkbox') value = e.target.checked

        this.setState({
            [name]: value
        })
    }

    refresh(){
        this.setState({
            fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
            refresh: true
        })
    }

    render(){
        return (
            <Permission key_permission="">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <CardTitle>Consulta Tasa</CardTitle>
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
                                                <Label className="col-sm-3">Bus</Label>
                                                <div className="col-sm-8">
                                                    <Select asyncOptions={this.optionsBus} onChange={this.onChange('bus')} value={this.state.bus}/>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Anden</Label>
                                                <div className="col-sm-8">
                                                    <Select asyncOptions={this.optionsAndenes} onChange={this.onChange('anden')} value={this.state.anden}/>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Frecuencia</Label>
                                                <div className="col-sm-8">
                                                    <Select asyncOptions={this.optionsFrecuencias({ cooperativa: this.state.cooperativa })} onChange={this.onChange('frecuencia')} value={this.state.frecuencia}/>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Fecha viaje</Label>
                                                <div className="col-sm-8">
                                                    <Input type="date" onChange={this.onChange('fecha_viaje')} value={this.state.fecha_viaje}/>
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div className="col-sm-6">
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Usado</Label>
                                                <div className="col-sm-8">
                                                    <Input type="date" onChange={this.onChange('usado')} value={this.state.usado}/>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="row">
                                                <Label className="col-sm-3">Torniquete</Label>
                                                <div className="col-sm-8">
                                                    <Select asyncOptions={this.optionsTorniquetes} onChange={this.onChange('torniquete')} value={this.state.torniquete}/>
                                                </div>
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2"></div>
                                        <div className="col-sm-8">
                                            <ListPage
                                                searchable={false}
                                                fieldNames={['Silo','Torniquete', 'Fecha uso', 'Validado']}
                                                fields={[]}

                                                endpoint='consulta-tasa'
                                                parameters={this.state}

                                                history={this.props.history}
                                            />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </Permission>
        )
    }
}

export default ConsultaTasa