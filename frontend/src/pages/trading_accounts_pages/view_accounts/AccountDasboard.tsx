import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../configuration/AxiosConfigurations";

import AccountInfoCard from "../components/AccountInfoCard";
import PerformanceChart from "../components/PerformanceChart";
import StatisticsTable from "../components/StatisticsTable";
import TradingJournal from "../components/TradingJournal";
import NavBar from "../../../components/nav_bar/NavBar";
import SideMenu from "../../../components/side_menu/SideMenu";
import Footer from "../../../components/footer/Footer";

import "../../../styles/GlobalStyles.css";
import "./DashboardStyles.css";


const AccountDashboard: React.FC = () => {
    const { account_id } = useParams();
    const [accountDetails, setAccountDetails] = useState<any>(null);
    const [performanceData, setPerformanceData] = useState<any[]>([]);
    const [tradeStats, setTradeStats] = useState<any>(null);
    const [tradeJournal, setTradeJournal] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleDeleteAccount = (deletedAccountId: number) => {
        setAccountDetails((prevAccounts: any[]) =>
            prevAccounts.filter((account) => Number(account.account_id) !== deletedAccountId)
        );
    };

    useEffect(() => {
        if (!account_id) return;

        const fetchAccountData = async () => {
            try {
                const resAccount = await api.get(`/api/trademind/trading_accounts/${account_id}/credentials`);
                setAccountDetails(resAccount.data);
            } catch {
                setErrorMessage("Could not load account details.");
            }

            try {
                const resPerformance = await api.get(`/api/trademind/trading_accounts/${account_id}/performance`);
                setPerformanceData(resPerformance.data);
            } catch {
                console.warn("No performance data found for this account.");
            }

            try {
                const resStats = await api.get(`/api/trademind/trading_accounts/${account_id}/stats`);
                setTradeStats(resStats.data);
            } catch {
                console.warn("No trade statistics found for this account.");
            }

            try {
                const resJournal = await api.get(`/api/trademind/trading_accounts/${account_id}/trading_journal`);
                setTradeJournal(resJournal.data);
            } catch {
                console.warn("No trade journal found for this account.");
            }
        };

        fetchAccountData();
    }, [account_id]);

    return (
        <div className="app-container">
            <NavBar />

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">

                    <h2 className="page-title">Account Metrics for {account_id}</h2>


                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {accountDetails && (
                        <>
                            <div className="metrics-container">
                                <AccountInfoCard account={accountDetails || null} onDelete={handleDeleteAccount} />
                                <StatisticsTable stats={tradeStats || null}/>
                            </div>
                            <PerformanceChart data={performanceData || null}/>
                            <TradingJournal trades={tradeJournal || null}/>
                        </>
                    )}

                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AccountDashboard;
