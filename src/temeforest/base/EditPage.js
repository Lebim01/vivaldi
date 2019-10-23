import React, { useEffect } from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, ValidateContext } from 'temeforest'
import { confirmEndpoint } from 'utils/dialog'
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
    const { register, handleSubmit, watch, errors, triggerValidation, getValues, setValue } = useForm()

    const { id, title, btnDelete, btnSave } = props

    useEffect(() => {
        const values = getValues()
        for(let i in values){
            setValue(i, ' ')
        }
    }, [])
    
    // events
    const onSubmit = async data => { 
        const res = await triggerValidation()
        if(res){
            confirmSave()
        }
    }

    const confirmDelete = async () => {
        const { id, data, endpoint, urlFront } = props

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
                props.history.push(urlFront)
            }
        }
    }

    const confirmSave = async () => {
        const { id, data, urlFront, endpoint } = props
        let parsed_data = data

        if(props.parseData){
            parsed_data = props.parseData(parsed_data)
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
            props.history.push(urlFront)
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
                                        { btnSaveShow &&
                                            <Button style={{marginRight:5}} onClick={onSubmit} {..._btnSave}>
                                                {_btnSave.text}
                                            </Button>
                                        }
                                        { btnDeleteShow &&
                                            <Button style={{marginLeft:5}} disabled={!id} onClick={() => confirmDelete()} {..._btnDelete}>
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
