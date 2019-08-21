
import React from 'react'
import FormGroup from './FormGroup'
import { getResults } from 'utils/url';

class Select extends React.Component {

    state = { _options : [] }

    constructor(props){
        super(props)
        this.loadListAsync = this.loadListAsync.bind(this)
    }

    componentDidMount(){
        if(this.props.asyncOptions){
            this.loadListAsync()
        }
    }

    componentWillReceiveProps(props){
        if(props.asyncOptions && props.asyncOptions.url != this.props.asyncOptions.url){
            this.loadListAsync(props)
        }
    }

    loadListAsync = async (props = null) => {
        const _props = props !== null ? props : this.props
        const { url, valueName, labelName } = typeof _props.asyncOptions === 'function' ? _props.asyncOptions() : _props.asyncOptions

        // get results
        const _results = await getResults(url, true)
        // fill options with results
        let _options = [{value:'',label:'Seleccione'}, ..._results.map((record) => {
            return {
                value: record[valueName],
                label: typeof labelName === 'function' ? labelName(record) : record[labelName]
            }
        })]
        this.setState({
            _options
        })
    }

    render(){
        const { _options } = this.state
        const { options, helperText, error, className, value, asyncOptions, ...otherProps } = this.props
        return (
            <FormGroup>
                <select className={`form-control ${className} ${error ?'is-invalid':''}`} {...otherProps} value={value} defaultValue="">
                    { asyncOptions 
                        ? _options.map((o, i) => <option value={o.value} key={i}>{o.label}</option>)
                        : options.map((o, i) => <option value={o.value} key={i}>{o.label}</option>) 
                    }
                </select>
                { helperText && <small class="form-text text-muted"> {helperText} </small> }
            </FormGroup>
        )
    }
}

Select.defaultProps = {
    options : [],
    helperText : '',
    className : '',
    error : false,
    asyncOptions : null,
    defaultValue: ''
}

export default Select