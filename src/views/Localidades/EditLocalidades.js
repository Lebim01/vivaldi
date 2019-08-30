import React from 'react'
import { Button, FormGroup, Input, Select, Label, EditPage, Tabs, FormElementValidate, FormValidate } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import NivelModal from './NivelModal'
import { fileToBase64 } from 'utils/file'

const FirmaElectronicaForm = React.lazy(() => import('utils/FirmaElectronicaForm'))
const ConfiguracionCorreoForm = React.lazy(() => import('utils/ConfiguracionCorreoForm'))

const endpoint = 'localidad'
const urlFront = '/localidades/localidades'

class NivelRecordRow extends React.Component {

    delete = () => {
        if(this.props.delete){
            this.props.delete(this.props.index)
        }
    }

    render(){
        return (
            <tr onDoubleClick={this.props.edit}>
                <td>{this.props.nombre}</td>
                <td>
                    <Button outline={true} type="danger" size="sm" rounded={true} onClick={this.delete}>
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
    optionsCiudades = {
        url : `${baseurl}/ciudad/`,
        labelName : 'nombre',
        valueName : 'id'
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

    toggleModalNivel = (data = {}) => {
        let _modal = this.state.modalNivel
        _modal = {
            ..._modal,
            ...data,
            show : !_modal.show
        }
        this.setState({
            modalNivel : _modal
        })
    }
    onChangeNivel = index => name => (e) => {
        let niveles = this.props.niveles
        if(!niveles){
          niveles =[]
        }

        let value = e.target.value
        if(name == 'is_enable') value = e.target.checked
        niveles[index][name] = value
        this.props.onChange('niveles', niveles)
    }


    agregarNivel = ({ onChange, ...data }) => {
        let niveles = this.props.niveles
        if(!niveles){
          niveles =[]
        }

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

    editNivel = (data) => {
        this.toggleModalNivel({ ...data })
    }


    render(){
        const { niveles } = this.props
        const { modalNivel } = this.state
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
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Tarifa tasa'}}
                        input={{
                            name : 'tarifa_tasa',
                            element: <Input onChange={this.onChange('tarifa_tasa')} value={this.props.tarifa_tasa} />
                        }}
                        validator={{
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
                        }}
                    />
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
                        label={{text:'Ciudad'}}
                        input={{
                            name : 'ciudad',
                            element: <Input onChange={this.onChange('ciudad')} value={this.props.ciudad} />
                        }}
                        validator={{
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
                        }}
                    />

                    <fieldset>
                        <legend>Información tribunaria</legend>
                        <FormElementValidate
                            label={{text:'Establecimiento'}}
                            input={{
                                name : 'establecimiento',
                                element: <Input onChange={this.onChange('establecimiento')} value={this.props.establecimiento} />
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
                                validationRules: {required:true, number : true, minLength:this.props.lengthCedula, maxLength:this.props.lengthCedula},
                                validationMessages: {required:"El campo es requerido", minLength:`El valor debe ser de 13 dígitos`, maxLength:`El valor debe ser de 13 dígitos`, number : 'Solo se aceptan números'}
                            }}
                        />
                        <FormElementValidate
                            label={{text:'Nombre Comercial'}}
                            input={{
                                name : 'nombre_comercial',
                                element: <Input onChange={this.onChange('nombre_comercial')} value={this.props.nombre_comercial} />
                            }}
                            validator={{
                                validationRules: {required:true},
                                validationMessages: {required:"El campo es requerido"}
                            }}
                        />
                        <FormElementValidate
                            label={{text:'Dirección Matriz'}}
                            input={{
                                name : 'direccion_matriz',
                                element: <Input onChange={this.onChange('direccion_matriz')} value={this.props.direccion_matriz} />
                            }}
                            validator={{
                                validationRules: {required:true},
                                validationMessages: {required:"El campo es requerido"}
                            }}
                        />
                        <FormElementValidate
                            label={{text:'Correo'}}
                            input={{
                                name : 'correo',
                                element: <Input onChange={this.onChange('correo')} value={this.props.correo} />
                            }}
                            validator={{
                                validationRules: {required:true, email: true},
                                validationMessages: {required:"El campo es requerido", email:'El valor debe ser un correo valido'}
                            }}
                        />
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
                              Níveles
                              <Button style={{marginLeft: 10}} onClick={this.openModalNivel}>
                                  <i className="fa fa-plus"></i>
                              </Button>
                          </h4>
                          <div className="col-sm-12">
                              <table className="table table-striped">
                                  <thead>
                                      <tr>
                                          <th>Número</th>
                                          <th></th>
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
                </FormValidate>
                <NivelModal {...modalNivel} toggle={this.toggleModalNivel} guardar={(data) => this.agregarNivel(data)}/>
            </div>
        )
    }
}

class EditLocalidades extends React.Component {

    state = {
        id : null,
        tab : 'main',
        data : {},
        data_firma: {
            file_firma : null,
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

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
            this.getDataFirma(id)
            this.getDataCorreo(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/localidad/${id}/`)
        this.setState({
            id,
            data
        })
    }

    getDataFirma = async (id) => {
        const { data } = await axios.get(`${baseurl}/localidad/${id}/firma/`)
        let data_firma = this.state.data_firma
        data_firma.file_firma_exist = data.file_firma_exist
        this.setState({
            data_firma
        })
    }

    getDataCorreo = async (id) => {
        const { data } = await axios.get(`${baseurl}/localidad/${id}/correo/`)
        let data_correo = data
        data_correo.clave = null
        this.setState({
            data_correo
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

    render(){
        const { tab, data, id, data_correo, data_firma } = this.state
        data.firma_electronica = data_firma
        data.configuracion_correo = data_correo
        return (
            <EditPage title={`${id ? 'Editar' : 'Crear'} Localidad`} data={data} id={id} urlFront={urlFront} endpoint={endpoint} history={this.props.history}>
                <Tabs tab={tab} tabs={this.tabs} onClickTab={this.changeTab}/>
                { tab === 'main' && <MainView id_localidad={id} {...data} onChange={this.onChange} />}
                { tab === 'firma' && <FirmaElectronicaForm {...data_firma} onChange={this.onChangeFirma} onChangeFile={this.onChangeFile} /> }
                { tab === 'correos' && <ConfiguracionCorreoForm {...data_correo} onChange={this.onChangeCorreo}/> }
            </EditPage>                    
        )
    }
}

export default EditLocalidades
