import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from "chart.js";

import "../view_accounts/DashboardStyles.css";
import "./PerformanceChart.css";
import {PerformanceProps} from "../../../types/PerformanceProps";


ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

const PerformanceChart: React.FC<PerformanceProps> = ({ data }) => {
    if (!Array.isArray(data) || data.length === 0) {
        return <p>No performance data available.</p>;
    }

    const filterConsecutiveDuplicates = (data: { date: string; balance: number }[]) => {
        return data.filter((point, index, array) =>
            index === 0 || point.balance !== array[index - 1].balance
        );
    };

    const filteredData = filterConsecutiveDuplicates(data);

    const chartData = {
        labels: filteredData.map((point) => new Date(Number(point.date) * 1000).toLocaleDateString()),
        datasets: [
            {
                label: "Balance",
                data: filteredData.map((point) => point.balance),
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
                display: false,
                text: "Performance Chart",
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `Balance: $${tooltipItem.raw.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <h2 className="chart-title">Performance Chart</h2>
            <Line data={chartData} options={options}/>
        </div>
    );
};

export default PerformanceChart;
