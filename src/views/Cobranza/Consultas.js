import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Button } from './../../temeforest'
import moment from 'moment'
import { baseurl } from './../../utils/url'

class Reporte1 extends React.Component {

    state = {
        refresh: false,
        fecha : moment().format('YYYY-MM-DD')
    }
    optionsFormato = {
        url : `${baseurl}/formato/`,
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
    optionsCanal = {
        url : `${baseurl}/canal/`,
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
            <ReportPage title="Cobranza - Consultas">
                <div className="row">
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Localidad</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Fecha</Label>
                            <div className="col-sm-8">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha')} value={this.state.fecha}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Forme de pago</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('forma_pago')} value={this.state.forma_pago}/>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Formato</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('formato')} value={this.state.formato}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <div className="col-sm-6">
                                <Button onClick={this.onChange('refresh')} style={{width:'100%'}}>
                                    Ver reporte
                                </Button>
                            </div>
                            <div className="col-sm-6">
                                <Button style={{width:'100%'}}>
                                    Imprimir
                                </Button>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Canal</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsCanal} onChange={this.onChange('canal')} value={this.state.canal}/>
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <ListPage
                    searchable={false}

                    fieldNames={[
                        ['Cooperativa', 'Valor', 'Dia Corresponde', 'Localidad', 'Estado']
                    ]}
                    fields={['', '', '', '', '', '']}

                    //url del endpoint
                    url='cobranza/consulta'

                    // url del frontend
                    menu='cobranza'
                    submenu='consultas'
                    parameters={this.state}
                    
                    history={this.props.history}
                    refresh={refresh}
                />
            </ReportPage>
        )
    }
}

class Reporte2 extends React.Component {

    state = {
        refresh: false,
        fecha : moment().format('YYYY-MM-DD')
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
            <ReportPage title="Cobranza - Consultas">
                <div className="row">
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Localidad</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Fecha salida</Label>
                            <div className="col-sm-8">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha')} value={this.state.fecha}/>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <div className="col-sm-6">
                                <Button onClick={this.onChange('refresh')} style={{width:'100%'}}>
                                    Ver reporte
                                </Button>
                            </div>
                            <div className="col-sm-6">
                                <Button style={{width:'100%'}}>
                                    Imprimir
                                </Button>
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <h3 className="text-center">Día Cobro - 01/01/2019</h3>
                <ListPage
                    searchable={false}

                    fieldNames={[
                        ['Cooperativa', 'Valor', 'Día Correspondente', 'Localidad']
                    ]}
                    fields={['', '', '', '', '', '']}

                    //url del endpoint
                    url='cobranza/diario'

                    // url del frontend
                    menu='cobranza'
                    submenu='diario'
                    parameters={this.state}
                    
                    history={this.props.history}
                    refresh={refresh}
                />
                <br/>
                <h3 className="text-center">Días Pendientes Cancelados Hoy - 01/01/2019</h3>
                <ListPage
                    searchable={false}

                    fieldNames={['Cooperativa', 'Valor', 'Día Correspondente', 'Localidad']}
                    fields={['', '', '', '', '', '']}

                    //url del endpoint
                    url='cobranza/diario'

                    // url del frontend
                    menu='cobranza'
                    submenu='diario'
                    parameters={this.state}
                    
                    history={this.props.history}
                    refresh={refresh}
                />
            </ReportPage>
        )
    }
}

class Consultas extends React.Component {
    render(){
        
        return (
            <div>
                <Reporte1 history={this.props.history} />
                <br />
                <Reporte2 history={this.props.history} />
            </div>
        )
    }
}

export default Consultas