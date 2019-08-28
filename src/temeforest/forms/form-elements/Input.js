import React from 'react'
import FormGroup from './FormGroup'

const styles = {
    rightLabel : {
        position: 'absolute',
        float: 'right',
        top: 8,
        right: 50
    }
}

class Input extends React.Component {
    render(){
        const { type, helperText, rightLabel, error, className, value, ...otherProps } = this.props
        return (
            <FormGroup>
                <input type={type} className={`form-control ${className} ${error ?'is-invalid':''}`} value={value || ''} {...otherProps}/>
                { rightLabel && <label style={styles.rightLabel}>{rightLabel}</label> }
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