import React from 'react'
import { FormGroup, Input, Select, Label, DualList, FormElementValidate, FormValidate, EditPage } from './../temeforest';
import 'react-dual-listbox/lib/react-dual-listbox.css';

class FirmaElectronicaForm extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            tab: 2,
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
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Archivo Firma</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.file_firma} onChange={this.onChange('file_firma')} type="file" helperText="Archivo p12 o pfx"/>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Clave firma</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.clave_firma} onChange={this.onChange('clave_firma')} type="password"/>
                        </div>
                    </FormGroup>
                    <FormGroup className="row">
                        <Label className="col-sm-3">Reingreso clave firma</Label>
                        <div className="col-sm-5">
                            <Input value={this.props.reclave_firma} onChange={this.onChange('reclave_firma')} type="password" />
                        </div>
                    </FormGroup>
                </FormValidate>
            </div>
        )
    }

}

export default FirmaElectronicaForm