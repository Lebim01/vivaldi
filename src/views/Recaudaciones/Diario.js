import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Button } from 'temeforest'
import { baseurl } from 'utils/url'
import { confirmEndpoint } from 'utils/dialog'
import { Export2DocFromHtml } from 'utils/exportData'
import moment from 'moment'
import Swal from 'sweetalert2';

class Diario extends React.Component {
    state = {
        dia : moment().format('YYYY-MM-DD'),
        tipo: 'p'
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
    optionsTipos = [
        {value:'t', label:'Todos'},
        {value:'p', label:'Pendientes'},
        {value:'c', label:'Cobrados'},
    ]

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    refresh = () => {
        this.setState({
            refresh: true
        })
    }

    cobrar = async ({ localidad, cooperativa, fecha_venta }) => {
        const options = {
            params : {
                localidad,
                cooperativa,
                fecha_venta
            },
            text : '¿Seguro de cobrar?',
            endpoint: 'venta/cobro/crear_cobro_por_fecha'
        }
        if(await confirmEndpoint(options)){
            this.refresh()
            Swal.fire('Cobrado', 'Exitosamente', 'success')
        }
    }

    fieldCobrar = (row) => {
        return (
            <React.Fragment>
                { row.cobrado === 0 && <Button outline onClick={() => this.cobrar(row)}>Cobrar</Button> }
            </React.Fragment>
        )
    }

    toWord(row){
        Export2DocFromHtml(`
Localidad: ${row.localidad_nombre}
Cooperativa: ${row.cooperativa_nombre}
Fecha venta: ${row.fecha_venta}
Valor: ${row.emitido}
        `)
    }

    fieldImprimir = (row) => {
        return (
            <React.Fragment>
                { row.emitido !== 0 && <Button outline onClick={() => this.toWord(row)}>Imprimir</Button> }
            </React.Fragment>
        )
    }
    
    render(){
        const { refresh } = this.state
        return (
            <ReportPage title="Cobros Diarios">
                <div className="row">
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Dia</Label>
                            <div className="col-sm-8">
                                <Input className="no-clear" type="date" onChange={this.onChange('dia')} value={this.state.dia}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Localidad</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad}/>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Cooperativa</Label>
                            <div className="col-sm-8">
                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Tipo</Label>
                            <div className="col-sm-8">
                                <Select options={this.optionsTipos} onChange={this.onChange('tipo')} value={this.state.tipo}/>
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <ListPage
                    id="report"
                    searchable={false}

                    fieldNames={['Cooperativa', 'Localidad', 'Fecha venta', 'Cobrar', 'Saldo', 'Emitido', 'Cobrado', 'N.C', 'Acción']}
                    fields={['cooperativa_nombre', 'localidad_nombre', 'fecha_venta', this.fieldCobrar, 'saldo', 'emitido', 'cobrado', 'nc', this.fieldImprimir]}

                    endpoint='venta/cobros-diarios'
                    parameters={this.state}
                    
                    history={this.props.history}
                    refresh={refresh}
                />
            </ReportPage>
        )
    }
}

export default Diario