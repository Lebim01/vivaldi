import React from 'react'

class TextArea extends React.Component {
    render(){
        const {  register, ...otherProps } = this.props
        return (
            <textarea className="form-control" ref={register} {...otherProps}>{this.props.children}</textarea>
        )
    }
}

export default TextArea