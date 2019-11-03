
import React from 'react'
import FormGroup from './FormGroup'
import { getResults } from 'utils/url';

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

class Select extends React.Component {

    state = { _options : [], loading: false }

    componentDidMount(){
        if(this.props.asyncOptions){
            this.loadListAsync()
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.setValue){
            if(prevProps.value !== this.props.value){
                this.setValue()
            }
        }
        if(prevProps.options !== this.props.options || prevProps.asyncOptions !== this.props.asyncOptions){
            this.setValue()
        }
    }

    componentWillReceiveProps(props){
        if(props.asyncOptions && (!this.props.asyncOptions || props.asyncOptions.url !== this.props.asyncOptions.url)) {
            this.loadListAsync(props)
        }
    }

    setValue = () => {
        console.log(this.props.name)
        if(this.props.setValue){
            console.log('setvalue', this.props.name, this.props.value)
            this.props.setValue(this.props.name, this.props.value)
        }
    }

    getOptionProps = (option, prefix = '') => {
        const { asyncOptions } = this.props

        if(asyncOptions.optionProps){
            let props = {}
            for(let i in asyncOptions.optionProps){
                let name_option = asyncOptions.optionProps[i]
                props[`${prefix}${name_option}`] = option[name_option]
            }
            return props
        }

        return {}
    }

    getSelectOption = () => {
        
    }

    loadListAsync = async (props = null) => {
        const _props = props !== null ? props : this.props
        const { url, valueName, labelName } = typeof _props.asyncOptions === 'function' ? _props.asyncOptions() : _props.asyncOptions

        this.setState({
            loading: true
        })

        // get results
        const _results = await getResults(url, true)
        // fill options with results
        let _options = [{value: '', label: this.props.defaultOption || 'Seleccione'}, ..._results.map((record) => {
            return {
                value: record[valueName],
                label: typeof labelName === 'function' ? labelName(record) : record[labelName],
                ...this.getOptionProps(record)
            }
        })]

        this.setState({
            _options,
            loading: false
        }, this.setValue)
    }

    render(){
        const { _options } = this.state
        const { options, helperText, error, className, value, defaultValue, asyncOptions, register, setValue, ...otherProps } = this.props

        const _value = setValue ? undefined : (value !== undefined && value !== null ? value : '')

        return (
            <BlockUi tag="div" blocking={this.state.loading}>
                <FormGroup>
                    <select 
                        className={`form-control ${className} ${error ?'is-invalid':''}`} 
                        ref={register}

                        {...otherProps} 
                        value={_value}
                    >
                        { asyncOptions 
                            ? _options.map(({ label, ...o }, i) => <option {...o} key={i} {...this.getOptionProps(o, 'data-')}>{label}</option>)
                            : options.map(({ label, ...o }, i) => <option {...o} key={i}>{label}</option>) 
                        }
                    </select>
                    { helperText && <small class="form-text text-muted"> {helperText} </small> }
                </FormGroup>
            </BlockUi>
        )
    }
}

Select.defaultProps = {
    options : [],
    helperText : '',
    className : '',
    error : false,
    asyncOptions : null,
    defaultValue: 'Seleccione'
}

export default Select