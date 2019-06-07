import React from 'react';
import DualListBox from 'react-dual-listbox';

class DualList extends React.Component {
    state = {
        selected: [],
    };

    onChange = (selected) => {
        this.setState({ selected });
    };

    render() {
        const { selected } = this.state;
        const { options } = this.props

        return (
            <DualListBox
                options={options}
                selected={selected}
                onChange={this.onChange}
            />
        );
    }
}

DualList.defaultProps = {
    options : []
}

export default DualList