import React from 'react'
import { ListPage, Button } from 'temeforest'

class ReportePasajeros extends React.Component {

    imprimir = () => {
        return (
            <Button outline>
                <i className="fa fa-print"/> Imprimir
            </Button>
        )
    }

    render(){
        return (
            <div className="text-center">
                <ListPage 
                    searchable={false}

                    fieldNames={['Disco', 'Hora entrada', 'Hora salida', 'Estado', 'Acción']}
                    fields={['bus_disco', 'hora_entrada', 'hora_salida', 'estado', this.imprimir]}

                    endpoint={'venta/viajes-planificados'}
                    parameters={{ cooperativa: this.props.cooperativa }}
                    
                    history={this.props.history}
                />
                <br/>
                <Button style={{backgroundColor: '#29bbe3', height:50, width: 200}} onClick={this.props.back}>
                    Atrás
                </Button>
            </div>
        )
    }
}

export default ReportePasajeros