import React from 'react'

const defaultValue = {
    onChangeFlagValidate : () => {},
    submitted : false
}
const ValidateContext = React.createContext(defaultValue);
export default ValidateContext