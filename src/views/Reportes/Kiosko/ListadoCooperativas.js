import React from 'react'
import { Button } from 'temeforest'
import { Row, Col } from 'reactstrap'

class ListadoCooperativas extends React.Component {
    render(){
        const { cooperativas } = this.props

        return (
            <>
                Seleccionar cooperativa
                <Row>
                    { cooperativas.map((row, i) => {
                        return (
                            <Col xs="2" style={{padding: 10}} className="text-center">
                                <Button className="btn-lg" outline style={{ width: 150, height: 150, borderRadius: 10 }} onClick={() => this.props.select(row.cooperativa) }>
                                    {row.cooperativa_nombre}
                                </Button>
                            </Col>
                        )
                    })}
                </Row>
            </>
        )
    }
}

export default ListadoCooperativas
