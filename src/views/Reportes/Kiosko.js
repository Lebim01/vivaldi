import React from 'react'
import axios from 'axios'
import { Card, CardBody, CardTitle, Permission } from 'temeforest'
import { baseurl } from 'utils/url'
import store from 'store/auth'

import ListadoLocalidad from './Kiosko/ListadoLocalidad'
import ListadoCooperativas from './Kiosko/ListadoCooperativas'
import ReportePasajeros from './Kiosko/ReportePasajeros'

axios.defaults.headers.common['Authorization'] = `JWT ${store.getState().token}`

class Kiosko extends React.Component {

    state = {
        localidades : [],
        cooperativas : [],
        cooperativa: '',
        cooperativa_nombre : '',
        localidad : '',
        localidad_nombre : ''
    }

    componentDidMount(){
        this.loadLocalidades()
    }

    loadLocalidades = async () => {
        try {
            const res = await axios.get(`${baseurl}/localidad/?page_size=0`)

            this.setState({
                localidades: res.data
            })

        }catch({ response }){
            this.setState({
                error: response.data.detail
            })
        }
    }

    selectCooperativa = (cooperativa_id, nombre) => {
        this.setState({
            cooperativa: cooperativa_id,
            cooperativa_nombre: nombre
        })
    }

    selectLocalidad = (localidad_id, nombre) => {
        this.setState({
            localidad: localidad_id,
            localidad_nombre: nombre
        })
    }

    render(){
        const { cooperativa, localidad, cooperativa_nombre, localidad_nombre } = this.state

        return (
            <Permission key_permission="view_kiosko" mode="redirect">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12">
                            <Card>
                                <CardBody>
                                    <CardTitle>Kiosko</CardTitle>

                                    { !localidad && <ListadoLocalidad localidades={this.state.localidades} select={this.selectLocalidad} /> }
                                    { localidad && !cooperativa && <ListadoCooperativas localidad={localidad} localidad_nombre={localidad_nombre} select={this.selectCooperativa} back={() => this.selectLocalidad('')} /> }
                                    { localidad && cooperativa && <ReportePasajeros cooperativa={cooperativa} cooperativa_nombre={cooperativa_nombre} localidad={localidad} back={() => this.selectCooperativa('')} /> }
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </Permission>
        )
    }
}

export default Kiosko
