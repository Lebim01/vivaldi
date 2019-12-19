import React from 'react'
import { Button, FormGroup, Input, Label, Select, FormElementValidate, FormValidate, EditPage } from 'temeforest'
import { baseurl, getParameter, getResults } from 'utils/url'
import { generateHexadecimal } from 'utils/string'
import Swal from 'sweetalert2'
import AddCooperativaPuntoVentaModal from './AddCooperativaPuntoVentaModal'
import axios from 'axios'
import { validate } from 'utils/validate'

const endpoint = 'venta/puntoventa'
const urlFront = '/cooperativas/punto-venta'

class RecordRow extends React.Component {

    delete = () => {
        if(this.props.delete){
            this.props.delete()
        }
    }

    render(){
        return (
            <tr onDoubleClick={this.props.onDoubleClick}>
                <td>
                    <Button outline={true} type="danger" size="sm" rounded={true} onClick={this.delete}>
                        <i className="fa fa-times"></i>
                    </Button>{' '}
                    {this.props.cooperativa_nombre}
                </td>
                <td>{(this.props.establecimiento || '').padStart(3, '0')}</td>
                <td>{(`${this.props.punto_emision_boleto}` || '').padStart(3, '0')}</td>
                <td>{(`${this.props.secuencia_boleto}` || '').padStart(9, '0')}</td>
                <td> {(this.props.establecimiento || '').padStart(3, '0')}-{(`${this.props.punto_emision_boleto}` || '').padStart(3, '0')}-{(`${this.props.secuencia_boleto}` || '').padStart(9, '0')}</td>
                <td>{(`${this.props.punto_emision_nota_credito}` || '').padStart(3, '0')}</td>
                <td>{(`${this.props.secuencia_nota_credito}` || '').padStart(9, '0')}</td>
                <td>{(`${this.props.punto_emision_tasa}` || '').padStart(3, '0')}</td>
                <td>{(`${this.props.secuencia_tasa}` || '').padStart(9, '0')}</td>
            </tr>
        )
    }
}

class MainView extends React.Component {

    state = {
        modal : {
            show : false
        },
        isEditedEmision: false,
        establecimientoLocalidad : '000'
    }
    optionsLocalidades = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName : 'id'
    }
    optionsCooperativas = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName : 'id'
    }

    componentDidUpdate(prevProps){
        if(prevProps.localidad !== this.props.localidad){
            this.getEstablecimientoLocalidad(this.props.localidad)
        }
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            if(e.target.type === 'checkbox'){
                if(name === 'externo') {
                    if(e.target.checked){
                        this.props.onChange('puntoventa_cooperativas', [])
                    }else{
                        this.props.onChange('cooperativa', '')
                        this.props.onChange('punto_emision_tasa', '')
                        this.props.onChange('secuencial_tasa', '')
                    }
                }

                this.props.onChange(name, e.target.checked)
            }else{
                if (name == 'punto_emision_tasa'){
                    this.setState({isEditedEmision: true})
                }
                this.props.onChange(name, e.target.value)
            }
        }
    }

    getEstablecimientoLocalidad = async (id) => {
        if(id){
            const res = await axios.get(`${baseurl}/localidad/${id}`)
            this.setState({
                establecimientoLocalidad: res.data.establecimiento
            })
        }else{
            this.setState({
                establecimientoLocalidad: '000'
            })
        }
    }

    addCooperativa = () => {
        this.setState({
            modal : {
                ...this.state.modal,
                show : true
            }
        })
    }

    toggleModal = () => {
        let _modal = this.state.modal
        _modal.show = !_modal.show
        this.setState({
            modal : _modal
        })
    }

    agregarCooperativa = (data) => {
        let puntoventa_cooperativas = this.props.puntoventa_cooperativas
        if(data.id){
            for(let i = 0; i < puntoventa_cooperativas.length; i++){
                if(puntoventa_cooperativas[i].id === data.id){
                    puntoventa_cooperativas[i] = data
                    break
                }
            }
        }
        else if(data.index >= 0){
            puntoventa_cooperativas[data.index] = data
        }
        else{
            puntoventa_cooperativas.push(data)
        }
        this.props.onChange('puntoventa_cooperativas', puntoventa_cooperativas)
        this.toggleModal()
    }

    deleteCooperativa = async (index) => {
        const {value} = await Swal.fire({
            title: 'Confirmar',
            text : '¿Seguro de borrar?',
            showCancelButton: true,
        })
        if(value){
            let puntoventa_cooperativas = this.props.puntoventa_cooperativas
            puntoventa_cooperativas.splice(index, 1)
            this.props.onChange('puntoventa_cooperativas', puntoventa_cooperativas)
        }
    }

    editCooperativa = (row, i) => {
        let modal = {
            show : true,
            ...row,
            index : i,
        }
        this.setState({
            modal,
        })
    }

    generateHexadecimal = () => {
        this.props.onChange('api_key', generateHexadecimal(32))
    }

    render(){
        const { puntoventa_cooperativas } = this.props
        // TODO no usar 001, usar el establecimiento de la localidad
        let numero_prueba = `001-${this.props.punto_emision_tasa ? this.props.punto_emision_tasa.padStart(3, "0") : "001"}-${this.props.secuencial_tasa ? this.props.secuencial_tasa.padStart(9, "0") : "000000001"}`
        let readOnlyEmision = false
        if (this.props.tiene_ventas) {
            if (this.state.isEditedEmision){
                readOnlyEmision = false
            } else {
                readOnlyEmision = true
            }
        } else {
            readOnlyEmision = false
        }
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormElementValidate
                        label={{text:'Descripción'}}
                        input={{
                            name : 'descripcion',
                            element: <Input onChange={this.onChange('descripcion')} value={this.props.descripcion} />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                            },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Api Key'}}
                        input={{
                            name : 'api_key',
                            element: <Input onChange={this.onChange('api_key')} value={this.props.api_key} readOnly />,
                            button : <Button onClick={this.generateHexadecimal.bind(this)}>Generar</Button>
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                            },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Localidad'}}
                        input={{
                            name : 'localidad',
                            element: <Select asyncOptions={this.optionsLocalidades} onChange={this.onChange('localidad')} value={this.props.localidad} />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                            },
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Dirección IP'}}
                        input={{
                            name : 'ip',
                            element: <Input onChange={this.onChange('ip')} value={this.props.ip} placeholder="0.0.0.0" />
                        }}
                        validator={{
                            validationRules: {
                                required:"El campo es requerido",
                                validate: validate({
                                    ip: "El campo debe ser una IP"
                                })
                            },
                        }}
                    />
                    <FormGroup className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="venta_offline" name="venta_offline" checked={this.props.venta_offline} onChange={this.onChange('venta_offline')} />
                                <Label onlyClassName="custom-control-label" htmlFor="venta_offline">Offline</Label>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="externo" name="externo" checked={this.props.externo} onChange={this.onChange('externo')} />
                                <Label onlyClassName="custom-control-label" htmlFor="externo">Externo</Label>
                            </div>
                        </div>
                    </FormGroup>
                    { this.props.externo ? (
                        <div>
                            <FormElementValidate
                                label={{text:'Cooperativa'}}
                                input={{
                                    name : 'cooperativa',
                                    element: (
                                        <Select 
                                            asyncOptions={this.optionsCooperativas} 
                                            onChange={this.onChange('cooperativa')}
                                            value={this.props.cooperativa} 
                                        />
                                    )
                                }}
                                validator={{
                                    validationRules: {
                                        required:"El campo es requerido",
                                    }
                                }}
                            />
                            <FormElementValidate
                                label={{text:'Punto Emision Tasa'}} 
                                input={{
                                    name: 'punto_emision_tasa',
                                    element: <Input onChange={this.onChange('punto_emision_tasa')} value={this.props.punto_emision_tasa} maxLength="3"/>
                                }}
                                validator={{
                                    validationRules: this.props.externo ? {
                                        required: "El campo es requerido"
                                    } : {}
                                }}
                            />
                            <FormElementValidate
                                label={{text:'Secuencial Tasa'}} 
                                input={{
                                    name: 'secuencial_tasa',
                                    element: (
                                        <Input 
                                            onChange={this.onChange('secuencial_tasa')} 
                                            value={this.props.secuencial_tasa} 
                                            maxLength="9" 
                                            readOnly={readOnlyEmision}
                                        />
                                    )
                                }}
                                validator={{
                                    validationRules: this.props.externo ? {
                                        required: "El campo es requerido"
                                    } : {}
                                }}
                            />
                            <div className='row'>
                                <div className='col-sm-3'></div>
                                <div className='col-sm-5'><p className='text-center'>{numero_prueba}</p></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Label className="col-sm-6">
                                Cooperativas e Información tribunaria
                                <Button size="sm" style={{marginLeft:5}} onClick={this.addCooperativa}>
                                    <i className="fa fa-plus"></i>
                                </Button>
                            </Label>
                            <div className="col-sm-12">
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Cooperativa</th>
                                                <th scope="col">Establecimiento<br/>(boleto)</th>
                                                <th scope="col">Punto<br/>(boleto)</th>
                                                <th scope="col">Secuencia<br/>(boleto)</th>
                                                <th scope="col">Numero de factura<br/>(boleto)</th>
                                                <th scope="col">Punto<br/>(nota de crédito)</th>
                                                <th scope="col">Secuencia<br/>(nota de crédito)</th>
                                                <th scope="col">Punto<br/>(tasa)</th>
                                                <th scope="col">Secuencia<br/>(tasa)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { puntoventa_cooperativas.map((r, i) => 
                                                <RecordRow 
                                                    {...r} 
                                                    key={i}
                                                    onDoubleClick={() => this.editCooperativa(r, i)} 
                                                    delete={() => this.deleteCooperativa(i)} 
                                                />
                                            ) }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )
                }
                </FormValidate>
                <AddCooperativaPuntoVentaModal 
                    guardar={this.agregarCooperativa} 
                    {...this.state.modal} 
                    toggle={this.toggleModal} 
                    establecimientoLocalidad={this.state.establecimientoLocalidad}
                />
            </div>
        )
    }
}

class EditPuntoVenta extends React.Component {

    state = {
        data:{
            venta_offline: false,
            externo : false,
            puntoventa_cooperativas : [], 
           
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

    parseData(data){
        if(!data.externo){
            delete data.secuencial_tasa
            delete data.punto_emision_tasa
            delete data.cooperativa
        }
        return data
    }

    render(){
        const { id, data } = this.state
        return (
            <EditPage 
                title={`${id ? 'Editar' : 'Crear'} Punto de venta`} 
                data={data} 
                id={id} 
                urlFront={urlFront} 
                endpoint={endpoint} 
                history={this.props.history}
                parseData={this.parseData}
                key_permission="puntoventa"
            >
                <MainView {...data} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default EditPuntoVenta