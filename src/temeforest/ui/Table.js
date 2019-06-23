import React from 'react'

class Table extends React.Component {
    render(){
        const { columnsNames, columnsTitles, data, thead } = this.props
        return (
            <table className="table table-striped">
                { thead
                    ? thead
                    : (
                        <thead>
                            <tr>
                                {columnsTitles.map((title, i) =>
                                    <th key={i}>{title}</th>
                                )}
                            </tr>
                        </thead>
                    )
                }
                <tbody>
                    { data.map((record, i) => 
                        <tr key={i}>
                            {columnsNames.map((name, j) => 
                                <td key={j}>{record[name]}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}

Table.defaultProps = {
    columnsNames: [],
    columnsTitles: [],
    data: []
}

export default Table