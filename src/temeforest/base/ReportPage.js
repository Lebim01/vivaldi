import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button } from './../../temeforest'
import store from './../../store/auth'
import moment from 'moment'

const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')

const { user_info } = store.getState()

class ReportPage extends React.Component {
    render(){
        const { title } = this.props
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                { title && <CardTitle>{title}</CardTitle> }
                                <CardBody>
                                    <br/>
                                    {this.props.children}
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-12 text-center">
                                            Consultado {timestamp} por {user_info.name ? user_info.name : user_info.username}
                                        </div>
                                    </div>
                                </CardBody>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <Button type="success" style={{marginRight:5}}>Imprimir</Button>
                                        <Button type="info" style={{marginLeft:5}}>Exportar</Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

ReportPage.defaultProps = {
    title: ''
}

export default ReportPage