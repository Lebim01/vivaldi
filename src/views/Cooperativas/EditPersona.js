import React from 'react'
import { Col, Row } from 'reactstrap'
import { FormGroup, Input, Label, FormElementValidate } from 'temeforest'
import { baseurl, getResults } from 'utils/url'
import axios from 'axios'

const endpoint = 'persona'

class EditPersona extends React.Component {

    state = {
        id: undefined,
        data:{},
        readOnly : true,
        loading : false
    }

    constructor(props){
        super(props)
        this.getPersona = this.getPersona.bind(this)
    }

    componentWillReceiveProps(props){
        if(props.id !== this.state.id){
            this.setState({
                id: props.id
            })
            this.getPersona(props.id)
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
            if(_data.identificacion.length == this.props.lengthCedula){
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
        const results = await getResults(`${baseurl}/${endpoint}/?identificacion=${identificacion}`)
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
            const { data } = await axios.get(`${baseurl}/${endpoint}/${id}`)
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
        let _readOnly = readOnly || loading
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <div>
                            <form className="mt-4 form-horizontal" style={{marginTop: 0}}>
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
                                        <Input readOnly={_readOnly && !data.id} value={data.apellidos} onChange={this.onChange('apellidos')} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Nombres</Label>
                                    <div className="col-sm-5">
                                        <Input readOnly={_readOnly && !data.id} value={data.nombres} onChange={this.onChange('nombres')} />
                                    </div>
                                </FormGroup>
                                <FormElementValidate
                                    label={{text:'Correo'}}
                                    input={{
                                        name : 'correo',
                                        element: <Input placeholder="example@gmail.com" readOnly={_readOnly && !data.id} value={data.correo} onChange={this.onChange('correo')} />
                                    }}
                                    validator={{
                                        validationRules: { required : true, email: true },
                                        validationMessages : { required: "El campo es requerido", email: "El valor debe ser un correo válido" }
                                    }}
                                />
                            </form>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

EditPersona.defaultProps = {
    readOnly : false,
    lengthCedula : 13
}

export default EditPersona
