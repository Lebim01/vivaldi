import React from 'react'
import './Login2.css'
import { store } from './../../../store/auth'
import axios from 'axios'
import { baseurl } from './../../../utils/url'

class Login2 extends React.Component {

    constructor(props){
        super(props)
        this.login = this.login.bind(this)
    }

    login = async (e) => {
        e.preventDefault()
        const { user, pass } = this.state
        if(!user || !pass){
            this.setState({ noValid : true })
        }else{
            this.setState({ noValid : false })
            try {
                let { data } = await axios.post(`${baseurl}/token-auth/`, { username: user, password: pass })
                if(data.token){
                    store.dispatch({
                        type : 'LOGIN',
                        token : data.token
                    })
                    this.props.history.push('/#/cooperativas')
                }
            }
            catch(e){
                this.setState({
                    error : 'Usuario o Contraseña invalidos',
                    noValid : true
                })
            }
        }
    }

    onChange = name => (e) => {
        this.setState({
            noValid : false,
            error : '',
            [name] : e.target.value
        })
    }

    render(){
        return (
            <div className="auth-wrapper d-flex no-block justify-content-center align-items-center container-login">
                <div className="auth-box on-sidebar" style={{'max-width' : 500, padding: 50, 'padding-top' : 100}}>
                    <div id="loginform">
                        <div className="logo">
                            <span className="db"><img src="../../assets/img/LOGO-ICON-TEXTO.png" height="50" alt="logo"/></span>
                            <h5 className="font-medium m-b-20">Ingresa a tu cuenta</h5>
                            <h6 className="font-medium m-b-20 font-blue">El sistema contable más vendido en todo Ecuador</h6>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <form className="form-horizontal m-t-20" id="loginform" action="index.html">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><i className="ti-user"></i></span>
                                        </div>
                                        <input type="text" className="form-control form-control-lg" placeholder="Usuario" aria-label="Usuario" aria-describedby="basic-addon1" onChange={this.onChange('user')} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon2"><i className="ti-pencil"></i></span>
                                        </div>
                                        <input type="password" className="form-control form-control-lg" placeholder="Contraseña" aria-label="Contraseña" aria-describedby="basic-addon1" onChange={this.onChange('pass')} />
                                    </div>
                                    
                                    <div className="form-group text-center">
                                        <div className="col-xs-12 p-b-20">
                                            <button className="btn btn-block btn-lg btn-info" type="submit" onClick={(e) => this.login(e)}>Ingresar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div id="recoverform">
                        <div className="logo">
                            <span className="db"><img src="../../assets/images/logo-icon.png" alt="logo"/></span>
                            <h5 className="font-medium m-b-20">Recover Password</h5>
                            <span>Enter your Email and instructions will be sent to you!</span>
                        </div>
                        <div className="row m-t-20">
                            <form className="col-12" action="index.html">
                                <div className="form-group row">
                                    <div className="col-12">
                                        <input className="form-control form-control-lg" type="email" required="" placeholder="Username"/>
                                    </div>
                                </div>
                                <div className="row m-t-20">
                                    <div className="col-12">
                                        <button className="btn btn-block btn-lg btn-danger" type="submit" name="action">Reset</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login2
