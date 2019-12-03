import React, { useState, useEffect } from 'react'
import { InputMask } from 'temeforest';
import { Input } from './Input'

export const REGEX = {
    LETTER : /^[a-zA-Z\s]+$/,
    DIGIT : /^[\d]+$/
}

function MaskedInput ({ mask, disabled, onBlur, onFocus, onMouseDown, readOnly, onChange, upper, lower, ...props }) {

    const [maskedValue, setMaskedValue] = useState('')

    useEffect(() => {
        onChange({
            target : {
                value : maskedValue
            }
        })
    }, [maskedValue])

    const _onChange = (e) => {
        let val = e.target.value

        if(upper)
            setMaskedValue(val.toUpperCase())
        else if(lower)
            setMaskedValue(val.toLowerCase())
        else
            setMaskedValue(val)
    }

    return (
        <InputMask 
        mask={mask} 
        value={maskedValue} 
        onChange={_onChange}>
            <Input {...props} />
           
        </InputMask>
    )
}

MaskedInput.defaultProps = {
    mask : '',
    value : '',
    upper : false,
    lower : false
}

export default MaskedInput