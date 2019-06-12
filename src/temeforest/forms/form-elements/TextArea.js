import React from 'react'

class TextArea extends React.Component {
    render(){
        const { ...otherProps } = this.props
        return (
            <textarea className="form-control" {...otherProps}>{this.props.children}</textarea>
        )
    }
}

export default TextArea