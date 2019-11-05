import React from 'react'
import InputGroup from './InputGroup'
import { Input } from './Input'

class InputIcon extends React.Component {

    render(){
        const { icon, ...otherProps } = this.props

        return (
            <InputGroup>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                        {icon}
                    </span>
                </div>
                <Input {...otherProps}/>
            </InputGroup>
        )
    }
}

export default InputIcon