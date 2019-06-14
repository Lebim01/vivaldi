import React from 'react';
import DualListBox from 'react-dual-listbox';

class DualList extends React.Component {
    state = {
        selected: [],
    };

    onChange = (selected) => {
        if(this.props.onChange){
            this.props.onChange(selected)
        }else{
            this.setState({ selected });
        }
    };

    render() {
        const { selected } = this.state;
        const { options } = this.props

        return (
            <DualListBox
                options={options}
                selected={this.props.selected ? this.props.selected : selected}
                onChange={this.onChange}
            />
        );
    }
}

DualList.defaultProps = {
    options : []
}

export default DualList