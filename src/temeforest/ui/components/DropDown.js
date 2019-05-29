import React from 'react'
import PropTypes from 'prop-types'

class Divider extends React.Component {
    render(){
        return (
            <div className="dropdown-divider"></div>
        )
    }
}

class ButtonOpen extends React.Component {
    render(){
        const { title } = this.props
        return (
            <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="sr-only">{title}</span>
            </button>
        )
    }
}
ButtonOpen.propTypes = {
    title : propTypes.string
}
ButtonOpen.defaultProps = {
    title : 'Toggle Dropdown'
}

class DropDown extends React.Component {
    render(){
        const { split, buttonOutside, items, animated, direction, menuDirection, className, menuClassName, ...othersProps } = this.props

        let classes = []
        classes.push(direction ? `drop${direction}` : '')
        classes.push(className)

        let classesMenu = []
        classesMenu.push(animated ? `animate ${animated}` : '')
        classesMenu.push(menuDirection ? `dropdown-menu-${menuDirection}` : '')
        classesMenu.push(menuClassName)
        
        return (
            <div className={`btn-group ${classes.join(' ')}`} {...othersProps}>
                {buttonOutside}
                {split && <buttonOpen/>}
                <div className={`dropdown-menu ${classesMenu.join(' ')}`}>
                    {items}
                </div>
            </div>
        )
    }    
}
DropDown.propTypes = {
    split : PropTypes.bool,
    buttonOutside : PropTypes.element,
    items : PropTypes.arrayOf(PropTypes.element),
    animated : PropTypes.oneOf(['', 'flipInX', 'flipInY', 'lightSpeedIn', 'slideInUp']),
    direction : PropTypes.oneOf(['', 'left', 'right', 'up', 'down']),
    menuDirection : PropTypes.oneOf(['', 'left', 'right']),
    className : PropTypes.string,
    menuClassName : PropTypes.string,
}
DropDown.defaultProps = {
    split : false,
    items : [],
    animated : '',
    direction : '',
    menuDirection : '',
    className : '',
    menuClassName : ''
}

export { DropDown, Divider, ButtonOpen }
export default DropDown