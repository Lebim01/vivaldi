import React from 'react'
import { FormGroup, Input, Label, Tabs, FormValidate, EditPage, FormElementValidate } from 'temeforest'
import { baseurl, getParameter } from 'utils/url'
import axios from 'axios'
import { validate } from 'utils/validate'

import Fila from './DistribucionAsientos/Fila'

const emptyNivel = {
    nombre : '',
    filas : 0,
    asientos:[],
    asientos_desactivados:[]
}
const endpoint = 'busTipo'
const urlFront = '/cooperativas/distribucion-asientos/'

function getAsientos(nivel, _filas, init = false){
    const { filas, asientos } = nivel
    let _asientos = asientos

    // agregar filas
    if(filas < _filas || init){
        let filasNuevas = _filas - (init ? 0 : filas)
        for(let i  = 0; i < filasNuevas; i++){
            if(i === 0 && _asientos.length === 0){ // la primera fila que se agrega al array debe ser la que queda al final (debe ser 5 asientos)
                _asientos.unshift(
                    { },
                    { },
                    { },
                    { },
                    { }
                )
            }

            else {
                _asientos.unshift(
                    { },
                    { },
                    { },
                    { }
                )
            }
        }
    }

    // menos filas (elimina las filas de adelante hacia atras)
    else if(filas > _filas){
        // cantidad de filas a eliminar
        let filasMenos = filas-_filas 

        // elimina la cantidad de asientos equivalente a la cantidad de filas a eliminar multiplicada por 4
        _asientos = _asientos.reverse()
        _asientos.splice(0, (4*filasMenos))
        _asientos = _asientos.reverse()
    }
    return _asientos
}

class Piso extends React.Component {
    
    state = {
        _filas : []
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.filas !== prevProps.filas){
            if(this.props.filas !== prevState._filas.length){
                let _filas = []
                for(let i = 0; i < this.props.filas; i++) { _filas.push(1) }

                this.setState({
                    _filas
                })
            }
        }
    }

    toggleActivate = (indexAsiento) => {
        const { asientos_desactivados } = this.props
        if(asientos_desactivados.includes(indexAsiento)){
            let indexDesactivado = asientos_desactivados.indexOf(indexAsiento)
            asientos_desactivados.splice(indexDesactivado, 1)
        }else{
            asientos_desactivados.push(indexAsiento)
        }
        this.props.onChange('asientos_desactivados', asientos_desactivados)
    }

    onChange = (name, e) => {
        this.props.onChange(name, e.target.value)
    }

    render(){
        const { filas, asientos, asientos_desactivados } = this.props
        const { _filas } = this.state

        return (
            <div>  
                <FormElementValidate
                    label={{text:'Filas'}}
                    input={{
                        name : 'filas',
                        element: <Input type="number" min="1" max="20" modeNumber="positive_integer" onChange={(e) => this.onChange('filas', e)} value={filas} />
                    }}
                    validator={{
                        validationRules: { 
                            required : 'El campo es requerido', 
                            validate : validate({
                                number : "El valor debe ser un número"
                            }), 
                            min : { value: 1, message: 'El valor no puede ser menor a 1' }, 
                            max : { value: 20, message: 'El valor no puede ser mayor a 20' }
                        }
                    }}
                />

                <div style={{width:234, border:'1px solid black', margin:'10px auto'}}>
                    { _filas.map((j, index) => 
                        <Fila 
                            toggleActivate={this.toggleActivate} 
                            asientos={asientos} 
                            asientos_desactivados={asientos_desactivados} 
                            index={index} 
                            key={index} 
                            isLast={_filas.length == index+1} 
                        />
                    )}
                </div>
            </div>
        )
    }
}

class MainView extends React.Component {

    state = {
        tab : '0'
    }
    
    onChange = name => (e) => {
        if(this.props.onChange){
            this.props.onChange(name, e.target.value)
        }
    }

    onChange2 = (name, value) => {
        if(name == 'filas') this.changeFilas(value)
        else if(name === 'asientos_desactivados'){
            this.onChangeNivel(name, value)
        }
        else {
            this.props.onChange(name, value)
        }
    }

    onChangeNivel = (name, value) => {
        let tab = this.state.tab
        let niveles = this.props.niveles

        niveles[tab] = {
            ...niveles[tab],
            [name] : value
        }
        this.props.onChange('niveles', niveles)
    }

    changeFilas = (filas) => {
        if(filas <= 50){
            let niveles = this.props.niveles
            let piso = this.state.tab

            // set empty nivel
            if(!niveles[piso]){
                niveles[piso] = {
                    ...emptyNivel
                }
            }
            
            niveles[piso].asientos = getAsientos(niveles[piso], Number(filas))
            niveles[piso].filas = Number(filas)
            niveles[piso].asientos_desactivados = []
            this.props.onChange('niveles', niveles)
        }
    }

    changeTab = (tab) => {
        this.setState({
            tab
        })
    }

    validation = (data) => {

        let filasPorPiso = !data.niveles.some((piso) => {
            return Number(piso.filas) != 0 && (Number(piso.filas) <= 0 || Number(piso.filas) > 20)
        })

        if(!filasPorPiso){
            return {
                result : filasPorPiso,
                message : 'El numero de filas no puede ser mayor a 20'
            }
        }

        return true
    }

    parseData = (data) => {
        let _data = {
            nombre : data.nombre,
            capacidad : data.capacidad,
            id : data.id,
            filas : [],
            asientos_desactivados : [],
            asientos_disponibles : []
        }
        
        for(let i in data.niveles){
            let { filas, asientos_desactivados, asientos } = data.niveles[i]

            if(filas > 0){
                _data.filas.push(filas)
                _data.asientos_desactivados.push(asientos_desactivados)
                _data.asientos_disponibles.push(asientos)
            }
        }

        if(_data.filas.length > 1){
            let lenght1 = _data.asientos_desactivados[0].length
            let lenght2 = _data.asientos_desactivados[1].length

            if(lenght1 > lenght2){
                for(let i = 0; i < lenght1-lenght2; i++)
                    _data.asientos_desactivados[1].push(-1)
            }
            if(lenght2 > lenght1){
                for(let i = 0; i < lenght2-lenght1; i++)
                    _data.asientos_desactivados[0].push(-1)
            }
        }

        return _data
    }

    render(){
        const { tab } = this.state
        const { id, data, pisos, niveles } = this.props

        return (
            <EditPage 
                title={`${id ? 'Editar' : 'Crear'} Distribución de Asientos`} 
                data={data} 
                id={id}
                urlFront={urlFront} 
                endpoint={endpoint} 
                history={this.props.history}
                customValidation={this.validation}
                parseData={this.parseData}
                key_permission="bustipo"
            >
                <FormValidate className="mt-4 form-horizontal">
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
                </FormValidate>
            </EditPage>
        )
    }
}

class EditDistribucionAsientos extends React.Component {

    seleccione = [{label:'Seleccione', value:''}]
    state = {
        data:{
            nombre: '',
            niveles : [
                { ...emptyNivel },
                { ...emptyNivel }
            ]
        }, 
        pisos:[{ link:'0', text:'Piso 1' }, { link:'1', text:'Piso 2' }]
    }

    componentDidMount(){
        let id = getParameter('id')
        if(id){
            this.getData(id)
        }
    }

    getData = async (id) => {
        const { data } = await axios.get(`${baseurl}/${endpoint}/${id}/`)

        data.niveles = []
        for(let i in data.filas){
            data.niveles[i] = {
                filas : data.filas[i],
                asientos : [],
                asientos_desactivados : data.asientos_desactivados[i] || []
            }
            data.niveles[i].asientos = getAsientos(data.niveles[i], data.niveles[i].filas, true)
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

    render(){
        const { id, data, pisos } = this.state
        return (
            <MainView id={id} data={data} history={this.props.history} {...data} onChange={this.onChange} pisos={pisos} />
        )
    }
}

export default EditDistribucionAsientos