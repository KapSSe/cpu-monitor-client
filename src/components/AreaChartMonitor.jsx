import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import _ from 'lodash'

export default class AreaChartMonitor extends PureComponent {

  formatData() {
    const data = _.reverse(this.props.data)
    const fmtd = data.map((el, i) => {
      return {
        name: `${i} ${this.props.type} ago`,
        cpu: el.cpu.toFixed(2)
      }
    })
    return fmtd
  }

  renderChart(fmtd) {
    return (
    <AreaChart width={500} height={400} data={ fmtd } margin={{ top: 10, right: 30, left: 0, bottom: 0,}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
        <Tooltip />
        <Area type="monotone" dataKey="cpu" stroke={this.props.stroke} fill={this.props.fill} />
      </AreaChart>
    )
  }

  render() {
   const fmtd = this.formatData()
    return (
      fmtd.length ? this.renderChart(fmtd) : null
    );
  }
}
