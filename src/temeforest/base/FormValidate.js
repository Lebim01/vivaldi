import React from 'react'
import { ValidateContext } from '../index'

class FormValidate extends React.Component {
    render(){
        return (
            <ValidateContext.Consumer>
                {({onSubmit}) => {
                    return (
                        <form noValidate onSubmit={onSubmit} className={this.props.className}>
                            {this.props.children}
                        </form>
                    )
                }}
            </ValidateContext.Consumer>
        )
    }
}

FormValidate.defaultProps = {
    className : ''
}

export default FormValidate