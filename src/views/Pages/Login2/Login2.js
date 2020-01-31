import React from 'react'
import './Login2.css'
import { store } from 'store/auth'
import { baseurl } from 'utils/url'
import axios from 'axios'

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

class Login2 extends React.Component {

    state = {
        loading: false,
        error: '',
        noValid: false,
        auth : false
    }
    unsubscribe = null

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            let state = store.getState()

            if(!this.state.auth && state.auth){
                this.setState({
                    auth : true
                })
                store.dispatch({
                    type : 'AUTH-SUCCESS'
                })
            }

            if(state.auth && (state.user_info.permissions || state.user_info.isSuperUser)){
                this.unsubscribe()
                this.props.history.push('/#/dashboard')
            }
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    login = async (e) => {
        e.preventDefault()
        const { user, pass } = this.state
        if(!user || !pass){
            this.setState({ noValid : true })
        }else{
            this.setState({ noValid : false, loading: true })
            try {
                let { data } = await axios.post(`${baseurl}/token-auth/`, { username: user, password: pass })
                if(data.token){
                    store.dispatch({
                        type : 'LOGIN',
                        token : data.token
                    })
                }
            }
            catch(e){
                console.error(e)

                let error = 'Usuario y/o contraseña incorrectos'
                if(e.response && e.response.data && e.response.data.non_field_errors && e.response.data.non_field_errors[0])
                    error =  e.response.data.non_field_errors[0]

                this.setState({
                    error,
                    noValid : true,
                    loading: false
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
                <div className="auth-box on-sidebar" style={{maxWidth : 500, padding: 50, paddingTop : 100}}>
                    <div id="loginform">
                        <div className="logo">
                            <span className="db"><img src="assets/img/LOGO-ICON-TEXTO.png" height="50" alt="logo"/></span>
                            <h5 className="font-medium py-2">Ingresa a tu cuenta</h5>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <BlockUi tag="div" blocking={this.state.loading}>
                                    <form className="form-horizontal m-t-20" id="loginform" action="index.html" onSubmit={false}>
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
                                                { this.state.error &&
                                                    <b><span className="text-danger">{this.state.error}</span> </b>
                                                }
                                                <button className="btn btn-block btn-lg btn-info" type="submit" onClick={(e) => this.login(e)}>Ingresar</button>
                                            </div>
                                        </div>
                                    </form>
                                </BlockUi>
                            </div>
                        </div>
                    </div>
                    <div id="recoverform">
                        <div className="logo">
                            <span className="db"><img src="assets/images/logo-icon.png" alt="logo"/></span>
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
