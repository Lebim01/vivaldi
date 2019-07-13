import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Label, Select, InputAutocomplete } from './../../temeforest'
import { baseurl, baseMediaUrl, getParameter } from './../../utils/url'
import { fileToBase64 } from './../../utils/file'
import axios from 'axios'
import Swal from 'sweetalert2'
import EditPersona from './EditPersona'
import { isUndefined } from 'util';

class MainView extends React.Component {

    state = {
        buscar : '',
        personas : [],
        descargar: true,
    }
    constructor(props){
        super(props)
        this.searchPersona = this.searchPersona.bind(this)
    }

    onChange = name => (e) => {
        if(name === 'buscar'){
            this.setState({
                buscar : e.target.value
            })
        }
        else if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    searchPersona = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            if(this.props.searchPersona && this.state.buscar){
                this.props.searchPersona(this.state.buscar)
            }
        }
    }

    UploadFile = (e) => {
        let el = document.getElementById("documentation");
        if (el) {
            el.click();
        }
    }

    onChangeFile = (e) => {
        if(this.props.onChangeFile){
            this.props.onChangeFile(e.target.files[0])
        }
    }

    render(){
        const { personas, buscar } = this.state
        const { cooperativas, tipos, persona } = this.props
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select options={cooperativas} onChange={this.onChange('cooperativa')} value={this.props.cooperativa} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Buscar</Label>
                        <div className="col-sm-5">
                            <InputAutocomplete 
                                icon={<i className="fa fa-search"/>}
                                items={personas}
                                onChange={this.onChange('buscar')}
                                inputProps={{
                                    onKeyDown : this.searchPersona
                                }}
                                value={buscar}
                            />
                        </div>
                    </FormGroup>
                    <EditPersona data={persona} readOnly />
                    <FormGroup className="row">
                      <Label className="col-sm-3">Tipo</Label>
                        <div className="col-sm-5">
                            <Select options={tipos} onChange={this.onChange('tipo')} value={this.props.tipo} />
                        </div>
                    </FormGroup>

                    <FormGroup className="row">
                        <div className="col-sm-12 text-center">
                            <Input id="documentation" type="file" style={{display:'none'}} onChange={this.onChangeFile}/>
                            <Button type="success" style={{marginRight:5}} onClick={this.UploadFile}>Subir Documentación</Button>
                            <Button type="success" style={{marginLeft:5}} download={this.props.documentacion}>Ver Documentación</Button>
                        </div>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

class EditConductor extends React.Component {

    seleccione = [{label:'Seleccione', value:''}]
    tipos = [{label:'Conductor', value:'2'},{label:'Asistente',value:'1'}]
    state = {data:{documentacion:'none'}, tipos: this.tipos, cooperativas: [], persona:{}}

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onChangeFile = this.onChangeFile.bind(this)
        this.confirmSave = this.confirmSave.bind(this)
        this.getCooperativas = this.getCooperativas.bind(this)
        this.searchPersona = this.searchPersona.bind(this)
    }


    componentDidMount(){
        this.getCooperativas()
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    searchPersona = async (identificacion) => {
        const { data } = await axios.get(`${baseurl}/persona/?identificacion=${identificacion}`)
        if(data.length > 0){
            const local = this.state.data
            local['persona'] = data[0].id
            this.setState({
                persona: data[0],
                data: local,
            })
        }
    }

    getPersona = async (id) => {
        const { data } = await axios.get(`${baseurl}/persona/${id}/`)
        const local = this.state.data
        local['identificacion'] = data.identificacion
        this.setState({
            persona:data,
            data:local,
        })
    }

    getCooperativa = async (id) => {
        const { data } = await axios.get(`${baseurl}/cooperativa/${id}/`)
        this.setState({
            id,
            data
        })

    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/conductor/${id}/`)
        this.setState({
            id,
            data
        }, ()=> {
            this.getPersona(data.persona)
        })
    }

    getCooperativas = async () => {
        const { data } = await axios.get(`${baseurl}/cooperativa/`)
        let options = [...this.seleccione, ...data.map((r) => { return { value : r.id, label : r.nombre } })]
        this.setState({
            cooperativas : options
        })
    }

    onChange(name, value){
        let data = this.state.data
        data[name] = value
        this.setState({
            data
        })
    }

    onChangeFile = async (value) => {
        try {
            let data = this.state.data
            data.documentacion = await fileToBase64(value)
            this.setState({
                data
            })
        }catch(e){
            Swal.fire('Subir archivo', 'Hubo algún problema al querer subir el archivo', 'error')
        }
    }

    confirmSave(){
        const { id, data } = this.state
        Swal.fire({
            title: 'Confirmar Guardar',
            text : '¿Seguro de guardar?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${baseurl}/conductor/${id ? `${id}/` : ``}`, data)
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
                text : `Guardado`,
                type : 'success'
            })
            this.props.history.push('/cooperativas/conductores/')
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
                    return axios.delete(`${baseurl}/conductor/${id}`, data)
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
                        text : `Eliminado`,
                        type : 'success'
                    })
                    this.props.history.push('/cooperativas/conductores/')
                }
            })
        }
    }

    render(){
        const { id, data, tipos, cooperativas, persona } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Conductor</CardTitle>
                                <CardBody>
                                    <MainView {...data} tipos={tipos} cooperativas={cooperativas}
                                        persona={persona} onChange={this.onChange} searchPersona={this.searchPersona}
                                        onChangeFile={this.onChangeFile}
                                    />
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

export default EditConductor
