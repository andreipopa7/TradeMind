import React, { useState, useEffect } from "react";
import axios from "axios";
import BacktestChart from "../../components/backtesting/BacktestChart";
import NavBar from "../../components/nav_bar/NavBar";
import SideMenu from "../../components/side_menu/SideMenu";

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


interface ChartDataPoint {
    time: number;
    value: number;
}

const BacktestingPage: React.FC = () => {
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [candles, setCandles] = useState<Candle[]>([]);

    useEffect(() => {
        axios.post("http://localhost:8000/backtest", {
            symbol: "BTCUSDT",
            start_date: "2025-06-01",
            end_date: "2025-06-03",
            timeframe: "1m"
        }).then(res => {
            const tradesResponse = res.data.trades;
            const candlesResponse = res.data.candles;

            setTrades(tradesResponse);
            setCandles(candlesResponse);

            const rawData: ChartDataPoint[] = tradesResponse.map((trade: Trade) => ({
                time: Math.floor(new Date(trade.timestamp).getTime()),
                value: trade.price
            }));

            const timeMap = new Map<number, number>();
            rawData.forEach(({ time, value }) => {
                timeMap.set(time, value);
            });

            const aggregatedData = Array.from(timeMap.entries())
                .map(([time, value]) => ({ time, value }))
                .sort((a, b) => a.time - b.time);

            setChartData(aggregatedData);
        });

    }, []);

    return (
        <div className="backtesting-page">
            <NavBar/>

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu/>
                </div>

                <div className="page-content">

                    <h1>Backtesting Result</h1>
                    <BacktestChart data={chartData} trades={trades} candles={candles}/>

                </div>
            </div>
        </div>
    );
};

export default BacktestingPage;
