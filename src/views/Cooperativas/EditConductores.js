import React from 'react'
import { Button, FormGroup, Input, Label, Select, FormValidate, EditPage } from './../../temeforest'
import { baseurl, baseMediaUrl, getParameter } from './../../utils/url'
import { fileToBase64 } from './../../utils/file'
import axios from 'axios'
import Swal from 'sweetalert2'
import EditPersona from './EditPersona'

const endpoint = 'conductor'
const urlFront = '/cooperativas/conductores'

class EditConductor extends React.Component {

    seleccione = [{label:'Seleccione', value:''}]
    tipos = [{label:'Conductor', value:'2'},{label:'Asistente',value:'1'}]
    state = {
        data:{
            persona:{}, 
            documentacion:'none',
            readOnlyPersona : true
        }, 
        tipos: this.tipos, 
        cooperativas: []
    }

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onChangeFile = this.onChangeFile.bind(this)
        this.getCooperativas = this.getCooperativas.bind(this)
        this.searchPersona = this.searchPersona.bind(this)
        this.onChangePersona = this.onChangePersona.bind(this)
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
            this.setState({
                data : {
                    ...this.state.data,
                    persona: data[0],
                }
            })
            return true
        }
        return false
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
                data : {
                    ...this.state.data,
                    persona : value
                }
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

    _onChangeFile = (e) => {
        if(this.onChangeFile){
            this.onChangeFile(e.target.files[0])
        }
    }
    _onChange = name => (e) => {
        this.onChange(name, e.target.value)
    }
    editPersona(data = {}){
        this.onChange('readOnlyPersona', false)
        this.onChange('persona', data)
    }
    readOnlyPersona(){
        this.onChange('readOnlyPersona', true)
    }
    async onChangePersona(data){
        this.onChange('persona', data)
        if(data.identificacion !== this.state.data.persona.identificacion){
            let success = await this.searchPersona(data.identificacion)
            if(!success){
                this.onChange('persona', { identificacion: data.identificacion })

                if(data.identificacion.length === 13){
                    this.editPersona({ identificacion: data.identificacion })
                }else{
                    this.readOnlyPersona()
                }
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

    render(){
        const { id, data, tipos, cooperativas } = this.state
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
                <FormValidate className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select options={cooperativas} onChange={this._onChange('cooperativa')} value={this.state.data.cooperativa} />
                        </div>
                    </FormGroup>
                    <EditPersona data={this.state.data.persona} readOnly={this.state.data.readOnlyPersona} onChange={this.onChangePersona} />
                    <FormGroup className="row">
                      <Label className="col-sm-3">Tipo</Label>
                        <div className="col-sm-5">
                            <Select options={tipos} onChange={this._onChange('tipo')} value={this.state.data.tipo} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-sm-12 text-center">
                            <Input id="documentation" type="file" style={{display:'none'}} onChange={this._onChangeFile}/>
                            <Button type="success" style={{marginRight:5}} onClick={this.UploadFile}>Subir Documentación</Button>
                            { this.state.data.documentacion_url &&
                                <Button type="success" style={{marginLeft:5}} onClick={() => this.DownloadFile(this.state.data.documentacion_url)} disabled={this.canDownload(this.state.data.documentacion_url)}>Ver Documentación</Button>
                            }
                        </div>
                    </FormGroup>
                </FormValidate>
            </EditPage>
        )
    }
}

export default EditConductor
