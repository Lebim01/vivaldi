import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, TabContent, TabPane } from 'reactstrap';
import { Button, FormGroup, Label, FormValidate, RSelect, Tabs, InputIcon } from 'temeforest'
import { baseurl, getResults } from 'utils/url'

// positivos decimal
const pattern = /[(\d+\.\d)|]/
class AddParadaModal extends React.Component {

    state = { errors: [], data: {}, ciudades: [], tipos_servicio: [], tipos_clientes: [], tab: "1" }

    optionsParada = {
        url : `${baseurl}/ciudad/`,
        labelName: 'nombre',
        valueName: 'id'
    }
    
    componentDidMount(){
        this.loadOptionsCiudades()
        this.getTiposServicios()
        this.getTiposClientes()
    }

    componentDidUpdate(prevProps){
        if(prevProps.show !== this.props.show && this.props.show){
            this.decodeTarifas()
        }
    }

    decodeTarifas(){
        const { tarifas } = this.state.data

        let _tarifas = {}

        for(let i in tarifas){
            const { tipo_servicio, tipo_cliente, tarifa } = tarifas[i]

            if(!_tarifas[tipo_servicio]) _tarifas[tipo_servicio] = {}

            _tarifas[tipo_servicio][tipo_cliente] = tarifa
        }

        this.setState({
            data : {
                ...this.state.data,
                tarifas : _tarifas
            }
        })
    }

    encodeTarifas(){
        const { tarifas } = this.state.data

        let _tarifas = []

        for(let tipo_servicio in tarifas){
            for(let tipo_cliente in tarifas[tipo_servicio]){
                _tarifas.push({
                    tipo_servicio,
                    tipo_cliente,
                    tarifa : tarifas[tipo_servicio][tipo_cliente]
                })
            }
        }

        return _tarifas
    }

    loadOptionsCiudades = async () => {
        const {url, labelName, valueName} = this.optionsParada
        const results = await getResults(url)
        this.setState({
            ciudades : results.map((row) => ({ label: row[labelName], value: row[valueName] }))
        })
    }

    componentWillReceiveProps(props){
        const { show, ...data } = props
        this.setState({
            ...data,
            errors: []
        })
    }

    onChange = name => (e) => {
        if(['tarifa_normal', 'tarifa_media', 'tarifa_ejecuta_normal', 'tarifa_ejecuta_media'].indexOf(name) !== -1){
            if(`${e.target.value}`.search(pattern) !== 0) return false
        }

        let data = this.state.data
        data[name] = e.target.value

        this.setState({
            data
        })
    }

    onChangeTarifa = (tipo_servicio, tipo_cliente) => e => {
        let _data = { ...this.state.data }
        
        if(!_data.tarifas) _data.tarifas = {}
        if(!_data.tarifas[tipo_servicio]) _data.tarifas[tipo_servicio] = {}
        _data.tarifas[tipo_servicio][tipo_cliente] = e.target.value
        
        this.setState({
            data : _data
        })
    }

    onSaveData = (name, value) => {
        let data = this.state.data
        data[name] = value
        this.setState({
            data
        })
    }

    toggle = () => {
        if(this.props.toggle){
            this.props.toggle()
        }
    }

    guardar = () => {
        const { ciudad, ciudad_nombre, index, id } = this.state.data

        if(!ciudad){
            this.setState({
                errors : [
                    'ciudad'
                ]
            })
            return
        }

        if(this.props.guardar){
            let _tarifas = this.encodeTarifas()

            let _exito = this.props.guardar({ ciudad, ciudad_nombre, tarifas : _tarifas, index, id})
            if(_exito){
                this.setState({
                    data : {},
                    errors: []
                })
            }else{
                this.setState({
                    errors : ['repetido']
                })
            }
        }
    }

    changeTab = (tab) => {
        this.setState({tab})
    }

    getTiposServicios = async () => {
        const results = await getResults(`${baseurl}/tipoServicio/`, true)
        this.setState({
            tipos_servicio: results
        })
    }

    getTiposClientes = async () => {
        const results = await getResults(`${baseurl}/tipoCliente/`, true)
        this.setState({
            tipos_clientes: results
        })
    }

    render(){
        const { errors, tipos_servicio, tipos_clientes, data } = this.state
        const { tarifas } = data

        const tabs = tipos_servicio.map((row) => ({ link: `${row.id}`, text: row.nombre }))

        return (
            <Modal isOpen={this.props.show} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Agregar Parada</ModalHeader>
                <ModalBody>
                    <FormValidate className="mt-4 form-horizontal">
                        { errors.includes('repetido') &&
                            <div className="alert alert-danger">
                                No se puede duplicar paradas
                            </div>
                        }
                        <FormGroup className="row">
                            <Label className="col-sm-4">Parada</Label>
                            <div className="col-sm-6">
                                <RSelect asyncOptions={this.optionsParada} onChange={(value, label) => { this.onSaveData('ciudad', value); this.onSaveData('ciudad_nombre', label)}} value={this.state.data.ciudad} />
                                {errors.includes('ciudad') && <span className="text-danger">Este campo es requerido</span>}
                            </div>
                        </FormGroup>
                        
                        <Tabs tab={this.state.tab} tabs={tabs} onClickTab={this.changeTab}/>
                        <TabContent activeTab={this.state.tab}>
                            {tipos_servicio.map((tipo_servicio) => 
                                <TabPane tabId={`${tipo_servicio.id}`}>
                                    
                                    <br/>
                                    { tipos_clientes.map((tipo_cliente) => 
                                        <FormGroup className="row">
                                            <Label className="col-sm-4">{tipo_cliente.nombre}</Label>
                                            <div className="col-sm-6">
                                                <InputIcon
                                                    icon={<i className="fas fa-dollar-sign"/>} 
                                                    type="number" 
                                                    step="0.1" 
                                                    onChange={this.onChangeTarifa(tipo_servicio.id, tipo_cliente.id)} 
                                                    value={
                                                        tarifas && tarifas[tipo_servicio.id]
                                                            ? tarifas[tipo_servicio.id][tipo_cliente.id]
                                                            : ''
                                                    } 
                                                />
                                            </div>
                                        </FormGroup>
                                    )}

                                </TabPane>
                            )}
                        </TabContent>

                    </FormValidate>
                </ModalBody>
                <ModalFooter>
                    <Button type="success" onClick={this.guardar}>Aceptar</Button>{' '}
                    <Button type="secondary" onClick={this.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default AddParadaModal