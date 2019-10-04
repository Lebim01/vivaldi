import React from 'react'
import { Button } from 'temeforest'
import { Row, Col } from 'reactstrap'

class ListadoLocalidades extends React.Component {
    render(){
        const { localidades } = this.props

        return (
            <>
                Seleccione localidad
                <Row>
                    { localidades.map((row, i) => {
                        return (
                            <Col xs="2" style={{padding: 10}} className="text-center">
                                <Button className="btn-lg" outline style={{ width: 150, height: 150, borderRadius: 10 }} onClick={() => this.props.select(row.id) }>
                                    {row.nombre}
                                </Button>
                            </Col>
                        )
                    })}
                </Row>
            </>
        )
    }
}

export default ListadoLocalidades
