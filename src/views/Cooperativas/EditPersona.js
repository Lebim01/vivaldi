import React from 'react'
import { Col, Row } from 'reactstrap'
import { FormGroup, Input, Label } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'

class EditPersona extends React.Component {

    state = {data:{}}

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    /*componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }*/

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
                            <form className="mt-4 form-horizontal">
                                <FormGroup className="row">
                                <Label className="col-sm-3">Cédula/RUC</Label>
                                    <div className="col-sm-5">
                                        <Input readOnly={readOnly} value={data.identificacion} onChange={this.onChange('identificacion')} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Apellidos</Label>
                                    <div className="col-sm-5">
                                        <Input readOnly={readOnly} value={data.apellidos} onChange={this.onChange('apellidos')} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Nombres</Label>
                                    <div className="col-sm-5">
                                        <Input readOnly={readOnly} value={data.nombres} onChange={this.onChange('nombres')} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="row">
                                    <Label className="col-sm-3">Correo</Label>
                                    <div className="col-sm-5">
                                        <Input readOnly={readOnly} value={data.correo} onChange={this.onChange('correo')} />
                                    </div>
                                </FormGroup>
                            </form>
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
