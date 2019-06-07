import React from 'react'
import FormGroup from './FormGroup'

class Input extends React.Component {
    render(){
        const { type, helperText, className, ...otherProps } = this.props
        return (
            <FormGroup>
                <input type={type} className={`form-control ${className}`} {...otherProps}/>
                { helperText && <small class="form-text text-muted"> {helperText} </small> }
            </FormGroup>
        )
    }
}

Input.defaultProps = {
    type : 'text',
    helperText : '',
    className : ''
}

export default Input