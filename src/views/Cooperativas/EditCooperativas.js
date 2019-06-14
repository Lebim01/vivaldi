import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Select, Label, Tabs, DualList } from './../../temeforest'
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'

class ListAdenes extends React.Component {
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

    state = {
        tab : 0
    }
    constructor(props){
        super(props)
        this.toggleAndenes = this.toggleAndenes.bind(this)
    }

    tipos = [
        {
            value : 1,
            label : 'Intraprovicional'
        }
    ]

    sino = [
        { value : 'si', label : 'Si' },
        { value : 'no', label : 'No' }
    ]

    changeTab(tab){
        this.setState({ tab })
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            let value = e.target.value
            if(e.target.type === 'checkbox'){
                value = !this.props[name]
            }
            this.props.onChange(name, value)
        }
    }

    toggleAndenes(selected){
        let localidades_andenes = this.props.localidades_andenes
        localidades_andenes[this.state.tab] = selected
        this.props.onChange('localidades_andenes', localidades_andenes)
    }

    render(){
        const tipos = this.tipos, sino = this.sino
        const { tab } = this.state
        const { gremios, localidades, tabsLocalidades } = this.props
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
                        <Label className="col-sm-3">Tipo</Label>
                        <div className="col-sm-5">
                            <Select options={tipos} onChange={this.onChange('tipo')} value={this.props.tipo} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Gremio</Label>
                        <div className="col-sm-5">
                            <Select options={gremios} onChange={this.onChange('gremio')} value={this.props.gremio} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Ventanilla</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('ventanilla')} value={this.props.ventanilla} />
                        </div>
                    </FormGroup>
                    <fieldset>
                        <legend>Información tribunaria</legend>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Representante legal</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('representante_legal')} value={this.props.representante_legal} />
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
                                <Select options={sino} value={this.props.obligado_contabilidad} onChange={this.onChange('obligado_contabilidad')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-4">Contribuyente Especial</Label>
                            <div className="col-sm-1">
                                <Select options={sino} value={this.props.contribuyente_especial} onChange={this.onChange('contribuyente_especial')} />
                            </div>
                            <div className="col-sm-3">
                                { this.props.contribuyente_especial == 'si' && <Input onChange={this.onChange('contribuyente_especial_detalle')} value={this.props.contribuyente_especial_detalle} /> }
                            </div>
                        </FormGroup>
                    </fieldset>
                    <fieldset>
                        <legend>Venta</legend>
                        <FormGroup className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-2">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="asume_tasa" name="asume_tasa" checked={this.props.asume_tasa} onChange={this.onChange('asume_tasa')} />
                                    <Label onlyClassName="custom-control-label" htmlFor="asume_tasa">Asume tasa</Label>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-2">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="puede_anular" name="puede_anular" checked={this.props.puede_anular} onChange={this.onChange('puede_anular')} />
                                    <Label onlyClassName="custom-control-label" htmlFor="puede_anular">Anulación Boleto</Label>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-2">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="usa_api" name="usa_api" checked={this.props.usa_api} onChange={this.onChange('usa_api')} />
                                    <Label onlyClassName="custom-control-label" htmlFor="usa_api">Usa API</Label>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                { this.props.usa_api && <Input onChange={this.onChange('api_key')} value={this.props.api_key} /> }
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Sistema externo</Label>
                            <div className="col-sm-3">
                                <Select options={[{label:'Boleteria3000',value:''}]} />
                            </div>
                        </FormGroup>
                    </fieldset>

                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">
                            <Tabs tab={tab} tabs={tabsLocalidades} onClickTab={this.changeTab.bind(this)} />
                            <ListAdenes 
                                selected={this.props.localidades_andenes[tab]} 
                                onChange={this.toggleAndenes}
                                andenes={localidades[tab] ? localidades[tab].andenes : []} 
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

class EditCooperativas extends React.Component {

    state = {
        id : null,
        tab : 'main',
        data : {
            andenes: [],
            localidades_andenes : {},
            asume_tasa : false,
            puede_anular : false,
            usa_api : false,
            contribuyente_especial : 'no',
            obligado_contabilidad : 'no'
        },
        showConfirmSave : false,
        localidades : {},
        tabsLocalidades : [],
        gremios : []
    }

    tabs = [
        {
            link : 'main',
            text : 'Crear/Editar Cooperativa'
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
        this.getGremios = this.getGremios.bind(this)
        this.confirmSave = this.confirmSave.bind(this)
    }

    componentDidMount(){
        this.getGremios()
        this.getLocalidades()
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/cooperativa/${id}/`)
        data.usa_api = data.api_key != ''
        data.localidades_andenes = {}
        this.setState({
            id,
            data
        }, () => this.setAndenesLocalidades())
    }

    getAndendes(localidad){
        let andenes = []
        for(let i in localidad.niveles){
            let nivel = localidad.niveles[i]
            for(let j in nivel.andenes){
                let anden = nivel.andenes[j]
                andenes.push({ value : anden.id, label : anden.descripcion })
            }
        }
        return andenes
    }

    getLocalidades = async () => {
        const { data } = await axios.get(`${baseurl}/localidad/`)
        let tabs = [...data.map((r) => { return { link : r.id, text : r.nombre } })]
        let localidades = {}
        for(let i in data){
            localidades[data[i].id] = {
                ...data[i],
                andenes : this.getAndendes(data[i])
            }
        }
        this.setState({
            tabsLocalidades : tabs,
            localidades : localidades
        }, () => this.setAndenesLocalidades())
    }

    setAndenesLocalidades(){
        const { localidades } = this.state
        let data = this.state.data
        if(localidades && data.andenes){
            data.localidades_andenes = {}
            for(let i in data.andenes){
                let anden = data.andenes[i]
                let _id_localidad = 0
                for(let id_localidad in localidades){
                    let andenes = localidades[id_localidad].andenes
                    for(let j in andenes){
                        let _anden = andenes[j]
                        if(_anden.value == anden){
                            _id_localidad = id_localidad
                            break
                        }
                    }
                }

                if(!data.localidades_andenes[_id_localidad]) data.localidades_andenes[_id_localidad] = []
                data.localidades_andenes[_id_localidad].push(anden)
            }
        }
        this.setState({
            data
        })
    }

    getGremios = async () => {
        const { data } = await axios.get(`${baseurl}/gremio/`)
        let options = [{ value: '', label : 'Seleccione' }, ...data.map((r) => { return { value : r.id, label : r.nombre } })]
        this.setState({
            gremios : options
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
        // Bool
        data.obligado_contabilidad = data.obligado_contabilidad == 'Si'
        data.contribuyente_especial = data.contribuyente_especial == 'Si'
        data.andenes = Object.keys(data.localidades_andenes).map((r) => data.localidades_andenes[r]).flat()

        Swal.fire({
            title: 'Confirmar Guardar',
            text : '¿Seguro de guardar?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${baseurl}/cooperativa/${id ? `${id}/` : ``}`, data)
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
                this.props.history.push('/cooperativas/cooperativas/')
            }
        })
    }

    render(){
        const { tab, data, gremios, localidades, tabsLocalidades } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Cooperativas</CardTitle>
                                <Tabs tab={tab} tabs={this.tabs} onClickTab={this.changeTab}/>
                                <CardBody>
                                    { tab === 'main' && 
                                        <MainView 
                                            {...data} 
                                            onChange={this.onChange} 
                                            gremios={gremios} 
                                            tabsLocalidades={tabsLocalidades} 
                                            localidades={localidades} 
                                        />
                                    }
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

export default EditCooperativas