import React from 'react'
import { ValidateContext } from '../index'

function FormValidate(props) {
    return (
        <ValidateContext.Consumer>
            {({handleSubmit, onSubmit}) => {
                return (
                    <form noValidate onSubmit={handleSubmit(onSubmit)} {...props}>
                        {props.children}
                    </form>
                )
            }}
        </ValidateContext.Consumer>
    )
}

export default FormValidate