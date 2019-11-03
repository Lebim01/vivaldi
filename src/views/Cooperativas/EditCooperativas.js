import React from 'react'
import { TabContent, TabPane, Badge, UncontrolledTooltip } from 'reactstrap'
import { Button, FormGroup, Input, Select, Label, Tabs, DualList, FormElementValidate, FormValidate, EditPage } from 'temeforest'
import { baseurl, baseMediaUrl, getParameter, getResults, objectToUrl } from 'utils/url'
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

class SeleccionarSistemaExterno extends React.Component {

    options = [
        {label:'Boleteria3000', value:'Boleteria3000'},
        {label:'Otro', value: -1},
    ]

    state = {
        option : '',
        options: '',
        otroSistema: ''
    }

    componentDidUpdate(prevProps){
        if(this.props.value !== this.state.option && this.props.value !== this.state.otroSistema){
            let f = this.options.find(r => r.value === this.props.value)
            if(!f && this.state.option !== -1){
                this.setState({
                    option : -1,
                    otroSistema : this.props.value
                })
            }else{
                this.setState({
                    option : this.props.value
                })
            }
        }
    }

    onChangeOption = e => {
        let value = e.target.value
        this.setState({
            option: value,
            otroSistema: ''
        })
        if(value === -1){
            this.props.onChange('')
        }else{
            this.props.onChange(value)
        }
    }

    onChangeSistema = e => {
        let value = e.target.value
        this.setState({
            otroSistema: value
        })
        if(this.props.onChange){
            this.props.onChange(value)
        }
    }

    render(){
        return (
            <FormGroup className="row">
                <Label className="col-sm-3">Sistema externo</Label>
                <div className="col-sm-3">
                    <Select value={this.state.option} options={this.options} onChange={this.onChangeOption} />
                    { Number(this.state.option) === -1 &&
                        <Input placeholder="Nombre" value={this.state.otroSistema} onChange={this.onChangeSistema} />
                    }
                </div>
            </FormGroup>
        )
    }
}

class MainView extends React.Component {
    state = {
        tab : 1
    }
    optionsGremios = {
        url : `${baseurl}/gremio/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    tipos = {
        url : `${baseurl}/tipoCooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    sino = [
        { value : 'si', label : 'Si' },
        { value : 'no', label : 'No' }
    ]

    tipos_emision = [
        { value: "FISI", label: "Física" },
        { value: "ELEC", label: "Electrónica" },   
    ]

    ambientes_elect = [
        { value: "1", label: "PRUEBAS" },
        { value: "2", label: "PRODUCCION" }
    ]

    changeTab = (tab) => {
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

    onChangeData = (name, value) => {
        if(this.props.onChange){
            this.props.onChange(name, value)
        }
    }

    toggleAndenes = (selected) => {
        let localidades_andenes = this.props.localidades_andenes
        localidades_andenes[this.state.tab] = selected
        this.props.onChange('localidades_andenes', localidades_andenes)
    }

    _onChangeLogo = (e) => {
        if(this.props.onChangeLogo){
            this.props.onChangeLogo(e.target.files[0])
        }
    }

    UploadLogo = (e) => {
        let el = document.getElementById("logo_cooperativa_form");
        if (el) {
            el.click();
        }
    }

    render(){
        const sino = this.sino
        const { tab } = this.state
        const { localidades, tabsLocalidades } = this.props
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormElementValidate
                        label={{text:'Nombre'}}
                        input={{
                            name : 'nombre',
                            element: <Input onChange={this.onChange('nombre')} value={this.props.nombre} />
                        }}
                        validator={{
                            validationRules : {required:"El campo es requerido"}
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Tipo'}}
                        input={{
                            name : 'tipo',
                            element: <Select asyncOptions={this.tipos} onChange={this.onChange('tipo')} value={this.props.tipo} />
                        }}
                        validator={{
                            validationRules: {required:"El campo es requerido"},
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Gremio'}}
                        input={{
                            name : 'gremio',
                            element: <Select asyncOptions={this.optionsGremios} onChange={this.onChange('gremio')} value={this.props.gremio} />
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Ventanilla'}}
                        input={{
                            name : 'ventanilla',
                            element: <Input onChange={this.onChange('ventanilla')} value={this.props.ventanilla} />
                        }}
                        validator={{
                            validationRules : {required:"El campo es requerido"}
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Tiempo de gracia'}}
                        input={{
                            name : 'tiempo_gracia',
                            element: <Input type="number" onChange={this.onChange('tiempo_gracia')} value={this.props.tiempo_gracia} rightLabel="Minutos" max={60} />
                        }}
                        validator={{
                            validationRules : {required:"El campo es requerido"}
                        }}
                    />
                    <FormGroup className="row">
                        <Label className="col-sm-3">Logo</Label>
                        <div className="col-sm-3">
                            <Input id="logo_cooperativa_form" type="file" style={{display:'none'}} onChange={this._onChangeLogo} helperText="Imagen png o jpg"/>
                            <Button type="success" style={{marginRight:5}} onClick={this.UploadLogo}>Subir Logo</Button>
                        </div>
                        { this.props.logo_url && 
                            <div className="col-sm-3">
                                <Badge className="mr-2" id="logo_badge" color="info" href={baseMediaUrl + this.props.logo_url} target="_blank" >Ya existe logo.</Badge>
                                <UncontrolledTooltip placement="top" target="logo_badge">
                                    Click para ver la imagen
                                </UncontrolledTooltip>
                            </div>
                        }
                    </FormGroup>
                    <fieldset>
                        <legend>Información tributaria</legend>
                        <FormElementValidate
                            label={{text:'Representante legal'}}
                            input={{
                                name : 'representante_legal',
                                element: <Input onChange={this.onChange('representante_legal')} value={this.props.representante_legal} />
                            }}
                            validator={{
                                validationRules : {required:"El campo es requerido"}
                            }}
                        />
                        <FormElementValidate
                            label={{text:'Razón Social'}}
                            input={{
                                name : 'razon_social',
                                element: <Input onChange={this.onChange('razon_social')} value={this.props.razon_social} />
                            }}
                            validator={{
                                validationRules : {required:"El campo es requerido"}
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
                        <FormElementValidate
                            label={{text:'Dirección Matriz'}}
                            input={{
                                name : 'direccion_matriz',
                                element: <Input onChange={this.onChange('direccion_matriz')} value={this.props.direccion_matriz} />
                            }}
                            validator={{
                                validationRules : {required:"El campo es requerido"}
                            }}
                        />
                        <FormElementValidate
                            label={{text:'Correo'}}
                            input={{
                                name : 'correo',
                                element: <Input placeholder="example@gmail.com" onChange={this.onChange('correo')} value={this.props.correo} />
                            }}
                            validator={{
                                validationRules: { required:true, email: true },
                                validationMessages : { required : 'El campo es requerido', email: "El valor debe ser un correo valido" }
                            }}
                        />
                        <FormElementValidate
                            label={{text:'Teléfono'}}
                            input={{
                                name : 'telefono',
                                element: <Input onChange={this.onChange('telefono')} value={this.props.telefono} />
                            }}
                            validator={{
                                validationRules : {required:"El campo es requerido"}
                            }}
                        />
                        <FormGroup className="row">
                            <Label className="col-sm-3">Obligado a llevar contabilidad</Label>
                            <div className="col-sm-1">
                                <Select options={sino} value={this.props.obligado_contabilidad} onChange={this.onChange('obligado_contabilidad')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Contribuyente Especial</Label>
                            <div className="col-sm-1">
                                <Select options={sino} value={this.props.contribuyente_especial} onChange={this.onChange('contribuyente_especial')} />
                            </div>
                            <div className="col-sm-3">
                                { this.props.contribuyente_especial === 'si' && <Input onChange={this.onChange('contribuyente_especial_detalle')} value={this.props.contribuyente_especial_detalle} /> }
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-3">Emisi&oacute;n Facturas</Label>
                            <div className="col-sm-2">
                                <Select options={this.tipos_emision} value={this.props.emision_facturacion} onChange={this.onChange('emision_facturacion')} />
                            </div>
                        </FormGroup>
                        { this.props.tieneFacturacionElectronica() &&
                            <div>
                            <FormGroup className="row">
                                <Label className="col-sm-3">Ambiente Facturaci&oacute;n Electr&oacute;nica</Label>
                                <div className="col-sm-2">
                                    <Select options={this.ambientes_elect} value={this.props.ambiente} onChange={this.onChange('ambiente')} />
                                </div>
                            </FormGroup>
                            <FormGroup className='row'>
                                <Label className='col-sm-3'>Leyenda Ride</Label>
                                <div className='col-sm-5'>
                                    <Input type='textarea' rows='9' value={this.props.leyenda_ride} onChange={this.onChange('leyenda_ride')} />
                                </div>
                            </FormGroup>
                            </div>
                        }
                    </fieldset>
                    <fieldset>
                        <legend>Venta</legend>
                        <FormGroup className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-2">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="asume_tasa" name="asume_tasa" checked={this.props.asume_tasa} onChange={this.onChange('asume_tasa')} />
                                    <Label onlyClassName="custom-control-label" htmlFor="asume_tasa">Asume Tasa</Label>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-2">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="omitir_pasajeros" name="omitir_pasajeros" checked={this.props.omitir_pasajeros} onChange={this.onChange('omitir_pasajeros')} />
                                    <Label onlyClassName="custom-control-label" htmlFor="omitir_pasajeros">Anulación Boleto</Label>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-2">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="puede_anular" name="puede_anular" checked={this.props.puede_anular} onChange={this.onChange('puede_anular')} />
                                    <Label onlyClassName="custom-control-label" htmlFor="puede_anular">Omitir Pasajeros</Label>
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
                        </FormGroup>
                        { this.props.usa_api &&
                            <SeleccionarSistemaExterno value={this.props.sistema_externo} onChange={(value) => this.onChangeData('sistema_externo', value)} />
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
            omitir_pasajeros : false,
            usa_api : false,
            contribuyente_especial : 'no',
            obligado_contabilidad : 'no',
            emision_facturacion : "FISI",
            ambiente: "1", 
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
            link : 'correos',
            text : 'Configuración de correos'
        },
        {
            link : 'firma',
            text : 'Firma electronica'
        },
    ]

    componentDidMount(){
        this.getLocalidades()
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}/`)

        data.localidades_andenes = {}
        data.logo = null

        data.obligado_contabilidad = data.obligado_contabilidad ? 'si' : 'no'
        data.contribuyente_especial = data.contribuyente_especial ? 'si' : 'no'

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
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}/correo/`)
        let data_correo = data
        data_correo.clave = null
        this.setState({
            data_correo
        })
    }

    getAndendes = async (localidad) => {
        const params = {
            localidad : localidad.id
        }
        const res = await getResults(`${baseurl}/anden/${objectToUrl(params)}`, true)
        return res.map(row => ({
            value : row.id,
            label : row.descripcion
        }))
    }

    getLocalidades = async () => {
        const results = await getResults(`${baseurl}/localidad/`)
        let tabs = [...results.map((r) => { return { link : r.id, text : r.nombre } })]
        let localidades = {}
        for(let i in results){
            localidades[results[i].id] = {
                ...results[i],
                andenes : await this.getAndendes(results[i])
            }
        }
        this.setState({
            tabsLocalidades : tabs,
            localidades : localidades
        }, () => this.setAndenesLocalidades())
    }

    setAndenesLocalidades = () => {
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

    changeTab = (tab) => {
        this.setState({ tab })
    }

    onChange = (name, value) => {
        let data = this.state.data
        data[name] = value
        this.setState({
            data
        })
    }

    onChangeFirma = (name, value) => {
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

    onChangeCorreo = (name, value) => {
        let data_correo = this.state.data_correo
        data_correo[name] = value
        this.setState({
            data_correo
        })
    }

    onChangeLogo = async (value) => {
        try {
            let data = this.state.data
            data.logo = await fileToBase64(value)
            this.setState({
                data
            })
        }catch(e){
            Swal.fire('Subir archivo', 'Hubo algún problema al querer subir el archivo', 'error')
        }
    }

    tieneFacturacionElectronica = () =>{
        if ( this.state.data.emision_facturacion === "ELEC"){
            return true
        }
        return false
    }

    parseData(data){
        data.obligado_contabilidad = data.obligado_contabilidad.toLocaleLowerCase() === 'si'
        data.contribuyente_especial = data.contribuyente_especial.toLocaleLowerCase() === 'si'
        data.andenes = Object.keys(data.localidades_andenes).map((r) => data.localidades_andenes[r]).flat()
        return data
    }

    render(){
        const { id, data, tab, tabsLocalidades, localidades, data_firma, data_correo } = this.state
        let tabs = this.tabs
        let facturacionElectronicaTab = {
            link : 'firma',
            text : 'Firma electronica'
        }
        data.firma_electronica = data_firma
        data.configuracion_correo = data_correo

        if (this.tieneFacturacionElectronica()){
            let found = tabs.find((el)=>{
                return el.link === 'firma'
            })
            if (!found) {
                tabs.push(facturacionElectronicaTab)
            }
        } else {
            tabs = tabs.filter((val, idx) => {
                return val.link !== 'firma'
            })
        }

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
                <Tabs tab={tab} tabs={tabs} onClickTab={this.changeTab}/>
                <TabContent activeTab={tab}>
                    <TabPane tabId="main">
                        <MainView
                            {...data} 
                            onChange={this.onChange}
                            tabsLocalidades={tabsLocalidades}
                            localidades={localidades}
                            onChangeLogo={this.onChangeLogo} 
                            tieneFacturacionElectronica={this.tieneFacturacionElectronica}  
                        />
                    </TabPane>
                    <TabPane tabId="firma">
                        <FirmaElectronicaForm {...data_firma}
                            onChange={this.onChangeFirma}
                            onChangeFile={this.onChangeFile}
                        />
                    </TabPane>
                    <TabPane tabId="correos">
                        <ConfiguracionCorreoForm {...data_correo}
                            onChange={this.onChangeCorreo}
                        />
                    </TabPane>
                </TabContent>
            </EditPage>
        )
    }
}

export default EditCooperativas
