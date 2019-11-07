import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Permission } from 'temeforest'
import moment from 'moment'
import { baseurl, objectToUrl } from 'utils/url'
import axios from 'axios'

class ViajesBus extends React.Component {

    state = {
        filters : {
            fecha_inicio : moment().format('YYYY-MM-DD'),
            fecha_fin : moment().format('YYYY-MM-DD'),
        },
        data : []
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
        const { data } = this.state
        return (
            <Permission key_permission="view_viajes_bus" mode="redirect">
                <ReportPage title="Viajes Bus" printButtons={false} timestamp={false}>
                    <div className="row">
                        <div className="col-sm-4">
                            <FormGroup className="row">
                                <Label className="col-sm-4">Cooperativa</Label>
                                <div className="col-sm-8">
                                    <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.filters.cooperativa}/>
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-4">Localidad</Label>
                                <div className="col-sm-8">
                                    <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.filters.localidad}/>
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-sm-4">
                            <FormGroup className="row">
                                <Label className="col-sm-4">Fecha inicio</Label>
                                <div className="col-sm-8">
                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.filters.fecha_inicio} />
                                </div>
                            </FormGroup>
                            <FormGroup className="row">
                                <Label className="col-sm-4">Fecha fin</Label>
                                <div className="col-sm-8">
                                    <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.filters.fecha_fin} />
                                </div>
                            </FormGroup>
                        </div>
                    </div>

                    { data.map((row) => 
                        <>
                            <h3 className="text-center">Bus: {row.disco} / {row.placa}</h3>
                            <ListPage
                                searchable={false}

                                fieldNames={['Viaje', 'Destino', 'Tipo', 'Cantidad', 'v/u', 'Subtotal']}
                                fields={['viaje', 'destino_nombre', 'tipo_boleto', 'pasajeros', 'valor_unitario', 'total']}

                                data={row.data}
                                parameters={this.state}
                                
                                history={this.props.history}
                            />
                        </>
                    )}
                    { data.length === 0 && <h3>No hay información para mostrar</h3> }
                </ReportPage>
            </Permission>
        )
    }
}

export default ViajesBus