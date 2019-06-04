import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, InputIcon, Button } from './../../temeforest'

const data = [
    {descripcion : '1', ip : '192.168.0.100', localidad: 'TTG'},
    {descripcion : '2', ip : '192.168.0.101', localidad: 'TTG'},
    {descripcion : '100', ip : '192.168.0.102', localidad: 'TTMP'},
]

class _Row extends React.Component {
    render(){
        const { descripcion, ip, localidad } = this.props
        return (
            <tr>
                <td>{descripcion}</td>
                <td>{ip}</td>
                <td>{localidad}</td>
            </tr>
        )
    }
}

class Silos extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Traffic Control</CardTitle>
                                <Row>
                                    <Col xs="12" md="6">
                                        <InputIcon placeholder="Buscar... Descripción, IP, Localidad" icon={<i className="fa fa-search"></i>} />
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
                                                        <th scope="col">Descripción</th>
                                                        <th scope="col">Dirección IP</th>
                                                        <th scope="col">Localidad</th>
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

export default Silos