import React from 'react'
import { Col, Row, Button, UncontrolledTooltip } from 'reactstrap'
import { ListPage, Select, Label, FormGroup, Input, ReportPage, CardTitle, InputIcon, RecordRow } from 'temeforest'
import moment from 'moment'
import Swal from 'sweetalert2'
import axios from 'axios'
import { baseurl, einoviceUrl } from 'utils/url'

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

// numero de filas por pagina
const RowsPerPage = 25
// numero limite de paginas visibles en el footer
const NumVisibleFooterPages = 5

class CustomRecordRow extends RecordRow {
    goToFile = (t, td, id) => {
        // TODO cambiar cuando sean mas tipos de docs.
        var tipo_doc =  td == "FAC" ? 'factura' : 'notacredito'
        var url = `${einoviceUrl}/facturacion/${tipo_doc}/${t}/${id}`
        return url
    }

    generateRefound = (record) => {
        Swal.fire({
            title: 'Desea generar nota de credito?',
            text: `Esta seguro que desea generar una nota de credito a la factura ${record.numero}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.value) {
                axios.post(`${baseurl}/venta/venta/${record.venta}/generar_nota_credito/`, {
                    numero_factura: record.numero,
                    tipo_venta: record.tipo_venta
                }).then(response => {
                    if (response.status == 201){   
                        Swal.fire(
                            'Operacion Exitosa',
                            'La nota de credito ha sido realizada con exito.',
                            'success'
                        )
                    }
                }).catch(err => {
                    Swal.fire( 
                        `Error`,
                        'Intente nuevamente.',
                        'error'
                    )
                })
            }
        })
    }

    render(){
        const { fields, record } = this.props

        return (
            <tr key={record.id} onDoubleClick={this.onRowDoubleClick}>
                {fields.map((field, i) => {
                    return (
                        <td key={i} className="text-center">
                            {typeof field === 'function' ? field(record) : record[field] || (typeof record[field] === 'object' || record[field] === false ? <i className="cui-circle-x icons font-2xl d-block mt-1"></i> : <i className="cui-circle-check icons font-2xl d-block mt-1"></i>)}
                        </td>
                    )
                })}
                <td className="text-center">
                    <a href={this.goToFile('ride', record.tipo_documento ,record.facturacion_electronica_id)} target="_blank">
                        <Button color="success" id={`btn_ride_${record.id}`} >
                            <i className="cui-file icons font-2xl d-block"></i>
                        </Button>
                        <UncontrolledTooltip placement="top" target={`btn_ride_${record.id}`}>Click para ver el ride</UncontrolledTooltip>
                    </a>
                    <a href={this.goToFile('xml', record.tipo_documento ,record.facturacion_electronica_id)} target="_blank">
                        <Button color="info" id={`btn_xml_${record.id}`}>
                            <i className="cui-code icons font-2xl d-block"></i>
                        </Button>
                        <UncontrolledTooltip placement="top" target={`btn_xml_${record.id}`}>Click para ver xml</UncontrolledTooltip>
                    </a>
                    <Button color="danger" id={`btn_ndc_${record.id}`} onClick={() => this.generateRefound(record)} disabled={!record.puede_generar_notacredito}>
                        <i className="cui-action-undo icons font-2xl d-block"></i>
                    </Button>
                    <UncontrolledTooltip placement="top" target={`btn_ndc_${record.id}`}>Click para emitir Nota de Credito</UncontrolledTooltip>
                </td>
            </tr>
        )
    }
}


class CustomListPage extends ListPage {
    render(){
        const { title, searchPlaceholder, fieldNames, fields, searchable, head } = this.props
        const { filtered, numPages, next, previous, currentPage, numBeginVisibleFooterPages, numEndVisibleFooterPages, loading } = this.state

        return (
            <div>
                { title && <CardTitle>{ title }</CardTitle> }
                { searchable &&
                    <Row>
                        <Col xs="12" md="6">
                            <InputIcon placeholder={`Buscar... ${searchPlaceholder}`} onChange={this.onFilterChange} icon={<i className="fa fa-search"></i>} />
                        </Col>
                    </Row>
                }
                <br/>
                <Row>
                    <Col xs="12" md="12">
                        <BlockUi tag="div" blocking={this.state.loading}>
                            <div className="table-responsive">
                                <table className="table table-hover table-striped footable footable-5 footable-paging footable-paging-center" id={this.props.id}>
                                    <thead>
                                        { (fieldNames.length > 0) &&
                                            <tr>
                                                {fieldNames.map((fieldName, i) => <th className="text-center" key={i} scope="col">{fieldName}</th>)}
                                                <th className="text-center">Acciones</th>
                                            </tr>
                                        }
                                        { (head.length > 0) &&
                                            head.map((r,i) => {
                                                let row = head[i]
                                                return (
                                                    <tr key={i}>
                                                        {row.map((col, j) => {
                                                            let _title = '', 
                                                                _props = {}

                                                            if(typeof col === 'string' || React.isValidElement(col)){
                                                                _title = col
                                                            }
                                                            else{
                                                                const { title, ...props } = col
                                                                _title = title
                                                                _props = props
                                                            }

                                                            return (
                                                                <th key={j} {..._props} scope="col">{_title}</th>
                                                            )
                                                        })}
                                                    </tr>
                                                )
                                            })
                                        }
                                    </thead>
                                    <tbody>
                                        {filtered.map((record, i) => <CustomRecordRow record={record} fields={fields} key={i} />)}
                                    </tbody>
                                    { numEndVisibleFooterPages > 2 &&
                                        <tfoot>
                                            <tr className="footable-paging">
                                                <td colSpan="10">
                                                    <div className="footable-pagination-wrapper text-center">
                                                        <ul className="pagination justify-content-center">
                                                            <li className={`footable-page-nav ${previous && !loading ? 'pointer' : 'link-disabled'}`} data-page="first">
                                                                <button className="footable-page-link" onClick={this.first}>«</button>
                                                            </li>
                                                            <li className={`footable-page-nav ${previous && !loading ? 'pointer' : 'link-disabled'}`} data-page="prev">
                                                                <button className="footable-page-link" onClick={this.previous}>‹</button>
                                                            </li>
                                                            { numEndVisibleFooterPages > 0 ?
                                                                new Array(numEndVisibleFooterPages - numBeginVisibleFooterPages).fill(1).map((z, index) => {
                                                                    let page = Number(numBeginVisibleFooterPages) + Number(index)
                                                                    return (
                                                                        <li key={index} className={`footable-page visible ${page === currentPage ? 'active' : ''}`} data-page={page}>
                                                                            <button className="footable-page-link" onClick={() => this.setPage(page)}>{ page }</button>
                                                                        </li>
                                                                    )
                                                                })
                                                                : null
                                                            }
                                                            <li className={`footable-page-nav ${next && !loading ? 'pointer' : 'link-disabled'}`} data-page="next">
                                                                <button className="footable-page-link" onClick={this.next}>›</button>
                                                            </li>
                                                            <li className={`footable-page-nav ${next && !loading ? 'pointer' : 'link-disabled'}`} data-page="last">
                                                                <button className="footable-page-link" onClick={this.last}>»</button>
                                                            </li>
                                                        </ul>
                                                        <div className="divider"></div>
                                                        <span className="label label-info">{currentPage} de {numPages}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    }
                                </table>
                            </div>
                        </BlockUi>
                    </Col>
                </Row>
            </div>
        )
    }
}

class Documentos extends React.Component {

    state = {
        fecha_inicio : moment().startOf('month').format('YYYY-MM-DD'),
        fecha_fin : moment().format('YYYY-MM-DD')
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
    
    tipos_documentos = [
        { 
            value:'', 
            label: 'Todos' 
        },
        {
            value : 'FAC',
            label : 'Factura'
        },
        {
            value : 'NDC',
            label : 'Nota de Credito'
        }
    ]

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

    estados_electronicos = {
        'firmado' : <div><i className="cui-pencil icons font-2xl d-block" id="firmado_label"></i><UncontrolledTooltip placement="top" target="firmado_label">Firmado</UncontrolledTooltip></div>,
        'enviado_sri': <div><i className="cui-arrow-top icons font-2xl d-block" id="enviado_sri_label"></i><UncontrolledTooltip placement="top" target="enviado_sri_label">Enviado SRI</UncontrolledTooltip></div>,
        'autorizado_sri': <div><i className="cui-task icons font-2xl d-block" id="autorizado_sri_label"></i><UncontrolledTooltip placement="top" target="autorizado_sri_label">Autorizado SRI</UncontrolledTooltip></div>,
        'enviado_cliente': <div><i className="cui-envelope-letter icons font-2xl d-block" id="enviado_cliente_label"></i><UncontrolledTooltip placement="top" target="enviado_cliente_label">Correo Enviado</UncontrolledTooltip></div>,
    }

    render(){
        return (
            <ReportPage title="Listado de documentos" printButtons={false} timestamp={false}>
                <div className="row">
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-sm-5">Cooperativa</Label>
                            <div className="col-sm-7">
                                <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.state.cooperativa}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-sm-5">Localidad</Label>
                            <div className="col-sm-7">
                                <Select asyncOptions={this.optionsLocalidad} onChange={this.onChange('localidad')} value={this.state.localidad}/>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-sm-4">Fecha inicio</Label>
                            <div className="col-sm-8">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_inicio')} value={this.state.fecha_inicio} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-sm-4">Fecha fin</Label>
                            <div className="col-sm-8">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_fin')} value={this.state.fecha_fin} />
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-xl-3 col-sm-6">Tipo de documento</Label>
                            <div className="col-sm-6">
                                <Select  options={this.tipos_documentos} onChange={this.onChange('tipo_documento')} value={this.state.tipo_documento} />
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <CustomListPage
                    searchable={true}
                    searchPlaceholder="Identificacion, Apellidos, Nombres"
                    searchFields={['identificacion_cliente', 'nombre_cliente']}

                    fieldNames={['Fecha Emision', 'Tipo Documento', 'Numero', 'Persona', this.estados_electronicos['firmado'], this.estados_electronicos['enviado_sri'], this.estados_electronicos['autorizado_sri'], this.estados_electronicos['enviado_cliente']]}
                    fields={['fecha_emision', 'tipo_documento_display', 'numero', 'nombre_cliente', 'firmado', 'enviado_sri', 'autorizado_sri', 'enviado']}

                    endpoint='venta/documentos'
                    urlFront='/facturacion/documentos'
                    parameters={this.state}
                    filters={{
                        persist: true,
                        callback: (parameters) => this.setState(parameters)
                    }}
                    history={this.props.history}
                />
            </ReportPage>
        )
    }
}

export default Documentos
