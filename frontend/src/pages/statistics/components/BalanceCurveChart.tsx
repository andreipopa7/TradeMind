import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from 'recharts';
import '../styles/BalanceCurveChartStyles.css';

interface BalanceCurveChartProps {
    data: { trade: number; balance: number }[];
}

const BalanceCurveChart: React.FC<BalanceCurveChartProps> = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="chart-section">
            <h3>📈 Balance Curve</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="trade" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="balance" stroke="#00e676" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BalanceCurveChart;
