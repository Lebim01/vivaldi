import React, { Component } from 'react';
import './Login.css'
import store from './../../../store/auth'
import axios from 'axios'

class Login extends Component {

    state = {
        user : '',
        pass : ''
    }

    constructor(props){
        super(props)
        this.login = this.login.bind(this)
    }

    login(e){
        e.preventDefault()
        const { user, pass } = this.state
        if(!user || !pass){
            this.setState({ noValid : true })
        }else{
            this.setState({ noValid : false })
        }
    }

    onChange = name => (e) => {
        this.setState({
            noValid : false,
            [name] : e.target.value
        })
    }

    render() {
        const { user, pass, noValid } = this.state
        return (
            <div className="auth-wrapper d-flex no-block justify-content-center align-items-center" 
                style={{background:'url(../../assets/images/big/auth-bg.jpg) no-repeat center center'}}>
                <div className="auth-box">
                    <div id="loginform">
                        <div className="logo">
                            <span className="db"><img src="../../assets/images/logo-icon.png" alt="logo" /></span>
                            <h5 className="font-medium m-b-20">Ingresar al Administrador</h5>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <form className="form-horizontal m-t-20" id="loginform">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><i className="ti-user"></i></span>
                                        </div>
                                        <input type="text" className="form-control form-control-lg" placeholder="Usuario" aria-label="Usuario" aria-describedby="basic-addon1" onChange={this.onChange('user')} value={user} />
                                    </div>
                                    { noValid && !user && <span className="form-text text-danger">Campo requerido</span> }
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon2"><i className="ti-pencil"></i></span>
                                        </div>
                                        <input type="password" className="form-control form-control-lg" placeholder="Contraseña" aria-label="Contraseña" aria-describedby="basic-addon1" onChange={this.onChange('pass')} value={pass} />
                                    </div>
                                    { noValid && !pass && <span className="form-text text-danger">Campo requerido</span> }
                                    
                                    <div className="form-group row hide">
                                        <div className="col-md-12">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" for="customCheck1">Remember me</label>
                                                <a href="javascript:void(0)" id="to-recover" className="text-dark float-right"><i className="fa fa-lock m-r-5"></i> Forgot pwd?</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group text-center">
                                        <div className="col-xs-12 p-b-20">
                                            <button className="btn btn-block btn-lg btn-info" onClick={(e) => this.login(e)}>Ingresar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
