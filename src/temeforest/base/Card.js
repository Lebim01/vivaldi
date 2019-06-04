import React, { Component } from 'react'

class Card extends Component {
    render(){
        return (
            <div className="card">{this.props.children}</div>
        )
    }
}

class CardTitle extends Component {
    render(){
        return (
            <h4 className="card-title">{this.props.children}</h4>
        )
    }
}

class CardBody extends Component {
    render(){
        return (
            <div className="card-body">{this.props.children}</div>
        )
    }
}

class CardSubtitle extends Component {
    render(){
        return (
            <h6 className="card-subtitle">{this.props.children}</h6>
        )
    }
}

export { Card, CardTitle, CardBody, CardSubtitle }