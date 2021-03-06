import React from 'react'
import { Col, Row } from 'reactstrap'
import { FormGroup, Input, Label, FormElementValidate, FormValidate } from 'temeforest'
import { baseurl, getResults } from 'utils/url'
import axios from 'axios'
import { validate } from 'utils/validate'

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
                data : props.persona || {}
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
            if(
                Array.isArray(this.props.lengthCedula)
                ? this.props.lengthCedula.find(val => _data.identificacion.length === val)
                : _data.identificacion.length === this.props.lengthCedula
            ){
                _readOnly = false
                loading = true
                this.searchPersona(_data.identificacion)
            }if(
                Array.isArray(this.props.lengthRuc)
                ? this.props.lengthRuc.find(val => _data.identificacion.length === val)
                : _data.identificacion.length === this.props.lengthRuc
            ){
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
        let _readOnly = (readOnly || loading) && (!data || !data.id) || !this.props.editable

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <div>
                            <FormValidate className="mt-4 form-horizontal" style={{marginTop: 0}}>
                                <FormElementValidate
                                    label={{text:'C??dula/RUC'}}
                                    input={{
                                        name : `identificacion-${this.props.name}`,
                                        element: <Input value={data.identificacion} onChange={this.onChange('identificacion')} /> 
                                    }}
                                    validator={this.props.required ? {
                                        validationRules: {
                                            required:"El campo es requerido", 
                                            validate: validate({
                                                number : 'Solo se aceptan n??meros',
                                                /*length : {
                                                    compare : this.props.lengthCedula ,
                                                    message : Array.isArray(this.props.lengthCedula ) 
                                                        ? `El valor debe tener una longitud de [${this.props.lengthCedula.join(',')}]`
                                                        : `El valor debe tener una longitud de ${this.props.lengthCedula}`
                                                },*/
                                                lengthDouble : {
                                                    compare : this.props.lengthCedula ,
                                                    compare2: this.props.lengthRuc,
                                                    message : Array.isArray(this.props.lengthRuc ) 
                                                        ? `El valor debe tener una longitud de [${this.props.lengthRuc.join(',')}]`
                                                        : `El valor debe tener una longitud de ${this.props.lengthCedula} 
                                                        o ${this.props.lengthRuc}`
                                                },
                                                
                                            }),
                                        }
                                    } : {}}
                                />
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Nombre</Label>
                                    <div className="col-sm-5">
                                        <Input readOnly={_readOnly} value={data.nombre} onChange={this.onChange('nombre')} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Direcci??n</Label>
                                    <div className="col-sm-5">
                                        <Input readOnly={_readOnly} value={data.direccion} onChange={this.onChange('direccion')} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Tel??fono</Label>
                                    <div className="col-sm-5">
                                        <Input readOnly={_readOnly} value={data.telefono} onChange={this.onChange('telefono')} />
                                    </div>
                                </FormGroup>
                                <FormElementValidate
                                    label={{text:'Correo'}}
                                    input={{
                                        name : `correo-${this.props.name}`,
                                        element: <Input placeholder="example@gmail.com" readOnly={_readOnly} value={data.correo} onChange={this.onChange('correo')} />
                                    }}
                                    validator={{
                                        validationRules: this.props.required ? {
                                            required:"El campo es requerido",
                                            validate: validate({
                                                email : "El valor debe ser un correo v??lido"
                                            })
                                        } : {},
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
    lengthRuc : 13,
    lenghtCedulaRuc: [10, 13],
    endpoint: 'persona',
    persona : {},
    required : true,
    name : 'default'
}

export const LENGTH_CEDULA = 10
export const LENGTH_RUC = 13
export const LENGTH_CEDULA_RUC = [ LENGTH_CEDULA, LENGTH_RUC ]

export default EditPersona
