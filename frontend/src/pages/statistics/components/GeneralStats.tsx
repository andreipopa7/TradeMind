import React from 'react';
import '../styles/GeneralStatsStyles.css';

interface GeneralStatsProps {
    metrics: any;
}

const GeneralStats: React.FC<GeneralStatsProps> = ({ metrics }) => {
    if (!metrics) return null;

    return (
        <div className="dashboard-section">
            <div className="general-stats-grid">
                <div className="stat-item">
                    <span className="stat-label">Result</span>
                    <span className="stat-value positive">${metrics.total_result?.toFixed(2) ?? '-'}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Win rate</span>
                    <span className="stat-value">{metrics.winrate ?? '-'}%</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Average profit</span>
                    <span className="stat-value positive">${metrics.avg_profit?.toFixed(2) ?? '-'}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Average loss</span>
                    <span className="stat-value negative">${metrics.avg_loss?.toFixed(2) ?? '-'}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">RRR</span>
                    <span className="stat-value">{metrics.avg_rr?.toFixed(2) ?? '-'}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Max Profit</span>
                    <span className="stat-value positive">${metrics.max_profit?.toFixed(2) ?? '-'}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Max Loss</span>
                    <span className="stat-value negative">${metrics.max_loss?.toFixed(2) ?? '-'}</span>
                </div>
            </div>
        </div>
    );
};

export default GeneralStats;
