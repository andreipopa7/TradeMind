// import React from 'react';
// import '../styles/GeneralStatsStyles.css';
//
// interface GeneralStatsProps {
//     metrics: any;
// }
//
// const GeneralStats: React.FC<GeneralStatsProps> = ({ metrics }) => {
//     if (!metrics) return null;
//
//     return (
//         <div className="dashboard-section">
//             <div className="general-stats-grid">
//                 <div className="stat-item">
//                     <span className="stat-label">Result</span>
//                     <span className="stat-value positive">${metrics.total_result?.toFixed(2) ?? '-'}</span>
//                 </div>
//                 <div className="stat-item">
//                     <span className="stat-label">Win rate</span>
//                     <span className="stat-value">{metrics.winrate ?? '-'}%</span>
//                 </div>
//                 <div className="stat-item">
//                     <span className="stat-label">Average profit</span>
//                     <span className="stat-value positive">${metrics.avg_profit?.toFixed(2) ?? '-'}</span>
//                 </div>
//                 <div className="stat-item">
//                     <span className="stat-label">Average loss</span>
//                     <span className="stat-value negative">${metrics.avg_loss?.toFixed(2) ?? '-'}</span>
//                 </div>
//                 <div className="stat-item">
//                     <span className="stat-label">RRR</span>
//                     <span className="stat-value">{metrics.avg_rr?.toFixed(2) ?? '-'}</span>
//                 </div>
//                 <div className="stat-item">
//                     <span className="stat-label">Max Profit</span>
//                     <span className="stat-value positive">${metrics.max_profit?.toFixed(2) ?? '-'}</span>
//                 </div>
//                 <div className="stat-item">
//                     <span className="stat-label">Max Loss</span>
//                     <span className="stat-value negative">${metrics.max_loss?.toFixed(2) ?? '-'}</span>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default GeneralStats;


import React from 'react';
import { TrendingUp, TrendingDown, Percent, DollarSign, Scale, Trophy, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/GeneralStatsStyles.css';

interface GeneralStatsProps {
    metrics: any;
}

// const StatCard = ({ icon: Icon, label, value, positive }: { icon: any, label: string, value: string, positive?: boolean }) => (
//     <motion.div
//         whileHover={{ scale: 1.05 }}
//         className={`stat-item redesigned ${positive === true ? 'positive' : positive === false ? 'negative' : ''}`}
//     >
//         <div className="icon-wrapper"><Icon size={20} /></div>
//         <span className="stat-label">{label}</span>
//         <span className="stat-value">{value}</span>
//     </motion.div>
// );

const StatCard = ({
                      icon: Icon,
                      label,
                      value,
                      positive
                  }: {
    icon: any;
    label: string;
    value: string;
    positive?: boolean;
}) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className={`stat-item redesigned ${positive ? 'positive' : !positive ? 'negative' : ''}`}
    >
        <div className="icon-wrapper">
            <Icon size={18} />
        </div>
        <div className="stat-content">
            <span className="stat-label">{label}</span>
            <span className="stat-value">{value}</span>
        </div>
    </motion.div>
);


const GeneralStats: React.FC<GeneralStatsProps> = ({ metrics }) => {
    if (!metrics) return null;

    return (
        <div className="dashboard-section">
            <div className="general-stats-grid">
                <StatCard icon={DollarSign} label="Result" value={`$${metrics.total_result?.toFixed(2)}`} positive={true} />
                <StatCard icon={Percent} label="Win rate" value={`${metrics.winrate}%`} />
                <StatCard icon={TrendingUp} label="Avg. Profit" value={`$${metrics.avg_profit?.toFixed(2)}`} positive={true} />
                <StatCard icon={TrendingDown} label="Avg. Loss" value={`$${metrics.avg_loss?.toFixed(2)}`} positive={false} />
                <StatCard icon={Scale} label="RRR" value={`${metrics.avg_rr?.toFixed(2)}`} />
                <StatCard icon={Trophy} label="Max Profit" value={`$${metrics.max_profit?.toFixed(2)}`} positive={true} />
                <StatCard icon={XCircle} label="Max Loss" value={`$${metrics.max_loss?.toFixed(2)}`} positive={false} />
            </div>
        </div>
    );
};

export default GeneralStats;
