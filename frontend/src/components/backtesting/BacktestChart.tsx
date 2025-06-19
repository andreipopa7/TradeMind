import React, { useEffect, useRef } from "react";
import {
    createChart,
    CrosshairMode,
    Time
} from "lightweight-charts";

interface Trade {
    trade_id: number;
    action: string;
    timestamp: string;
    price: number;
    profit: number;
}

interface Candle {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

interface Props {
    data: { time: number; value: number }[];
    trades: Trade[];
    candles: Candle[];
}

const BacktestChart: React.FC<Props> = ({ data, trades, candles }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 600,
            crosshair: { mode: CrosshairMode.Normal },
            timeScale: { timeVisible: true, secondsVisible: false },
            layout: { textColor: "#000" },
            grid: { vertLines: { color: "#eee" }, horzLines: { color: "#eee" } },
        });

        const candleSeries = chart.addCandlestickSeries();

        candleSeries.setData(
            candles.map(c => ({
                time: c.time as Time,
                open: c.open,
                high: c.high,
                low: c.low,
                close: c.close
            }))
        );

        // Markerele de trade
        candleSeries.setMarkers(
            trades.map(trade => ({
                time: Math.floor(new Date(trade.timestamp).getTime() / 1000) as Time,
                position: trade.action.includes("SELL") ? 'aboveBar' : 'belowBar',
                color: trade.action.includes("SELL") ? 'red' : 'green',
                shape: 'arrowUp',
                text: trade.action
            }))
        );

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            chart.remove();
            window.removeEventListener('resize', handleResize);
        };
    }, [candles, trades]);

    return (
        <div ref={chartContainerRef} style={{ width: "100%", height: "600px" }} />
    );
};

export default BacktestChart;
