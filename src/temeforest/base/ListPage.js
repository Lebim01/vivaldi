import React from 'react'
import { Col, Row } from 'reactstrap'
import { CardTitle, InputIcon, Button, Permission } from 'temeforest'
import { checkPermission } from 'temeforest/base/Permission'
import { baseurl, objectToUrl } from 'utils/url'
import { htmlToXlsById } from 'utils/exportData'

import axios from 'axios'

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

// numero de filas por pagina
const RowsPerPage = 25
// numero limite de paginas visibles en el footer
const NumVisibleFooterPages = 5

const DELAY_SEARCH_INPUT = 500

class RecordRow extends React.Component {

    onRowDoubleClick = () => {
        if (this.props.onDoubleClick){
            this.props.onDoubleClick(this.props.record.id)
        }     
    }

    render(){
        const { fields, record } = this.props

        return (
            <tr key={record.id} onDoubleClick={this.onRowDoubleClick}>
                {fields.map((field, i) => {
                    const className = typeof this.props.tdBodyClass === 'function' ? this.props.tdBodyClass(record) : this.props.tdBodyClass
                    return (
                        <td className={className} key={i}>
                            {typeof field === 'function' ? field(record) : record[field]}
                        </td>
                    )
                })}
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
        numEndVisibleFooterPages : 1
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

    loadList = async (parameters = {}) => {
        if(this.props.endpoint){        
            this.setState({
                loading: true
            })
            const { currentPage, search } = this.state

            try {
                const { data } = await axios.get(`${baseurl}/${this.props.endpoint}/${objectToUrl({ ...parameters, searchtext: search, page : currentPage })}`, { ...this.props.config })
                    let _results = [], 
                    _count = 0, 
                    _next = null, 
                    _previous = null,
                    _numPages = 1

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

    componentWillReceiveProps(props){
        this.loadList(props.parameters)
    }

    componentDidMount(){
        this.setPage(1)
    }

    onRowDoubleClick = (id, row) => {
        if(checkPermission(`change_${this.props.key_permission}`)){
            if(this.props.onRowDoubleClick){
                this.props.onRowDoubleClick(row)
            }
            else if(this.props.urlFront && this.props.redirect){
                this.props.history.push(`/${this.props.urlFront}/edit?id=${id}`)
            }
        }
    }

    onFilterChange = (e) => {
        clearTimeout(this.timer)
        this.timer = setTimeout(this.loadList, DELAY_SEARCH_INPUT)

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

    setPage = (page) => {
        const { currentPage } = this.state
        if(page !== currentPage){
            const { parameters } = this.props
            this.setState({
                currentPage : page
            }, () => {
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

    render(){
        const { title, searchPlaceholder, fieldNames, fields, searchable, head, exportExcel } = this.props
        const { filtered, numPages, next, previous, currentPage, numBeginVisibleFooterPages, numEndVisibleFooterPages, search, loading } = this.state

        return (
            <div>
                { title && <CardTitle>{ title }</CardTitle> }
                { (searchable || exportExcel) &&
                    <Row>
                        <Col xs="12" md="6">
                            { searchable &&
                                <InputIcon placeholder={`Buscar... ${searchPlaceholder}`} onChange={this.onFilterChange} icon={<i className="fa fa-search"></i>} value={search} delay={1000} />   
                            }
                        </Col>
                        <Col xs="12" md="6" className="text-right">
                            { searchable &&
                                <Permission key_permission={`add_${this.props.key_permission}`}>
                                    <Button style={{'float': 'right'}} onClick={() => this.onRowDoubleClick('', {})}>
                                        <i className="fa fa-plus"></i>
                                    </Button>
                                </Permission>
                            }
                            
                            { exportExcel &&
                                <Button onClick={this.exportExcel} title="Exportar excel">
                                    <i className="fas fa-file-excel"></i>
                                </Button>
                            }
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
                                                {fieldNames.map((fieldName, i) => <th className={this.props.headerClass} key={i} scope="col">{fieldName}</th>)}
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
                                        {filtered.map((record, i) => <RecordRow tdBodyClass={this.props.tdBodyClass} record={record} fields={fields} key={i} onDoubleClick={() => this.onRowDoubleClick(record.id, record)} />)}
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
    fieldNames : [],
    head : [],
    config : {},
    headerClass : '',
    tdBodyClass : ''
}

export {ListPage, RecordRow}
