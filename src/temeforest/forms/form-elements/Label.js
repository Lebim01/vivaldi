import React from 'react'

class Label extends React.Component {
    render(){
        const { className, onlyClassName, ...otherProps } = this.props
        return (
            <label className={ onlyClassName ? onlyClassName : `text-right control-label col-form-label ${className}`} {...otherProps}>{this.props.children}</label>
        )
    }
}

Label.defaultProps = {
    className : '',
    onlyClassName : ''
}

export default Label