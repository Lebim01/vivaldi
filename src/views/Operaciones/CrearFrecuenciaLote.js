import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Select, Label, FormValidate, Permission } from 'temeforest'
import { baseurl, getParameter, objectToUrl } from 'utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

const endpoint = 'frecuencia'
const dias = [
    'Lunes',
    'Martes',
    'Miercolés',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
]

class MainView extends React.Component {

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    optionsRutas = (obj) => {
        return {
            url : `${baseurl}/ruta/${objectToUrl(obj)}`,
            labelName: 'nombre',
            valueName: 'id'
        }
    }
    optionsLocalidad = {
        url: `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName : 'id'
    }
    optionsDestinos = {
        url : `${baseurl}/ciudad/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    tipos = [
        { value: '', label : 'Seleccione' },
        { value: 1, label : 'Normal' },
        { value: 2, label : 'Extraordinaria' },
    ]

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    onChangeDias = index => {
        let _dias = this.props.dias


        if(_dias.includes(index)){
            _dias.splice(_dias.indexOf(index), 1)
        }else{
            _dias.push(index)
        }

        this.props.onChange('dias', _dias)
    }

    render(){
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Hora inicio</Label>
                        <div className="col-sm-5">
                            <Input className="no-clear" type="time" onChange={this.onChange('hora_inicio')} value={this.props.hora_inicio} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Intervalo</Label>
                        <div className="col-sm-5">
                            <div className="row">
                                <div className="col-sm-4">
                                    <input type="number" className="form-control" min="0" max="12" placeholder="00" value={this.props.intervalo_hora} onChange={this.onChange('intervalo_hora')} title="horas" />
                                </div>
                                <div className="col-sm-1">
                                    :
                                </div>
                                <div className="col-sm-4">
                                    <input type="number" className="form-control" min="0" max="59" placeholder="00" value={this.props.intervalo_minuto} onChange={this.onChange('intervalo_minuto')} title="minutos" />
                                </div>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Hora fin</Label>
                        <div className="col-sm-5">
                            <Input className="no-clear" type="time" onChange={this.onChange('hora_fin')} value={this.props.hora_fin} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Localidad</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('localidad')} value={this.props.localidad} asyncOptions={this.optionsLocalidad}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Cooperativa</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('cooperativa')} defaultOption="Todos" value={this.props.cooperativa} asyncOptions={this.optionsCooperativa} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Destino</Label>
                        <div className="col-sm-5">
                            <Select 
                                { ...this.props.cooperativa
                                    ? { asyncOptions : this.optionsRutas({ cooperativa: this.props.cooperativa })  }
                                    : { options : [{ label : 'Seleccione una cooperativa', value : '' }] }
                                }
                                onChange={this.onChange('ruta')} 
                                value={this.props.ruta}
                                id="cmb_ruta"
                            />
                        </div>
                    </FormGroup>

                    <FormGroup className="row">
                        <Label className="col-sm-3">Tipo</Label>
                        <div className="col-sm-5">
                            <Select onChange={this.onChange('tipo')} value={this.props.tipo} options={this.tipos} />
                        </div>
                    </FormGroup>
                    { Number(this.props.tipo) === 1 &&
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <FormGroup className="row">
                                    { dias.map((nombre, index) =>
                                        <div className="col-sm-3">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id={nombre} name={nombre} checked={this.props.dias.includes(index)} onChange={() => this.onChangeDias(index)} />
                                                <Label onlyClassName="custom-control-label" htmlFor={nombre}>{nombre}</Label>
                                            </div>
                                        </div>
                                    )}
                                </FormGroup>
                            </div>
                        </div>
                    }
                    { Number(this.props.tipo) === 2 &&
                        <FormGroup className="row">
                            <Label className="col-sm-3">Fecha</Label>
                            <div className="col-sm-5">
                                <Input className="no-clear" type="date" onChange={this.onChange('fecha_validez')} value={this.props.fecha_validez} />
                            </div>
                        </FormGroup>
                    }
                </FormValidate>
            </div>
        )
    }
}

class CrearFrecuenciaLote extends React.Component {

    state = {
        id : null,
        data : {
            intervalo_hora: 0,
            intervalo_minuto: 10,
            dias : [
              0,1,2,3,4,5,6
            ]
        },
        loading: false,
        loadingMessage : ''
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}`)
        this.setState({
            id,
            data
        }, ()=> this.setDestino())
    }

    onChange = (name, value) => {
        let data = this.state.data
        data[name] = value
        if(name === 'ruta') this.setDestino()
        if(name === 'tipo') if(value == 1) data.fecha_validez = null
        this.setState({
            data
        })
    }

    setDestino = () => {
        setTimeout(() => {
            let select = document.getElementById('cmb_ruta')
            let index = select.selectedIndex
            if(index > 0){
                this.onChange('destino', select.options[index].text)
            }else{
                this.onChange('destino', '')
            }
        }, 500)
    }

    confirmSave = async () => {
        const { data } = this.state

        try {
            if(!data.hora_inicio || (!data.intervalo_hora && !data.intervalo_minuto) || !data.hora_fin) throw 'Favor de llenar todos los campos'
            let cantidad_registros_por_crear = 0
            let intervalo = moment.duration(`${data.intervalo_hora}:${data.intervalo_minuto}`);
            let fecha_fin = moment(`${moment().format('YYYY-MM-DD')} ${data.hora_fin}`)
            let fecha_temp = moment(`${moment().format('YYYY-MM-DD')} ${data.hora_inicio}`)

            do {
                cantidad_registros_por_crear++
                fecha_temp.add(intervalo)
            }
            while(fecha_fin.isAfter(fecha_temp) || fecha_fin.isSame(fecha_temp))

            const {value} = await Swal.fire({
                title: 'Confirmar Guardar',
                text : `Usted va a crear ${cantidad_registros_por_crear} cantidad de frecuencias`,
                showCancelButton: true,
            })
            if(value){
                this.guardarFrecuencias()
            }
        }catch(e){
            Swal.fire('Guardar', e, 'error')
        }
    }

    guardarFrecuencias = async () => {
        this.setState({ loading: true, loadingMessage : 'Generando frecuencias...' })

        try {
            const { data } = this.state
            const { hora_fin, hora_inicio, intervalo_hora, intervalo_minuto, ...frecuenciaData } = this.state.data
            let _intervalo = moment.duration(`${data.intervalo_hora}:${data.intervalo_minuto}`);
            let fecha_fin = moment(`${moment().format('YYYY-MM-DD')} ${data.hora_fin}`)
            let fecha_temp = moment(`${moment().format('YYYY-MM-DD')} ${data.hora_inicio}`)

            do{
                await this.guardarFrecuencia({ ...frecuenciaData, hora_salida: fecha_temp.format('HH:mm:ss') })
                fecha_temp.add(_intervalo)
            }
            while(fecha_fin.isAfter(fecha_temp) || fecha_fin.isSame(fecha_temp))

            Swal.fire('Guardar frecuencias lote', 'Guardado', 'success')
            this.props.history.push('/operaciones/frecuencias')
        }catch(e){
            Swal.fire('Error', 'contacte a soporte', 'error')
        }finally {
            this.setState({
                loading: false,
                loadingMessage : ''
            })
        }
    }

    guardarFrecuencia = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(`${baseurl}/${endpoint}/`, data)
            .then(response => {
                if (response.status !== 200 && response.status !== 201) {
                    throw new Error(response.statusText)
                }
                resolve(response)
            })
            .catch(error => {
                Swal.showValidationMessage(
                    `Petición fallida: ${error}`
                )
                reject()
            })
        })
    }

    render(){
        const { data, id } = this.state
        return (
            <Permission key_permission="add_frecuencia" mode="redirect">
                <BlockUi tag="div" blocking={this.state.loading} message={this.state.loadingMessage}>
                    <div className="animated fadeIn">
                        <Row>
                            <Col xs="12" md="12">
                                <Card>
                                    <CardBody>
                                        <CardTitle>Creación Masiva de Frecuencias</CardTitle>
                                        <CardBody>
                                            <MainView {...data} onChange={this.onChange} />
                                        </CardBody>
                                        <div className="row">
                                            <div className="col-sm-12 text-center">
                                                <Button type="success" style={{marginRight:5}} onClick={() => this.confirmSave() }>Guardar</Button>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </BlockUi>
            </Permission>
        )
    }
}

export default CrearFrecuenciaLote
