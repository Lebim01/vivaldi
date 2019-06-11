import React from 'react'

class ListItem extends React.Component {
    render(){
        return (
            <li className="list-group-item">{this.props.children}</li>
        )
    }
}

class ListItemButton extends React.Component {
    render(){
        return (
            <button type="button" className="list-group-item">{this.props.children}</button>
        )
    }
}

class ListGroup extends React.Component {
    render(){
        return (
            <div className="list-group">
                {this.props.children}
            </div>
        )
    }
}

export { ListGroup, ListItem, ListItemButton }
export default ListGroup