import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, InputIcon, Button } from './../../temeforest'

const data = [
    {usuario : 'usuario1', nombre : 'Joel', cooperativas : ['Cooperativa 1']},
    {usuario : 'usuario2', nombre : 'Juan', cooperativas : ['Cooperativa 2']},
    {usuario : 'usuario3', nombre : 'Julio', cooperativas : ['Cooperativa 3']},
    {usuario : 'usuario4', nombre : 'Javier', cooperativas : ['Cooperativa 1', 'Cooperativa 2']},
]

class _Row extends React.Component {
    render(){
        const { usuario, nombre, cooperativas } = this.props
        return (
            <tr>
                <td>{usuario}</td>
                <td>{nombre}</td>
                <td>
                    <ul>
                        { cooperativas.map((c) => <li>{c}</li> ) }
                    </ul>
                </td>
            </tr>
        )
    }
}

class Usuarios extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Listado de Usuarios</CardTitle>
                                <Row>
                                    <Col xs="12" md="6">
                                        <InputIcon placeholder="Buscar... Usuario, Nombre, Cooperativa" icon={<i className="fa fa-search"></i>} />
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Button style={{'float': 'right'}}>
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
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Cooperativas</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((row, i) => <_Row {...row} key={i} />)}
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