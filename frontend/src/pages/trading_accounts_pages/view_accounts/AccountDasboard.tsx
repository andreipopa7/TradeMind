import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountInfoCard from "../components/AccountInfoCard";
import PerformanceChart from "../components/PerformanceChart";
import StatisticsTable from "../components/StatisticsTable";
import TradingJournal from "../components/TradingJournal";
import "./DashboardStyles.css";
import NavBar from "../../../components/nav_bar/NavBar";
import SideMenu from "../../../components/side_menu/SideMenu";

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
        if (account_id) {
            const fetchAccountData = async () => {
                try {
                    // Fetch account details
                    const resAccount = await fetch(`http://localhost:8000/api/trademind/trading_accounts/${account_id}/credentials`);
                    const accountData = await resAccount.json();
                    console.log(accountData);
                    setAccountDetails(accountData);

                    // Fetch performance chart data
                    const resPerformance = await fetch(`http://localhost:8000/api/trademind/trading_accounts/${account_id}/performance`);
                    const performanceData = await resPerformance.json();
                    setPerformanceData(performanceData);

                    // Fetch statistics
                    const resStats = await fetch(`http://localhost:8000/api/trademind/trading_accounts/${account_id}/stats`);
                    const statsData = await resStats.json();
                    setTradeStats(statsData);

                    // Fetch trading journal
                    const resJournal = await fetch(`http://localhost:8000/api/trademind/trading_accounts/${account_id}/trading_journal`);
                    const journalData = await resJournal.json();
                    setTradeJournal(journalData);

                    console.log("Stats API Response:", accountDetails);
                    console.log("Stats API Response:", performanceData);
                    console.log("Stats API Response:", tradeStats);
                    console.log("Stats API Response:", tradeJournal);
                } catch (error) {
                    setErrorMessage("Failed to load account details.");
                }
            };

            fetchAccountData();
        }
    }, [account_id]);

    return (
        <div className="account-dashboard">
            <NavBar />

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">

                    <h1>Account Metrics for {account_id}</h1>


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
                </div>
            </div>
        </div>
    );
};

export default AccountDashboard;
