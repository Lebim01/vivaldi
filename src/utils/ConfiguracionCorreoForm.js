import React from 'react'
import { FormGroup, Input, Label, FormValidate } from './../temeforest';
import 'react-dual-listbox/lib/react-dual-listbox.css';

class ConfiguracionCorreoForm extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            tab: 3,
        }
    }

    onChange = name => (e) => {
        if(this.props.onChange){
            let value = e.target.value
            if(e.target.type === 'checkbox'){
                value = !this.props[name]
            }
            this.props.onChange(name, value)
        }
    }

    render(){
        return(
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Host</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.host} onChange={this.onChange('host')}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Puerto</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.port} onChange={this.onChange('port')} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Usuario</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.usuario} onChange={this.onChange('usuario')} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Clave</Label>
                        <div className="col-sm-5">
                            <Input type="password" value={this.props.clave} onChange={this.onChange('clave')} />
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3" htmlFor="tls">Tls</Label>
                        <div className="col-sm-5">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="tls" name="tls" checked={this.props.tls} onChange={this.onChange('tls')} />
                                <Label onlyClassName="custom-control-label" htmlFor={`tls`}></Label>
                            </div>
                        </div>
                    </FormGroup>
                </FormValidate>
            </div>
        )
    }
}

export default ConfiguracionCorreoForm