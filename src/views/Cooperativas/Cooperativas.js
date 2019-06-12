import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, InputIcon, Button } from './../../temeforest'
import axios from 'axios'
import { baseurl } from './../../utils/url'

class _Row extends React.Component {

    onRowDoubleClick(){
        if(this.props.onDoubleClick){
            this.props.onDoubleClick(this.props.id)
        }
    }

    render(){
        const { nombre, establecimiento } = this.props
        return (
            <tr onDoubleClick={this.onRowDoubleClick.bind(this)}>
                <td>{nombre}</td>
                <td>{establecimiento}</td>
            </tr>
        )
    }
}

class Cooperativas extends React.Component {

    state = { data:[], filtered : [] }

    constructor(props){
        super(props)
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    loadList = async () => {
        let { data } = await axios.get(`${baseurl}/cooperativa/`)
        this.setState({
            data,
            filtered : data
        })
    }

    componentDidMount(){
        this.loadList()
    }

    onRowDoubleClick(id){
        this.props.history.push('/cooperativas/cooperativas/edit?id='+id)
    }

    onChange = name => (e) => {
        let value = e.target.value
        let newState = {
            [name] : value
        }
        if(name === 'filtro'){
            let compare = (v1, v2) => (v1 || '').toUpperCase().includes((v2 || '').toUpperCase())
            newState.filtered = this.state.data.filter((row) => compare(row.nombre, value) || compare(row.establecimiento, value))
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
                                <CardTitle>Listado de Cooperativas</CardTitle>
                                <Row>
                                    <Col xs="12" md="6">
                                        <InputIcon placeholder="Buscar... Nombre, Gremio" onChange={this.onChange('filtro')} icon={<i className="fa fa-search"></i>} />
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
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Gremio</th>
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

export default Cooperativas