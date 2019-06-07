import React from 'react'

class FormGroup extends React.Component {
    render(){
        const { className, ...otherProps } = this.props
        return (
            <div className={`form-group ${className}`} {...otherProps}>
                {this.props.children}
            </div>
        )
    }
}

FormGroup.defaultProps = {
    className : ''
}

export default FormGroup