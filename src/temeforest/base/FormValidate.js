import React from 'react'
import ValidateContext from './ValidateContext'

class FormValidate extends React.Component {

    state = {
        isFormValidationErrors : true,
        submitted : false
    }

    onSubmit(e){
        e.preventDefault()
        this.setState( { submitted:true } );
        let { isFormValidationErrors } = this.state;
        if ( !isFormValidationErrors ){
            if(this.props.onSubmit){
                this.props.onSubmit()
            }
        }
    }

    onChangeFlagValidate(flag){
        this.setState({
            submitted: false,
            isFormValidationErrors: flag
        });
    }

    render(){
        return (
            <form onSubmit={this.onSubmit.bind(this)} className={this.props.className}>
                <ValidateContext.Provider 
                    value={{
                        onChangeFlagValidate : this.onChangeFlagValidate.bind(this),
                        submitted : this.state.submitted
                    }}>
                    {this.props.children}
                </ValidateContext.Provider>
            </form>
        )
    }
}

FormValidate.defaultProps = {
    className : ''
}

export default FormValidate