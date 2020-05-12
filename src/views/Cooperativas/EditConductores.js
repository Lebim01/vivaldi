import React from 'react'
import { Button, FormGroup, Input, Label, Select, FormValidate, EditPage, FormElementValidate } from 'temeforest'
import { baseurl, getParameter, canDownload, downloadFile } from 'utils/url'
import { fileToBase64 } from 'utils/file'
import axios from 'axios'
import Swal from 'sweetalert2'
import EditPersona from './EditPersona'

const endpoint = 'conductor'
const urlFront = '/cooperativas/conductores'

class EditConductor extends React.Component {

    seleccione = [{label:'Seleccione', value:''}]
    tipos = [{label:'Conductor', value:1},{label:'Asistente',value:2}]
    state = {
        data:{
            persona:{}, 
            documentacion:'none',
            readOnlyPersona : true,
            tipo : '1',
            
        }, 
        tipos: this.tipos, 
        /*fecha_vencimiento_licencia : this.fecha_emision_licencia,
        fecha_emision_licencia : this.fecha_vencimiento_licencia*/
        
    }
    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onChangeFile = this.onChangeFile.bind(this)
        this.searchPersona = this.searchPersona.bind(this)
        this.onChangePersona = this.onChangePersona.bind(this)
    }

    componentDidMount(){
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
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}/?full=1`)
        this.setState({
            id,
            data
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
    parseData = (data) => {
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
    onChangePersona(data){
        this.onChange('persona', data)
    }
    uploadFile = (e) => {
        let el = document.getElementById("documentation");
        if (el) {
            el.click();
        }
    }

    validation(data){
        if(!data.documentacion_url && (!data.documentacion || data.documentacion === 'none'))
            return {
                result : false,
                message : 'La documentacion no puede ser vacia'
            }
        
        return true
    }

    render(){
        const { id, data, tipos} = this.state
        return (
            <EditPage 
                title={`${id ? 'Editar' : 'Crear'} Conductores`} 
                data={data} 
                id={id} 
                urlFront={urlFront} 
                endpoint={endpoint} 
                history={this.props.history}
                parseData={this.parseData}
                customValidation={this.validation}
                key_permission="conductor"
            >
                <FormValidate className="mt-4 form-horizontal">
                    <FormElementValidate
                        label={{text:'Cooperativa'}}
                        input={{
                            name : 'cooperativa',
                            element: <Select asyncOptions={this.optionsCooperativa} defaultOption="Seleccione" onChange={this._onChange('cooperativa')} value={this.state.data.cooperativa} />
                        }}
                        validator={{
                            validationRules: { required : 'El campo es requerido' },
                        }}
                    />
                    <EditPersona 
                        lengthCedula={[10,13]}
                        id={this.state.data.persona ? this.state.data.persona.id : null} 
                        persona={this.state.data.persona}
                        readOnly={this.state.data.readOnlyPersona} 
                        onChange={this.onChangePersona} 
                    />
                    <FormGroup className="row">
                      <Label className="col-sm-3">Tipo</Label>
                        <div className="col-sm-5">
                            <Select options={tipos} onChange={this._onChange('tipo')} value={this.state.data.tipo} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                    <Label className="col-sm-3">F. emisión licencia</Label>
                        <div className="col-sm-5">
                            <Input  className="no-clear" type="date" onChange={this._onChange('fecha_emision_licencia')} value={this.state.data.fecha_emision_licencia} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                      <Label className="col-sm-3">F. validez licencia</Label>
                        <div className="col-sm-5">
                            <Input className="no-clear" type="date" onChange={this._onChange('fecha_vencimiento_licencia')} value={this.state.data.fecha_vencimiento_licencia} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-sm-12 text-center">
                            <Input id="documentation" name="documentacion" type="file" style={{display:'none'}} onChange={this._onChangeFile} />
                            <Button type="success" style={{marginRight:5}} onClick={this.uploadFile}>Subir Documentación</Button>
                            { this.props.documentacion_url &&
                                <Button 
                                    type="success" 
                                    style={{marginLeft:5, marginRight: 5}} 
                                    onClick={() => downloadFile(this.props.documentacion_url)} 
                                    disabled={canDownload(this.props.documentacion_url)}
                                >
                                    <i className="fa fa-download"/> Ver Documentación
                                </Button>
                            }
                        </div>
                    </FormGroup>
                </FormValidate>
            </EditPage>
        )
    }
}

export default EditConductor
