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

    const getOptionProps = (option, prefix = '') => {
        let options = props.asyncOptions && props.asyncOptions.optionProps ? props.asyncOptions.optionProps : null
        
        if(options){
            let props = {}
            for(let i in options){
                let name_option = options[i]
                props[`${prefix}${name_option}`] = option[name_option]
            }
            return props
        }

        return {}
    }

    const loadOptions = (asyncOptions) => {
        return new Promise(async (resolve) => {
            const {url, labelName, valueName} = asyncOptions
            const results = await getResults(url, true)
    
            const getOption = (row) => {
                return { 
                    label: row[labelName], 
                    value: row[valueName], 
                    id: row[valueName],
                    ...getOptionProps(row)
                }
            }
    
            const options = results.map((row) => getOption(row))
            resolve(options)
        })
    }

    const _value = valueFromId(options, value) || ''

    const _onChange = (e) => {
        if(e && e.value){
            onChange(e.value, e.label, e)
        }else{
            onChange('', '', e)
        }
    }

    return (
        <Select value={_value} options={options} onChange={_onChange} {...otherProps} isLoading={loading} styles={rselect.styles} />
    )
}

export default RSelect