import React from 'react'
import { Col, Row } from 'reactstrap'
import { Card, CardBody, CardTitle, InputIcon, Button } from './../../temeforest'
import axios from 'axios'
import { baseurl } from './../../utils/url'


class _Row extends React.Component {

    onRowDoubleClick(){
        if(this.props.onDoubleClick){
            this.props.onDoubleClick(this.props.id)
        }
    }

    render(){
        const { name, description } = this.props
        return (
            <tr onDoubleClick={this.onRowDoubleClick.bind(this)}>
                <td>{name}</td>
                <td>{description}</td>
            </tr>
        )
    }
}

class Roles extends React.Component {

    state = { data:[], filtered : [], filtro : '' }

    constructor(props){
        super(props)
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    loadList = async () => {
        let { data } = await axios.get(`${baseurl}/rol/`)
        let filtered = data
        this.setState({
            data,
            filtered
        })
    }

    componentDidMount(){
        this.loadList()
    }

    onRowDoubleClick(id){
        this.props.history.push('/usuarios/roles/edit?id='+id)
    }

    onChange = name => (e) => {
        let value = e.target.value
        let newState = {
            [name] : value
        }
        if(name === 'filtro'){
            let compare = (v1, v2) => (v1 || '').toUpperCase().includes((v2 || '').toUpperCase())
            newState.filtered = this.state.data.filter((row) => compare(row.name, value) || compare(row.description, value))
        }
        this.setState({
            ...newState
        })
    }

    render(){
        const { filtered } = this.state
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Listado de Roles</CardTitle>
                                <Row>
                                    <Col xs="12" md="6">
                                        <InputIcon placeholder="Buscar... Rol, Descripción" icon={<i className="fa fa-search"></i>} onChange={this.onChange('filtro')} />
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Button style={{'float': 'right'}} onClick={()=> this.onRowDoubleClick('')}>
                                            <i className="fa fa-plus"></i>
                                        </Button>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col xs="12" md="12">
                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Rol</th>
                                                        <th scope="col">Descripción</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filtered.map((row, i) => <_Row {...row} key={i} onDoubleClick={this.onRowDoubleClick} />)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Roles