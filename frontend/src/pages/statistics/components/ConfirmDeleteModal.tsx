import React from "react";
import { Trade } from "./Trade";
import "../styles/ConfirmDeleteModal.css"

interface ConfirmDeleteModalProps {
    trade: Trade;
    onClose: () => void;
    onDeleted: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ trade, onClose, onDeleted }) => {

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/trademind/trades/${trade.id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete trade");
            onDeleted();
        } catch (error) {
            console.error("Error deleting trade:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete this trade?</p>
                <p><strong>{trade?.market ?? "Unknown Market"}</strong> from {trade?.open_date ?? "Unknown Date"} opened with {trade?.volume ?? "Unknown"} lots</p>

                <div className="modal-buttons">
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
