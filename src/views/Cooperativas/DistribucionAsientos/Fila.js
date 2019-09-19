import React from 'react'

import DividerAsiento from './DividerAsiento'
import Asiento from './Asiento'

const lastHallSeats = 5
const commonHallSeats = 4

class Fila extends React.Component {
    render(){

        const { isLast, toggleActivate, asientos, asientos_desactivados, index } = this.props

        // quantity seats by hall
        const cantidad_asientos_fila = isLast 
            ? lastHallSeats 
            : commonHallSeats
        // index become seat
        const asiento_inicio = isLast 
            ? 0 
            : ((index-1) * commonHallSeats) + lastHallSeats
        // seats object
        const asientos_fila = asientos.slice(asiento_inicio, asiento_inicio + cantidad_asientos_fila)

        const styles = isLast ? { marginTop: 10, marginBotton: 10 } : {}

        return (
            <div className="fila" style={styles}>
                { asientos_fila.map((a,i) => (
                    <div style={{display:'inline-block'}} key={i}>
                        <Asiento type={!asientos_desactivados.includes(a.index) ? 'info' : 'danger'} {...a} toggleActivate={toggleActivate} />
                        { (!isLast && i === 1) && <DividerAsiento /> }
                    </div>
                ))}
            </div>
        )
    }
}

export default Fila 