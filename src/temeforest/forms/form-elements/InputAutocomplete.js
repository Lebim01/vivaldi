import React from 'react'
import InputGroup from './InputGroup'
import Autocomplete from 'react-autocomplete'

class InputAutocomplete extends React.Component {

    render(){
        const { items, className, getItemLabel, onSelect, renderItem, value, icon, getItemValue, ...otherProps } = this.props
        return (
            <InputGroup>
                { icon &&
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            {icon}
                        </span>
                    </div>
                }
                <Autocomplete
                    getItemValue={getItemLabel}
                    items={items}
                    renderInput={() => <input type="text" className={`form-control ${className}`} />}
                    renderItem={renderItem}
                    menuStyle={{
                        borderRadius: '3px',
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '2px 0',
                        fontSize: '90%',
                        position: 'fixed',
                        overflow: 'auto',
                        maxHeight: '50%',
                        zIndex: 1
                    }}
                    {...otherProps}
                />
            </InputGroup>
        )
    }
}

InputAutocomplete.defaultProps = {
    items : [],
    className : '',
    renderItem : (item, isHighlighted) => {
        return (
            <div style={{ background: isHighlighted ? 'lightgray' : 'white', fontSize: 15, padding: 5 }}>
                {item.label}
            </div>
        )
    },
    getItemLabel : (item) => item.label,
    getItemValue : (item) => item.id
}

export default InputAutocomplete