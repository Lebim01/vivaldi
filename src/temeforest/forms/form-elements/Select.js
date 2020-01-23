
import React from 'react'
import FormGroup from './FormGroup'
import { getResults } from 'utils/url';
import axios from 'axios'
import _ from 'lodash'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

const CancelToken = axios.CancelToken;

class Select extends React.Component {

    state = { 
        _options : [], 
        loading: false,
        cancelRequest : () => {}
    }

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
        if(prevProps.options !== this.props.options || !_.isEqual(prevProps.asyncOptions, this.props.asyncOptions)){
            this.setValue()
        }
    }

    componentWillReceiveProps(props){
        if(props.asyncOptions && (!this.props.asyncOptions || props.asyncOptions.url !== this.props.asyncOptions.url)) {
            this.loadListAsync(props)
        }
    }

    setValue = () => {
        if(this.props.setValue){
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

        // cancel
        if(this.state.cancelRequest)
            this.state.cancelRequest('Operation canceled by the user.');
        // get results
        const _results = await getResults(url, true, {
            cancelToken: new CancelToken((c) => {
                // An executor function receives a cancel function as a parameter
                this.setState({
                    cancelRequest : c
                })
            })
        })

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