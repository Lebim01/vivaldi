
import React from 'react'
import FormGroup from './FormGroup'
import axios from '../../../utils/axios';

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
        if(props.asyncOptions){
            this.loadListAsync(props)
        }
    }

    loadListAsync = async (props = null) => {
        const { url, valueName, labelName } = 
            props !== null 
                ? typeof props.asyncOptions === 'function' ? props.asyncOptions() : props.asyncOptions
                : typeof this.props.asyncOptions === 'function' ? this.props.asyncOptions() : this.props.asyncOptions

        const { data } = await axios.get(url)
        let _options = [{value:'',label:'Seleccione'}, ...data.map((record) => {
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
                <select className={`form-control ${className} ${error ?'is-invalid':''}`} {...otherProps}>
                    { asyncOptions 
                        ? _options.map((o, i) => <option value={o.value} selected={value == o.value} key={i}>{o.label}</option>)
                        : options.map((o, i) => <option value={o.value} selected={value == o.value} key={i}>{o.label}</option>) 
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
    asyncOptions : null
}

export default Select