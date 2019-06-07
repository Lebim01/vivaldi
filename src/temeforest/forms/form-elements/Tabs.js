import React from 'react'

class Tab extends React.Component {
    render(){
        const { link, text, tab, ...otherProps } = this.props
        return (
            <li className="nav-item">
                <a className={`nav-link pointer ${tab == link ? 'active' : ''}`} {...otherProps}>{text}</a>
            </li>
        )
    }
}

class Tabs extends React.Component {

    changeTab = tab => e => {
        e.preventDefault()
        if(this.props.onClickTab){
            this.props.onClickTab(tab)
        }
    }

    render(){
        return (
            <ul className="nav nav-tabs">
                {this.props.tabs.map((tab) => <Tab {...tab} tab={this.props.tab} onClick={this.changeTab(tab.link)} />)}
            </ul>
        )
    }
}

export default Tabs