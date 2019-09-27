import React from 'react'
import { ReportPage, ListPage } from 'temeforest'

class EmisionPorCooperativa extends React.Component {

    usaapi = (row) => {
        return (
            <input type="checkbox" checked={row.usa_api} />
        )
    }

    render(){
        return (
            <ReportPage title="Emisión por cooperativa">
                <ListPage
                    searchable={false}

                    fieldNames={['Cooperativa', 'Api', 'Sistema externo']}
                    fields={['nombre', (row) => this.usaapi(row), 'sistema_externo']}

                    endpoint='cooperativa'
                    history={this.props.history}
                />
            </ReportPage>
        )
    }
}

export default EmisionPorCooperativa