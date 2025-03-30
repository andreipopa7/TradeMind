import React from 'react';
import '../styles/ResultsByInstrument.css';

interface InstrumentResult {
    instrument: string;
    trades: number;
    profit: number;
}

interface ResultsByInstrumentProps {
    data: InstrumentResult[];
}

const ResultsByInstrument: React.FC<ResultsByInstrumentProps> = ({ data }) => {
    return (
        <div className="dashboard-section">
            <div className="instrument-table">
                <div className="table-header">
                    <span>Instrument</span>
                    <span>Trades</span>
                    <span>Profit</span>
                </div>
                {data.map((row, index) => (
                    <div className="table-row" key={index}>
                        <span>{row.instrument}</span>
                        <span>{row.trades}</span>
                        <span>${row.profit.toFixed(2)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsByInstrument;