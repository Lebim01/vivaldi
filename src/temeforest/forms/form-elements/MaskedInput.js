import React from 'react'
import { Input } from './Input'

export const REGEX = {
    LETTER : /^[a-zA-Z\s]+$/,
    DIGIT : /^\d+$/
}

function MaskedInput ({ mask, onChange, ...props }) {

    const getHelperText = (value, mask) => {
        for(let index in value){
            let char = value[index]
            let maskChar = mask[index]
    
        }
    }

    const preventMask = (newValue) => {
        // process value
        let validValue = getValue(newValue, mask)
        // trigger only with has changes
        let result = props.value !== validValue

        if(result){
            onChange({
                target : {
                    type : 'text',
                    value : validValue
                }
            })
        }

        return result
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
            preventMask={preventMask}
            {...props} 
        />
    )
}

MaskedInput.defaultProps = {
    mask : '',
    value : ''
}

export default MaskedInput