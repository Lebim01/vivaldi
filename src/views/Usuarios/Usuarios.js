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
        const { username, last_name, first_name, cooperativas } = this.props
        return (
            <tr onDoubleClick={this.onRowDoubleClick.bind(this)}>
                <td>{username}</td>
                <td>{last_name}</td>
                <td>{first_name}</td>
                <td>
                    <ul>
                        { (cooperativas || []).map((c) => <li>{c}</li> ) }
                    </ul>
                </td>
            </tr>
        )
    }
}

class Usuarios extends React.Component {

    state = { data:[], filtered : [], filtro : '' }

    constructor(props){
        super(props)
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this)
    }

    loadList = async () => {
        let { data } = await axios.get(`${baseurl}/usuario/`)
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
        this.props.history.push('/usuarios/usuarios/edit?id='+id)
    }

    onChange = name => (e) => {
        let value = e.target.value
        let newState = {
            [name] : value
        }
        if(name === 'filtro'){
            let compare = (v1, v2) => (v1 || '').toUpperCase().includes((v2 || '').toUpperCase())
            newState.filtered = this.state.data.filter((row) => compare(row.usuario, value) || compare(row.nombre, value))
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
                                <CardTitle>Listado de Usuarios</CardTitle>
                                <Row>
                                    <Col xs="12" md="6">
                                        <InputIcon placeholder="Buscar... Usuario, Nombre, Cooperativa" icon={<i className="fa fa-search"></i>} onChange={this.onChange('filtro')} />
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
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Usuario</th>
                                                        <th scope="col">Apellidos</th>
                                                        <th scope="col">Nombres</th>
                                                        <th scope="col">Cooperativas</th>
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

export default Usuarios