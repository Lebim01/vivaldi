import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, InputIcon, Button } from './../../temeforest'

const data = [
    {rol : 'Boletero', descripcion : ''},
    {rol : 'Financiero', descripcion : ''},
    {rol : 'Recaudaciones', descripcion : ''},
    {rol : 'Gerencia', descripcion : ''},
]

class _Row extends React.Component {

    onRowDoubleClick(){
        if(this.props.onDoubleClick){
            this.props.onDoubleClick()
        }
    }

    render(){
        const { rol, descripcion } = this.props
        return (
            <tr onDoubleClick={this.onRowDoubleClick.bind(this)}>
                <td>{rol}</td>
                <td>{descripcion}</td>
            </tr>
        )
    }
}

class Roles extends React.Component {

    constructor(props){
        super(props)
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this)
    }

    onRowDoubleClick(){
        this.props.history.push('/usuarios/roles/edit')
    }

    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Listado de Roles</CardTitle>
                                <Row>
                                    <Col xs="12" md="6">
                                        <InputIcon placeholder="Buscar... Rol, Descripción" icon={<i className="fa fa-search"></i>} />
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
                                                        <th scope="col">Rol</th>
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

export default Roles