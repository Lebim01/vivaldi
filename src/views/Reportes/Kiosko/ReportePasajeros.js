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
            <>
                <Button outline onClick={this.props.back}>
                    <i className="fa fa-arrow-left"/> Volver
                </Button>
                <br/>
                <ListPage 
                    searchable={false}

                    fieldNames={['Disco', 'Hora entrada', 'Hora salida', 'Estado', 'Acción']}
                    fields={['bus_disco', 'hora_entrada', 'hora_salida', 'estado', this.imprimir]}

                    endpoint={'viaje'}
                    parameters={{ cooperativa: this.props.cooperativa }}
                    
                    history={this.props.history}
                />
            </>
        )
    }
}

export default ReportePasajeros