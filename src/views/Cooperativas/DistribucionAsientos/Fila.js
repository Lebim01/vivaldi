import React from 'react'

import DividerAsiento from './DividerAsiento'
import Asiento from './Asiento'

const lastHallSeats = 5
const commonHallSeats = 4

class Fila extends React.Component {
    render(){

        const { isLast, toggleActivate, asientos, asientos_desactivados, index } = this.props
        
        const _asientos = asientos ? asientos : []

        // quantity seats by hall
        const cantidad_asientos_fila = isLast 
            ? lastHallSeats 
            : commonHallSeats

        // index become seat
        const asiento_inicio = _asientos.length - ( (index+1) * 4) - 1 + (!isLast ? 1 : 0)

        // seats object
        const asientos_fila = _asientos.slice(asiento_inicio, asiento_inicio + cantidad_asientos_fila)

        const styles = isLast ? { marginTop: 10, marginBotton: 10 } : {}

        return (
            <div className="fila" style={styles}>
                { asientos_fila.map((asiento,i) => {
                    const numero_asiento = (this.props.index * commonHallSeats) + i + 1
                    return (
                        <div style={{display:'inline-block'}} key={i}>
                            <Asiento 
                                {...asiento}
                                lado={(i === 0 || (isLast && i === 4 || !isLast && i === 3)) ? 'V' : 'P'}
                                numero_asiento={numero_asiento}
                                type={!asientos_desactivados.includes(numero_asiento-1) ? 'info' : 'danger'}
                                toggleActivate={toggleActivate}
                            />
                            { (!isLast && i === 1) && <DividerAsiento /> }
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Fila 
