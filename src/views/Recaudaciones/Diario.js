import React from 'react'
import { ListPage, Label, FormGroup, Select, Input, ReportPage, Button } from 'temeforest'
import { baseurl } from 'utils/url'
import { confirmEndpoint } from 'utils/dialog'
import { printHtml } from 'utils/exportData'
import { moneyFormat } from 'utils/number'
import moment from 'moment'
import Swal from 'sweetalert2';

class Diario extends React.Component {

    constructor(props){
        super(props)
        this.table = React.createRef();
    }

    state = {
        fecha : moment().format('YYYY-MM-DD'),
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
                { row.a_cobrar > 0 && 
                    <Button outline onClick={() => this.cobrar(row)}>Cobrar</Button> 
                }
            </React.Fragment>
        )
    }


    rowToHtml(row){
        return `
            <div style="margin-bottom: 10px; border-bottom: 1px solid black;">
                <p>Localidad: ${row.localidad_nombre}</p>
                <p>Cooperativa: ${row.cooperativa_nombre}</p>
                <p>Fecha venta: ${row.fecha_venta}</p>
                <p>Valor: $ ${moneyFormat(row.a_cobrar)}</p>
            </div>
        `
    }

    toWord(row){
        printHtml(this.rowToHtml(row))
    }

    imprimirTodos(){
        let rows = this.table.current.state.filtered
        let html = rows.filter((row) => row.a_cobrar !== 0).map((row) => this.rowToHtml(row)).join('')
        printHtml(html)
    }

    fieldImprimir = (row) => {
        return (
            <React.Fragment>
                { row.a_cobrar !== 0 && 
                    <Button outline onClick={() => this.toWord(row)}>Imprimir</Button> 
                }
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
                            <Label className="col-sm-5">Dia</Label>
                            <div className="col-sm-7">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha')} value={this.state.fecha}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-5">Localidad</Label>
                            <div className="col-sm-7">
                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad}/>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-6">Cooperativa</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Tipo</Label>
                            <div className="col-sm-6">
                                <Select options={this.optionsTipos} onChange={this.onChange('tipo')} value={this.state.tipo}/>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4 text-right">
                        
                    </div>
                </div>
                <ListPage
                    id="report"
                    searchable={false}
                    ref={this.table}

                    head={[
                        ['', '', '', '', '', '', '', <Button outline onClick={() => this.imprimirTodos()}>Imprimir Todos</Button>],
                        ['Cooperativa', 'Localidad', 'Fecha venta', 'Cobrar', 'A cobrar', 'Cobrado', 'Fecha cobro', 'N.C', 'Acción']
                    ]}
                    fieldNames={['Cooperativa', 'Localidad', 'Fecha venta', 'Cobrar', 'A cobrar', 'Cobrado', 'Fecha cobro', 'N.C', 'Acción']}
                    fields={[
                        'cooperativa_nombre', 
                        'localidad_nombre', 
                        'fecha_venta', 
                        this.fieldCobrar, 
                        (row) => <label style={{float:"right"}}>$ {moneyFormat(row.a_cobrar)}</label>, 
                        (row) => <label style={{float:"right"}}>$ {moneyFormat(row.cobrado)}</label>,
                        (row) => <label style={{float:"right"}}> {(row.fecha_cobro || 'fecha')}</label>,
                        (row) => <label style={{float:"right"}}>$ {moneyFormat(row.nc)}</label>,
                       this.fieldImprimir
                    ]}

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