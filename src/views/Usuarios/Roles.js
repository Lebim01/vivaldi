import React from 'react'
import { Card, CardBody, ListPage } from 'temeforest'

class Roles extends React.Component {

    render(){
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-12">
                        <Card>
                            <CardBody>
                                <ListPage
                                    title="Listado de Roles"

                                    searchable={true}
                                    searchPlaceholder="Rol, Descripción"
                                    searchFields={['name', 'description']}

                                    fieldNames={['Rol', 'Descripción']}
                                    fields={['name', 'description']}

                                    url='rol'

                                    menu='usuarios'
                                    submenu='roles'

                                    history={this.props.history}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Roles