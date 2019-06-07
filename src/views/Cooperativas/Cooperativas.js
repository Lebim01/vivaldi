import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, InputIcon, Button } from './../../temeforest'

const data = [
    {id : 1, nombre : 'Cooperativa 1', gremio : 'FTTG'},
    {id : 2, nombre : 'Cooperativa 2', gremio : 'Unión de Cooperativas'},
    {id : 3, nombre : 'Cooperativa 3', gremio : 'FTTG'},
]

class _Row extends React.Component {

    onRowDoubleClick(){
        if(this.props.onDoubleClick){
            this.props.onDoubleClick(this.props.id)
        }
    }

    render(){
        const { nombre, gremio } = this.props
        return (
            <tr onDoubleClick={this.onRowDoubleClick.bind(this)}>
                <td>{nombre}</td>
                <td>{gremio}</td>
            </tr>
        )
    }
}

class Cooperativas extends React.Component {

    constructor(props){
        super(props)
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this)
    }

    onRowDoubleClick(id){
        this.props.history.push('/cooperativas/cooperativas/edit?id='+id)
    }

    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Listado de Cooperativas</CardTitle>
                                <Row>
                                    <Col xs="12" md="6">
                                        <InputIcon placeholder="Buscar... Nombre, Gremio" icon={<i className="fa fa-search"></i>} />
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
                                            <table className="table table-hover table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Gremio</th>
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

export default Cooperativas