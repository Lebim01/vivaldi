import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Permission, Button, SelectLocalidad} from 'temeforest'
import moment from 'moment'
import { baseurl, objectToUrl } from 'utils/url'
import axios from 'axios'
import { moneyFormat } from 'utils/number'

class ViajesBus extends React.Component {

    table = React.createRef()
    state = {
        search: '',
        filters : {
            fecha_inicio : moment().format('YYYY-MM-DD'),
            fecha_fin : moment().format('YYYY-MM-DD'),
        },
        data : [], 
        reporte: 1
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

    optionsUsuarios  = (obj) => ({
        url : `${baseurl}/usuario/${objectToUrl(obj)}`,
        labelName: 'first_name', 
        valueName: 'id' , 
    })

    optionsReporte = [
        { value: 1, label: 'Boletero' },   
    ]

    onChange = name => (e) => {
        const filters = this.state.filters
        this.setState({
            filters : {
                ...filters,
                [name]: e.target.value
            }
        })
    }

    buscar = () => {
        if(this.state.filters.cooperativa)
            this.loadList()
    }

    loadList = async () => {
        try {
            const response = await axios.get(`${baseurl}/venta/viajes-por-bus/${objectToUrl(this.state.filters)}`)
            this.setState({
                data : response.data
            })
        }
        catch(e){
            console.error(e)
        }
    }

    render(){
        const {data}= this.state
        return (
            <Permission key_permission="view_viajes_bus" mode="redirect">
                <ReportPage title="Viaje Bus" timestamp={false}>
                    <div className="row" style={{padding: "30px 0 -30px 0"}}>

                        <div className="col-sm-4">
                            <FormGroup className="row">
                                <Label className={"col-md-5 " + (this.state.filters.cooperativa ? "" : "text-danger")}>Cooperativa</Label>
                                <div className="col-sm-7">
                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Seleccione una cooperativa" onChange={this.onChange('cooperativa')} value={this.state.filters.cooperativa}/>
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-5">Localidad</Label>
                                <div className="col-sm-7">
                                    <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.filters.localidad}/>
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-4">
                            <FormGroup className="row">
                                <Label className="col-sm-5">Fecha inicio</Label>
                                <div className="col-sm-7">
                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.filters.fecha_inicio} />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-5">Fecha fin</Label>
                                <div className="col-sm-7">
                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.filters.fecha_fin} />
                                </div>
                            </FormGroup>
                            
                        </div>
                        <div className="col-sm-4">
                            <FormGroup className="row">
                                <Label className="col-sm-6">Forma de pago</Label>
                                <div className="col-sm-6">
                                    <Select asyncOptions={this.optionsFormapago} onChange={this.onChange('forma_de_pago')} value={this.state.filters.forma_de_pago}/>
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-6">Vendedor</Label>
                                <div className="col-sm-6">
                                    <Select 

                                        { ...this.state.filters.cooperativa && this.state.filters.localidad 
                                            && this.state.filters.fecha_inicio && this.state.filters.fecha_fin
                                            ? { asyncOptions : this.optionsUsuarios({ cooperativa: this.state.filters.cooperativa, 
                                                localidad: this.state.filters.localidad, fecha_inicio : this.state.filters.fecha_inicio, 
                                            fecha_fin: this.state.filters.fecha_fin})  }
                                            : { options : [{ label : 'Seleccione un vendedor', value : '' }] }
                                        }
                                        onChange={this.onChange('usuario')} 
                                        value={this.state.filters.usuario}
                                    />
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <Button onClick={this.buscar} style={{marginLeft: '1rem'}} disabled={!this.state.filters.cooperativa}>
                                Consultar
                            </Button>
                        </div>
                    </div>
                    <div>
                        <br></br>
                    </div>
                    <div id="report">
                        { data.map((row, i) =>
                            <React.Fragment key={i}>
                                <h3 className="text-center">Bus: {row.disco} / {row.placa}</h3>
                                <ListPage
                                    //exportExcel
                                    //imprimirPantalla
                                    key_permission="viajes_bus"
                                    //title="Viaje Bus"
                                    searchable={false}

                                    head={[['Viaje', 'Fecha', 'Frecuencia', 'Parada', 'Pasajeros', 'Localidad',
                                    
                                    {
                                        title:'Valor del Pasaje', 
                                        style:{textAlign:"right", position: 'relative', right:'0%' }
                                    }, 
                                    {
                                        title:'Total', 
                                        style:{textAlign:"right", position: 'relative', right:'0%' }
                                    }]]}
                                    fields={[
                                        'viaje', 
                                        'fecha', 
                                        'frecuencia',
                                        'parada',
                                        (row) => <span style={{ textAlign:"right", position: 'relative', right:'-40%'}}>{row.pasajeros}</span>,
                                        'localidad',
                                        (row) => <span style={{ textAlign:"right", position: 'relative', right:'-80%'}}>${moneyFormat(row.valor_unitario)}</span>,
                                        (row) => <span style={{ textAlign:"right", position: 'relative', right:'-40%'}}>${moneyFormat(row.total)}</span>
                                    ]}

                                    ref={this.table}
                                    autoRefresh={false}

                                    data={row.data}
                                    parameters={this.state}
                                    history={this.props.history}
                                />
                            </React.Fragment>
                        )}
                    </div>
                    { data.length === 0 && <h3>No hay información para mostrar</h3> }
                </ReportPage>
            </Permission>
        )
    }
}

export default ViajesBus
