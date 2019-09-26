import React from 'react'
import axios from 'axios'
import { ListPage, Label, FormGroup, InputIcon, Input, ReportPage } from 'temeforest'
import { baseurl } from 'utils/url'

class PasajerosPorViaje extends React.Component {

    state = {
        viaje : '',
        error : '',
        data : {}
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
    optionsFormapago = {
        url : `${baseurl}/formaDePago/`,
        labelName: 'nombre',
        valueName: 'id' 
    }
    optionsCiudad = {
        url : `${baseurl}/ciudad/`,
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

    enterViaje = (e) => {
        if(e.keyCode === 13){
            this.searchViaje()
        }
    }

    searchViaje = async () => {
        const { viaje } = this.state
        if(viaje){
            try {
                const res = await axios.get(`${baseurl}/viaje/${viaje}`)
                this.setState({
                    error: '',
                    data : res.data
                })
            }
            catch({ response }){
                this.setState({
                    error: response.data.detail
                })
            }
        }
    }
    
    render(){
        const { refresh } = this.state
        return (
            <ReportPage title="Pasajeros por viaje">
                <div className="row">
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Viaje</Label>
                            <div className="col-sm-8">
                                <InputIcon icon={<i className="fa fa-search" />} onKeyDown={this.enterViaje} onChange={this.onChange('viaje')} />
                                { this.state.error && <span className="text-danger">{this.state.error}</span> }
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Cooperativa</Label>
                            <div className="col-sm-8">
                                <Input readOnly value={this.state.data.cooperativa_nombre} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Usuario</Label>
                            <div className="col-sm-8">
                                <Input readOnly />
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Salida</Label>
                            <div className="col-sm-8">
                                <Input readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Destino</Label>
                            <div className="col-sm-8">
                                <Input readOnly />
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Disco/Placa</Label>
                            <div className="col-sm-8">
                                <Input readOnly value={this.state.data.bus_disco} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Conductor</Label>
                            <div className="col-sm-8">
                                <Input readOnly value={this.state.data.conductor_nombre} />
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <ListPage
                    searchable={false}

                    fieldNames={['Asiento', 'Cédula', 'Pasajero', 'Parada', 'Tipo', 'Valor', 'Hora', 'Vendedor']}
                    fields={[]}

                    data={[]}
                    parameters={this.state}
                    
                    history={this.props.history}
                    refresh={refresh}
                />

                <div className="row">
                    <div className="col-sm-4 text-center">
                        <div style={{height:150}}></div>
                        <hr  style={{border:'1px solid black'}} />
                        Oficinista
                    </div>
                    <div className="col-sm-4 text-center">
                        <div style={{height:150}}></div>
                        <hr  style={{border:'1px solid black'}} />
                        Conductor
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Total</Label>
                            <div className="col-sm-8">
                                <Input readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Total tasas</Label>
                            <div className="col-sm-8">
                                <Input readOnly />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Pasajeros</Label>
                            <div className="col-sm-8">
                                <Input readOnly />
                            </div>
                        </FormGroup>
                    </div>
                </div>
            </ReportPage>
        )
    }
}

export default PasajerosPorViaje