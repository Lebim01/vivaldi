import React from 'react'

import { Button } from 'temeforest'

class Asiento extends React.Component {

    toggleActivate = () => {
        if(this.props.toggleActivate){
            this.props.toggleActivate(this.props.index)
        }
    }

    render(){
        const { type, lado, activate } = this.props
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
                <Button type={type} style={{height:40, width:40, ...activateCss}} onClick={this.toggleActivate}>
                    {/*lado*/}
                    <small>{this.props.index}</small>
                </Button>
            </div>
        )
    }
}

export default Asiento