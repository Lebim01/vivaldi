import React from 'react'
import axios from 'axios'
import { Card, CardBody, CardTitle } from 'temeforest'
import { baseurl } from 'utils/url'
import store from 'store/auth'

import ListadoLocalidad from './Kiosko/ListadoLocalidad'
import ListadoCooperativas from './Kiosko/ListadoCooperativas'
import ReportePasajeros from './Kiosko/ReportePasajeros'

class Kiosko extends React.Component {

    state = {
        localidades : [],
        cooperativas : [],
        cooperativa: '',
        localidad : ''
    }

    componentDidMount(){
        this.loadLocalidades()
    }

    loadLocalidades = async () => {
        try {
            let state = store.getState()

            let config = {
                headers: {
                    Authorization : `JWT ${state.token}`
                }
            }

            const res = await axios.get(`${baseurl}/localidad/?page_size=0`, config)

            this.setState({
                localidades: res.data
            })

        }catch({ response }){
            this.setState({
                error: response.data.detail
            })
        }
    }

    loadCooerativas = async () => {
        try {
            let state = store.getState()

            let config = {
                headers: {
                    Authorization : `JWT ${state.token}`
                }
            }

            const res = await axios.get(`${baseurl}/venta/viajes-planificados/?page_size=0&localidad=${this.state.localidad}`, config)

            this.setState({
                cooperativas: res.data
            })

        }catch({ response }){
            this.setState({
                error: response.data.detail
            })
        }
    }

    selectCooperativa = (cooperativa_id) => {
        this.setState({
            cooperativa: cooperativa_id
        })
    }

    selectLocalidad = (localidad_id) => {
        this.setState({
            localidad: localidad_id
        }, this.loadCooerativas)
    }

    render(){
        const { cooperativa, localidad } = this.state

        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>Kiosko</CardTitle>

                                { !localidad && <ListadoLocalidad localidades={this.state.localidades} select={this.selectLocalidad} /> }
                                { localidad && !cooperativa && <ListadoCooperativas cooperativas={this.state.cooperativas} select={this.selectCooperativa} /> }
                                { localidad && cooperativa && <ReportePasajeros cooperativa={cooperativa} localidad={localidad} back={() => this.selectCooperativa('')} /> }
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Kiosko
