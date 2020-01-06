import React, { useEffect } from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, ValidateContext, Permission } from 'temeforest'
import { confirmEndpoint } from 'utils/dialog'
import { getAllParameters, objectToUrl } from 'utils/url'
import useForm from 'react-hook-form'
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

function EditPage(props){
    const { register, handleSubmit, watch, errors, triggerValidation, setValue, ...methods } = useForm()
    const { id, title, btnDelete, btnSave, key_permission, history, urlFront } = props

    const key_add = `add_${key_permission}`
    const key_change = `change_${key_permission}`
    const key_delete = `delete_${key_permission}`

    useEffect(() => {
        let unblock = history.block((location, action) => {
            if(location.pathname === urlFront){
                setTimeout(() => {
                    unblock()
                    backToList()
                }, 500)
                return false
            }
            
            return true
        })
    }, [])

    // events
    const onSubmit = async data => {
        const res = await triggerValidation()
        if(res){
            confirmSave()
        }
    }

    const backToList = () => {
        let params = getAllParameters()
        delete params.id;

        history.go(`${urlFront}${objectToUrl(params)}`)
    }

    const confirmDelete = async () => {
        const { id, data, endpoint } = props

        if(id){
            const options = {
                id,
                endpoint,
                text: '¿Seguro de eliminar?',
                params : data,
                method : 'delete'
            }

            if(await confirmEndpoint(options)){
                Swal.fire({
                    text : `Eliminado`,
                    type : 'success'
                })
                
                backToList()
            }
        }
    }

    const confirmSave = async () => {
        const { id, data, endpoint, method } = props
        let parsed_data = data

        if(props.parseData){
            parsed_data = props.parseData(parsed_data)
        }

        const options = {
            id,
            endpoint,
            method,
            text: '¿Seguro de guardar?',
            params : parsed_data,
            showResponse : true
        }

        if(await confirmEndpoint(options)){
            Swal.fire({
                text : `Guardado`,
                type : 'success'
            })

            backToList()
        }
    }

    // btn save
    const _btnSave = {
        ...defaultBtnSave,
        ...btnSave
    }
    const btnSaveShow = _btnSave.show
    delete _btnSave.show

    // btn delete
    const _btnDelete = {
        ...defaultBtnDelete,
        ...btnDelete
    }
    const btnDeleteShow = _btnDelete.show
    delete _btnDelete.show

    return (
        <ValidateContext.Provider
            value={{
                register,
                handleSubmit,
                watch,
                errors,
                setValue
            }}>
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                { title && <CardTitle>{title}</CardTitle> }
                                <CardBody>
                                    {props.children}
                                </CardBody>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <Permission key_permission={id ? key_change : key_add}>
                                            { btnSaveShow &&
                                                <Button style={{marginRight:5}} onClick={onSubmit} {..._btnSave}>
                                                    {_btnSave.text}
                                                </Button>
                                            }
                                        </Permission>
                                        <Permission key_permission={key_delete}>
                                            { btnDeleteShow &&
                                                <Button style={{marginLeft:5}} disabled={!id} onClick={() => confirmDelete()} {..._btnDelete}>
                                                    { _btnDelete.text }
                                                </Button>
                                            }
                                        </Permission>
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

EditPage.defaultProps = {
    id: null,
    title: '',
    urlFront : '',
    endpoint: '',
    btnSave : {},
    btnDelete : {},
    noValidate : true,
    method: 'post'
}

export default EditPage
