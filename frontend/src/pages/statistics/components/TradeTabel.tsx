import React, { useState } from "react";
import { Trade } from "./Trade";
import TradeRow from "./TradeRow";
import "../styles/TradeTable.css";

interface TradeTableProps {
    trades: Trade[];
    onEdit: (trade: Trade) => void;
    onDelete: (trade: Trade) => void;
    onAddNew: () => void;
    onSortChange: (field: keyof Trade) => void;
}

const TradeTable: React.FC<TradeTableProps> = ({ trades, onEdit, onDelete, onAddNew, onSortChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [tradesPerPage, setTradesPerPage] = useState(10);

    const totalPages = Math.ceil(trades.length / tradesPerPage);
    const indexOfLastTrade = currentPage * tradesPerPage;
    const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;
    const currentTrades = trades.slice(indexOfFirstTrade, indexOfLastTrade);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTradesPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="trade-table-container">
            <div className="pagination-controls">
                <label>Show: </label>
                <select value={tradesPerPage} onChange={handlePerPageChange}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>

                <span className="total-trades">Total Trades: {trades.length}</span>

                <button className="add-trade-btn" onClick={onAddNew}>Add New Trade</button>
            </div>

            <table className="trade-table">
                <thead>
                <tr>
                    <th onClick={() => onSortChange("market")}>Market ⬍</th>
                    <th>Volume</th>
                    <th>Type</th>
                    <th onClick={() => onSortChange("open_date")}>Open Date ⬍</th>
                    <th>Open Time</th>
                    <th>Close Date</th>
                    <th>Close Time</th>
                    <th>Session</th>
                    <th>Open Price</th>
                    <th>TP Price</th>
                    <th>SL Price</th>
                    <th>Close Price</th>
                    <th onClick={() => onSortChange("profit")}>Profit ⬍</th>
                    <th>Swap</th>
                    <th>Commission</th>
                    <th>Pips</th>
                    <th>Photo Link</th>
                </tr>
                </thead>
                <tbody>
                {currentTrades.map((trade) => (
                    <TradeRow key={trade.id} trade={trade} onEdit={onEdit} onDelete={onDelete}/>
                ))}
                </tbody>
            </table>

            <div className="pagination-nav">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    ◀ Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next ▶
                </button>
            </div>

            <div className="button-container">
            </div>
        </div>
    );
};

export default TradeTable;
