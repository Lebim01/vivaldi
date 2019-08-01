import React from 'react'
import { Col, Row } from 'reactstrap'
import { FormGroup, Input, Label, FormElementValidate, FormValidate } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'

class EditPersona extends React.Component {

    state = {data:{}}

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
    }
    
    onChange = name => (e) => {
        let data = this.state.data
        data[name] = e.target.value
        this.setState({
            data
        })

        if(this.props.onChange){
            this.props.onChange(data)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/persona/${id}/`)
        this.setState({
            id,
            data
        })
    }

    render(){
        const { data, readOnly } = this.props
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <div>
                            <FormValidate className="mt-4 form-horizontal" style={{marginTop: 0}}>
                                <FormElementValidate
                                    label={{text:'Cédula/RUC'}}
                                    input={{
                                        name : 'identificacion',
                                        element: <Input value={data.identificacion} onChange={this.onChange('identificacion')} /> 
                                    }}
                                    validator={{
                                        validationRules: {required:true, number : true, minLength:13, maxLength:13},
                                        validationMessages: {required:"El campo es requerido", minLength:'El valor debe ser de 13 dígitos', maxLength:'El valor debe ser de 13 dígitos', number : 'Solo se aceptan números'}
                                    }}
                                />
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Apellidos</Label>
                                    <div className="col-sm-5">
                                        <Input readOnly={readOnly && !data.id} value={data.apellidos} onChange={this.onChange('apellidos')} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Nombres</Label>
                                    <div className="col-sm-5">
                                        <Input readOnly={readOnly && !data.id} value={data.nombres} onChange={this.onChange('nombres')} />
                                    </div>
                                </FormGroup>
                                <FormElementValidate
                                    label={{text:'Correo'}}
                                    input={{
                                        name : 'correo',
                                        element: <Input placeholder="example@gmail.com" readOnly={readOnly && !data.id} value={data.correo} onChange={this.onChange('correo')} />
                                    }}
                                    validator={{
                                        validationRules: { email: true },
                                        validationMessages : { email: "El valor debe ser un correo válido" }
                                    }}
                                />
                            </FormValidate>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

EditPersona.defaultProps = {
    readOnly : false
}

export default EditPersona
