import React from 'react'
import { Col, Row } from 'reactstrap'
import { FormGroup, Input, Label } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'

class MainView extends React.Component {
    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    render(){
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                      <Label className="col-sm-3">Cédula/RUC</Label>
                        <div className="col-sm-5">
                            <Input readOnly={this.props.readOnly} onChange={this.onChange('identificacion')} value={this.props.identificacion}  />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Apellidos</Label>
                        <div className="col-sm-5">
                            <Input readOnly={this.props.readOnly} onChange={this.onChange('apellidos')} value={this.props.apellidos} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Nombres</Label>
                        <div className="col-sm-5">
                            <Input readOnly={this.props.readOnly} onChange={this.onChange('nombres')} value={this.props.nombres} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Correo</Label>
                        <div className="col-sm-5">
                            <Input readOnly={this.props.readOnly} onChange={this.onChange('correo')} value={this.props.correo} />
                        </div>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

class EditPersona extends React.Component {

    state = {data:{}}

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    onChange(name, value){
        let data = this.state.data
        data[name] = value
        this.setState({
            data
        })
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/persona/${id}/`)
        this.setState({
            id,
            data
        })
    }

    render(){
        const { data } = this.props

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <MainView {...data} onChange={this.onChange} readOnly={this.props.readOnly} />
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
