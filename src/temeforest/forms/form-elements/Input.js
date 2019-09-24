import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from './FormGroup'

const validInteger = (value) => {
    return value % 1 ? true : false
}

const ranges = {
    'integer' : validInteger,
    'positive_decimal': (value) => value >= 0,
    'positive_integer': (value) => validInteger(value) && value >= 0
}

const styles = {
    rightLabel : {
        position: 'absolute',
        float: 'right',
        top: 8,
        right: 50
    }
}

class Input extends React.Component {

    onChange = (e) => {
        const { type, onChange, min, max } = this.props

        if(type === 'number'){
            const value = Number(e.target.value)
            if(min){
                if(min > value){
                    e.preventDefault()
                    return false
                }
            }
            if(max){
                if(max < value){
                    e.preventDefault()
                    return false
                }
            }
        }

        if(onChange){
            onChange(e)
        }
    }

    onKeyDown = (e) => {
        const { type, onKeyDown } = this.props

        if(type === 'number'){
            if(e.key === 'e'){
                e.preventDefault()
                return false
            }
        }

        if(onKeyDown){
            onKeyDown(e)
        }
    }

    render(){
        const { type, helperText, rightLabel, error, className, value, onChange, keyDown, ...otherProps } = this.props
        return (
            <FormGroup>
                <input type={type} onKeyDown={this.onKeyDown} className={`form-control ${className} ${error ?'is-invalid':''}`} value={value || ''} onChange={this.onChange} {...otherProps}/>
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