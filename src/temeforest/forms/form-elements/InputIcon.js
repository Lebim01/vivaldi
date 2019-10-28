import React from 'react'
import InputGroup from './InputGroup'

class InputIcon extends React.Component {

    componentDidMount(){
        this.setValue()
    }
    componentDidUpdate(prevProps){
        if(this.props.setValue){
            if(prevProps.value !== this.props.value){
                this.setValue()
            }
        }
    }

    setValue = () => {
        if(this.props.setValue){
            this.props.setValue(this.props.name, this.props.value)
        }
    }

    render(){
        const { type, icon, className, value, setValue, ...otherProps } = this.props

        const _value = setValue ? null : value || ''

        return (
            <InputGroup>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                        {icon}
                    </span>
                </div>
                <input type={type} className={`form-control ${className}`} value={_value} {...otherProps}/>
            </InputGroup>
        )
    }
}

InputIcon.defaultProps = {
    type : 'text'
}

export default InputIcon