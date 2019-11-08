import React from 'react'
import AsyncSelect from 'react-select/async';
import { getResults } from 'utils/url'

const rselect = {
    styles : {
        menu : (provided, state) => ({
            ...provided,
            zIndex : 2
        })
    }
}

const RSelectAsync = (props) => {
    const { register, value, onChange, ...otherProps } = props

    const loadOptions = async (asyncOptions, inputValue) => {
        let _options = typeof asyncOptions === 'function' ? asyncOptions() : asyncOptions
        const {url, labelName, valueName} = _options

        let _url = new URL(url)
        _url.searchParams.set('searchtext', inputValue)

        const results = await getResults(_url.toString(), true)

        return results.map((row) => ({ 
            label: typeof labelName === 'function' ? labelName(row) : row[labelName],
            value: row[valueName],
            id: row[valueName]
        }))
    }

    const promiseOptions = inputValue => new Promise(async resolve => {
        const options = await loadOptions(props.asyncOptions, inputValue)
        resolve(options)
    });

    const _onChange = (e) => {
        if(e && e.value){
            onChange(e.value, e.label)
        }else{
            onChange('')
        }
    }

    return (
        <AsyncSelect 
            loadOptions={promiseOptions}
            onChange={_onChange} 
            {...otherProps} 
            styles={rselect.styles} 
        />
    )
}

export default RSelectAsync