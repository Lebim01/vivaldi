import React from 'react'
import { Input } from './Input'

export const REGEX = {
    LETTER : /^[a-zA-Z\s]+$/,
    DIGIT : /^\d+$/
}

function MaskedInput ({ mask, onChange, ...props }) {

    const onChangeMask = (newValue, keyCode) => {

        console.log(keyCode)
        if(keyCode === 8){
            const { value } = props
            changeValue(removeLastString(value, mask))
            return true
        }

        // process value
        let validValue = getValue(newValue, mask)
        // trigger only with has changes
        let result = props.value !== validValue

        if(result){
            changeValue(validValue)
        }

        return result
    }

    const changeValue = (value) => {
        onChange({
            target : {
                type : 'text',
                value : value
            }
        })
    }

    /**
     * Va removiendo el ultimo caracter hasta eliminar la ultima regexp
     */
    const removeLastString = (value, mask) => {
        let index = value.length
        let _value = value

        for(let i = index-1; i > 0; i--){
            let maskCondition = mask[i]

            _value = _value.substring(0, _value.length - 1);

            if(maskCondition instanceof RegExp){
                break
            }
        }

        if(index-1 === 0)
            return ''

        return _value
    }
    
    const getValue = (value, mask) => {
        let validValue = ''

        for(let index in value){
            let char = value[index]
            let maskCondition = mask[index]

            if(maskCondition instanceof RegExp){
                let result = maskCondition.test(char)
                if(result){
                    validValue += char + appendNextString(Number(index))
                }else{
                    break
                }
            }
        }

        return validValue
    }

    const appendNextString = (index) => {
        let append = ''
        for(let i = index+1; i <= mask.length; i++){
            if(typeof mask[i] === 'string'){
                append += mask[i]
            }else{
                break
            }
        }
        return append
    }

    return (
        <Input 
            mask={mask} 
            preventMask={onChangeMask}
            {...props} 
        />
    )
}

MaskedInput.defaultProps = {
    mask : '',
    value : ''
}

export default MaskedInput