import React from 'react'
import { Row, Col } from 'reactstrap'
import { Button, FormGroup, Input, Label, Select, FormElementValidate, FormValidate, EditPage, MaskedInput } from 'temeforest'
import { baseurl, getParameter, canDownload, downloadFile } from 'utils/url'
import { fileToBase64 } from 'utils/file'
import EditPersona from './EditPersona'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'
import { validate } from 'utils/validate'
import { REGEX } from 'temeforest/forms/form-elements/MaskedInput'

const { LETTER, DIGIT } = REGEX

const endpoint = 'bus'
const urlFront = '/cooperativas/buses'

class MainView extends React.Component {

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    optionsBusTipos = {
        url : `${baseurl}/busTipo/`,
        labelName: 'nombre',
        valueName: 'id',
        optionProps: ['capacidad']
    }
    optionsBusTiposServicios = {
        url : `${baseurl}/tipoServicio/`,
        labelName : 'nombre',
        valueName : 'id'
    }
    optionsMarcas = {
        url : `${baseurl}/marca/`,
        labelName : 'nombre',
        valueName : 'id'
    }
    optionsConductores = {
        url : `${baseurl}/conductor/`,
        labelName : (r) => `${r.nombres} ${r.apellidos}`,
        valueName : 'id'
    }
    optionsPropietarios = {
        url : `${baseurl}/persona/`,
        labelName : 'nombres',
        valueName : 'id'
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            if(e.target.type === 'checkbox'){
                this.props.onChange(name, e.target.checked)
            }
            else {
                if(name === 'bus_tipo'){
                    const select_tipo = e.target
                    const capacidad = select_tipo.options[select_tipo.options.selectedIndex].attributes['data-capacidad'].value
                    this.props.onChange('capacidad', capacidad)
                }
                this.props.onChange(name, e.target.value)
            }

            if(name === 'internacional'){
                this.props.onChange('placa', '')
            }
        }
    }

    onChangeData = name => (value) => {
        if(this.props.onChange){
            this.props.onChange(name, value)
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
        const { id, data } = this.props
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Bus`} parseData={this.props.parseData} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history} key_permission="bus">
                <FormValidate className="mt-4 form-horizontal">
                    <FormElementValidate 
                        label={{text:'Disco'}} 
                        input={{
                            name : 'disco',
                            element: <Input  onChange={this.onChange('disco')} value={this.props.disco} />
                        }}
                        validator={{
                            validationRules: { 
                                required : 'El campo es requerido', 
                                min : { value: 1, message : 'El valor debe ser entre 1 y 1000' }, 
                                max : { value: 1000, message : 'El valor debe ser entre 1 y 1000' },
                                validate : validate({
                                    number : 'El valor debe ser un n??mero'
                                })
                            }
                        }}
                    />
                    
                    
                    
                    <div style={{  display : !this.props.internacional ? 'unset' : 'none' }}>
                    
                        
                    <FormElementValidate 
                        label ={{text:'Placa'}}
                        
                        input={{
                            name : 'placa',
                            element: (
                                <MaskedInput style= {{ width: '175px'}}
                                    onChange={this.onChange('placa')}
                                    value={this.props.placa}
                                    upper={true}
                                    placeholder="ABC-1234"
                                    mask={
                                        //'ddd-cccc'
                                        [LETTER, LETTER, LETTER, '-', DIGIT, DIGIT, DIGIT, DIGIT]
                                    }
                                />
                            ),   
                            
                            button: (
                                
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" 
                                    id="internacional" name="internacional" 
                                    checked={this.props.internacional} 
                                    onChange={this.onChange('internacional')} />
                                    <Label style={{position: 'relative', top: 8,right: '80%' }} onlyClassName="custom-control-label" 
                                    htmlFor="internacional">Internacional</Label>
                                </div>
                                
                            ) 
                        }}
                        validator={{
                            validationRules : { 
                                ...!!this.props.internacional ? { required : 'El campo es requerido' } : {} 
                        }, 
                       
                        
                            
                            
                        }}
                    />
                    </div>
                        
                    <div style={{ display : !!this.props.internacional ? 'unset' : 'none' }}>
                        
                        <FormElementValidate 
                            label ={{text: 'Placa'}}
                            
                            input={{
                               name : 'placa',
                                element: 
                                <Input style= {{ width: '175px'}}
                                onChange={this.onChange('placa')} 
                                value={this.props.placa} />, 
                                button: (
                                
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" 
                                        id="internacional" name="internacional" 
                                        checked={this.props.internacional} 
                                        onChange={this.onChange('internacional')} />
                                        <Label style={{position: 'relative', top: 8,right: '80%' }}onlyClassName="custom-control-label" 
                                        htmlFor="internacional">Internacional</Label>
                                    </div>
                                    
                                    
                                    
                                )
                                
                               
                                
                            }}
                            
                            validator={{
                                validationRules : {
                                    ...!!this.props.internacional ? { required : 'El campo es requerido' } : {} 
                                }
                            }}
                        />
                    </div> 
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select asyncOptions={this.optionsCooperativa} defaultOption="Seleccione" onChange={this.onChange('cooperativa')} value={this.props.cooperativa} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo</Label>
                        <div className="col-sm-5">
                            <Select asyncOptions={this.optionsBusTipos} onChange={this.onChange('bus_tipo')} value={this.props.bus_tipo} />
                        </div>
                    </FormGroup>
                    <FormElementValidate
                        label={{text:'Capacidad'}}
                        input={{
                            name : 'capacidad',
                            element: <Input readOnly value={this.props.capacidad} />
                        }}
                        validator={{
                            validationRules: { 
                                required : 'El valor es requerido', number: true, 
                                min : { value : 1, message : 'El valor no puede ser menor a 1' }, 
                                max : { value : 200, message : 'El valor no puede ser mayor a 200' },
                                validate : validate({
                                    number : "El valor debe ser un n??mero"
                                })
                            }
                        }}
                    />
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo servicio</Label>
                        <div className="col-sm-5">
                            <Select asyncOptions={this.optionsBusTiposServicios} onChange={this.onChange('tipo_servicio')} value={this.props.tipo_servicio} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Marca</Label>
                        <div className="col-sm-5">
                            <Select asyncOptions={this.optionsMarcas} onChange={this.onChange('marca')} value={this.props.marca} />
                        </div>
                    </FormGroup>
                    <FormElementValidate
                        label={{text:'A??o Fabricaci??n'}}
                        input={{
                            name : 'anio_fabricacion',
                            element: <Input type="number" onChange={this.onChange('anio_fabricacion')} value={this.props.anio_fabricacion} min={1950} max={moment().year()+1} />
                        }}
                        validator={{
                            validationRules: { 
                                required : 'El campo es requerido', 
                                min : { value: 1950, message : 'El a??o no puede ser menor a 1950' } , 
                                max : { value: moment().year()+1, message : `El a??o no puede ser mayor a ${moment().year()+1}` },
                                validate : validate({
                                    number : "El valor debe ser un n??mero"
                                })
                            }
                        }} 
                    />
                    <FormElementValidate
                        label={{text:'Fecha de revisi??n'}}
                        input={{
                            name : 'fecha_revision',
                            element: <Input type="date" onChange={this.onChange('fecha_revision')} value={this.props.fecha_revision} />
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Emis. Matricula'}}
                        input={{
                            name : 'fecha_emision_matricula',
                            element: <Input type="date" onChange={this.onChange('fecha_emision_matricula')} value={this.props.fecha_emision_matricula} />
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Venc. Matricula'}}
                        input={{
                            name : 'fecha_vencimiento_matricula',
                            element: <Input type="date" onChange={this.onChange('fecha_vencimiento_matricula')} value={this.props.fecha_vencimiento_matricula} />
                        }}
                    />
                    

                    { !id &&
                    <FormGroup className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-5">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="saldo_inicializado_cero" name="saldo_inicializado_cero" checked={this.props.saldo_inicializado_cero} onChange={this.onChange('saldo_inicializado_cero')} />
                                <Label onlyClassName="custom-control-label" htmlFor="saldo_inicializado_cero">Iniciar saldo en cero</Label>
                            </div>
                        </div>
                    </FormGroup>
                    }

                    {/** PROPIETARIO Y CONDUCTOR  */}
                    <div className="row">
                        <div className="col-sm-6">
                            <fieldset>
                                <legend>Propietario</legend>
                                <EditPersona 
                                    lengthCedula={[10,13]} 
                                    name="propietario"
                                    onChange={this.onChangeData('propietario')} 
                                    persona={this.props.propietario}
                                    id={this.props.propietario ? this.props.propietario.id : null} 
                                />
                            </fieldset>
                        </div>
                        <div className="col-sm-6">
                            <fieldset>
                                <legend>Conductor</legend>
                                <EditPersona 
                                    lengthCedula={10} 
                                    name="conductor"
                                    onChange={this.onChangeData('conductor')} 
                                    persona={this.props.conductor}
                                    id={this.props.conductor ? this.props.conductor.id : null} 
                                    endpoint='conductor' 
                                    editable={false} 
                                    required={false}
                                />
                            </fieldset>
                        </div>
                    </div>
                    <FormGroup className="row">
                        <div className="col-sm-12 text-center">
                            <Input id="documentation" type="file" style={{display:'none'}} onChange={this.onChangeFile}/>
                            <Button type="success" style={{marginRight:5}} onClick={this.UploadFile}>
                                <i className="fa fa-upload"/> Subir Documentaci??n
                            </Button>

                            { this.props.documentacion_url &&
                                <Button 
                                    type="success" 
                                    style={{marginLeft:5, marginRight: 5}} 
                                    onClick={() => downloadFile(this.props.documentacion_url)} 
                                    disabled={canDownload(this.props.documentacion_url)}
                                >
                                    <i className="fa fa-download"/> Ver Documentaci??n
                                </Button>
                            }
                            
                        </div>
                        
                        
                    </FormGroup>
                </FormValidate>
            </EditPage>
        )
    }
}

class EditBuses extends React.Component {

    state = {
        data:{
            internacional : false,
            propietario : {},
            conductor : {}
        }
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}/?full=1`)

        data.conductor = data.conductor || {}
        data.propietario = data.propietario || {}

        this.setState({
            id,
            data
        })
    }

    onChange = (name, value) => {
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
            Swal.fire('Subir archivo', 'Hubo alg??n problema al querer subir el archivo', 'error')
        }
    }

    parseData(data){
        if(data.conductor && !data.conductor.identificacion){
            delete data.conductor
        }
        return data
    }

    render(){
        const { id, data } = this.state
        return (
            <MainView id={id} history={this.props.history} parseData={this.parseData} data={data} {...data} onChange={this.onChange} onChangeFile={this.onChangeFile} key_permission="bus"/>
        )
    }
}

export default EditBuses
