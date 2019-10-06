import React from 'react'
import { FormGroup, Label } from './../index'
import ValidateContext from './ValidateContext'

/**
 * NATIVE VALIDATIONS
 *  required
 *  min
 *  max
 *  minLength
 *  maxLength
 *  pattern
 *  validate
 * another validations extra import from 'utils/validate'
 */

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
                {({register, errors}) => {
                    return (
                        <FormGroup className="row">
                            <Label className="col-sm-3">
                                {_label.text} 
                                <span style={styles.required}>
                                    {validator.validationRules && validator.validationRules.required ? '*' : ''}
                                </span>
                            </Label>
                            <div className="col-sm-5">
                                {/** ELEMENT */}
                                {<_input.element.type 
                                    name={_input.name} 
                                    {..._input.element.props} 
                                    register={register(validator.validationRules)}
                                />}
                                {/** ERROR MESSAGE */}
                                { errors[_input.name] && 
                                    <span className="text-danger">
                                        { errors[_input.name].message !== '' 
                                            ? errors[_input.name].message 
                                            : validator.validationMessages[errors[_input.name].type]
                                        }
                                    </span> 
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