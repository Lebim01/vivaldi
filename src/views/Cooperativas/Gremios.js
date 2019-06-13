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
        const { nombre, descripcion } = this.props
        return (
            <tr onDoubleClick={this.onRowDoubleClick.bind(this)}>
                <td>{nombre}</td>
                <td>{descripcion}</td>
            </tr>
        )
    }
}

class Gremios extends React.Component {

    state = { data:[] }

    constructor(props){
        super(props)
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this)
    }

    loadList = async () => {
        let { data } = await axios.get(`${baseurl}/gremio/`)    
        this.setState({
            data
        })
    }

    componentDidMount(){
        this.loadList()
    }

    onRowDoubleClick(id){
        this.props.history.push('/cooperativas/gremios/edit?id='+id)
    }

    render(){
        const { data } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Listado de Gremios</CardTitle>
                                <Row>
                                    <Col xs="12" md="6">
                                        <InputIcon placeholder="Buscar... Nombre" icon={<i className="fa fa-search"></i>} />
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Button style={{'float': 'right'}} onClick={ () => this.onRowDoubleClick('')}>
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
                                                        <th scope="col">Descripción</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((row, i) => <_Row {...row} key={i} onDoubleClick={this.onRowDoubleClick} />)}
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

export default Gremios