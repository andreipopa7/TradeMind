import React, { useState } from "react";
import { Trade } from "./Trade";
import "../styles/TradeFormModal.css";

interface TradeFormModalProps {
    trade?: Trade;
    onClose: () => void;
    onSuccess: () => void;
}


const TradeFormModal: React.FC<TradeFormModalProps> = ({ trade, onClose, onSuccess }) => {
    const isEdit = !!trade;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const userId = localStorage.getItem("user_id");

    const [formData, setFormData] = useState({
        // id: trade?.id || undefined,
        user_id: userId || undefined,

        market: trade?.market || undefined,
        type: trade?.type || undefined,
        volume: trade?.volume || undefined,

        open_date: trade?.open_date || undefined,
        open_time: trade?.open_time || undefined,
        close_date: trade?.close_date || undefined,
        close_time: trade?.close_time || undefined,
        session: trade?.session || undefined,

        open_price: trade?.open_price || undefined,
        close_price: trade?.close_price || undefined,
        sl_price: trade?.sl_price || undefined,
        tp_price: trade?.tp_price || undefined,

        profit: trade?.profit || undefined,
        swap: trade?.swap || undefined,
        commission: trade?.commission || undefined,

        link_photo: trade?.link_photo || undefined,

        source_type: trade?.source_type || "user",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const numericFields = [
            "open_price",
            "close_price",
            "sl_price",
            "tp_price",
            "profit",
            "swap",
            "commission",
            "volume"
        ];

        let parsedValue: string | number = value;

        if (numericFields.includes(name)) {
            const floatValue = parseFloat(value);
            parsedValue = isNaN(floatValue) ? "" : floatValue;
        }

        setFormData({ ...formData, [name]: parsedValue });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userId) {
            return;
        }

        const url = isEdit
            ? `http://localhost:8000/api/trademind/trades/update_trade/${trade?.id}`
            : `http://localhost:8000/api/trademind/trades/add_trade`;

        const method = isEdit ? "PUT" : "POST";

        console.log(" Sending request to:", url);
        console.log(" Payload:", JSON.stringify(formData, null, 2));

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                // verificăm dacă e dict cu `detail`
                const error = responseData?.detail || "Unexpected error occurred.";
                setErrorMessage(error);
                return;
            }

            onSuccess();

        } catch (error: any) {
            setErrorMessage(error.message || "Something went wrong.");
            console.error("Error saving trade:", error);
        }

    };


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{isEdit ? "Edit Trade" : "Add Trade"}</h2>

                <form onSubmit={handleSubmit}>
                    <label>Market</label>
                    <input type="text" name="market" value={formData.market} onChange={handleChange} required/>

                    <label>Type</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="unknown">select type</option>
                        <option value="buy">buy</option>
                        <option value="sell">sell</option>
                    </select>

                    <label>Volume</label>
                    <input type="number" step="0.01" name="volume" value={formData.volume} onChange={handleChange}
                           required/>

                    <label>Open Date</label>
                    <input type="date" name="open_date" value={formData.open_date} onChange={handleChange} required/>

                    <label>Open Time</label>
                    <input type="time" name="open_time" value={formData.open_time} onChange={handleChange} required/>

                    <label>Close Date</label>
                    <input type="date" name="close_date" value={formData.close_date} onChange={handleChange}/>

                    <label>Close Time</label>
                    <input type="time" name="close_time" value={formData.close_time} onChange={handleChange}/>


                    <label>Open Price</label>
                    <input type="number" step="0.00001" name="open_price" value={formData.open_price}
                           onChange={handleChange} required/>

                    <label>Close Price</label>
                    <input type="number" step="0.00001" name="close_price" value={formData.close_price}
                           onChange={handleChange}/>

                    <label>Stop Loss</label>
                    <input type="number" step="0.00001" name="sl_price" value={formData.sl_price}
                           onChange={handleChange}/>

                    <label>Take Profit</label>
                    <input type="number" step="0.00001" name="tp_price" value={formData.tp_price}
                           onChange={handleChange}/>

                    <label>Profit</label>
                    <input type="number" step="0.1" name="profit" value={formData.profit}
                           onChange={handleChange}/>

                    <label>Swap</label>
                    <input type="number" step="0.1" name="swap" value={formData.swap}
                           onChange={handleChange}/>

                    <label>Commission</label>
                    <input type="number" step="0.1" name="commission" value={formData.commission}
                           onChange={handleChange}/>

                    <label>Link Photo</label>
                    <input type="text" name="link_photo" value={formData.link_photo}
                           onChange={handleChange}/>

                    {errorMessage && (
                        <div className="error-box">
                            {errorMessage}
                        </div>
                    )}

                    <div className="modal-actions">
                        <button type="submit">{isEdit ? "Update" : "Add"} Trade</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default TradeFormModal;
