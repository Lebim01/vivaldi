import React from 'react'
import FormGroup from './FormGroup'

class Input extends React.Component {
    render(){
        const { type, helperText, error, className, value, ...otherProps } = this.props
        return (
            <FormGroup>
                <input type={type} className={`form-control ${className} ${error ?'is-invalid':''}`} value={value} {...otherProps}/>
                { helperText && <small className="form-text text-muted"> {helperText} </small> }
            </FormGroup>
        )
    }
}

Input.defaultProps = {
    type : 'text',
    helperText : '',
    className : '',
    error : false,
    value : ''
}

export default Input