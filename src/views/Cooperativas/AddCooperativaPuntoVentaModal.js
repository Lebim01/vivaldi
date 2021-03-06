import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, FormGroup, Input, Label, Select , FormValidate} from 'temeforest'
import { baseurl } from 'utils/url'

//const endpoint = 'venta/puntoventa' 
const endpoint = 'localidad'
const urlFront = '/cooperativas/buses'

class AddCooperativaPuntoVentaModal extends React.Component {

    state = {
        errors : [],
        data : {
            punto_emision_tasa : '',
            secuencia_tasa : ''
        }, 
    }

    optionsBusTipos = {
        url : `${baseurl}/busTipo/`,
        labelName: 'nombre',
        valueName: 'id',
        optionProps: ['capacidad']
    }

    optionsCooperativa = {
        url : `${baseurl}/cooperativa/`,
        labelName: 'nombre',
        valueName: 'id'
    }

    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id', 
        optionProps: ['establecimiento']
    }

    componentDidUpdate(prevProps){
        if(prevProps.show !== this.props.show && this.props.show){
            const { id, cooperativa, cooperativa_nombre, punto_emision_tasa='', secuencia_tasa='', punto_emision_boleto='', secuencia_boleto='', punto_emision_nota_credito='', secuencia_nota_credito='', establecimiento='', index } = this.props
            this.setState({
                data : {
                    id, cooperativa, cooperativa_nombre, punto_emision_tasa, secuencia_tasa, punto_emision_boleto, secuencia_boleto, punto_emision_nota_credito, secuencia_nota_credito, establecimiento, index
                }
            })
        }
    }

    toggle = () => {
        if(this.props.toggle){
            this.props.toggle()
        }
    }

    getCooperativaName = (e) => {

        let options = e.target.options
        for(let i in options){
            let opt = options[i]
            if(Number(opt.value) === Number(e.target.value)){
                return opt.label
            }
        }
        return ''
    }


    onChange = name => (e) => {
        let data = this.state.data
        data[name] = e.target.value
        if(name === 'cooperativa') data.cooperativa_nombre = this.getCooperativaName(e)
        this.setState({
            data
        })
    }       

    guardar = () => {
        const required = ['cooperativa', 'punto_emision_tasa', 'secuencia_tasa', 'punto_emision_boleto', 'secuencia_boleto', 'punto_emision_nota_credito', 'secuencia_nota_credito', 'establecimiento']
        let errors = []
        for(let i in required){
            if(!this.state.data[required[i]]){
                errors.push(required[i])
            }
        }
        if(errors.length === 0){
            if(this.props.guardar){
                this.props.guardar(this.state.data)
            }
        }else{
            this.setState({
                errors
            })
        }
    }
    

    render(){
        const { errors} = this.state
        const { establecimientoLocalidad } = this.props
        return (
            <Modal isOpen={this.props.show} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Agregar Cooperativa</ModalHeader>
                <ModalBody>
                    <FormValidate className="mt-4 form-horizontal">
                        <FormGroup className="row">
                            <Label className="col-sm-6">Cooperativa</Label>
                            <div className="col-sm-6">
                                <Select asyncOptions={this.optionsCooperativa} defaultOptions="Todos" onChange={this.onChange('cooperativa')} value={this.state.data.cooperativa} error={errors.includes('cooperativa')} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Establecimiento</Label>
                            <div className="col-sm-6">
                                <Input type="number"  onChange={this.onChange('establecimiento')} value={this.state.data.establecimiento} error={errors.includes('establecimiento')} min="1" max="999"/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Punto de emisi??n (boleto)</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('punto_emision_boleto')} value={this.state.data.punto_emision_boleto} error={errors.includes('punto_emision_boleto')} min="1" max="999"  />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Secuencia (boleto)</Label>
                            <div className="col-sm-6">
                                <Input type="number" id="secuenciaUna" onChange={this.onChange('secuencia_boleto')} value={this.state.data.secuencia_boleto} error={errors.includes('secuencia_boleto')} min="1" max="999999999" />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                                <Label className="col-sm-6">No. de factura (boleto)</Label>
                                
                                <Label style={{width:"100%",textAlign:"left", flex: 1}} className="col-sm-6">
                                    {(this.state.data.establecimiento || '').padStart(3, '0')}
                                    -
                                    {(`${this.state.data.punto_emision_boleto}` || '').padStart(3, '0')}
                                    -
                                    {(`${this.state.data.secuencia_boleto}` || '').padStart(9, '0')}
                                </Label>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Punto de emisi??n (nota de cr??dito)</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('punto_emision_nota_credito')} value={this.state.data.punto_emision_nota_credito} error={errors.includes('punto_emision_nota_credito')} min="1" max="999" />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Secuencia (nota de cr??dito)</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('secuencia_nota_credito')} value={this.state.data.secuencia_nota_credito} error={errors.includes('secuencia_nota_credito')} min="1" max="999999999"/>
                            </div>
                        </FormGroup>
                          <FormGroup className="row">
                                <Label className="col-sm-6">No. de Nota de cr??dito (nota de cr??dito)</Label>
                                
                                <Label style={{border:"none",width:"100%",textAlign:"left", flex: 1}} className="col-sm-6">
                                    {(this.state.data.establecimiento || '').padStart(3, '0')}
                                    -
                                    {(`${this.state.data.punto_emision_nota_credito}` || '').padStart(3, '0')}
                                    -
                                    {(`${this.state.data.secuencia_nota_credito}` || '').padStart(9, '0')}
                                </Label>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Punto de emisi??n (tasa)</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('punto_emision_tasa')} value={this.state.data.punto_emision_tasa} error={errors.includes('punto_emision_tasa')} min="1" max="999" />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">Secuencia (tasa)</Label>
                            <div className="col-sm-6">
                                <Input type="number" onChange={this.onChange('secuencia_tasa')} name="fee" value={this.state.data.secuencia_tasa} error={errors.includes('secuencia_tasa')} min="1" max="999999999"/>
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-sm-6">No. de Factura(tasa)</Label>
                            
                            <Label style={{border:"none",width:"100%",textAlign:"left"}} className="col-sm-6">
                                {''}
                                {(this.props.establecimientoLocalidad || '').padStart(3, '0')}
                                -
                                {(`${this.state.data.punto_emision_tasa}` || '').padStart(3, '0')}
                                -
                                {(`${this.state.data.secuencia_tasa}` || '').padStart(9, '0')}
                            </Label>
                        </FormGroup>
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

AddCooperativaPuntoVentaModal.defaultProps = {
    show : false
}



export default AddCooperativaPuntoVentaModal