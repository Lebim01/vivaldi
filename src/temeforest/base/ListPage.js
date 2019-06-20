import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, InputIcon, Button } from './../../temeforest'
import axios from 'axios'
import { baseurl } from './../../utils/url'

class RecordRow extends React.Component {

    onRowDoubleClick(){
        this.props.onDoubleClick(this.props.record.id)
    }

    render(){
        const { fields, record } = this.props
        return (
            <tr key={record.id} onDoubleClick={this.onRowDoubleClick.bind(this)}>
                {fields.map( (field) => {
                    return <td key={field}>{record[field]}</td>
                })}
            </tr>
        )
    }
}


class ListPage extends React.Component {

    state = { data:[], filtered : [] }

    constructor(props){
        super(props)
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this)
        this.onFilterChange = this.onFilterChange.bind(this)
    }

    loadList = async () => {
        let { data } = await axios.get(`${baseurl}/${this.props.url}/`)
        this.setState({
            data,
            filtered : data
        })
    }

    componentDidMount(){
        this.loadList()
    }

    onRowDoubleClick(id){
        this.props.history.push(`/${this.props.menu}/${this.props.submenu}/edit?id=${id}`)
    }

    onFilterChange = name => (e) => {
        const { searchFields } = this.props

        let value = e.target.value
        let newState = {}

        let compare = (v1, v2) => (v1 || '').toUpperCase().includes((v2 || '').toUpperCase())
        newState.filtered = this.state.data.filter((record) => searchFields.some((field) => compare(record[field], value)))

        this.setState({
            ...newState
        })
    }

    render(){
        const { title, searchPlaceholder, fieldNames, fields } = this.props
        const { filtered } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Listado de { title }</CardTitle>
                                <Row>
                                    <Col xs="12" md="6">
                                        <InputIcon placeholder={`Buscar... ${searchPlaceholder}`} onChange={this.onFilterChange()} icon={<i className="fa fa-search"></i>} />
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Button style={{'float': 'right'}} onClick={() => this.onRowDoubleClick('')}>
                                            <i className="fa fa-plus"></i>
                                        </Button>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col xs="12" md="12">
                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped">
                                                <thead>
                                                    <tr>
                                                        {fieldNames.map((fieldName) => <th scope="col">{fieldName}</th>)}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[{id:1,descripcion:'ruta 1'}].map((record, i) => <RecordRow record={record} fields={fields} key={i} onDoubleClick={() => this.onRowDoubleClick(record.id)} />)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ListPage
