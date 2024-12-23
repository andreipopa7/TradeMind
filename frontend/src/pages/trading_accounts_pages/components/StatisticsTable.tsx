import React from "react";
import "../view_accounts/DashboardStyles.css";

const StatisticsTable: React.FC = () => {
    return (
        <div className="statistics-table">
            <h2>Statistics</h2>
            <div className="stats-grid">
                <div><strong>Equity:</strong> $33,451.61</div>
                <div><strong>Balance:</strong> $33,451.61</div>
                <div><strong>No. of Trades:</strong> 44</div>
                <div><strong>Win Rate:</strong> 54.55%</div>
                <div><strong>Average Profit:</strong> $3,570.64</div>
                <div><strong>Average Loss:</strong> -$7,612.19</div>
                <div><strong>Profit Factor:</strong> 0.56</div>
            </div>
        </div>
    );
};

export default StatisticsTable;
