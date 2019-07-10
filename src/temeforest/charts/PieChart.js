import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

class SimplePieChart extends React.Component {
    render() {
        const { data } = this.props
        return (
            <div style={{width:'100%', height:320}}>
                { data.length > 0
                    ? (
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie dataKey="value" isAnimationActive={true} data={data} outerRadius={80} fill="#8884d8" label>
                                    { data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>) }
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <h4>No hay datos</h4>
                    )
                }
            </div>
        );
    }
}

SimplePieChart.defaultProps = {
    data: []
}

export default SimplePieChart
