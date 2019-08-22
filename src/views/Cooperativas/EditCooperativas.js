import React from 'react'
import { FormGroup, Input, Select, Label, Tabs, DualList, FormElementValidate, FormValidate, EditPage } from 'temeforest'
import { baseurl, getParameter, getResults } from 'utils/url'
import { fileToBase64 } from 'utils/file'
import axios from 'axios'
import Swal from 'sweetalert2'
import 'react-dual-listbox/lib/react-dual-listbox.css';

const endpoint = 'cooperativa'
const urlFront = '/cooperativas/cooperativas'

const FirmaElectronicaForm = React.lazy(() => import('utils/FirmaElectronicaForm'))
const ConfiguracionCorreoForm = React.lazy(() => import('utils/ConfiguracionCorreoForm'))

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
        tab : 1
    }

    constructor(props){
        super(props)
        this.toggleAndenes = this.toggleAndenes.bind(this)
    }

    optionsGremios = {
        url : `${baseurl}/gremio/`,
        labelName: 'nombre',
        valueName: 'id'
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
        const { localidades, tabsLocalidades } = this.props
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
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
                            <Select asyncOptions={this.optionsGremios} onChange={this.onChange('gremio')} value={this.props.gremio} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Ventanilla</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('ventanilla')} value={this.props.ventanilla} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tiempo de gracias</Label>
                        <div className="col-sm-5">
                            <Input type="number" onChange={this.onChange('tiempo_gracias')} value={this.props.tiempo_gracias} />
                        </div>
                    </FormGroup>
                    <fieldset>
                        <legend>Información tribunaria</legend>
                        <FormElementValidate
                            label={{text:'Representante legal'}}
                            input={{
                                name : 'representante_legal',
                                element: <Input onChange={this.onChange('representante_legal')} value={this.props.representante_legal} />
                            }}
                            validator={{
                                validationRules: {required:true},
                                validationMessages: {required:"El campo es requerido"}
                            }}
                        />
                        <FormElementValidate
                            label={{text:'Razón Social'}}
                            input={{
                                name : 'razon_social',
                                element: <Input onChange={this.onChange('razon_social')} value={this.props.razon_social} />
                            }}
                            validator={{
                                validationRules: {required:true},
                                validationMessages: {required:"El campo es requerido"}
                            }}
                        />
                        <FormElementValidate
                            label={{text:'RUC'}}
                            input={{
                                name : 'ruc',
                                element: <Input onChange={this.onChange('ruc')} value={this.props.ruc} />
                            }}
                            validator={{
                                validationRules: {required:true, number : true, minLength:13, maxLength:13},
                                validationMessages: {required:"El campo es requerido", minLength:'El valor debe ser de 13 dígitos', maxLength:'El valor debe ser de 13 dígitos', number : 'Solo se aceptan números'}
                            }}
                        />
                        <FormElementValidate
                            label={{text:'Nombre Comercial'}}
                            input={{
                                name : 'nombre_comercial',
                                element: <Input onChange={this.onChange('nombre_comercial')} value={this.props.nombre_comercial} />
                            }}
                        />
                        <FormGroup className="row">
                            <Label className="col-sm-3">Dirección Matriz</Label>
                            <div className="col-sm-5">
                                <Input onChange={this.onChange('direccion_matriz')} value={this.props.direccion_matriz} />
                            </div>
                        </FormGroup>
                        <FormElementValidate
                            label={{text:'Correo'}}
                            input={{
                                name : 'correo',
                                element: <Input placeholder="example@gmail.com" onChange={this.onChange('correo')} value={this.props.correo} />
                            }}
                            validator={{
                                validationRules: { email: true },
                                validationMessages : { email: "El valor debe ser un correo" }
                            }}
                        />
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
                                { this.props.contribuyente_especial === 'si' && <Input onChange={this.onChange('contribuyente_especial_detalle')} value={this.props.contribuyente_especial_detalle} /> }
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
                                    <input type="checkbox" className="custom-control-input" id="usa_api" name="usa_api" checked={this.props.usa_api === true} onChange={this.onChange('usa_api')} />
                                    <Label onlyClassName="custom-control-label" htmlFor="usa_api">Usa API</Label>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                { this.props.usa_api && <Input onChange={this.onChange('api_key')} value={this.props.api_key} /> }
                            </div>
                        </FormGroup>
                        { this.props.usa_api &&
                            <FormGroup className="row">
                                <Label className="col-sm-3">Sistema externo</Label>
                                <div className="col-sm-3">
                                    <Select options={[{label:'Boleteria3000',value:''}]} />
                                </div>
                            </FormGroup>
                        }
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
                </FormValidate>
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
            obligado_contabilidad : 'no',
        },
        data_firma: {
            file_firma : '',
            clave_firma: null,
            reclave_firma: null,
            file_firma_exist: false
        },
        data_correo: {
            host: '',
            port: '',
            usuario: '',
            clave: null,
            tls: false
        },
        showConfirmSave : false,
        localidades : {},
        tabsLocalidades : [],
        submmited : false
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
        this.onChangeFirma = this.onChangeFirma.bind(this)
        this.onChangeFile = this.onChangeFile.bind(this)
        this.onChangeCorreo = this.onChangeCorreo.bind(this)
    }

    componentDidMount(){
        this.getLocalidades()
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/cooperativa/${id}/`)
        data.localidades_andenes = {}
        this.setState({
            id,
            data
        }, () => this.setAndenesLocalidades())
    }

    getDataFirma = async (id) => {
        const { data } = await axios.get(`${baseurl}/cooperativa/${id}/firma/`)
        let data_firma = this.state.data_firma
        data_firma.file_firma_exist = data.file_firma_exist
        this.setState({
            data_firma
        })
    }

    getDataCorreo = async (id) => {
        const { data } = await axios.get(`${baseurl}/cooperativa/${id}/correo/`)
        let data_correo = data
        data_correo.clave = null
        this.setState({
            data_correo
        })
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
        const results = await getResults(`${baseurl}/localidad/`)
        let tabs = [...results.map((r) => { return { link : r.id, text : r.nombre } })]
        let localidades = {}
        for(let i in results){
            localidades[results[i].id] = {
                ...results[i],
                andenes : this.getAndendes(results[i])
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
                        if(Number(_anden.value) === Number(anden)){
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

    onChangeFirma(name, value){
        let data_firma = this.state.data_firma
        data_firma[name] = value
        this.setState({
            data_firma
        })
    }

    onChangeFile = async (value) => {
        try {
            let data_firma = this.state.data_firma
            data_firma.file_firma = await fileToBase64(value)
            this.setState({
                data_firma
            })
        }catch(e){
            Swal.fire('Subir archivo', 'Hubo algún problema al querer subir el archivo', 'error')
        }
    }

    onChangeCorreo(name, value){
        let data_correo = this.state.data_correo
        data_correo[name] = value
        this.setState({
            data_correo
        })
    }

    parseData(data){
        data.obligado_contabilidad = data.obligado_contabilidad === 'Si'    
        data.contribuyente_especial = data.contribuyente_especial === 'Si'
        data.andenes = Object.keys(data.localidades_andenes).map((r) => data.localidades_andenes[r]).flat()
        return data
    }

    render(){
        const { id, data, tab, tabsLocalidades, localidades, data_firma, data_correo } = this.state
        data.firma_electronica = data_firma
        data.configuracion_correo = data_correo
        return(
            <EditPage 
                title={`${id ? 'Editar' : 'Crear'} Cooperativas`} 
                data={data} 
                id={id} 
                urlFront={urlFront} 
                endpoint={endpoint} 
                history={this.props.history}
                parseData={this.parseData}
            >
                <Tabs tab={tab} tabs={this.tabs} onClickTab={this.changeTab}/>
                { tab === 'main' && 
                    <MainView 
                        {...data} 
                        onChange={this.onChange}
                        tabsLocalidades={tabsLocalidades} 
                        localidades={localidades} 
                    />
                }
                {
                  tab === 'firma' &&
                    <FirmaElectronicaForm {...data_firma}
                        onChange={this.onChangeFirma}
                        onChangeFile={this.onChangeFile}
                    />
                }
                {
                  tab === 'correos' &&
                    <ConfiguracionCorreoForm {...data_correo}
                        onChange={this.onChangeCorreo}
                    />
                }
            </EditPage>
        )
    }
}

export default EditCooperativas
