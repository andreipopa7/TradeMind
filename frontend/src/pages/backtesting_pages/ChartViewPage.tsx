import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/nav_bar/NavBar";
import SideMenu from "../../components/side_menu/SideMenu";
import "./ChartViewPage.css";

const symbolsByCategory = {
    crypto: ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT"],
    forex: ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCHF"],
    indices: ["GER40", "US100", "US30", "UK100", "SP500"]
};

interface Candle {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

interface Trade {
    trade_id: number;
    action: string;
    timestamp: string;
    price: number;
    profit: number;
}


const getLastMonday = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
};

const getNextWeek = (date: Date) => {
    const next = new Date(date);
    next.setDate(date.getDate() + 7);
    return next;
};

const getPreviousWeek = (date: Date) => {
    const prev = new Date(date);
    prev.setDate(date.getDate() - 7);
    return prev;
};

const formatDate = (date: Date): string => date.toISOString().split("T")[0];

const getSource = (symbol: string): "crypto" | "forex" | "indices" => {
    if (symbolsByCategory.crypto.includes(symbol)) return "crypto";
    else if (symbolsByCategory.forex.includes(symbol)) return "forex";
    return "indices";
};


const ChartPage: React.FC = () => {
    const today = new Date();
    const lastMonday = getLastMonday(new Date(today));
    const lastSunday = new Date(lastMonday);
    lastSunday.setDate(lastMonday.getDate() + 6);

    const [symbol, setSymbol] = useState("BTCUSDT");
    const [startDate, setStartDate] = useState(formatDate(lastMonday));
    const [endDate, setEndDate] = useState(formatDate(lastSunday));
    const [timeframe, setTimeframe] = useState("1m");
    const [candles, setCandles] = useState<Candle[]>([]);
    const [loading, setLoading] = useState(false);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [metrics, setMetrics] = useState<any>(null);

    const runBacktestPreview = () => {
        const payload = {
            user_id: localStorage.getItem("user_id"),
            strategy_id:5,
            symbol,
            time_frame: timeframe,
            start_date: startDate,
            end_date: endDate,
            initial_balance: 100000,
            risk_per_trade: 1.0
        };

        axios.post("http://localhost:8000/api/trademind/backtests/preview", payload)
            .then(res => {
                setTrades(res.data.trades);
                console.log("Trades:", res.data.trades);
                setMetrics(res.data.metrics);
            })
            .catch(err => {
                console.error("Error running backtest:", err);
                alert("Failed to run backtest.");
            });
    };

    const updateWeek = (direction: "prev" | "next") => {
        const currentStart = new Date(startDate);
        const newStart = direction === "prev" ? getPreviousWeek(currentStart) : getNextWeek(currentStart);
        const newEnd = new Date(newStart);
        newEnd.setDate(newStart.getDate() + 6);
        setStartDate(formatDate(newStart));
        setEndDate(formatDate(newEnd));
    };

    const validateInputs = (): boolean => {
        const todayStr = formatDate(new Date());
        const source = getSource(symbol);

        if (endDate > todayStr) {
            alert("End date cannot be in the future.");
            return false;
        }
        if (source === "crypto" && ["60m", "daily"].includes(timeframe)) {
            alert("Crypto does not support intervals higher than 1 hour.");
            return false;
        }
        if (source === "forex" && timeframe === "1m") {
            alert("Forex pairs does not support 1-minute data.");
            return false;
        }
        return true;
    };

    const fetchChartData = () => {
        if (!validateInputs()) return;

        setLoading(true);
        axios.post("http://localhost:8000/api/trademind/chart-data", {
            symbol,
            source: getSource(symbol),
            time_frame: timeframe,
            start_date: startDate,
            end_date: endDate
        }).then(res => {
            setCandles(res.data.candles);
        }).catch(err => {
            console.error("Error fetching chart data:", err);
            alert("Something went wrong. Please check your inputs.");
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchChartData();
    }, [symbol, timeframe, startDate, endDate]);

    return (
        <div className="chart-page">
            <NavBar />
            <div className="chart-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="calendar-content">
                    <h2 className="page-title">Chart Viewer</h2>

                    <div className="chart-settings-card">
                        <div className="chart-settings-row">
                            <select value={symbol} onChange={e => setSymbol(e.target.value)}>
                                <optgroup label="Crypto">
                                    {symbolsByCategory.crypto.map(sym => <option key={sym} value={sym}>{sym}</option>)}
                                </optgroup>
                                <optgroup label="Forex">
                                    {symbolsByCategory.forex.map(sym => <option key={sym} value={sym}>{sym}</option>)}
                                </optgroup>
                                <optgroup label="Indices">
                                    {symbolsByCategory.indices.map(sym => <option key={sym} value={sym}>{sym}</option>)}
                                </optgroup>
                            </select>

                            <select value={timeframe} onChange={e => setTimeframe(e.target.value)}>
                                <option value="1m">1m</option>
                                <option value="5m">5m</option>
                                <option value="15m">15m</option>
                                <option value="30m">30m</option>
                                <option value="1h">1h</option>
                                <option value="daily">1d</option>
                            </select>
                        </div>

                        <div className="chart-settings-row">
                            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}/>
                            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}/>
                        </div>

                        <div className="chart-settings-row">
                            <button onClick={() => updateWeek("prev")}>Previous Week</button>
                            <button onClick={() => updateWeek("next")}>Next Week</button>
                        </div>

                        <div className="chart-settings-row">
                            <button onClick={fetchChartData}>Load Chart</button>
                            <button onClick={runBacktestPreview}>Run Backtest</button>
                        </div>


                    </div>


                    {metrics && (
                        <div className="metrics-panel">
                            <h3>Backtest Metrics</h3>
                            <ul>
                                <li>Total Profit: {metrics.total_profit}</li>
                                <li>Max Drawdown: {metrics.drawdown_max}</li>
                                <li>Winrate: {metrics.winrate}%</li>
                                <li>Nr Trades: {metrics.nr_trades}</li>
                                <li>Profit Factor: {metrics.profit_factor}</li>
                                <li>Expectancy: {metrics.expectancy}</li>
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );

};

export default ChartPage;
