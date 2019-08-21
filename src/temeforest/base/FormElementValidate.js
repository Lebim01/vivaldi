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
        
    }
}

const styles = {
    required : {
        color: 'red'
    }
}

class FormElementValidate extends React.Component {

    static contextType = ValidateContext;

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
                            <Label className="col-sm-3">
                                {_label.text} 
                                <span style={styles.required}>
                                    {validator.validationRules && validator.validationRules.required ? '*' : ''}
                                </span>
                            </Label>
                            <div className="col-sm-5">
                                {_input.element || <Input />}
                                { validator &&
                                    <Validator 
                                        isValidationError={onChangeFlagValidate}
                                        isFormSubmitted={submitted}
                                        reference={{
                                            [_input.name] : _input.element.props.value,
                                            ...validator.reference
                                        }}
                                        {...validator}
                                    />
                                }
                            </div>
                            { _input.button &&
                                <div className="col-sm-3">
                                    {_input.button}
                                </div>
                            }
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