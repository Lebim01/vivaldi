import React from 'react'
import { ListPage, Card, CardBody, CardTitle, Label, FormGroup, Select, Input, Button, FormValidate } from 'temeforest'
import moment from 'moment'
import { baseurl } from 'utils/url'
import { printHtml, barcodeToPng } from 'utils/exportData'
import axios from 'axios'

const endpoint = 'venta/solicitud_tasacontingencia'

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

    async rowToHtml(row){
        try {
            const res1 = await axios.get(`${baseurl}/venta/generacion_contingencia/${row.id}/`)
            const res2 = await axios.get(`${baseurl}/venta/generacion_contingencia/${row.id}/tasas/`)
            //await axios.post(`${baseurl}/${endpoint}/${row.id}/`, { estado : 3 /** IMPRESO */ })
        }
        catch(e){
            console.error(e)
        }
        /*return `
            <div style="margin-bottom: 10px; border-bottom: 1px solid black; width: 300px; text-align: center;">
                <p style="margin-top: 5px; margin-bottom: 5px;">${row.localidad_nombre}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">Contingencia General</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">Bloque #${row.bloque} - Tasa #${row.tasa}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Emisión: </span>
                    <span style="width: 100px; text-align: left;">${moment().format('DD/MM/YYYY')}</span>
                </p>
                <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Tasa: </span>
                    <span style="width: 100px; text-align: left;">$ ${row.tasa_valor}</span>
                </p>
                <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Oficinista: </span>
                    <span style="width: 100px; text-align: left;">admin</span>
                </p>
                <img src="${barcodeToPng("1234")}"/>
            </div>
        `*/

        return `
            <div style="margin-bottom: 10px; border-bottom: 1px solid black; width: 300px; text-align: center;">
                <p style="margin-top: 5px; margin-bottom: 5px;">${row.localidad_nombre}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">${row.cooperativa_nombre}</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">Contingencia</p>
                <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Emisión: </span>
                    <span style="width: 100px; text-align: left;">${moment().format('DD/MM/YYYY')}</span>
                </p>
                <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Tasa: </span>
                    <span style="width: 100px; text-align: left;">$ ${row.tasa_valor}</span>
                </p>
                <p style="margin-top: 5px; margin-bottom: 5px;">
                    <span style="width: 100px; text-align: left;">Oficinista: </span>
                    <span style="width: 100px; text-align: left;">${row.usuario_solicitante_nombre}</span>
                </p>
                <img src="${barcodeToPng("1234")}"/>
            </div>
        `
    }

    async toWord(row){
        printHtml(await this.rowToHtml(row))
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

                                    endpoint={endpoint}
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