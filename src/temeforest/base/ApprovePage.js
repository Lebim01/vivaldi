import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button } from 'temeforest'
import { baseurl } from 'utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'

class ApprovePage extends React.Component {

    aprobar = () => {
        const { endpoint, urlFront, id, aprobarParams } = this.props

        Swal.fire({
            title: 'Confirmar Guardar',
            text : '¿Seguro de guardar?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${baseurl}/${endpoint}/${id ? `${id}/` : ``}`, { id, estado: 1, ...aprobarParams })
                .then(response => {
                    if (response.status !== 200 && response.status !== 201) {
                        throw new Error(response.statusText)
                    }
                    return response
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Petición fallida: ${error}`
                    )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    text : `Guardado`,
                    type : 'success'
                })
                this.props.history.push(urlFront)
            }
        })
    }

    rechazar = () => {
        const { endpoint, urlFront, id } = this.props

        Swal.fire({
            title: 'Confirmar rechazar, escribe el motivo',
            input : 'textarea',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: (motivo) => {
                if(!motivo){
                    Swal.showValidationMessage( 
                        `El motivo es requerido`
                    )
                    return
                }

                return axios.post(`${baseurl}/${endpoint}/${id ? `${id}/` : ``}`, { id, estado: 2, motivo })
                .then(response => {
                    if (response.status !== 200 && response.status !== 201) {
                        throw new Error(response.statusText)
                    }
                    return response
                })
                .catch(error => {
                    Swal.showValidationMessage( 
                        `Petición fallida: ${error}`
                    )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    text : `Guardado`,
                    type : 'success'
                })
                this.props.history.push(urlFront)
            }
        })
    }

    render(){
        const { data } = this.props
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                { this.props.title &&
                                    <CardTitle>{this.props.title}</CardTitle>
                                }
                                <CardBody>
                                    {this.props.children}
                                </CardBody>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        { data.estado === 0 && 
                                            <div>
                                                <Button type="success" style={{marginRight:5}} onClick={() => this.aprobar() }>Aprobar</Button>
                                                <Button type="danger" style={{marginLeft:5}} onClick={() => this.rechazar() }>Rechazar</Button>
                                            </div>
                                        }
                                        { data.estado === 1 && <div className="alert alert-success">Aprobado</div> }
                                        { data.estado === 2 && <div className="alert alert-danger">Rechazado</div> }
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

ApprovePage.defaultProps = {
    aprobarParams : {}
}

export default ApprovePage