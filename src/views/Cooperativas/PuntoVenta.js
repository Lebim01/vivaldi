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
        const { descripcion, puntoventa_cooperativas, localidad_nombre } = this.props
        return (
            <tr onDoubleClick={this.onRowDoubleClick.bind(this)}>
                <td>{descripcion}</td>
                <td>
                    <ul>
                        {puntoventa_cooperativas.map((r) => <li>{r.cooperativa_nombre}</li>)}
                    </ul>
                </td>
                <td>{localidad_nombre}</td>
            </tr>
        )
    }
}

class PuntoVenta extends React.Component {

    state = { data:[], filtered:[], filtro: '' }

    constructor(props){
        super(props)
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    loadList = async () => {
        let { data } = await axios.get(`${baseurl}/venta/puntoventa/`)
        if(Array.isArray(data)){
            this.setState({
                data,
                filtered : data
            })
        }
    }

    componentDidMount(){
        this.loadList()
    }

    onRowDoubleClick(id){
        this.props.history.push('/cooperativas/punto-venta/edit?id='+id)
    }

    onChange = name => (e) => {
        let value = e.target.value
        let newState = {
            [name] : value
        }
        if(name === 'filtro'){
            let compare = (v1, v2) => (v1 || '').toUpperCase().includes((v2 || '').toUpperCase())
            let compareArray = (array, name, value) => {
                for(let i in array){
                    let row = array[i]
                    if(compare(row[name], value)){
                        return true
                    }
                }
                return false
            }
            newState.filtered = this.state.data.filter((row) => compare(row.descripcion, value) || compareArray(row.puntoventa_cooperativas, 'cooperativa_nombre', value) || compare(row.localidad_nombre, value))
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
                                <CardTitle>Listado de Punto de venta</CardTitle>
                                <Row>
                                    <Col xs="12" md="6">
                                        <InputIcon placeholder="Buscar... Descripción, Cooperativa, Localidad" onChange={this.onChange('filtro')} icon={<i className="fa fa-search"></i>} />
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
                                                        <th scope="col">Descripción</th>
                                                        <th scope="col">Cooperativa</th>
                                                        <th scope="col">Localidad</th>
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

export default PuntoVenta