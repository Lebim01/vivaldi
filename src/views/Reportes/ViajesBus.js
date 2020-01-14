import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Permission } from 'temeforest'
import moment from 'moment'
import { baseurl, objectToUrl } from 'utils/url'
import axios from 'axios'
import { moneyFormat } from 'utils/number'
import store from 'store/auth'

class ViajesBus extends React.Component {

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

    /*optionsUsuarios = {
        url : `${baseurl}/usuario/?tipo=1`,
        labelName: 'tipo_usuario_puntoventa_nombre', 
        valueName: 'id' , 

    }*/

    optionsReporte = [
        { value: 1, label: 'Boletero' },
        { value: 2, label: 'Supervisor' },
    ]

    /*optionsReporte = [
        { value: 1, label: 'Boletero' },
        { value: 2, label: 'Viaje' },
    ]*/

    onChange = name => (e) => {
        const filters = this.state.filters
        this.setState({
            filters : {
                ...filters,
                [name]: e.target.value
            }
        })
    }
    buscar(){
        this.setState({
            refresh: true
        })
    }

    componentDidMount(){
        this.loadList()
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.filters !== this.state.filters)
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
                    <div className="row" style={{padding: "0px 0 20px 0"}}>

                        <div className="col-sm-4">
                            <FormGroup className="row">
                                <Label className="col-sm-5">Cooperativa</Label>
                                <div className="col-sm-7">
                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.filters.cooperativa}/>
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-5">Localidad</Label>
                                <div className="col-sm-7">
                                    <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.filters.localidad}/>
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
                                <Label className="col-sm-6">Tipo Vendedor</Label>
                                <div className="col-sm-6">
                                <Select options={this.optionsReporte} onChange={this.onChange('usuarios')} value={this.state.usuarios} />
                                </div>
                            </FormGroup>
                        </div>
                    </div>

                    <div id="report">
                        { data.map((row) =>
                            <>
                                <h3 className="text-center">Bus: {row.disco} / {row.placa}</h3>
                                <ListPage
                                    exportExcel
                                    imprimirPantalla
                                    key_permission="viajes_bus"
                                    //title=" "
                                    searchable={false}

                                    fieldNames={['Viaje', 'Fecha salida', 'Localidad', 'Usuario', 'Pasaje', 'Total']}
                                    fields={[
                                        
                                        'viaje', 
                                        'fecha_salida', 
                                        'localidad',
                                        (row) => <span style={{ textAlign:"right", position: 'relative', right:'-40%'}}>{row.pasajeros}</span>,
                                        (row) => <span style={{ textAlign:"right", position: 'relative', right:'-40%'}}>${moneyFormat(row.valor_unitario)}</span>,
                                        (row) => <span style={{ textAlign:"right", position: 'relative', right:'-40%'}}>${moneyFormat(row.total)}</span>
                                        
                                    ]}


                                    data={row.data}
                                    parameters={this.state}

                                    history={this.props.history}
                                />
                            </>
                        )}
                    </div>
                    { data.length === 0 && <h3>No hay información para mostrar</h3> }
                </ReportPage>
            </Permission>
        )
    }
}

export default ViajesBus
