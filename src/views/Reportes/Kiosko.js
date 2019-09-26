import React from 'react'
import axios from 'axios'
import { Card, CardBody, CardTitle } from 'temeforest'
import { baseurl } from 'utils/url'

import ListadoCooperativas from './Kiosko/ListadoCooperativas'
import ReportePasajeros from './Kiosko/ReportePasajeros'

class Kiosko extends React.Component {

    state = {
        cooperativas : [],
        cooperativa: ''
    }

    componentDidMount(){
        this.loadList()
    }

    loadList = async () => {
        try {
            const res = await axios.get(`${baseurl}/cooperativa/?page_size=0`)
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

    render(){
        const { cooperativas, cooperativa } = this.state

        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <CardTitle>Kiosko</CardTitle>

                                { !cooperativa && <ListadoCooperativas cooperativas={cooperativas} select={this.selectCooperativa} /> }
                                { cooperativa && <ReportePasajeros cooperativa={cooperativa} back={() => this.selectCooperativa('')} /> }
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Kiosko