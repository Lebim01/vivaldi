import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import store from './../../store/auth'

import {
  AppFooter
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

    unlisten = null

    loading = () => <div className="animated fadeIn pt-1 text-center">Cargando...</div>

    signOut(e) {
        e.preventDefault()
        store.dispatch({
            type: 'LOGOUT'
        })
    }

    makeAuth(){
        let state = store.getState()
        if(state.token){
            store.dispatch({
                type: 'AUTH-MAKE'
            })
        }
    }

    componentDidMount(){
        // refresh token
        this.makeAuth()

        this.unlisten = this.props.history.listen(() => {
            this.makeAuth()
        })
    }

    componentWillUnmount(){
        this.unlisten()
    }

    render() {
        const { auth } = this.props
        return (
            <div className="app">
                <header className="topbar" data-navbarbg="skin6">
                    <Suspense  fallback={this.loading()}>
                        <DefaultHeader onLogout={e=>this.signOut(e)}/>
                    </Suspense>
                </header>
                <Suspense fallback={this.loading()}>
                    <DefaultAside navConfig={navigation} {...this.props} router={router} />
                </Suspense>
                <div className="page-wrapper" style={{display: 'block'}}>
                    <main className="main">
                        <br />
                        <Container fluid>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {!auth && <Redirect to="/login" />}
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => (
                                                    <route.component {...props} />
                                                )} />
                                        ) : (null);
                                    })}
                                    <Redirect from="/" to="/dashboard" />
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                    <AppFooter>
                        <Suspense fallback={this.loading()}>
                            <DefaultFooter />
                        </Suspense>
                    </AppFooter>
                </div>
            </div>
        );
    }
}

export default DefaultLayout;
