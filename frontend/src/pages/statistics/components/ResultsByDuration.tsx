import React from 'react';
import '../styles/ResultsByDuration.css';

interface DurationStat {
    range: string;
    trades: number;
    profit: number;
}

interface ResultsByDurationProps {
    data: DurationStat[];
}

const ResultsByDuration: React.FC<ResultsByDurationProps> = ({ data }) => {
    return (
        <div className="dashboard-section">
            <div className="duration-grid">
                {data.map((item, index) => (
                    <div className="duration-card" key={index}>
                        <h4>{item.range}</h4>
                        <p>Trades: {item.trades}</p>
                        <p>Profit: ${item.profit.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsByDuration;
