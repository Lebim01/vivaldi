import React from 'react'
import { ReportPage, ListPage, FormGroup, Label, Select , SelectLocalidad} from 'temeforest'
import { baseurl } from 'utils/url'

class EmisionPorCooperativa extends React.Component {

    state = {}

    optionsLocalidad = {
        url : `${baseurl}/localidad/`,
        labelName: 'nombre',
        valueName: 'id' 
    }

    onChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    usaapi = (row) => {
        return (
            <input type="checkbox" checked={row.usa_api} />
        )
    }

    render(){
        return (
            <ReportPage title="Emisión por cooperativa">
                <div className="row">
                    <div className="col-sm-4">
                        <FormGroup className="row">
                            <Label className="col-sm-4">Localidad</Label>
                            <div className="col-sm-8">
                                <SelectLocalidad onChange={this.onChange('localidad')} value={this.state.localidad}/>
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <ListPage
                    searchable={false}
                    id="report"
                    exportExcel
                    imprimirPantalla

                    fieldNames={['Cooperativa', 'Api', 'Sistema externo']}
                    fields={['nombre', this.usaapi, 'sistema_externo']}

                    endpoint='cooperativa'
                    parameters={this.state}
                    filters={{
                        persist: true,
                        callback: (parameters) => this.setState(parameters)
                    }}
                    history={this.props.history}
                />
            </ReportPage>
        )
    }
}

export default EmisionPorCooperativa