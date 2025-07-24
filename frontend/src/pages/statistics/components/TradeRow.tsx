import React, { useState, useRef, useEffect } from "react";
import { Trade } from "../../../types/Trade";
import "../styles/TradeRow.css";

interface TradeRowProps {
    trade: Trade;
    onEdit: (trade: Trade) => void;
    onDelete: (trade: Trade) => void;
}

const TradeRow: React.FC<TradeRowProps> = ({ trade, onEdit, onDelete }) => {
    const [showActions, setShowActions] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const rowRef = useRef<HTMLTableRowElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);


    const handleDoubleClick = (event: React.MouseEvent) => {
        setMenuPosition({ x: event.clientX, y: event.clientY });
        setShowActions(true);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShowActions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <tr ref={rowRef} onDoubleClick={handleDoubleClick}>
                <td>{trade.market}</td>
                <td>{trade.volume}</td>
                <td>{trade.type}</td>
                <td>{trade.open_date ? new Date(trade.open_date).toLocaleDateString() : ""}</td>
                <td>{trade.open_time || ""}</td>
                <td>{trade.close_date ? new Date(trade.close_date).toLocaleDateString() : ""}</td>
                <td>{trade.close_time || ""}</td>
                <td>{trade.session || ""}</td>
                <td>{trade.open_price.toFixed(5)}</td>
                <td>{trade.tp_price ? trade.tp_price.toFixed(5) : ""}</td>
                <td>{trade.sl_price ? trade.sl_price.toFixed(5) : ""}</td>
                <td>{trade.close_price ? trade.close_price.toFixed(5) : ""}</td>
                <td className={(trade.profit ?? 0) >= 0 ? "profit-positive" : "profit-negative"}>
                    {(trade.profit ?? 0).toFixed(2)}
                </td>
                <td>{trade.swap?.toFixed(2) || ""}</td>
                <td>{trade.commission?.toFixed(2) || ""}</td>
                <td>{trade.pips?.toFixed(2) || ""}</td>
                <td>
                    {trade.link_photo ? (
                        <a href={trade.link_photo} target="_blank" rel="noopener noreferrer">
                            📸 Photo
                        </a>
                    ) : ""}
                </td>
            </tr>

            {showActions && (
                <div
                    ref={menuRef}
                    className="actions-dropdown"
                    style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
                >
                    <button className="edit-btn" onClick={() => onEdit(trade)}>✏️ Edit</button>
                    <button className="delete-btn" onClick={() => onDelete(trade)}>🗑️ Delete</button>
                </div>
            )}
        </>
    );
};

export default TradeRow;
