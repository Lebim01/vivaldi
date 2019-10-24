import React from 'react'

class TextArea extends React.Component {
    
    componentDidUpdate(prevProps){
        if(this.props.setValue){
            const { setValue } = this.props
            if(prevProps.value !== this.props.value){
                setValue(this.props.name, this.props.value)
            }
        }
    }

    render(){
        const {  register, value, setValue, ...otherProps } = this.props
        const _value = setValue ? null : value || ''
        return (
            <textarea className="form-control" ref={register} value={_value} {...otherProps}>{this.props.children}</textarea>
        )
    }
}

export default TextArea