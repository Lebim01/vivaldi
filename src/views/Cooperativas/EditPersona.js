import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Label, TextArea, InputIcon, Select } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'
class MainView extends React.Component {
    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    render(){
        const { } = this.props
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                      <Label className="col-sm-3">C&eacute;dula/RUC</Label>
                        <div className="col-sm-5">
                          <Input onChange={this.onChange('identificacion')} value={this.props.identificacion}  />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Apellidos</Label>
                        <div className="col-sm-5">
                          <Input onChange={this.onChange('apellidos')} value={this.props.apellidos} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Nombres</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('nombres')} value={this.props.nombres} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Correo</Label>
                        <div className="col-sm-5">
                          <Input onChange={this.onChange('correo')} value={this.props.correo} />
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
        this.confirmSave = this.confirmSave.bind(this)
        if(props.persona){
          this.data = props.persona
        }
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


    confirmSave(){
        const { id, data } = this.state
        Swal.fire({
            title: 'Confirmar Guardar',
            text : '¿Seguro de guardar?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${baseurl}/persona/${id ? `${id}/` : ``}`, data)
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
                this.props.history.push('/cooperativas/conductores/')
            }
        })
    }

    render(){
        const { data } = this.state

        return (
            <div className="animated fadeIn">
              <Row>
                <Col xs="12" md="12">
                  <MainView {...data} onChange={this.onChange} />
                </Col>
              </Row>
            </div>
        )
    }
}

export default EditPersona
