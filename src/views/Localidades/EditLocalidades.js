import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Select, Label, ListGroup, ListItem, Tabs } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import NivelModal from './NivelModal'

class NivelRecordRow extends React.Component {

    delete(){
        if(this.props.delete){
            this.props.delete(this.props.index)
        }
    }

    render(){
        return (
            <tr onDoubleClick={this.props.edit}>
                <td>{this.props.nombre}</td>
                <td>
                    <Button outline={true} type="danger" size="sm" rounded={true} onClick={this.delete.bind(this)}>
                        <i className="fa fa-times"></i>
                    </Button>{' '}
                </td>
            </tr>
        )
    }
}


class MainView extends React.Component {

    state = {
        modalNivel : {
            show : false,
            id_nivel : null,
            id_localidad : null
        }
    }

    constructor(props){
        super(props)
        this.openModalNivel = this.openModalNivel.bind(this)
        this.toggleModalNivel = this.toggleModalNivel.bind(this)
        this.agregarNivel = this.agregarNivel.bind(this)
        this.editNivel = this.editNivel.bind(this)
        this.deleteNivel = this.deleteNivel.bind(this)
    }

    sino = [
        { value : false, label : 'No' },
        { value : true, label : 'Si' }
    ]

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    openModalNivel = (id) => {
        let _modal = this.state.modalNivel
        _modal.id_nivel = id ? id : null
        _modal.id_localidad = this.props.id_localidad
        _modal.show = true

        this.setState({
            modalNivel : _modal
        })
    }

    toggleModalNivel = () => {
        let _modal = this.state.modalNivel
        _modal.show = !_modal.show
        this.setState({
            modalNivel : _modal
        })
    }
    onChangeNivel = index => name => (e) => {
        let niveles = this.props.niveles
        let value = e.target.value
        if(name == 'is_enable') value = e.target.checked
        niveles[index][name] = value
        this.props.onChange('niveles', niveles)
    }


    agregarNivel({ onChange, ...data }){
        let niveles = this.props.niveles
        let _continue = !niveles.some((r, i) => r.nombre == data.nombre && r.id != data.id && i != data.index)
        if(!_continue){
            return false
        }

        if(data.id){
            for(let i in niveles){
                if(niveles[i].id == data.id){
                    niveles[i] = data
                    break
                }
            }
        }
        else if(data.index){
            niveles[data.index] = data
        }
        else {
            niveles.push({ ...data, is_enable: true })
        }
        niveles.puertas = data.puertas
        this.props.onChange('niveles', niveles)
        this.toggleModalNivel({})
        return true
    }

    deleteNivel = async (index) => {
        const { value } = await Swal.fire({
            title: 'Borrar puerta',
            text: '¿Esta seguro de eliminar?',
            showCancelButton: true
        })
        if(value){
            let niveles = this.props.niveles
            niveles.splice(index, 1)
            this.props.onChange('niveles', niveles)
        }
    }

    editNivel(data){
        this.toggleModalNivel({ ...data })
    }


    render(){
        const { niveles } = this.props
        const { modalNivel } = this.state
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Nombre</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('nombre')} value={this.props.nombre} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tarifa tasa</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('tarifa_tasa')} value={this.props.tarifa_tasa} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Representante legal</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('representante_legal')} value={this.props.representante_legal} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                      <Label className="col-sm-3">Ciudad</Label>
                      <div className="col-sm-5">
                        <Select options={this.props.ciudades}  value={this.props.ciudad}  onChange={this.onChange('ciudad')} />
                      </div>
                    </FormGroup>

                    <fieldset>
                        <legend>Información tribunaria</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Establecimiento</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('establecimiento')} value={this.props.establecimiento} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Razón Social</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('razon_social')} value={this.props.razon_social} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">RUC</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('ruc')} value={this.props.ruc} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Nombre Comercial</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('nombre_comercial')} value={this.props.nombre_comercial} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Dirección Matriz</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('direccion_matriz')} value={this.props.direccion_matriz} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Correo</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('correo')} value={this.props.correo} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Obligado a llevar contabilidad</Label>
                            <div className="col-sm-1">
                                <Select options={this.sino}  value={this.props.obligado_contabilidad}  onChange={this.onChange('obligado_contabilidad')}/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Contribuyente Especial</Label>
                            <div className="col-sm-1">
                                <Select options={this.sino}  value={this.props.contribuyente_especial}  onChange={this.onChange('contribuyente_especial')}/>
                            </div>
                            <div className="col-sm-3">
                                { this.props.contribuyente_especial ===  true && <Input onChange={this.onChange('contribuyente_especial_detalle')} value={this.props.contribuyente_especial_detalle} /> }
                            </div>
                        </FormGroup>
                    </fieldset>
                    <fieldset>
                      <FormGroup className="row">
                          <h4>
                              N&iacute;veles
                              <Button style={{marginLeft: 10}} onClick={this.openModalNivel}>
                                  <i className="fa fa-plus"></i>
                              </Button>
                          </h4>
                          <div className="col-sm-12">
                              <table className="table table-striped">
                                  <thead>
                                      <tr>
                                          <th>N&uacute;mero</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      { niveles &&  niveles.map((record, i) =>
                                          <NivelRecordRow
                                              key={i}
                                              index={i}
                                              {...record}
                                              onChange={this.onChangeNivel(i)}
                                              delete={this.deleteNivel}
                                              edit={() => this.editNivel({ ...record, index: i })}
                                          />
                                      )}
                                  </tbody>
                              </table>
                          </div>
                      </FormGroup>

                    </fieldset>
                </form>
                <NivelModal {...modalNivel} toggle={this.toggleModalNivel} guardar={(data) => this.agregarNivel(data)}/>
            </div>
        )
    }
}

class EditLocalidades extends React.Component {

    seleccione = [{label:'Seleccione', value:''}]
    state = {
        id : null,
        tab : 'main',
        data : {},
        showConfirmSave : false,
        ciudades: [],
        niveles: [],
    }

    tabs = [
        {
            link : 'main',
            text : 'Crear/Editar Localidad'
        },
        {
            link : 'firma',
            text : 'Firma electronica'
        },
        {
            link : 'correos',
            text : 'Configuración de correos'
        }
    ]

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.changeTab = this.changeTab.bind(this)
        this.confirmSave = this.confirmSave.bind(this)
    }

    componentDidMount(){
        this.getCiudades()
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/localidad/${id}/`)
        this.setState({
            id,
            data
        })
    }

    getCiudades = async () => {
        const { data } = await axios.get(`${baseurl}/ciudad/`)
        console.log(data)
        let ciudades = [...this.seleccione, ...data.map((r) => { return { value : r.id, label : r.nombre } })]
        this.setState({
          ciudades:ciudades
        })
    }

    changeTab(tab){
        this.setState({ tab })
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
                return axios.post(`${baseurl}/localidad/${id ? `${id}/` : ``}`, data)
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
                this.props.history.push('/localidades/localidades/')
            }
        })
    }

    render(){
        const { tab, data, id, ciudades } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Localidades</CardTitle>
                                <Tabs tab={tab} tabs={this.tabs} onClickTab={this.changeTab}/>
                                <CardBody>
                                    { tab === 'main' && <MainView id_localidad={id} {...data} onChange={this.onChange} ciudades={ciudades} />}
                                </CardBody>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <Button type="success" style={{marginRight:5}} onClick={() => this.confirmSave() }>Guardar</Button>
                                        <Button type="danger" style={{marginLeft:5}}>Eliminar</Button>
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

export default EditLocalidades
