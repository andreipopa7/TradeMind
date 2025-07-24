import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/nav_bar/NavBar";
import SideMenu from "../../components/side_menu/SideMenu";
import BacktestChart from "./components/BacktestChart";

import "./BacktestingPage.css";

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
    timestamp: number;
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
    if (symbolsByCategory.forex.includes(symbol)) return "forex";
    return "indices";
};


const BacktestingPage: React.FC = () => {
    const today = new Date();
    const lastMonday = getLastMonday(new Date(today));
    const lastSunday = new Date(lastMonday);
    lastSunday.setDate(lastMonday.getDate() + 6);

    const [symbol, setSymbol] = useState("BTCUSDT");
    const [startDate, setStartDate] = useState(formatDate(new Date()));
    const [endDate, setEndDate] = useState(formatDate(new Date()));
    const [timeframe, setTimeframe] = useState("1m");
    const [strategy_id, setStrategy] = useState("");
    const [initial_balance, setInitialBalance] = useState(100000)
    const [risk_per_trade, setRiskPerTrade] = useState(1.0);
    const [candles, setCandles] = useState<Candle[]>([]);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [availableStrategies, setAvailableStrategies] = useState<{ id: number; name: string }[]>([]);

    const fetchStrategies = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/trademind/strategies/public");
            const strategyList = res.data.map((strategy: any) => ({
                id: strategy.id,
                name: strategy.name
            }));
            setAvailableStrategies(strategyList);
        } catch (err) {
            console.error("Failed to fetch strategies:", err);
            alert("Could not load strategies.");
        }
    };
    const runBacktest = async () => {
        const payload = {
            user_id: localStorage.getItem("user_id"),
            strategy_id: strategy_id,
            symbol,
            time_frame: timeframe,
            start_date: startDate,
            end_date: endDate,
            initial_balance: initial_balance,
            risk_per_trade: risk_per_trade
        };

        try {
            const res = await axios.post("http://localhost:8000/api/trademind/backtests/preview", payload);
            setTrades(res.data.trades);
            setMetrics(res.data.metrics);
        } catch (err) {
            alert("Backtest failed.");
        }
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
        fetchStrategies();
    }, []);

    // useEffect(() => {
    //     fetchChartData();
    // }, [symbol, timeframe, startDate, endDate]);

    return (
        <div className="my-trades-container">
            <NavBar />
            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">
                    <h2 className="page-title">Backtesting</h2>

                    <div className="backtesting-grid">
                        <div className="backtest-card">
                            <h3>Select symbol and time frame</h3>
                            <div className="backtest-info-item">
                                <span>Symbol</span>
                                <select value={symbol} onChange={e => setSymbol(e.target.value)}>
                                    <optgroup label="Crypto">
                                        {symbolsByCategory.crypto.map(sym => <option key={sym}
                                                                                     value={sym}>{sym}</option>)}
                                    </optgroup>
                                    <optgroup label="Forex">
                                        {symbolsByCategory.forex.map(sym => <option key={sym}
                                                                                    value={sym}>{sym}</option>)}
                                    </optgroup>
                                    <optgroup label="Indices">
                                        {symbolsByCategory.indices.map(sym => <option key={sym}
                                                                                      value={sym}>{sym}</option>)}
                                    </optgroup>
                                </select>
                            </div>
                            <div className="backtest-info-item">
                                <span>Time frame</span>
                                <select value={timeframe} onChange={e => setTimeframe(e.target.value)}>
                                    <option value="1m">1m</option>
                                    <option value="5m">5m</option>
                                    <option value="15m">15m</option>
                                    <option value="30m">30m</option>
                                    <option value="1h">1h</option>
                                    <option value="daily">1d</option>
                                </select>
                            </div>

                            <h3>Select interval</h3>
                            <div className="backtest-info-item">
                                <span>Start date</span>
                                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}/>
                            </div>
                            <div className="backtest-info-item">
                                <span>Time frame</span>
                                <input type="date" value={endDate}
                                                              onChange={e => setEndDate(e.target.value)}/>
                            </div>
                            <div className="backtest-actions">
                                <button
                                    className="backtest-button" onClick={() => updateWeek("prev")}>Previous Week
                                </button>
                                <button
                                    className="backtest-button" onClick={() => updateWeek("next")}>Next Week
                                </button>
                                <button
                                    className="backtest-button" onClick={fetchChartData}>Load Chart
                                </button>
                            </div>
                        </div>

                        <div className="backtest-card">
                            <h3>Select Backtest parameters</h3>
                            <div className="backtest-info-item">
                                <span>Select Strategy</span>
                                <select
                                    id="strategy"
                                    value={strategy_id}
                                    onChange={(e) => setStrategy(e.target.value)}>
                                    <option value="">-- Choose a strategy --</option>
                                    {availableStrategies.map((strat) => (
                                        <option key={strat.id} value={strat.id}>
                                            {strat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="backtest-info-item">
                                <span>Initial balance</span>
                                <select
                                    value={initial_balance}
                                    onChange={(e) => setInitialBalance(parseInt(e.target.value))}
                                >
                                    {[5, 10, 25, 50, 100, 200].map(val => (
                                        <option key={val} value={val * 1000}>
                                            {val}k USD
                                        </option>
                                    ))}
                                </select>

                                <span>Risk per trade</span>

                                <input
                                    type="number"
                                    min={0.01}
                                    max={10}
                                    step={0.01}
                                    value={risk_per_trade}
                                    onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    if (!isNaN(val)) {
                                        const corrected = Math.min(Math.max(val, 0.01), 10);
                                        setRiskPerTrade(corrected);
                                    }
                                }}
                                    />

                            </div>
                            <div className="backtest-actions">
                                <button
                                    className="backtest-button" onClick={runBacktest}>Run Backtest
                                </button>
                            </div>
                        </div>

                        {metrics && (
                            <div className="backtest-card">
                                <h3>Backtest Metrics</h3>
                                <div className="backtest-info-grid">
                                    <div className="backtest-info-item"><span>Total Profit</span>
                                        <p>{metrics.total_profit}</p></div>
                                    <div className="stat-info-item"><span>Max Drawdown</span>
                                        <p>{metrics.drawdown_max}</p></div>
                                    <div className="backtest-info-item"><span>Winrate</span>
                                        <p>{metrics.winrate}%</p></div>
                                    <div className="backtest-info-item"><span>Trades</span>
                                        <p>{metrics.nr_trades}</p></div>
                                    <div className="backtest-info-item"><span>Profit Factor</span>
                                        <p>{metrics.profit_factor}</p></div>
                                    <div className="backtest-info-item"><span>Expectancy</span>
                                        <p>{metrics.expectancy}</p>
                                    </div>
                                </div>
                                <div className="backtest-actions">
                                    <button
                                        className="backtest-button"> Save Backtest
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chart Card */}
                    <div className="backtesting-grid">
                        <div className="backtest-card" style={{width: '100%'}}>
                            <h3>Chart</h3>
                        <BacktestChart data={[]} candles={candles} trades={trades} />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default BacktestingPage;
