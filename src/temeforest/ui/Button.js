import React from 'react'
import PropTypes from 'prop-types'
import { baseMediaUrl } from './../../utils/url'
import { isUndefined } from 'util';

class Button extends React.Component {

    constructor(props){
        super(props)
        this.DownloadFile = this.DownloadFile.bind(this)
    }

    DownloadFile = (e) => {
        if (e){
            let file_path = baseMediaUrl + e;
            let a = document.createElement('A');
            a.href = file_path;
            if(file_path){
                if(!file_path.includes('none')){
                    a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            }
        }
    }

    canDownload = (url) => {
        if((url && url.includes('none')) || isUndefined(url)){
            return true
        }
        return false
    }

    render(){
        const { type, children, waves, outline, rounded, size, circle, className, download, ...othersProps } = this.props
        const clss_outline = outline ? '-outline' : ''

        let classes = []
        classes.push(rounded ? 'btn-rounded' : '')
        classes.push(size ? `btn-${size}` : '')
        classes.push(circle ? 'btn-cirlce' : '')

        let downloadProps = {}
        if(download){
            downloadProps.onClick = this.DownloadFile
            downloadProps.disabled = this.canDownload(download)
        }
        
        return (
            <button 
                type="button" 
                {...othersProps}
                {...downloadProps}
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