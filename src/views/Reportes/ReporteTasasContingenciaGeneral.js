import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Select, Input, Button, ReportPage, Permission, SelectLocalidad} from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'
import { moneyFormat } from 'utils/number'

const style_text_center = { textAlign: 'center' }

class ReporteTasasContingenciaGeneral extends React.Component {

    table = React.createRef()
    state = {
        fecha_inicio : moment().format('YYYY-MM-DD'),
        fecha_fin : moment().format('YYYY-MM-DD'),
        openModal: false
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

    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this)
    }

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    buscar = () => {
        console.log(this.table)
        this.table.current.refresh()
    }

    toggle(){
        let state = !this.state.openModal
        this.setState({
            openModal: state
        })
    }
    
    render(){
       
        return (
            <Permission key_permission="view_reporte_contigencia_general" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <div className="row">
                                        <div className="col-sm-12 text-center">
                                            <Button style={{bottom: "-250px"}} onClick={this.buscar}>
                                                Consultar
                                            </Button>
                                        </div>
                                    </div>
                                    <ListPage 
                                        title="Reporte tasas de contingencia general" 
                                        exportExcel
                                        key_permission= "reporte_contingencia_general"
                                        imprimirPantalla
                                        id="report"
                                        
                                        filtersZone ={
                                            <div className="row">
                                            <div className="col-sm-6">
                                                <FormGroup className="row">
                                                    <Label className="col-sm-4">Cooperativa</Label>
                                                    <div className="col-sm-7">
                                                        <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="row">
                                                    <Label className="col-sm-4">Localidad</Label>
                                                    <div className="col-sm-7">
                                                        <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.localidad}/>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                            <div className="col-sm-6">
                                                <FormGroup className="row">
                                                    <Label className="col-sm-3">Fecha inicio</Label>
                                                    <div className="col-sm-8">
                                                        <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.fecha_inicio} />
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="row">
                                                    <Label className="col-sm-3">Fecha fin</Label>
                                                    <div className="col-sm-8">
                                                        <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.fecha_fin} />
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="row">
                                                    <Label className="col-sm-3">Tipo</Label>
                                                    <div className="col-sm-8">
                                                        <Select 
                                                            onChange={this.onChange('tipo')} 
                                                            value={this.state.tipo} 
                                                            options={[
                                                                {label : 'Todos', value:'t'},
                                                                {label : 'Generadas', value:'g'},
                                                                {label : 'Vendidas', value:'v'},
                                                            ]} 
                                                        />
                                                    </div>
                                                </FormGroup>
                                               <br></br><br></br>
                                            </div>
                                        </div>
                                        }

                                        //title="Reporte tasas de contingencia general"
                                        ref={this.table}
                                        autoLoad={false}
                                        searchable={false}
                                            
                                            
                                            head={[
                                                [
                                                    {colSpan:3,title:''},
                                                    {colSpan:2,title:'Generado',style:style_text_center},
                                                    {colSpan:2,title:'Vendido',style:style_text_center},
                                                    {colSpan:2,title:'Saldo',style:style_text_center}
                                                ],
                                                ['Fecha', 'Concepto', 'Cooperativa', 
                                                'Cantidad', 
                                                'Total', 
                                                'Cantidad', 
                                                'Total', 
                                                'Cantidad', 
                                                'Total']
                                            ]}
                                            fields={[
                                                'fecha', 
                                                'concepto', 
                                                'cooperativa_nombre',
                                                (row)=> <span style={{ textAlign:"right", position: 'relative', right:'-60%'}}>{(row.generado_cantidad || 0)}</span>, 
                                                (row) => <span style={{textAlign:"right", position: 'relative', right:'-20%'}}>${moneyFormat(row.generado_total || 0)}</span>, 
                                                (row) => <span style={{textAlign:"right", position: 'relative', right:'-60%'}}>{(row.vendido_cantidad || 0)}</span>, 
                                                (row) => <span style={{textAlign:"right", position: 'relative', right:'-20%'}}>${moneyFormat(row.vendido_total || 0)}</span>, 
                                                (row) => <span style={{textAlign:"right", position: 'relative', right:'-60%'}}>{(row.saldo_cantidad || 0)}</span>,
                                                (row) => <span style={{textAlign:"right",position: 'relative', right:'-20%'}}>${moneyFormat(row.saldo_total || 0)}</span>
                                            ]}

                                            
                                            endpoint='venta/tasa-contingencia-general'
                                            parameters={this.state}
                                            
                                            history={this.props.history}
                                            //refresh={refresh}
                                        />
                                        
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                
            </Permission>
        )
    }

    
}

export default ReporteTasasContingenciaGeneral