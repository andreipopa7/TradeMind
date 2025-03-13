import React from "react";
import "../view_accounts/DashboardStyles.css";
import "./StatisticsTable.css";


interface StatsProps {
    stats: {
        totalTrades?: number;
        winRate?: number;
        avgProfit?: number;
        avgLoss?: number;
        profitFactor?: number;
    } | null;
}

const StatisticsTable: React.FC<{ stats: StatsProps["stats"] }> = ({ stats }) => {
    if (!stats) {
        return <p>Loading statistics...</p>;
    }

    return (
        <div className="statistics-table">
            <h2>Statistics</h2>
            <div className="stats-grid">
                <div><strong>No. of Trades:</strong> {stats.totalTrades !== undefined ? stats.totalTrades : "N/A"}</div>
                <div><strong>Win Rate:</strong> {stats.winRate !== undefined ? `${stats.winRate}%` : "N/A"}</div>
                <div><strong>Average Profit:</strong> {stats.avgProfit !== undefined ? `$${stats.avgProfit.toLocaleString()}` : "N/A"}</div>
                <div><strong>Average Loss:</strong> {stats.avgLoss !== undefined ? `-$${Math.abs(stats.avgLoss).toLocaleString()}` : "N/A"}</div>
                <div><strong>Profit Factor:</strong> {stats.profitFactor !== undefined ? stats.profitFactor : "N/A"}</div>
            </div>
        </div>
    );
};

export default StatisticsTable;
