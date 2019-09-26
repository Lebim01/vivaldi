import React from 'react'
import { Button } from 'temeforest'
import { Row, Col } from 'reactstrap'

class ListadoCooperativas extends React.Component {
    render(){
        const { cooperativas } = this.props

        const _cooperativas_row_num = Math.ceil(cooperativas.length / 6)
        let _cooperativas_row = []
        for(let i = 1; i <= _cooperativas_row_num; i++){
            _cooperativas_row.push(i)
        }

        return (
            <>
                { _cooperativas_row.map((row, i) => {
                    const [ cp1, cp2, cp3, cp4, cp5, cp6 ] = cooperativas.slice(i*6, i*6+6)
                    return (
                        <Row>
                            { cp1 &&
                                <Col xs="2" style={{padding: 10}} className="text-center">
                                    <Button className="btn-lg" outline style={{ width: 150, height: 150, borderRadius: 10 }} onClick={() => this.props.select(cp1.id) }>
                                        {cp1.nombre}
                                    </Button>
                                </Col>
                            }
                            { cp2 &&
                                <Col xs="2" style={{padding: 10}} className="text-center">
                                    <Button className="btn-lg" outline style={{ width: 150, height: 150, borderRadius: 10 }} onClick={() => this.props.select(cp2.id) }>
                                        {cp2.nombre}
                                    </Button>
                                </Col>
                            }
                            { cp3 &&
                                <Col xs="2" style={{padding: 10}} className="text-center">
                                    <Button className="btn-lg" outline style={{ width: 150, height: 150, borderRadius: 10 }} onClick={() => this.props.select(cp3.id) }>
                                        {cp3.nombre}
                                    </Button>
                                </Col>
                            }
                            { cp4 &&
                                <Col xs="2" style={{padding: 10}} className="text-center">
                                    <Button className="btn-lg" outline style={{ width: 150, height: 150, borderRadius: 10 }} onClick={() => this.props.select(cp4.id) }>
                                        {cp4.nombre}
                                    </Button>
                                </Col>
                            }
                            { cp5 &&
                                <Col xs="2" style={{padding: 10}} className="text-center">
                                    <Button className="btn-lg" outline style={{ width: 150, height: 150, borderRadius: 10 }} onClick={() => this.props.select(cp5.id) }>
                                        {cp5.nombre}
                                    </Button>
                                </Col>
                            }
                            { cp6 &&
                                <Col xs="2" style={{padding: 10}} className="text-center">
                                    <Button className="btn-lg" outline style={{ width: 150, height: 150, borderRadius: 10 }} onClick={() => this.props.select(cp6.id) }>
                                        {cp6.nombre}
                                    </Button>
                                </Col>
                            }
                        </Row>
                    )
                })}
            </>
        )
    }
}

export default ListadoCooperativas