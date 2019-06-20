
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

    loadListAsync = async () => {
        const { url, valueName, labelName } = this.props.asyncOptions
        const { data } = await axios.get(url)
        let _options = [{value:'',label:'Seleccione'}, ...data.map((record) => {
            return {
                value: record[valueName],
                label: record[labelName]
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