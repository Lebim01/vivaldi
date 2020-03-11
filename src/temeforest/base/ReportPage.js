import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button } from 'temeforest'
import store from 'store/auth'
import { htmlToXlsById } from 'utils/exportData'
import moment from 'moment'
import FileDownloadW from 'assets/svg/file-download-solid-white.svg'
import './ListPage.css'


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
                                { title && 
                                    <CardTitle>
                                        {title}
                                        { this.props.printButtons &&
                                            
                                            <div className="col-sm-12 text-right">
                                                <Button onClick={this.exportHtml} style={{marginRight:2, opacity:0.88}} title="Exportar excel" >
                                                    <img src={FileDownloadW} height="14" />
                                                </Button>
                                                <Button onClick={this.exportHtml} title="Exportar excel, todos" style={{marginLeft:3, opacity:0.88}}>
                                                    <img src={FileDownloadW} height="14" />{' '}
                                                    <i className="fas fa-sort-numeric-down" />
                                                </Button>
                                                <Button onClick={this.print} style={{marginLeft:3, opacity:0.88}} title="Imprimir Pantalla">
                                                    <i className="fa fa-print"></i>
                                                </Button>
                                            </div>
                                        }
                                    </CardTitle> 
                                }
                                
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