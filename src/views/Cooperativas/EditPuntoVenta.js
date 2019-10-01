import React from 'react'
import { Button, FormGroup, Input, Label, Select, FormElementValidate, FormValidate, EditPage } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import { generateHexadecimal } from 'utils/string'
import axios from 'axios'

const endpoint = 'venta/puntoventa'
const urlFront = '/cooperativas/punto-venta'

class MainView extends React.Component {

    state = {
        modal : {
            show : false
        }
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

    onChange = name => (e) => {
        if(this.props.onChange){
            if(e.target.type === 'checkbox'){
                if(name === 'externo' && !e.target.checked) {
                    this.props.onChange('cooperativa', '')
                }

                this.props.onChange(name, e.target.checked)
            }else{
                this.props.onChange(name, e.target.value)
            }
        }
    }

    generateHexadecimal = () => {
        this.props.onChange('api_key', generateHexadecimal(32))
    }

    render(){
        const { puntoventa_cooperativas } = this.props
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
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
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
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Localidad'}}
                        input={{
                            name : 'localidad',
                            element: <Select asyncOptions={this.optionsLocalidades} onChange={this.onChange('localidad')} value={this.props.localidad} />
                        }}
                        validator={{
                            validationRules: {required:true},
                            validationMessages: {required:"El campo es requerido"}
                        }}
                    />
                    <FormElementValidate
                        label={{text:'Dirección IP'}}
                        input={{
                            name : 'ip',
                            element: <Input onChange={this.onChange('ip')} value={this.props.ip} placeholder="0.0.0.0" />
                        }}
                        validator={{
                            validationRules: { required:true, ip : true },
                            validationMessages: { required:"El campo es requerido", ip:"El campo debe ser una IP"}
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
                    { this.props.externo &&
                        <FormElementValidate
                            label={{text:'Cooperativa'}}
                            input={{
                                name : 'cooperativa',
                                element: <Select asyncOptions={this.optionsCooperativas} onChange={this.onChange('cooperativa')} value={this.props.cooperativa} />
                            }}
                            validator={{
                                validationRules: {required:true},
                                validationMessages: {required:"El campo es requerido"}
                            }}
                        />
                    }
                </FormValidate>
            </div>
        )
    }
}

class EditPuntoVenta extends React.Component {

    state = {
        data:{
            venta_offline: false,
            externo : false,
            puntoventa_cooperativas : []
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
            >
                <MainView {...data} onChange={this.onChange} />
            </EditPage>
        )
    }
}

export default EditPuntoVenta