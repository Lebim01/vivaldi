import React from 'react'
import { Input } from './Input'
import InputMask from 'react-input-mask';

const formatChars = {
    '9': '[0-9]',
    'a': '[A-Za-z]',
    '*': '[A-Za-z0-9]'
}

function MaskedInput({ mask, value, onChange, ...props }){
    return (
        <InputMask mask={mask} formatChars={formatChars} value={value} onChange={onChange} {...props}>
            {(inputProps) => {
                return <Input {...inputProps} />
            }}
        </InputMask>
    )
}

MaskedInput.defaultProps = {
    
}

export default MaskedInput