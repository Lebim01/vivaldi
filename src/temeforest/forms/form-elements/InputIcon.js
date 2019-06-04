import React from 'react'
import InputGroup from './InputGroup'

class InputIcon extends React.Component {
    render(){
        const { type, icon, className, ...otherProps } = this.props
        return (
            <InputGroup>
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                        {icon}
                    </span>
                </div>
                <input type={type} className={`form-control ${className}`} {...otherProps}/>
            </InputGroup>
        )
    }
}

InputIcon.defaultProps = {
    type : 'text',
    helperText : ''
}

export default InputIcon