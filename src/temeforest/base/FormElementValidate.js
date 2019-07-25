import React from 'react'
import { Input, FormGroup, Label } from './../index'
import Validator from 'react-forms-validator';
import ValidateContext from './ValidateContext'

const defaultProps = {
    label : {
        text : '',
        class : 'col-sm-3'
    },
    input : {
        element : <Input />
    }
}

class FormElementValidate extends React.Component {

    static contextType = ValidateContext;

    isValidationError(flag){
        
    }

    render(){
        const { label, input, validator } = this.props

        let _label = {
            ...defaultProps.label,
            ...label,
        }

        let _input = {
            ...defaultProps.input,
            ...input
        }

        return (
            <ValidateContext.Consumer>
                {({onChangeFlagValidate, submitted}) => {
                    return (
                        <FormGroup className="row">
                            <Label className="col-sm-3">{_label.text}</Label>
                            <div className="col-sm-5">
                                {_input.element}
                            </div>
                            <Validator 
                                isValidationError={onChangeFlagValidate}
                                isFormSubmitted={submitted}
                                reference={{
                                    [_input.name] : _input.element.props.value,
                                    ...validator.reference
                                }}
                                {...validator}
                            />
                        </FormGroup>
                    )}
                }
            </ValidateContext.Consumer>
        )
    }
}

FormElementValidate.defaultProps = {
    label : {},
    input : {},
    validator : {}
}

export default FormElementValidate