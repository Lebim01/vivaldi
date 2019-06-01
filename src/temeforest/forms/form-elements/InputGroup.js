import React from 'react'

class InputGroup extends React.Component {
    render(){
        return (
            <div className="input-group">
                {this.props.children}
            </div>
        )
    }
}

export default InputGroup