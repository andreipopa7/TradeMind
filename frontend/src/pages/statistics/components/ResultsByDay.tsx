import React from 'react';
import '../styles/ResultsByDay.css';

interface DayStat {
    day: string;
    profit: number;
    trades: number;
}

interface ResultsByDayProps {
    data: DayStat[];
}

const ResultsByDay: React.FC<ResultsByDayProps> = ({ data }) => {
    return (
        <div className="dashboard-section">
            <div className="day-grid">
                {data.map((item, index) => (
                    <div className="day-card" key={index}>
                        <h4>{item.day}</h4>
                        <p>Trades: {item.trades}</p>
                        <p>Profit: ${item.profit.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsByDay;
