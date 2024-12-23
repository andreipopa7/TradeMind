import React from "react";
import "../view_accounts/DashboardStyles.css";

const TradingJournal: React.FC = () => {
    const trades = [
        { date: "20 Dec", type: "buy", volume: 20, result: -23406 },
        { date: "19 Dec", type: "buy", volume: 50, result: -31300 },
    ];

    return (
        <div className="trading-journal">
            <h2>Trading Journal</h2>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Volume</th>
                    <th>Result</th>
                </tr>
                </thead>
                <tbody>
                {trades.map((trade, index) => (
                    <tr key={index}>
                        <td>{trade.date}</td>
                        <td>{trade.type}</td>
                        <td>{trade.volume}</td>
                        <td style={{ color: trade.result < 0 ? "red" : "green" }}>
                            {trade.result.toLocaleString()} USD
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TradingJournal;
