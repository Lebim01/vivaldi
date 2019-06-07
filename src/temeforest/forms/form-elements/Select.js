
import React from 'react'
import FormGroup from './FormGroup'

class Select extends React.Component {
    render(){
        const { options, helperText, className, ...otherProps } = this.props
        return (
            <FormGroup>
                <select className={`form-control ${className}`} {...otherProps}>
                    { options.map(o => <option value={o.value}>{o.label}</option>) }
                </select>
                { helperText && <small class="form-text text-muted"> {helperText} </small> }
            </FormGroup>
        )
    }
}

Select.defaultProps = {
    options : [],
    helperText : '',
    className : ''
}

export default Select