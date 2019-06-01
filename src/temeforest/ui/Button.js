import React from 'react'
import PropTypes from 'prop-types'

class Button extends React.Component {
    render(){
        const { type, children, waves, outline, rounded, size, circle, className, ...othersProps } = this.props
        const clss_outline = outline ? '-outline' : ''

        let classes = []
        classes.push(rounded ? 'btn-rounded' : '')
        classes.push(size ? `btn-${size}` : '')
        classes.push(circle ? 'btn-cirlce' : '')
        
        return (
            <button 
                type="button" 
                {...othersProps}
                className={`btn waves-effect waves-${waves} btn${clss_outline}-${type} ${classes.join(' ')}`}>
                {children}
            </button>
        )
    }
}

Button.propTypes = {
    type : PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']),
    waves : PropTypes.oneOf(['light', 'red', 'orange', 'pink', 'purple', 'indigo', 'teal', 'blue']),
    size : PropTypes.oneOf(['', 'lg', 'sm', 'xs']),
    outline : PropTypes.bool,
    rounded : PropTypes.bool,
    cicle : PropTypes.bool,
    className : PropTypes.string,
}

Button.defaultProps = {
    type : 'secondary',
    waves : 'light',
    size : '',
    outline : false,
    rounded : false,
    circle : false,
    className : '',
}

export default Button