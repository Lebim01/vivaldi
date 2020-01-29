import React from 'react'
import axios from 'axios'
import { baseurl } from 'utils/url'
import { Button } from 'temeforest'
import { Row, Col } from 'reactstrap'

class ListadoCooperativas extends React.Component {

    state = {
        cooperativas : []
    }
    interval = null

    componentDidMount(){
        let time = (process.env.NODE_ENV !== 'production' ? 5 : 60) * 1000
        this.interval = setInterval(this.loadCooerativas, time)
        this.loadCooerativas()
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    loadCooerativas = async () => {
        try {
            const res = await axios.get(`${baseurl}/venta/viajes-planificados/?page_size=0&localidad=${this.props.localidad}`)

            let cooperativas = []
            for(let i in res.data){
                let viaje = res.data[i]
                let indexExists = cooperativas.findIndex(row => row.cooperativa === viaje.cooperativa)
                if(indexExists === -1){
                    cooperativas.push({
                        cooperativa : viaje.cooperativa,
                        cooperativa_nombre : viaje.cooperativa_nombre
                    })
                }
            }

            this.setState({
                cooperativas
            })

        }catch({ response }){
            this.setState({
                error: response.data.detail
            })
        }
    }

    render(){
        const { cooperativas } = this.state

        return (
            <>
                <h5>Seleccionar cooperativa - <b>Localidad : {this.props.localidad_nombre}</b></h5>
                <Row>
                    { cooperativas.map((row, i) => {
                        return (
                            <Col xs="2" style={{padding: 10}} className="text-center" key={i}>
                                <Button className="btn-lg" outline style={{ width: 150, height: 150, borderRadius: 10 }} onClick={() => this.props.select(row.cooperativa, row.cooperativa_nombre) }>
                                    {row.cooperativa_nombre}
                                </Button>
                            </Col>
                        )
                    })}
                    <Col xs="12" className="text-center">
                        <Button style={{backgroundColor: '#4798e8', height:50, width: 200}} onClick={this.props.back}>
                            Atrás
                        </Button>
                    </Col>
                </Row>
            </>
        )
    }
}

export default ListadoCooperativas
