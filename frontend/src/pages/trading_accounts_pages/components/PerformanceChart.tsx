import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";
import "../view_accounts/DashboardStyles.css";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const PerformanceChart: React.FC = () => {
    const data = {
        labels: ["12 Dec", "13 Dec", "16 Dec", "17 Dec", "18 Dec"],
        datasets: [
            {
                label: "Balance",
                data: [10000, 20000, 40000, 50000, 10000],
                borderColor: "cyan",
                backgroundColor: "rgba(0, 255, 255, 0.5)",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Performance Chart",
            },
        },
    };

    return (
        <div className="chart-container">
            <Line data={data} options={options} />
        </div>
    );
};

export default PerformanceChart;
