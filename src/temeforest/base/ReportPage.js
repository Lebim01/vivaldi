import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button } from 'temeforest'
import store from 'store/auth'
import { htmlToXlsById } from 'utils/exportData'
import moment from 'moment'

const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')

const { user_info } = store.getState()

class ReportPage extends React.Component {

    print(){
        window.print()
    }

    exportHtml(){
        htmlToXlsById('report')
    }

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
                                    { this.props.timestamp &&
                                        <div className="row">
                                            <div className="col-sm-12 text-center">
                                                Consultado {timestamp} por {user_info.name ? user_info.name : user_info.username}
                                            </div>
                                        </div>
                                    }
                                </CardBody>
                                { this.props.printButtons &&
                                    <div className="row">
                                        <div className="col-sm-12 text-center">
                                            <Button type="success" className="no-print" style={{marginRight:5}} onClick={this.print}>Imprimir</Button>
                                            <Button type="info" className="no-print" style={{marginLeft:5}} onClick={this.exportHtml}>Exportar</Button>
                                        </div>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

ReportPage.defaultProps = {
    title: '',
    timestamp : true,
    printButtons: true
}

export default ReportPage