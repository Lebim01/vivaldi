import React from 'react'
import moment from 'moment'


class Clock extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      time : moment().format('YYYY-MM-DD HH:mm:ss')
    }
  }

  componentDidMount(){
    this.intervalID = setInterval(
      () => this.clock(),
      1000
    )
  }

  componentWillMount() {
    clearInterval(this.intervalID)
  }

  clock () {
    this.setState({
      time : moment().format('YYYY-MM-DD HH:mm:ss')
    })
  }

  render() {
    return (
      <h2 {...this.props}>{this.state.time}</h2>
    )
  }
}

export default Clock;
