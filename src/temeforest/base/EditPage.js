import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, ValidateContext } from 'temeforest'
import { confirmEndpoint } from 'utils/dialog'
import Swal from 'sweetalert2'
import FormElementValidate from './FormElementValidate'

import EditPersona from 'views/Cooperativas/EditPersona'

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
        submitted : false,
        hasValidations : false
    }

    componentDidMount(){
        let hasElement = this.getChildrenWithType(this.props.children, FormElementValidate)
        let hasPersona = this.getChildrenWithType(this.props.children, EditPersona)

        this.setState({
            hasValidations : hasElement || hasPersona
        })
    }

    confirmSave = async () => {
        const { id, data, urlFront, endpoint } = this.props
        let parsed_data = data

        if(this.props.parseData){
            parsed_data = this.props.parseData(parsed_data)
        }

        const options = {
            id,
            endpoint,
            text: '¿Seguro de guardar?',
            params : parsed_data,
            showResponse : true
        }

        if(await confirmEndpoint(options)){
            Swal.fire({
                text : `Guardado`,
                type : 'success'
            })
            this.props.history.push(urlFront)
        }
    }

    confirmDelete = async () => {
        const { id, data, endpoint, urlFront } = this.props

        if(id){
            const options = {
                id,
                endpoint,
                text: '¿Seguro de eliminar?',
                params : data
            }

            if(await confirmEndpoint(options)){
                Swal.fire({
                    text : `Eliminado`,
                    type : 'success'
                })
                this.props.history.push(urlFront)
            }
        }
    }

    onChangeFlagValidate = (flag) => {
        this.setState({
            isFormValidationErrors: flag
        });
    }

    evaluateErrors = () => {
        return new Promise((resolve) => {
            this.setState({
                submitted: true
            }, () => {
                setTimeout(() => {
                    resolve(this.state.isFormValidationErrors)
                }, 1000)
            })
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const { hasValidations } = this.state
        let isFormValidationErrors= false

        if(hasValidations){
            isFormValidationErrors = await this.evaluateErrors()
        }
        
        if (!isFormValidationErrors || !hasValidations){
            this.confirmSave()
        }
    }

    typesAreEqual = (typeA, typeB) => typeA === typeB;

    getChildrenWithType = (children, type) => {
        let has = false;
        React.Children.forEach(children, child => {
            if (child && this.typesAreEqual(type, child.type)) {
                has = true;
            }

            if (child && child.props && child.props.children){
                if(this.getChildrenWithType(child.props.children, type)){
                    has = true
                }
            }
        });
        return has;
    }

    render(){
        const { id, title, btnDelete, btnSave } = this.props
        const { hasValidations } = this.state

        const _btnSave = {
            ...defaultBtnSave,
            ...btnSave,
            ...(
                hasValidations 
                    ? { disabled : this.state.isFormValidationErrors }
                    : {}
            )
        }
        const btnSaveShow = _btnSave.show
        delete _btnSave.show

        const _btnDelete = {
            ...defaultBtnDelete,
            ...btnDelete
        }
        const btnDeleteShow = _btnDelete.show
        delete _btnDelete.show

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
                                            { btnSaveShow &&
                                                <Button style={{marginRight:5}} onClick={this.onSubmit.bind(this)} {..._btnSave}>
                                                    {_btnSave.text}
                                                </Button>
                                            }
                                            { btnDeleteShow &&
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
