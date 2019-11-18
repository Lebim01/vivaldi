import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { getResults } from 'utils/url'

const rselect = {
    styles : {
        menu : (provided, state) => ({
            ...provided,
            zIndex : 2
        })
    }
}

const valueFromId = (opts, id) => opts.find(o => o.value === id);

const loadOptions = (asyncOptions) => {
    return new Promise(async (resolve) => {
        const {url, labelName, valueName} = asyncOptions
        const results = await getResults(url, true)
        resolve(results.map((row) => ({ label: row[labelName], value: row[valueName], id: row[valueName] })))
    })
}

const RSelect = (props) => {
    const { register, value, onChange, ...otherProps } = props
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [prevAsyncOptions, setPrevAsyncOptions] = useState({})

    useEffect(() => {
        if(JSON.stringify(prevAsyncOptions) !== JSON.stringify(props.asyncOptions)){
            setPrevAsyncOptions(props.asyncOptions)
            if(props.asyncOptions){

                setLoading(true)
                loadOptions(props.asyncOptions)
                .then((res) => {
                    setLoading(false)
                    setOptions(res)
                })
                .catch(() => {
                    setLoading(false)
                })
            }
        }
    }, [props.asyncOptions])

    const _value = valueFromId(options, value) || ''

    const _onChange = (e) => {
        if(e && e.value){
            onChange(e.value, e.label)
        }else{
            onChange('')
        }
    }

    return (
        <Select value={_value} options={options} onChange={_onChange} {...otherProps} isLoading={loading} styles={rselect.styles} />
    )
}

export default RSelect