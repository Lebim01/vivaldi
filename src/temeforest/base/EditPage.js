import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button } from './../../temeforest'
import { baseurl } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'

class EditPage extends React.Component {

    constructor(props){
        super(props)
        this.confirmSave = this.confirmSave.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
    }

    confirmSave(){
        const { id, data, urlFront, endpoint } = this.props
        Swal.fire({
            title: 'Confirmar Guardar',
            text : '¿Seguro de guardar?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${baseurl}/${endpoint}/${id ? `${id}/` : ''}`, data)
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

    confirmDelete(){
        const { id, data, endpoint, urlFront } = this.props
        if(id){
            Swal.fire({
                title: 'Confirmar Eliminar',
                text : '¿Seguro de eliminar?',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return axios.delete(`${baseurl}/${endpoint}/${id}`, data)
                    .then(response => {
                        if (response.status !== 204) {
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
            }).then(() => {
                Swal.fire({
                    text : `Eliminado`,
                    type : 'success'
                })
                this.props.history.push(urlFront)
            })
        }
    }

    render(){
        const { id, title, btnDelete, btnSave } = this.props
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                { title && <CardTitle>{title}</CardTitle> }
                                <CardBody>
                                    {this.props.children}
                                </CardBody>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        { btnSave.show &&
                                            <Button type={btnSave.type} style={{marginRight:5}} onClick={() => this.confirmSave() }>
                                                {btnSave.text}
                                            </Button>
                                        }
                                        { btnDelete.show &&
                                            <Button type={btnDelete.type} style={{marginLeft:5}} disabled={!id} onClick={() => this.confirmDelete()}>
                                                { btnDelete.text }
                                            </Button>
                                        }
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

EditPage.defaultProps = {
    id: null,
    title: '',
    urlFront : '',
    endpoint: '',
    btnSave : {
        show : true,
        text : 'Guardar',
        type : 'success'
    },
    btnDelete : {
        show : true,
        text : 'Eliminar',
        type : 'danger'
    }
}

export default EditPage
