import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Select, Input, Button, FormValidate } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'
import { printHtml } from 'utils/exportData'

class BandejaTasaCooperativa extends React.Component {
    state = {
        fecha : moment().format('YYYY-MM-DD'),
        estado : 1 // aceptado
    }
    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    buscar = () => {
        this.setState({
            refresh: true
        })
    }

    toggle = () => {
        let state = !this.state.openModal
        this.setState({
            openModal: state
        })
    }

    rowToHtml(row){
        return `
            <div style="margin-bottom: 10px; border-bottom: 1px solid black;">
                <p>Cooperativa: ${row.cooperativa_nombre}</p>
                <p>Fecha: ${row.fecha}</p>
                <p>Cantidad Aprobada: ${row.cantidad_aprobada}</p>
            </div>
        `
    }

    toWord(row){
        printHtml(this.rowToHtml(row))
    }

    fieldImprimir = (row) => {
        return (
            <React.Fragment>
                <Button outline onClick={() => this.toWord(row)}>Imprimir</Button>
            </React.Fragment>
        )
    }

    render(){
        const { refresh } = this.state
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    Tasa de contigencia de cooperativa (I)
                                </CardTitle>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Cooperativa</Label>
                                            <div className="col-sm-8">
                                                <Select asyncOptions={this.optionsCooperativa} onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="row">
                                            <Label className="col-sm-3">Fecha</Label>
                                            <div className="col-sm-8">
                                                <Input className="no-clear" type="date" onChange={this.onChange('fecha')} value={this.state.fecha} />
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

                                    fieldNames={['Cooperativa', 'Fecha', 'Descripcion', 'Tipo de solicitud', 'Cantidad', 'Acción']}
                                    fields={['cooperativa_nombre', 'fecha', 'descripcion', 'tipo_solicitud_nombre', 'cantidad_aprobada', this.fieldImprimir]}

                                    endpoint='venta/solicitud_tasacontingencia'
                                    parameters={this.state}

                                    history={this.props.history}
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

export default BandejaTasaCooperativa