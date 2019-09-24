import React from 'react'
import { Button, FormGroup, Input, Label, Select, FormElementValidate, FormValidate, EditPage } from 'temeforest'
import { baseurl, getParameter, canDownload, downloadFile } from 'utils/url'
import { fileToBase64 } from 'utils/file'
import EditPersona from './EditPersona'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'

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
        url : `${baseurl}/busTipoServicio/`,
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
            if(name === 'bus_tipo'){
                const select_tipo = e.target
                const capacidad = select_tipo.options[select_tipo.options.selectedIndex].attributes['data-capacidad'].value
                this.props.onChange('capacidad', capacidad)
            }
            this.props.onChange(name, e.target.value)
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
            <EditPage title={`${id ? 'Editar' : 'Crear'} Bus`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <FormValidate className="mt-4 form-horizontal">
                    <FormElementValidate
                        label={{text:'Disco'}}
                        input={{
                            name : 'disco',
                            element: <Input onChange={this.onChange('disco')} value={this.props.disco} />
                        }}
                        validator={{
                            validationRules: { required : true, number: true, minRangeNumber : 1, maxRangeNumber : 1000 },
                            validationMessages : { required: 'El campo es requerido', number : "El valor debe ser un número", minRangeNumber: 'El valor debe ser entre 1 y 1000', maxRangeNumber : 'El valor debe ser entre 1 y 1000' }
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Placa'}}
                        input={{
                            name : 'placa',
                            element: <Input onChange={this.onChange('placa')} value={this.props.placa} />
                        }}
                        validator={{
                            validationRules: { required : true },
                            validationMessages : { required : 'El campo es requerido' }
                        }}
                    />
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select asyncOptions={this.optionsCooperativa} defaultOption="Todos" onChange={this.onChange('cooperativa')} value={this.props.cooperativa} />
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
                            validationRules: { required : true, number: true, minRangeNumber : 1, maxRangeNumber : 200 },
                            validationMessages : { required : 'El valor es requerido', number : "El valor debe ser un número" , minRangeNumber: 'El valor no puede ser menor a 1', maxRangeNumber: 'El valor no puede ser mayor a 200'}
                        }}
                    />
                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo servicio</Label>
                        <div className="col-sm-5">
                            <Select asyncOptions={this.optionsBusTiposServicios} onChange={this.onChange('bus_tipo_servicio')} value={this.props.bus_tipo_servicio} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Marca</Label>
                        <div className="col-sm-5">
                            <Select asyncOptions={this.optionsMarcas} onChange={this.onChange('marca')} value={this.props.marca} />
                        </div>
                    </FormGroup>
                    <FormElementValidate
                        label={{text:'Año Fabricación'}}
                        input={{
                            name : 'anio_fabricacion',
                            element: <Input type="number" onChange={this.onChange('anio_fabricacion')} value={this.props.anio_fabricacion} min={1950} max={moment().year()+1} />
                        }}
                        validator={{
                            validationRules: { required : true, number: true, minRangeNumber : 1950, maxRangeNumber : moment().year()+1 },
                            validationMessages : { required: 'El campo es requerido', number : "El valor debe ser un número", minRangeNumber: 'El año no puede ser menor a 1950', maxRangeNumber: `El año no puede ser mayor a ${moment().year()+1}` }
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Venc. Matricula'}}
                        input={{
                            name : 'fecha_emision_matricula',
                            element: <Input type="date" onChange={this.onChange('fecha_emision_matricula')} value={this.props.fecha_emision_matricula} />
                        }}
                        validator={{
                            validationRules: { required : true },
                            validationMessages : { required: 'El campo es requerido' }
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Emis. Matricula'}}
                        input={{
                            name : 'fecha_vencimiento_matricula',
                            element: <Input type="date" onChange={this.onChange('fecha_vencimiento_matricula')} value={this.props.fecha_vencimiento_matricula} />
                        }}
                        validator={{
                            validationRules: { required : true },
                            validationMessages : { required: 'El campo es requerido' }
                        }}
                    />

                    {/** PROPIETARIO Y CONDUCTOR  */}
                    <div className="row">
                        <div className="col-sm-6">
                            <fieldset>
                                <legend>Propietario</legend>
                                <EditPersona lengthCedula={10} onChange={this.onChangeData('propietario')} id={this.props.propietario ? this.props.propietario.id : null} />
                            </fieldset>
                        </div>
                        <div className="col-sm-6">
                            <fieldset>
                                <legend>Conductor</legend>
                                <EditPersona lengthCedula={10} onChange={this.onChangeData('conductor')} id={this.props.conductor ? this.props.conductor.id : null} endpoint='conductor' editable={false} />
                            </fieldset>
                        </div>
                    </div>
                    <FormGroup className="row">
                        <div className="col-sm-12 text-center">
                            <Input id="documentation" type="file" style={{display:'none'}} onChange={this.onChangeFile}/>
                            <Button type="success" style={{marginRight:5}} onClick={this.UploadFile}>
                                <i className="fa fa-upload"/> Subir Documentación
                            </Button>
                            { this.props.documentacion_url &&
                                <Button type="success" style={{marginLeft:5}} onClick={() => downloadFile(this.props.documentacion_url)} disabled={canDownload(this.props.documentacion_url)}>
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

class EditBuses extends React.Component {

    state = {
        data:{
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
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}/`)
        data.propietario = {
            id: data.propietario.id
        }
        data.conductor = {
            id: data.conductor.id
        }
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
            Swal.fire('Subir archivo', 'Hubo algún problema al querer subir el archivo', 'error')
        }
    }

    render(){
        const { id, data } = this.state
        return (
            <MainView id={id} history={this.props.history} data={data} {...data} onChange={this.onChange} onChangeFile={this.onChangeFile}/>
        )
    }
}

export default EditBuses
