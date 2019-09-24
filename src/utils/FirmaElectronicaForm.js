import React from 'react'
import { Badge  } from 'reactstrap';
import { FormGroup, Input, Label, FormValidate, Button } from './../temeforest';
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

    _onChangeFile = (e) => {
        if(this.props.onChangeFile){
            this.props.onChangeFile(e.target.files[0])
        }
    }

    UploadFile = (e) => {
        let el = document.getElementById("firma_electronica");
        if (el) {
            el.click();
        }
    }

    render(){
        return (
            <div>
                <FormValidate className="mt-4 form-horizontal">
                    <FormGroup className="row">
                        <Label className="col-sm-3">Archivo Firma</Label>
                        <div className="col-sm-5">
                            <Input id="firma_electronica" type="file" style={{display:'none'}} onChange={this._onChangeFile} helperText="Archivo p12 o pfx"/>
                            <Button type="success" style={{marginRight:5}} onClick={this.UploadFile}>Subir Firma</Button>
                        </div>
                        { this.props.file_firma_exist && 
                            <div className="col-sm-4">
                                <Badge className="mr-2" color="info">Ya existe una firma subida.</Badge>
                            </div>
                        }
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