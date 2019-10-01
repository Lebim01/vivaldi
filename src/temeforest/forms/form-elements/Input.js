import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from './FormGroup'

const ModeNumber = {
    decimal : (value) => parseFloat(value) ? true : false,
    integer : (value) => Number.isInteger(value),
    positive_decimal : (value) => ModeNumber.decimal(value) && Number(value) >= 0,
    positive_integer : (value) => ModeNumber.integer(value) && Number(value) >= 0
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
        const { type, onChange, modeNumber, min, max } = this.props

        if(type === 'number'){
            const value = Number(e.target.value)
            if(value){
                if(modeNumber && ModeNumber[modeNumber]){
                    if(!ModeNumber[modeNumber](value)){
                        e.preventDefault()
                        return false
                    }
                }

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
        }

        if(onChange){
            onChange(e)
        }
    }

    onKeyDown = (e) => {
        const { type, onKeyDown, modeNumber } = this.props

        if(type === 'number'){
            if(e.key === 'e'){
                e.preventDefault()
                return false
            }
            if(['integer', 'positive_integer'].includes(modeNumber)){
                // - || .
                if(e.keyCode === 189 || e.keyCode === 190){
                    e.preventDefault()
                    return false
                }
            }
        }

        if(onKeyDown){
            onKeyDown(e)
        }
    }

    render(){
        const { type, helperText, rightLabel, error, className, value, onChange, keyDown, modeNumber, ...otherProps } = this.props
        return (
            <FormGroup>
                <input type={type} onKeyDown={this.onKeyDown} className={`form-control ${className} ${error ?'is-invalid':''}`} value={value || ''} onChange={this.onChange} {...otherProps}/>
                { rightLabel && <label style={styles.rightLabel}>{rightLabel}</label> }
                { helperText && <small className="form-text text-muted"> {helperText} </small> }
            </FormGroup>
        )
    }
}

Input.propTypes = {
    modeNumber : PropTypes.oneOf([
        'decimal',
        'integer',
        'positive_decimal',
        'positive_integer'
    ])
}

Input.defaultProps = {
    type : 'text',
    helperText : '',
    className : '',
    error : false,
    value : '',
    modeNumber : 'decimal'
}

export default Input