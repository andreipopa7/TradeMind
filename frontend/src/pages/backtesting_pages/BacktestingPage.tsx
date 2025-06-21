import React, { useState } from "react";
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
    const [userId, setUserId] = useState(1);
    const [strategyId, setStrategyId] = useState(1);
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [source, setSource] = useState("binance");
    const [timeframe, setTimeframe] = useState("1m");
    const [startDate, setStartDate] = useState("2025-06-01");
    const [endDate, setEndDate] = useState("2025-06-03");

    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [candles, setCandles] = useState<Candle[]>([]);

    const handleBacktest = () => {
        axios.post("http://localhost:8000/api/trademind/backtests/create", {
            user_id: userId,
            strategy_id: strategyId,
            symbol,
            source,
            time_frame: timeframe,
            start_date: startDate,
            end_date: endDate
        }).then(res => {
            const tradesResponse = res.data.trades_json;
            const candlesResponse = res.data.candles_json;

            setTrades(tradesResponse);
            setCandles(candlesResponse);

            const rawData: ChartDataPoint[] = tradesResponse.map((trade: Trade) => ({
                time: new Date(trade.timestamp).getTime(),
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
        }).catch(err => {
            console.error("Backtest failed:", err);
            alert("Eroare la backtest. Verifică datele introduse.");
        });
    };

    return (
        <div className="backtesting-page">
            <NavBar />
            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">
                    <h1>Backtesting</h1>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                        <select value={symbol} onChange={e => setSymbol(e.target.value)}>
                            <option value="BTCUSDT">BTCUSDT</option>
                            <option value="ETHUSDT">ETHUSDT</option>
                            <option value="EURUSD">EURUSD</option>
                            <option value="GBPUSD">GBPUSD</option>
                            <option value="GER40">GER40</option>
                            <option value="US100">US100</option>
                            <option value="US30">US30</option>
                            <option value="UK100">UK100</option>
                        </select>

                        <select value={timeframe} onChange={e => setTimeframe(e.target.value)}>
                            <option value="1m">1m</option>
                            <option value="5m">5m</option>
                            <option value="15m">15m</option>
                            <option value="30m">30m</option>
                            <option value="60m">1h</option>
                            <option value="daily">1d</option>
                        </select>

                        <input type="text" value={source} onChange={e => setSource(e.target.value)} placeholder="binance / yahoo" />
                        <input type="number" value={strategyId} onChange={e => setStrategyId(Number(e.target.value))} placeholder="Strategy ID" />
                        <input type="number" value={userId} onChange={e => setUserId(Number(e.target.value))} placeholder="User ID" />
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />

                        <button onClick={handleBacktest}>Rulează backtest</button>
                    </div>

                    <BacktestChart data={chartData} trades={trades} candles={candles} />
                </div>
            </div>
        </div>
    );
};

export default BacktestingPage;
