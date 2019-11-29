import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from './FormGroup'

const isNotSpecialKey = /^[a-zA-Z0-9\s]$/gm

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

class FormInput extends React.Component {
    render(){
        const { helperText, rightLabel, ...otherProps } = this.props

        return (
            <FormGroup>
                <Input
                    {...otherProps} 
                />
                { rightLabel && <label style={styles.rightLabel}>{rightLabel}</label> }
                { helperText && <small className="form-text text-muted"> {helperText} </small> }
            </FormGroup>
        )
    }
}

export class Input extends React.Component {

    componentDidMount(){
        this.setValue()
    }

    componentDidUpdate(prevProps){
        if(this.props.setValue){
            if(prevProps.value !== this.props.value){
                this.setValue()
            }
        }
    }

    setValue = () => {
        if(this.props.setValue){
            this.props.setValue(this.props.name, this.props.value)
        }
    }

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
        const { type, onKeyDown, modeNumber, mask, preventMask } = this.props

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

        if(mask){
            let res1 = e.keyCode === 8
            let res2 = isNotSpecialKey.test(e.key)
            console.log(e.key, e.which, isNotSpecialKey.test(e.key), res2, res1 || res2)
            // solo enviar al estado los caracteres validos
            if(res1 || res2){
                preventMask(e.target.value + e.key, e.keyCode)
            }
            e.preventDefault()
        }

        if(onKeyDown){
            onKeyDown(e)
        }
    }

    onKeyUp = (e) => {
        if(this.props.upper)
            e.target.value = ("" + e.target.value).toUpperCase()
        if(this.props.lower)
            e.target.value = ("" + e.target.value).toLowerCase()
    }

    render(){
        const { type, error, className, value, onChange, keyDown, modeNumber, register, setValue, disableOnChange, disableValue, tooltip, delay, ...otherProps } = this.props

        const _value = setValue ? undefined : value || ''

        return (
            <input
                type={type} 
                onKeyDown={this.onKeyDown} 
                className={`form-control ${className} ${error ?'is-invalid':''}`} 
                value={_value} 
                onChange={this.onChange}
                onKeyUp={this.onKeyUp}
                {...otherProps} 
                ref={register} 
            />
        )
    }
}

Input.propTypes = {
    modeNumber : PropTypes.oneOf([
        'decimal',
        'integer',
        'positive_decimal',
        'positive_integer'
    ]),
    upper : PropTypes.bool,
    lower : PropTypes.bool,
    delay : PropTypes.number
}

Input.defaultProps = {
    type : 'text',
    helperText : '',
    className : '',
    error : false,
    value : '',
    modeNumber : 'decimal',
    upper : false,
    lower : false,
    delay : 0
}

export default FormInput
