import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, ValidateContext } from './../../temeforest'
import { baseurl } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'

const defaultBtnDelete = {
    show : true,
    text : 'Eliminar',
    type : 'danger'
}
const defaultBtnSave = {
    show : true,
    text : 'Guardar',
    type : 'success'
}

class EditPage extends React.Component {

    state = {
        isFormValidationErrors : true,
        submitted : false
    }

    constructor(props){
        super(props)
        this.confirmSave = this.confirmSave.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
    }

    componentDidMount(){
        this.setState({
            submitted: true
        })
    }

    confirmSave(){
        const { id, data, urlFront, endpoint } = this.props
        let parsed_data = data

        if(this.props.parseData){
            parsed_data = this.props.parseData(parsed_data)
        }

        Swal.fire({
            title: 'Confirmar Guardar',
            text : '¿Seguro de guardar?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${baseurl}/${endpoint}/${id ? `${id}/` : ''}`, parsed_data)
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
            }).then((response) => {
                if(!response.dismiss){
                    Swal.fire({
                        text : `Eliminado`,
                        type : 'success'
                    })
                    this.props.history.push(urlFront)
                }
            })
        }
    }

    onChangeFlagValidate(flag){
        this.setState({
            isFormValidationErrors: flag,
            submitted: true
        });
    }

    onSubmit(e){
        e.preventDefault();
        const { isFormValidationErrors, submitted } = this.state;
        const { noValidate } = this.props
        if ((!isFormValidationErrors && submitted) || noValidate){
            this.confirmSave()
        }
    }

    render(){
        const { id, title, btnDelete, btnSave, noValidate } = this.props

        const _btnSave = {
            ...defaultBtnSave,
            ...btnSave,
            ...(
                !noValidate 
                    ? { disabled : this.state.isFormValidationErrors }
                    : {}
            )
        }
        const _btnDelete = {
            ...defaultBtnDelete,
            ...btnDelete
        }

        return (
            <ValidateContext.Provider
                value={{
                    onChangeFlagValidate : this.onChangeFlagValidate.bind(this),
                    submitted : this.state.submitted,
                    isFormValidationErrors: this.state.isFormValidationErrors,
                    onSubmit : this.onSubmit.bind(this)
                }}>
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
                                            { _btnSave.show &&
                                                <Button style={{marginRight:5}} onClick={this.onSubmit.bind(this)} {..._btnSave}>
                                                    {_btnSave.text}
                                                </Button>
                                            }
                                            { _btnDelete.show &&
                                                <Button style={{marginLeft:5}} disabled={!id} onClick={() => this.confirmDelete()} {..._btnDelete}>
                                                    { _btnDelete.text }
                                                </Button>
                                            }
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </ValidateContext.Provider>
        )
    }
}

EditPage.defaultProps = {
    id: null,
    title: '',
    urlFront : '',
    endpoint: '',
    btnSave : {},
    btnDelete : {},
    noValidate : true
}

export default EditPage
