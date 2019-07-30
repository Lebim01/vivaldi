import React from 'react'
import { Button, FormGroup, Input, Label, Select, InputAutocomplete, FormValidate, EditPage } from './../../temeforest'
import { baseurl, baseMediaUrl, getParameter } from './../../utils/url'
import { fileToBase64 } from './../../utils/file'
import axios from 'axios'
import Swal from 'sweetalert2'
import EditPersona from './EditPersona'

const endpoint = 'conductor'
const urlFront = '/cooperativas/conductores'

class MainView extends React.Component {

    state = {
        buscar : '',
        personas : [],
        descargar: true,
        readOnlyPersona : true
    }
    constructor(props){
        super(props)
        this.searchPersona = this.searchPersona.bind(this)
        this.editPersona = this.editPersona.bind(this)
        this.onChangePersona = this.onChangePersona.bind(this)
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

    DownloadFile = (url) => {
        if (url){
            let file_path = baseMediaUrl + url;
            let a = document.createElement('A');
            a.target = '_blank';
            a.download = true;
            a.href = file_path;
            a.click()
        }
    }

    canDownload = (url) => {
        if(url && url.includes('none')){
            return true
        }
        return false
    }

    onChangeFile = (e) => {
        if(this.props.onChangeFile){
            this.props.onChangeFile(e.target.files[0])
        }
    }

    editPersona(){
        this.setState({
            readOnlyPersona : false,
        }, () => {
            this.props.onChange('persona', {})
        })
    }

    onChangePersona(data){
        this.props.onChange('persona', data)
    }

    render(){
        const { personas, buscar } = this.state
        const { cooperativas, tipos } = this.props
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select options={cooperativas} onChange={this.onChange('cooperativa')} value={this.props.cooperativa} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Buscar</Label>
                        <div className="col-sm-1">
                            <Button onClick={this.editPersona}>
                                <i className="fa fa-plus"/>
                            </Button>
                        </div>
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
                    <EditPersona data={this.props.persona} readOnly={this.state.readOnlyPersona} onChange={this.onChangePersona} />
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
                            { this.props.documentacion_url &&
                                <Button type="success" style={{marginLeft:5}} onClick={() => this.DownloadFile(this.props.documentacion_url)} disabled={this.canDownload(this.props.documentacion_url)}>Ver Documentación</Button>
                            }
                        </div>
                    </FormGroup>
                </FormValidate>
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
        if(name === 'persona'){
            this.setState({
                persona: value
            })
        }else{
            let data = this.state.data
            data[name] = value
            this.setState({
                data
            })
        }
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

    parseData(data){
        const { persona } = this.state
        data['persona_obj'] = persona
        return data
    }

    render(){
        const { id, data, tipos, cooperativas, persona } = this.state
        return (
            <EditPage 
                title={`${id ? 'Editar' : 'Crear'} Conductores`} 
                data={data} 
                id={id} 
                urlFront={urlFront} 
                endpoint={endpoint} 
                history={this.props.history}
                parseData={this.parseData.bind(this)}
            >
                <MainView {...data} tipos={tipos} cooperativas={cooperativas}
                    persona={persona} onChange={this.onChange} searchPersona={this.searchPersona}
                    onChangeFile={this.onChangeFile}
                />
            </EditPage>
        )
    }
}

export default EditConductor
