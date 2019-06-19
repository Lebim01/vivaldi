
import React from 'react'
import FormGroup from './FormGroup'

class Select extends React.Component {
    render(){
        const { options, helperText, error, className, value, ...otherProps } = this.props
        return (
            <FormGroup>
                <select className={`form-control ${className} ${error ?'is-invalid':''}`} {...otherProps}>
                    { options.map((o, i) => <option value={o.value} selected={value == o.value} key={i}>{o.label}</option>) }
                </select>
                { helperText && <small class="form-text text-muted"> {helperText} </small> }
            </FormGroup>
        )
    }
}

Select.defaultProps = {
    options : [],
    helperText : '',
    className : '',
    error : false
}

export default Select