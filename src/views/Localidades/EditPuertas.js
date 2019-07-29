import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Select, Label, ListGroup, ListItem, Tabs, DualList } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import 'react-dual-listbox/lib/react-dual-listbox.css';

class ListAndenes extends React.Component {
    render(){
        const { andenes } = this.props
        return (
            <FormGroup className="row">
                <div className="col-sm-10">
                    <DualList options={andenes} onChange={this.props.onChange} selected={this.props.selected} />
                </div>
            </FormGroup>
        )
    }
}

class MainView extends React.Component {
    seleccione = [{label:'Seleccione', value:''}]
    state = {}

    optionsLocalidades = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    constructor(props){
        super(props)
        this.toggleAndenes = this.toggleAndenes.bind(this)
        this.getLocalidades = this.getLocalidades.bind(this)
        this.getNiveles = this.getNiveles.bind(this)
        this.getAndenes = this.getAndenes.bind(this)
    }

    componentDidMount(){
        this.getAndenes()
        this.getLocalidades()
    }


    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    getAndenes = async ()  => {
        const { data } = await axios.get(`${baseurl}/anden/`)
        let options = [...data.map((r) => { return { value : r.id, label : r.descripcion } })]
        this.setState({
            andenes : options
        })
    }

    toggleAndenes(selected){
        this.props.onChange('andenes', selected)
    }

    onChangeLocalidad = name => (e) => {
        if(this.props.onChange){
          this.getNiveles(e.target.value)
          this.props.onChange('localidad', e.target.value)
        }
    }

    getNiveles = async (id)  => {
        const { data } = await axios.get(`${baseurl}/localidadnivel/?localidad=${id}`)
        let options = [...this.seleccione, ...data.map((r) => { return { value : r.id, label : r.nombre } })]
        this.setState({
          niveles : options
        })
    }

    getLocalidades = async (id)  => {
        const { data } = await axios.get(`${baseurl}/localidad/`)
        let options = [...this.seleccione, ...data.map((r) => { return { value : r.id, label : r.nombre } })]
        this.setState({
          localidades : options
        }, ()=>{
            if(this.props.localidad == undefined){
                this.props.onChange('localidad', this.state.localidades[1].value)
                this.getNiveles(this.state.localidades[1].value)
            }else{
                this.getNiveles(this.props.localidad)
            }
        })
    }


    render(){
        const { andenes, niveles } = this.state
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Localidad</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChangeLocalidad('localidad')} value={this.props.localidad} asyncOptions={this.optionsLocalidades} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Nivel</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('localidad_nivel')} value={this.props.localidad_nivel} options={niveles} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">N&uacute;mero</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('numero')} value={this.props.numero} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-4">Andenes Disponibles</Label>
                        <Label className="col-sm-4">Andenes Habilitados</Label>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">
                            <ListAndenes
                                selected={this.props.andenes}
                                onChange={this.toggleAndenes}
                                andenes={andenes}
                            />
                        </div>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

class EditSilo extends React.Component {

    state = {
        id : null,
        data : {}
    }

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.confirmSave = this.confirmSave.bind(this)
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/puerta/${id}/`)
        this.setState({
            id,
            data
        })
    }

    onChange(name, value){
        let data = this.state.data
        data[name] = value
        this.setState({
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
                return axios.post(`${baseurl}/puerta/${id ? `${id}/` : ``}`, data)
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
                this.props.history.push('/localidades/puertas/')
            }
        })
    }

    confirmDelete(){
        const { id, data } = this.state
        if(id){
            Swal.fire({
                title: 'Confirmar Eliminar',
                text : '¿Seguro de eliminar?',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return axios.delete(`${baseurl}/puerta/${id}`, data)
                    .then(response => {
                        if (response.status !== 204) {
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
            }).then(() => {
                Swal.fire({
                    text : `Eliminado`,
                    type : 'success'
                })
                this.props.history.push('/localidades/puertas/')
            })
        }
    }

    render(){
        const { data, id } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Puertas</CardTitle>
                                <CardBody>
                                  <MainView  {...data} onChange={this.onChange} />
                                </CardBody>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <Button type="success" style={{marginRight:5}} onClick={() => this.confirmSave() }>Guardar</Button>
                                        <Button type="danger" style={{marginLeft:5}} disabled={!id} onClick={() => this.confirmDelete()}>Eliminar</Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EditSilo