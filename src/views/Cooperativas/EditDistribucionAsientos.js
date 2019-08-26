import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Label, Tabs } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'

const emptyNivel = {
    nombre : '',
    filas : 0,
    asientos:[],
    asientos_desactivados:[]
}

function getAsientos(nivel, _filas, init = false){
    const { filas, asientos } = nivel
    let _asientos = asientos

    // agregar filas
    if(filas < _filas || init){
        let filasNuevas = _filas - (init ? 0 : filas)
        for(let i  = 0; i < filasNuevas; i++){
            _asientos = _asientos.concat([
                { index : _asientos.length, lado : 'V' },
                { index : _asientos.length+1, lado : 'P' },
                { index : _asientos.length+2, lado : 'P' },
                { index : _asientos.length+3, lado : 'V' }
            ])
        }
    }
    // menos filas
    else if(filas > _filas){
        let filasMenos = filas-_filas
        _asientos.splice(_asientos.length-(4*filasMenos), (4*filasMenos))
    }
    return _asientos
}


class DividerAsiento extends React.Component {
    render(){
        return (
            <div style={{display:'inline-block', marginLeft:3, marginRight:3}}>
                <div style={{height:40, width:40}}>
                </div>
            </div>
        )
    }
}
class Asiento extends React.Component {

    toggleActivate(){
        if(this.props.toggleActivate){
            this.props.toggleActivate(this.props.index)
        }
    }

    render(){
        const { type, lado, activate } = this.props
        let activateCss = {}
        if(activate){
            activateCss = {
                backgroundColor : '#4798e8',
                borderColor : '#4798e8',
                color: '#fff'
            }
        }
        return (
            <div style={{display:'inline-block', marginLeft:3, marginRight:3}}>
                <Button type={type} style={{height:40, width:40, ...activateCss}} onClick={this.toggleActivate.bind(this)}>
                    {lado}
                </Button>
            </div>
        )
    }
}

class Piso extends React.Component {

    constructor(props){
        super(props)
        this.toggleActivate = this.toggleActivate.bind(this)
    }

    toggleActivate(indexAsiento){
        const { asientos_desactivados } = this.props
        if(asientos_desactivados.includes(indexAsiento)){
            let indexDesactivado = asientos_desactivados.indexOf(indexAsiento)
            asientos_desactivados.splice(indexDesactivado, 1)
        }else{
            asientos_desactivados.push(indexAsiento)
        }
        this.props.onChange('asientos_desactivados', asientos_desactivados)
    }

    render(){
        const { filas, asientos, asientos_desactivados } = this.props

        let _filas = []
        for(let i = 0; i < filas; i++) { _filas.push(1) }

        return (
            <div>
                <FormGroup className="row">
                    <Label className="col-sm-3">Filas</Label>
                    <div className="col-sm-5">
                        <Input type="number" min="1" onChange={(e) => this.props.onChange('filas', e.target.value)} value={filas} />
                    </div>
                </FormGroup>
                <div style={{width:234, border:'1px solid black', margin:'10px auto'}}>
                    { _filas.map((j, index) => 
                        <div className="fila" key={index}>
                            { asientos.slice(index*4, index*4+4).map((a,i) => (
                                <div style={{display:'inline-block'}} key={i}>
                                    <Asiento type={!asientos_desactivados.includes(a.index) ? 'info' : 'danger'} {...a} toggleActivate={this.toggleActivate} />
                                    { i == 1 && <DividerAsiento /> }
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

class MainView extends React.Component {

    state = {
        tab : 0
    }
    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.changeFilas = this.changeFilas.bind(this)
        this.changeTab = this.changeTab.bind(this)
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    onChange2 = (name, value) => {
        if(name == 'filas') this.changeFilas(value)
        else {
            this.props.onChange(name, value)
        }
    }

    changeFilas = (filas) => {
        let niveles = this.props.niveles
        let piso = this.state.tab

        // set empty nivel
        if(!niveles[piso]){
            niveles[piso] = emptyNivel
        }

        niveles[piso].asientos = getAsientos(niveles[piso], Number(filas))
        niveles[piso].filas = Number(filas)
        this.props.onChange('niveles', niveles)
    }

    changeTab(tab){
        this.setState({
            tab
        })
    }

    render(){
        const { tab } = this.state
        const { pisos, niveles } = this.props
        return (
            <div>
                <form className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Distribución</Label>
                        <div className="col-sm-5">
                            <Input onChange={this.onChange('nombre')} value={this.props.nombre} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-8">
                            <Tabs tab={tab} tabs={pisos} onClickTab={this.changeTab} />
                            <br />
                            <Piso {...niveles[tab]} onChange={this.onChange2} />
                        </div>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

class EditDistribucionAsientos extends React.Component {

    seleccione = [{label:'Seleccione', value:''}]
    state = {
        data:{
            nombre: '',
            niveles : [
                emptyNivel,
                emptyNivel
            ]
        }, 
        pisos:[{ link:'0', text:'Piso 1' }, { link:'1', text:'Piso 2' }]
    }

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.confirmSave = this.confirmSave.bind(this)
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/busTipo/${id}/`)
        for(let i in data.niveles){
            data.niveles[i].asientos = []
            data.niveles[i].asientos = getAsientos(data.niveles[i], data.niveles[i].filas, true)
        }
        this.setState({
            id,
            data
        })
    }

    onChange(name, value){
        let data = this.state.data
        data[name] = value
        this.setState({
            data
        })
    }

    confirmSave(){
        const { id, data } = this.state
        Swal.fire({
            title: 'Confirmar Guardar',
            text : '¿Seguro de guardar?',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${baseurl}/busTipo/${id ? `${id}/` : ``}`, data)
                .then(response => {
                    if (response.status !== 200 && response.status !== 201) {
                        throw new Error(response.statusText)
                    }
                    return response
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Petición fallida: ${error}`
                    )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    text : `Guardado`,
                    type : 'success'
                })
                this.props.history.push('/cooperativas/distribucion-asientos/')
            }
        })
    }

    confirmDelete(){
        const { id, data } = this.state
        if(id){
            Swal.fire({
                title: 'Confirmar Eliminar',
                text : '¿Seguro de eliminar?',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return axios.delete(`${baseurl}/busTipo/${id}`, data)
                    .then(response => {
                        if (response.status !== 204) {
                            throw new Error(response.statusText)
                        }
                        return response
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Petición fallida: ${error}`
                        )
                    })
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then(() => {
                Swal.fire({
                    text : `Eliminado`,
                    type : 'success'
                })
                this.props.history.push('/cooperativas/distribucion-asientos/')
            })
        }
    }

    render(){
        const { id, data, pisos } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Crear/Editar Distribucion de Asientos</CardTitle>
                                <CardBody>
                                    <MainView {...data} onChange={this.onChange} pisos={pisos} />
                                </CardBody>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <Button type="success" style={{marginRight:5}} onClick={() => this.confirmSave() }>Guardar</Button>
                                        <Button type="danger" style={{marginLeft:5}} disabled={!id} onClick={() => this.confirmDelete()}>Eliminar</Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EditDistribucionAsientos