import React from 'react'

import { Button } from 'temeforest'

class Asiento extends React.Component {

    toggleActivate = () => {
        if(this.props.toggleActivate){
            this.props.toggleActivate(this.props.numero_asiento-1)
        }
    }

    render(){
        const { type, activate } = this.props
        let activateCss = {}
        if(activate){
            activateCss = {
                backgroundColor : '#4798e8',
                borderColor : '#4798e8',
                color: '#fff'
            }
        }

        return (
            <div style={{display:'inline-block', marginLeft:3, marginRight:3}}>
                <Button type={type} style={{height:40, width:40, padding: 2, ...activateCss}} onClick={this.toggleActivate}>
                    <small>
                        {this.props.numero_asiento}
                        {this.props.lado}
                    </small>
                </Button>
            </div>
        )
    }
}

export default Asiento