import React from 'react'
import { Col, Row } from 'reactstrap'
import { FormGroup, Input, Label, FormElementValidate, FormValidate } from 'temeforest'
import { baseurl, getResults } from 'utils/url'
import axios from 'axios'

class EditPersona extends React.Component {

    state = {
        id: undefined,
        data:{},
        readOnly : true,
        loading : false
    }

    componentWillReceiveProps(props){
        if(props.id !== this.state.id){
            this.setState({
                data : props.persona
            })
        }
    }
    
    onChange = name => (e) => {
        const { data, readOnly, id } = this.state
        let _data = data
        let _readOnly = readOnly
        let loading = false
        let _id = id
        
        _data[name] = e.target.value
        
        if(name === 'identificacion'){
            _readOnly = true
            if(_data.identificacion.length === this.props.lengthCedula){
                _readOnly = false
                loading = true
                this.searchPersona(_data.identificacion)
            }else{
                const { identificacion } = _data
                _id = null
                _data = {
                    identificacion
                }
            }
        }

        if(this.props.onChange){
            this.props.onChange(_data)
        }

        this.setState({ data: _data, readOnly: _readOnly, loading, id: _id })
    }

    searchPersona = async (identificacion) => {
        const results = await getResults(`${baseurl}/${this.props.endpoint}/?identificacion=${identificacion}`)
        if(results.length > 0){
            this.setState({
                data : {
                    ...results[0]
                },
                loading: false
            })
            if(this.props.onChange){
                this.props.onChange(results[0])
            }
            return true
        }else{
            this.setState({
                loading: false
            })
        }
        return false
    }

    getPersona = async (id) => {
        if(id){
            const { data } = await axios.get(`${baseurl}/${this.props.endpoint}/${id}/`)
            if(data){
                this.setState({
                    id : data.id,
                    data : data
                })

                if(this.props.onChange){
                    this.props.onChange(data)
                }
            }
        }
    }

    render(){
        const { data, readOnly, loading } = this.state
        let _readOnly = (readOnly || loading) && !data.id || !this.props.editable

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
                                        validationRules: {required:true, number : true, minLength:this.props.lengthCedula, maxLength:this.props.lengthCedula},
                                        validationMessages: {required:"El campo es requerido", minLength:`El valor debe ser de ${this.props.lengthCedula} dígitos`, maxLength:`El valor debe ser de ${this.props.lengthCedula} dígitos`, number : 'Solo se aceptan números'}
                                    }}
                                />
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Apellidos</Label>
                                    <div className="col-sm-5">
                                        <Input readOnly={_readOnly} value={data.apellidos} onChange={this.onChange('apellidos')} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Nombres</Label>
                                    <div className="col-sm-5">
                                        <Input readOnly={_readOnly} value={data.nombres} onChange={this.onChange('nombres')} />
                                    </div>
                                </FormGroup>
                                <FormElementValidate
                                    label={{text:'Correo'}}
                                    input={{
                                        name : 'correo',
                                        element: <Input placeholder="example@gmail.com" readOnly={_readOnly} value={data.correo} onChange={this.onChange('correo')} />
                                    }}
                                    validator={{
                                        validationRules: { required : this.props.required, email: this.props.required },
                                        validationMessages : { required: "El campo es requerido", email: "El valor debe ser un correo válido" }
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
    readOnly : false,
    editable : true,
    lengthCedula : 10,
    endpoint: 'persona',
    persona : {},
    required : true
}

export default EditPersona
