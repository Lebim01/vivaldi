import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, Button, FormGroup, Input, Label, Tabs } from './../../temeforest'
import { baseurl, getParameter } from './../../utils/url'
import axios from 'axios'
import Swal from 'sweetalert2'

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
                <Button outline={true} type={type} style={{height:40, width:40, ...activateCss}}>
                    {lado}
                </Button>
            </div>
        )
    }
}

class Piso extends React.Component {
    render(){
        const { filas } = this.props

        let _filas = []
        for(let i = 0; i < filas; i++) { _filas.push(1) }

        return (
            <div>
                <FormGroup className="row">
                    <Label className="col-sm-3">Filas</Label>
                    <div className="col-sm-5">
                        <Input type="number" min="1" onChange={this.props.onChange} value={filas} />
                    </div>
                </FormGroup>
                <div style={{width:234, border:'1px solid black', margin:'10px auto'}}>
                    { _filas.map(() => 
                        <div className="fila">
                            <Asiento type="info" lado={'V'} />
                            <Asiento type="info" lado={'P'} />
                            <DividerAsiento />
                            <Asiento type="info" lado={'P'} />
                            <Asiento type="info" lado={'V'} />
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
        this.changeFilas = this.changeFilas.bind(this)
        this.changeTab = this.changeTab.bind(this)
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    changeFilas = (e) => {
        let niveles = this.props.niveles
        let piso = this.state.tab
        niveles[piso].filas = Number(e.target.value)
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
                            <Piso {...niveles[tab]} onChange={this.changeFilas} />
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
                {
                    nombre : '',
                    filas : 1,
                },
                {
                    nombre : '',
                    filas : 0,
                }
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

    render(){
        const { data, pisos } = this.state
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
                                        <Button type="danger" style={{marginLeft:5}}>Eliminar</Button>
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