import React from "react";
import "../view_accounts/DashboardStyles.css";
import "./TradingJournal.css";
import {TradeJournal} from "../../../types/TradeProps";


const TradingJournal: React.FC<{ trades: TradeJournal[] }> = ({ trades }) => {
    if (!Array.isArray(trades) || trades.length === 0) {
        return <p>No trade history available.</p>;
    }

    return (
        <div className="trading-journal">
            <h2>Trading Journal</h2>
            <table>
                <thead>
                <tr>
                    <th>Ticket</th>
                    <th>Symbol</th>
                    <th>Volume</th>
                    <th>Price</th>
                    <th>Commission</th>
                    <th>Swap</th>
                    <th>Profit</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                {trades.map((trade, index) => (
                    <tr key={index}>
                        <td>{trade.ticket ?? "N/A"}</td>
                        <td>{trade.symbol ?? "N/A"}</td>
                        <td>{trade.volume !== undefined ? trade.volume.toLocaleString() : "N/A"}</td>
                        <td>{trade.price !== undefined ? trade.price.toFixed(5) : "N/A"}</td>
                        <td>{trade.commission !== undefined ? trade.commission.toFixed(2) : "N/A"}</td>
                        <td>{trade.swap !== undefined ? trade.swap.toFixed(2) : "N/A"}</td>
                        <td
                            style={{
                                color: trade.profit !== undefined && trade.profit < 0 ? "red" : "green",
                                fontWeight: "bold"
                            }}
                        >
                            {trade.profit !== undefined ? `${trade.profit.toFixed(2)} USD` : "N/A"}
                        </td>
                        <td>
                            {trade.time
                                ? new Date(
                                    typeof trade.time === "string"
                                        ? parseInt(trade.time) * 1000
                                        : trade.time * 1000
                                ).toLocaleString()
                                : "N/A"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TradingJournal;
