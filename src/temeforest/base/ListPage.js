import React from 'react'
import { Col, Row } from 'reactstrap'
import { CardTitle, InputIcon, Button, Permission } from 'temeforest'
import { checkPermission } from 'temeforest/base/Permission'
import { baseurl, objectToUrl, getAllParameters } from 'utils/url'
import { htmlToXlsById, printHtml } from 'utils/exportData'
import Swal from 'sweetalert2'
import _ from 'lodash'
import axios from 'axios'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import './ListPage.css'
import ReactDOMServer from "react-dom/server";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import FileDownloadW from 'assets/svg/file-download-solid-white.svg'

import { Provider } from 'react-redux'
import store from 'store/auth'

const CancelToken = axios.CancelToken;
let cancel;

// numero de filas por pagina
const RowsPerPage = 25
// numero limite de paginas visibles en el footer
const NumVisibleFooterPages = 5

const DELAY_SEARCH_INPUT = 500

class RecordRow extends React.Component {

    state = {
        randomid : ''
    }

    componentDidMount(){
        this.setState({
            randomid: `#${Math.random()}-${this.props.record.id}`
        })
    }

    onRowDoubleClick = () => {
        if (this.props.onDoubleClick){
            this.props.onDoubleClick(this.props.record.id)
        }
    }

    onRowRightClick = (e) => {
        //document.getElementById('t1').innerHTML = '  Abrir en nueva pestaña';
        e.preventDefault()
        //alert("Se abrirá en una nueva pestaña");
        this.props.onDoubleClick(this.props.record.id, {}, true)
        
    }

    render(){
        const { fields, record, context, showStatus } = this.props
        
         return (
            <tr key={record.id} onDoubleClick={this.onRowDoubleClick}>
                {fields.map((field, i) => {
                    const className = typeof this.props.tdBodyClass === 'function' ? this.props.tdBodyClass(record) : this.props.tdBodyClass
                    return (
                        <td className={className} key={i}>
                            <ContextMenuTrigger id={this.state.randomid} key={record.id} style={{ width: '100%', height: '100%' }}>
                                {typeof field === 'function' ? field(record, context) : record[field]}
                            </ContextMenuTrigger>
                        </td>
                    )
                })}
                { showStatus && <td className={record.className}>{record['is_active'] ? 'Activo' : 'Inactivo'}</td> }
                <ContextMenu id={this.state.randomid} style={{ backgroundColor: '#eee', padding: 15 }}>
                    <MenuItem onClick={this.onRowRightClick}>
                        <label className="text-info" style={{cursor: 'pointer'}}>
                            Abrir nueva pestaña
                        </label>
                    </MenuItem>
                </ContextMenu>
                
            </tr>
        )
    }
}

class ListPage extends React.Component {

    state = { 
        // cadena para buscar
        search: '',
        loading : false,
        // resultados completos de la peticion
        results:[], 
        // resultados filtrados
        filtered : [], 
        // numero de pagina en la que esta posicionado
        currentPage : null, 
        // numero de paginas en total que hay en el catalogo
        numPages : 1,
        // 
        numBeginVisibleFooterPages : 1,
        numEndVisibleFooterPages : 1,
        cancelRequest : null,
        //
        loadingPersistedFilters: true
    }

    componentDidMount(){
        this.setPage(1)
        this.loadFilters()
    }

    loadFilters = () => {
        const { query, page, searchtext, ...parameters } = getAllParameters()

        if(page){
            this.setPage(Number(page), !this.props.filters)
        }

        if(searchtext){
            this.setState({
                search :  searchtext
            })
        }

        if(this.props.filters.persist){            
            if(parameters && this.props.filters.callback){
                this.props.filters.callback(parameters)
            }
        }

        if(query){
            this.setState({
                search : query
            })
        }
    }

    getVisibleFooterPages = () => {
        const { currentPage, numPages } = this.state
        let numBeginVisibleFooterPages = 1,
            numEndVisibleFooterPages = 1

        if(currentPage - NumVisibleFooterPages < 0) {
            numBeginVisibleFooterPages = 1
        }
        else {
            numBeginVisibleFooterPages = currentPage - Math.floor(NumVisibleFooterPages/2)
        }

        if(numPages <= 5) {
            numEndVisibleFooterPages = numPages+1
        }
        else if(numPages >= numBeginVisibleFooterPages + NumVisibleFooterPages) {
            numEndVisibleFooterPages = numBeginVisibleFooterPages + NumVisibleFooterPages
        }
        else {
            numEndVisibleFooterPages = numPages
        }

        this.setState({
            numBeginVisibleFooterPages,
            numEndVisibleFooterPages
        })
    }

    loadList = async (parameters = {}, autoLoad = this.props.autoLoad) => {
        if(autoLoad){
            if(this.props.endpoint){        
                this.setState({
                    loading: true
                })
                const { currentPage, search } = this.state

                try {
                    cancel && cancel()

                    const { data } = await axios.get(
                        `${baseurl}/${this.props.endpoint}/${objectToUrl({ ...parameters, searchtext: search, page : currentPage, full: 1})}`,
                        { ...this.props.config, 
                            cancelToken: new CancelToken((c) => {
                                cancel = c
                            })
                        }
                    )

                    let _results = [], 
                    _count = 0, 
                    _next = null, 
                    _previous = null,
                    _numPages = 1
                    cancel = undefined

                    if(Array.isArray(data)){
                        _results = data
                        _count = data.length
                    }else{
                        const { results, count, next, previous } = data
                        _results = results
                        _count = count
                        _next = next
                        _previous = previous
                        _numPages = Math.ceil(_count / RowsPerPage)
                    }
                    
                    this.setState({
                        results : _results,
                        filtered : _results,
                        count : _count,
                        numPages : _numPages,
                        next : _next,
                        previous : _previous,
                        loading: false
                    }, this.getVisibleFooterPages)
                }catch(e){
                    console.error(e)
                }
            }
            else {
                this.setState({
                    filtered : this.props.data
                })
            }
        }
    }

    refresh = () => {
        this.loadList(this.props.parameters, true)
    }

    componentDidUpdate(prevProps, prevState){
        if(!_.isEqual(prevProps, this.props) || prevState.search !== this.state.search){
            console.log('1')
            if(!_.isEqual(prevProps.parameters, this.props.parameters) || 
                prevState.currentPage !== this.state.currentPage ||
                prevState.search !== this.state.search
            ){
                console.log('2')
                if(!_.isEqual(prevProps.parameters, this.props.parameters) && !this.state.loadingPersistedFilters){
                    this.setPage(1, false)
                }
                if(this.state.loadingPersistedFilters){
                    this.setState({
                        loadingPersistedFilters: false
                    })
                }
                this.replaceUrlParams()
            }
            this.loadList(this.props.parameters)
        }
    }

    replaceUrlParams = () => {
        const { currentPage: page, search: searchtext } = this.state
        let search = objectToUrl({ ...this.props.parameters, searchtext, page })
        this.props.history.replace({  
            search
        })
    }

    onRowDoubleClick = (id, row, newWindow = false) => {
        if(checkPermission(`change_${this.props.key_permission}`)){
            if(this.props.onRowDoubleClick){
                this.props.onRowDoubleClick(row)
            }
            else if(this.props.urlFront && this.props.redirect){
                
                if(newWindow){
                    window.open(`#/${this.props.urlFront}/edit/?id=${id}`, '_blank')
                }else{   
                    const { currentPage: page, search: searchtext } = this.state
                    this.props.history.push({
                        pathname : `/${this.props.urlFront}/edit/`,
                        search : objectToUrl({ id, page, searchtext, ...this.props.parameters })
                    })
                }
            }
        }
    }

    onFilterChange = (e) => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => this.loadList(this.props.parameters), DELAY_SEARCH_INPUT)

        let value = e.target.value

        this.setState({
            currentPage : 1,
            search : value
        })
    }

    next = (e) => {
        e.preventDefault()
        const { currentPage, next, loading } = this.state
        if(next && !loading){
            let nextPage = currentPage + 1
            this.setPage(nextPage)
        }
    }

    previous = (e) => {
        e.preventDefault()
        const { currentPage, previous, loading } = this.state
        if(previous && !loading){
            let nextPage = currentPage - 1
            this.setPage(nextPage)
        }
    }

    first = (e) => {
        e.preventDefault()
        const { currentPage, loading } = this.state
        if(currentPage > 1 && !loading){
            this.setPage(1)
        }
    }

    last = (e) => {
        e.preventDefault()
        const { numPages, currentPage, loading } = this.state
        if(currentPage < numPages && !loading){
            this.setPage(numPages)
        }
    }

    setPage = (page, loadList = true) => {
        const { currentPage } = this.state
        if(page !== currentPage){
            const { parameters } = this.props
            this.setState({
                currentPage : page
            }, () => {
                this.replaceUrlParams()
                if(loadList)
                    this.loadList({ ...parameters, page })
            })
        }
    }

    exportExcel = () => {
        const { exportExcel } = this.props
        if(typeof exportExcel === 'function'){
            exportExcel(this.state.filtered)
        }else{
            const { id } = this.props
            if(id){
                htmlToXlsById(id)
            }
        }
    }

    exportExcelAll = async () => {
        const { parameters } = this.props
        const { search } = this.state

        // All data ?no_page
        
        try {
            const { data } = await axios.get(
                `${baseurl}/${this.props.endpoint}/${objectToUrl({ ...parameters, searchtext: search, full: 1, page_size: 0})}`,
                this.props.configs
            
            )
        
            const html = `
                <table id='to-export' style='display:none;'>
                    ${ReactDOMServer.renderToString(this.renderHeader())}
                    ${ReactDOMServer.renderToString(
                        <Provider store={store}>
                            {this.renderBody(data)}
                        </Provider>
                    )}
                </table>
            `
            document.body.insertAdjacentHTML('afterend', html)
            htmlToXlsById('to-export')
        }
        catch(cooperativa) {
            if (cooperativa.response.status==400) {
                Swal.fire('', 
                    ` ${cooperativa.response.data.cooperativa}`, 'error'
                )
            }
        }        
    }

    imprimirPantalla = () => {
        const { imprimirPantalla } = this.props
        if(typeof imprimirPantalla === 'function'){
            imprimirPantalla(this.state.filtered)
        }else{
            window.print()
        }
    }

    printAll = async () => {
        const { parameters } = this.props
        const { search } = this.state

        try {
            // All data ?no_page
            const { data } = await axios.get(
                `${baseurl}/${this.props.endpoint}/${objectToUrl({ ...parameters, searchtext: search, full: 1, page_size: 0})}`,
                this.props.config
            )

            const html = `
                <table id='to-export' style=''>
                    ${ReactDOMServer.renderToString(this.renderHeader())}
                    ${ReactDOMServer.renderToString(
                        <Provider store={store}>
                            {this.renderBody(data)}
                        </Provider>
                    )}
                </table>
            `
            document.body.insertAdjacentHTML('afterend', html)
            printHtml(html)
        }
        catch(cooperativa) {
            if (cooperativa.response.status==400) {
                Swal.fire('', 
                    ` ${cooperativa.response.data.cooperativa}`, 'error'
                )  
            }
        }
    }

    renderActionsButtons = () => {
        const { searchable, exportExcel, imprimirPantalla, actionsButtons } = this.props
        return (
            <div className="pull-right">
                { searchable &&
                    <Permission key_permission={`add_${this.props.key_permission}`}>
                        <Button onClick={() => this.onRowDoubleClick('', {})}>
                            <i className="fa fa-plus"></i>
                        </Button>
                    </Permission>
                }
                {' '}
                { exportExcel &&
                    <Button onClick={this.exportExcel} title="Exportar excel, actual" style={{color: 'white'}}>
                        <img src={FileDownloadW} height="14" />
                    </Button>
                }
                {' '}
                { exportExcel &&
                    <Button onClick={this.exportExcelAll} title="Exportar excel, todos" style={{color: 'white'}}>
                        <img src={FileDownloadW} height="14" />{' '}
                        <i className="fas fa-sort-numeric-down" />
                    </Button>
                }
                {' '}
                { imprimirPantalla &&
                    <Button onClick={this.imprimirPantalla} title="Imprimir Pantalla">
                        <i className="fa fa-print"/>
                    </Button>
                }
                {' '}
                { imprimirPantalla &&
                    <Button onClick={this.printAll} title="Imprimir Pantalla, todos">
                        <i className="fa fa-print"/>{' '}
                        <i className="fas fa-sort-numeric-down"/>
                    </Button>
                }
                {' '}
                { actionsButtons.map(element => (
                    <>
                        {' '}
                        {element}
                    </>
                )) }
            </div>
        )
    }

    renderHeader = () => {
        const { fieldNames, head } = this.props
        return (
            <thead>
                { (fieldNames.length > 0) &&
                    <tr>
                        {fieldNames.map((fieldName, i) => <th className={this.props.headerClass} key={i} scope="col">{fieldName}</th>)}
                        {this.props.showStatus && <th scope="col">Estado</th>}
                    </tr>
                }
                { (head.length > 0) &&
                    head.map((r,i) => {
                        let row = head[i]
                        return (
                            <tr key={i} style={row.style}>
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
        )
    }

    renderBody = (data) => {
        const { fields } = this.props
        const context  = {
            onRowDoubleClick : this.onRowDoubleClick
        }
        return (
            <tbody>
                {data.map((record, i) => 
                    <RecordRow 
                        tdBodyClass={this.props.tdBodyClass} 
                        record={record} 
                        context={context} 
                        fields={fields} 
                        key={i} 
                        showStatus={this.props.showStatus}
                        onDoubleClick={(_id, newWindow) => this.onRowDoubleClick(record.id, record, newWindow)} 
                    />
                )}
            </tbody>
        )
    }

    render(){
        const { title, searchPlaceholder, searchable, exportExcel, imprimirPantalla } = this.props
        const { filtered, numPages, next, previous, currentPage, numBeginVisibleFooterPages, numEndVisibleFooterPages, search, loading } = this.state

        return (
            <div>
                { title && 
                    <CardTitle>
                        { title }
                        { this.renderActionsButtons() }
                    </CardTitle> 
                }
                { this.props.filtersZone ? <><br/>{this.props.filtersZone}</> : null }
                { (searchable || exportExcel || imprimirPantalla) &&
                    <Row>
                        <Col xs="12" md="6">
                            { searchable &&
                                <InputIcon placeholder={`Buscar... ${searchPlaceholder}`} onChange={this.onFilterChange} icon={<i className="fa fa-search"></i>} value={search} delay={1000} />   
                            }
                        </Col>
                    </Row>
                }
                <br/>
                <Row>
                    <Col xs="12" md="12">
                        <BlockUi tag="div" blocking={this.state.loading}>
                            <div className="table-responsive">
                                <table className="table table-sm table-hover table-striped footable footable-5 footable-paging footable-paging-center" id={this.props.id}>
                                    { this.renderHeader() }
                                    { this.renderBody(filtered) }
                                    { numEndVisibleFooterPages >= 2 &&
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
                                                        <div className="divider"></div>
                                                        <span className="text-muted">Registros totales: {this.state.count}</span>
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

ListPage.defaultProps = {
    parameters : {},
    redirect: true,
    actionsButtons: [],
    showStatus: false,
    filters : {
        persist: true,
        callback : () => {

        },
    },

    fieldNames : [],
    head : [],
    config : {},
    headerClass : '',
    tdBodyClass : '',
    autoLoad : true
}

export {ListPage, RecordRow}