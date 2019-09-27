import React, { Component } from 'react'
import ConnectionService from '../services/ConnectionService'
import store from '../store/store'

import AreaChartMonitor from '../components/AreaChartMonitor'

export default class DashboardPage extends Component {

  state = {
    current: 0,
    seconds: [],
    minutes: [],
    hours: []
  }

  socketClient = new ConnectionService()

  componentDidMount() {
    this.socketClient.enqueAction('getCurrent', null, 1000)

    this.socketClient.enqueAction('getLast',{ type:'seconds', depth:15 }, 1000 * 5)
    this.socketClient.enqueAction('getLast',{ type:'minutes', depth:20 }, 1000 * 5)
    this.socketClient.enqueAction('getLast',{ type:'hours', depth:1 }, 1000 * 5)

    store.subscribe(this.updateHandler)
  }

  updateHandler = () => {
    const  { current, seconds, minutes, hours } = this.state

    const previousSecond = current
    const previousSeconds = seconds
    const previousMinutes = minutes
    const previousHours= hours

    
    const currentSecond = store.getState().cpuStats.current
    const currentSeconds = store.getState().cpuStats.seconds
    const currentMinutes = store.getState().cpuStats.minutes
    const currentHours = store.getState().cpuStats.hours

  
    if (previousSecond !== currentSecond) {
      this.setState({
        current: currentSecond
      })
    }

    if (previousSeconds !== currentSeconds) {
      this.setState({
        seconds: currentSeconds
      })
    }

    if (previousMinutes !== currentMinutes ) {
      this.setState({
        minutes: currentMinutes
      })
    }

    if (previousHours !== currentHours) {
      this.setState({
        hours: currentHours
      })
    }

  }

  render() {
    return(
      <div> 
        <h1> Current cpu usage: {this.state.current.toFixed(2)} % </h1>
        <AreaChartMonitor data={ this.state.seconds } type={"seconds"} stroke={ "#01142F" } fill={ "#052555" }/>
        <AreaChartMonitor data={ this.state.minutes } type={"minutes"} stroke={ "#004156" } fill={ "#2398AB" } />
        <AreaChartMonitor data={ this.state.hours } type={"hours"} stroke={ "#4400B2" } fill={ "#A771FE" } />
      </div>
      
    )
  }
}
