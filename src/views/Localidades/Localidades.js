import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, InputIcon, Button } from './../../temeforest'

const data = [
    {nombre : 'Terminal 1', ciudad : 'Guayaquil', puertas: 6, andenes : 52},
    {nombre : 'Terminal 2', ciudad : 'Quito', puertas: 7, andenes : 64},
    {nombre : 'Terminal 3', ciudad : 'Cuenca', puertas: 5, andenes : 44},
    {nombre : 'Terminal 4', ciudad : 'Ambato', puertas: 5, andenes : 65},
]

class RowLocalidades extends React.Component {
    render(){
        const { nombre, ciudad, puertas, andenes } = this.props
        return (
            <tr>
                <td>{nombre}</td>
                <td>{ciudad}</td>
                <td>{puertas}</td>
                <td>{andenes}</td>
            </tr>
        )
    }
}

class Localidades extends React.Component {
    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Listado de Localidades</CardTitle>
                                <Row>
                                    <Col xs="12" md="6">
                                        <InputIcon placeholder="Buscar... Nombre, Ciudad" icon={<i className="fa fa-search"></i>} />
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
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Ciudad</th>
                                                        <th scope="col">Puertas</th>
                                                        <th scope="col"># Andenes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((row, i) => <RowLocalidades {...row} key={i} />)}
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

export default Localidades