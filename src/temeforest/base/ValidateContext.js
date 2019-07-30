import React from 'react'

const defaultValue = {
    onChangeFlagValidate : () => {},
    onSubmit : () => {},
    submitted : false,
    isFormValidationErrors : true
}
const ValidateContext = React.createContext(defaultValue);
export default ValidateContext