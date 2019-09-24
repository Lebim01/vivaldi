import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from './FormGroup'
import { INTEGER, POSITIVE_NUMBER_DECIMAL, POSITIVE_NUMBER_INTEGER } from 'utils/regex'

const REGEX = {
    'integer' : INTEGER,
    'positive_decimal': POSITIVE_NUMBER_DECIMAL,
    'positive_integer': POSITIVE_NUMBER_INTEGER
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
        const { type, modeNumber, onChange } = this.props

        // aplicar mode number automatico
        if(modeNumber && type === 'number'){
            const regex_to_apply = REGEX[modeNumber]
            if(regex_to_apply){
                if(!regex_to_apply.test(e.target.value)){
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
        const { onKeyDown, modeNumber } = this.props

        if(e.target.type === 'number'){
            if(e.key === 'e'){ 
                e.preventDefault()
                return false
            }
        }

        if(['integer', 'positive_integer'].includes(modeNumber)){
            if(e.keyCode === 45 || e.keyCode === 189 || e.keyCode === 190){
                e.preventDefault()
                return false
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
        'integer',
        'decimal',
        'positive_integer',
        'positive_decimal'
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