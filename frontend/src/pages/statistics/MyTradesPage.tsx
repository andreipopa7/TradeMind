import React, { useEffect, useState } from "react";
import {useAuth} from "../../configuration/UseAuth";
import { Trade } from "../../types/Trade";

import api from "../../configuration/AxiosConfigurations";
import TradeTable from "./components/TradeTabel"
import TradeFormModal from "./components/TradeFormModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import NavBar from "../../components/nav_bar/NavBar";
import SideMenu from "../../components/side_menu/SideMenu";
import Footer from "../../components/footer/Footer";

import "../../styles/GlobalStyles.css"
import "./styles/MyTradesPage.css"


const MyTradesPage = () => {
    const [trades, setTrades] = useState<Trade[]>([]);
    const [selectedTrade, setSelectedTrade] = useState<Trade | undefined>(undefined);
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [sortField, setSortField] = useState<keyof Trade>("open_date");
    const [sortOrder, setSortOrder] = useState("asc");
    const user = useAuth();

    const fetchTrades = async () => {
        if (!user?.id) return;

        try {
            const response = await api.get(`/api/trademind/trades/user/${user.id}`);
            const data = response.data;
            setTrades(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Eroare la preluarea trade-urilor:", err);
            setTrades([]);
        }
    };

    useEffect(() => {
        fetchTrades();
    }, [user]);


    const sortedTrades = [...trades].sort((a, b) => {
        if (sortField === "profit") return sortOrder === "asc"
            ? (a.profit || 0) - (b.profit || 0)
            : (b.profit || 0) - (a.profit || 0);
        if (sortField === "market") return sortOrder === "asc"
            ? a.market.localeCompare(b.market)
            : b.market.localeCompare(a.market);
        if (sortField === "open_date") return sortOrder === "asc"
            ? new Date(a.open_date || "").getTime() - new Date(b.open_date || "").getTime()
            : new Date(b.open_date || "").getTime() - new Date(a.open_date || "").getTime();
        return 0;
    });

    return (
        <div className="app-container">
            <NavBar />

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">
                    <h2 className="page-title">My Trades</h2>

                    <TradeTable
                        trades={sortedTrades}
                        onEdit={(trade: Trade) => {
                            setSelectedTrade(trade);
                            setShowForm(true);
                        }}

                        onDelete={(trade: Trade) => {
                            setSelectedTrade(trade);
                            setShowDelete(true);
                        }}

                        onAddNew={() => {
                            setSelectedTrade(undefined);
                            setShowForm(true);
                        }}

                        onSortChange={(field: keyof Trade) => {
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                            setSortField(field);
                        }}
                    />

                    {showForm && (
                        <TradeFormModal
                            trade={selectedTrade}
                            onClose={() => setShowForm(false)}
                            onSuccess={() => {
                                fetchTrades();
                                setShowForm(false);
                            }}
                        />
                    )}

                    {showDelete && selectedTrade && (
                        <ConfirmDeleteModal
                            trade={selectedTrade}
                            onClose={() => setShowDelete(false)}
                            onDeleted={() => {
                                fetchTrades();
                                setShowDelete(false);
                            }}
                        />
                    )}

                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default MyTradesPage;
