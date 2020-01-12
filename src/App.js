import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss'
import store from './store/auth'
import axios from 'axios'
import moment from 'moment'

axios.interceptors.request.use((config) => {
    if(config.method.toLocaleLowerCase() === 'get'){
        config.params = config.params || {};
        config.params['t'] = moment().valueOf();
    }
    return config;
});

const loading = () => <div className="animated fadeIn pt-3 text-center">Cargando...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login2'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Kiosko = React.lazy(() => import('./views/Reportes/Kiosko'));
const ViajesPlanificados = React.lazy(() => import('./views/Operaciones/ViajesPlanificados'));
const ViajesPlanificadosSilo = React.lazy(() => import('./views/Operaciones/ViajesPlanificadosSilo'));

class App extends Component {

    state = { auth : false }

    reload(){

    }

    makeAuth(){
        let state = store.getState()
        if(state.token){
            store.dispatch({
                type: 'AUTH-MAKE'
            })
        }
    }

    componentWillMount(){
        let self = this
        this.unsubscribe = store.subscribe(() => {
            let state = store.getState()
            if(self.state.auth !== state.auth){
                self.setState({
                    auth: state.auth
                })
                self.reload()
            }
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    render() {
        const { auth } = this.state
        return (
            <Provider store={store}>
                <HashRouter>
                    <React.Suspense fallback={loading()}>
                        <Switch>
                            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                            <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                            <Route exact path="/kiosko" name="Kiosko" render={props => <Kiosko {...props}/>} />
                            <Route exact path="/viajes-planificados" name="Viajes Planificados" render={props => <ViajesPlanificados {...props}/>} />
                            <Route exact path="/viajes-planificados-silo" name="Viajes Planificados Silo" render={props => <ViajesPlanificadosSilo {...props}/>} />
                            <Route path="/" name="Home" render={props => <DefaultLayout auth={auth} {...props}/>} />
                        </Switch>
                    </React.Suspense>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;
