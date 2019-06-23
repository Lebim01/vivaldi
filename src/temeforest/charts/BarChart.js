import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

class SimpleBarChart extends React.Component {
	render () {
        const { data, nameBars, yAxis } = this.props
  	    return (
            <div style={{width:'100%', height:300}}>
                <ResponsiveContainer>
                    <BarChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis {...yAxis}/>
                        <Tooltip/>
                        <Legend />
                        { nameBars.map((name, i) => 
                            <Bar dataKey={name} fill={colors[i]} />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

SimpleBarChart.defaultProps = {
    data : [],
    nameBars : [],
    yAxis : {}
}

export default SimpleBarChart