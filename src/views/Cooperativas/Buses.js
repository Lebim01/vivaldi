import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, InputIcon, Button } from './../../temeforest'
import axios from './../../utils/axios'
import { baseurl } from './../../utils/url'

class _Row extends React.Component {

    onRowDoubleClick(){
        if(this.props.onDoubleClick){
            this.props.onDoubleClick(this.props.id)
        }
    }

    render(){
        const { cooperativa, placa, disco } = this.props
        return (
            <tr onDoubleClick={this.onRowDoubleClick.bind(this)}>
                <td>{cooperativa}</td>
                <td>{placa}</td>
                <td>{disco}</td>
            </tr>
        )
    }
}

class Buses extends React.Component {

    state = { data:[], filtered: [], filtro : '' }

    constructor(props){
        super(props)
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    loadList = async () => {
        let { data } = await axios.get(`${baseurl}/bus/`)
        let filtered = data
        this.setState({
            data,
            filtered
        })
    }

    componentDidMount(){
        this.loadList()
    }

    onRowDoubleClick(id){
        this.props.history.push('/cooperativas/buses/edit?id='+id)
    }

    onChange = name => (e) => {
        let value = e.target.value
        let newState = {
            [name] : value
        }
        if(name === 'filtro'){
            let compare = (v1, v2) => (v1 || '').toUpperCase().includes((v2 || '').toUpperCase())
            newState.filtered = this.state.data.filter((row) => compare(row.placa, value) || compare(row.disco, value) || compare(row.cooperativa, value))
        }
        this.setState({
            ...newState
        })
    }

    render(){
        const { filtered } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Listado de Buses</CardTitle>
                                <Row>
                                    <Col xs="12" md="6">
                                        <InputIcon placeholder="Buscar... Placa, Disco, Cooperativa" icon={<i className="fa fa-search"></i>} onChange={this.onChange('filtro')} />
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
                                                        <th scope="col">Cooperativa</th>
                                                        <th scope="col">Placa</th>
                                                        <th scope="col">Disco</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filtered.map((row, i) => <_Row {...row} key={i} onDoubleClick={this.onRowDoubleClick} />)}
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

export default Buses