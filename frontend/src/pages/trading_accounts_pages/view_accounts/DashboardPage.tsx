import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountInfoCard from "../components/AccountInfoCard";
import "./DashboardStyles.css";
import NavBar from "../../../components/nav_bar/NavBar";
import SideMenu from "../../../components/side_menu/SideMenu";

const DashboardPage: React.FC = () => {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem("email");
        if (!userEmail) {
            setErrorMessage("No user email found. Please log in.");
            return;
        }

        const fetchAccounts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/trademind/trading_accounts/accounts/${encodeURIComponent(userEmail)}`);

                if (response.status === 404) {
                    setErrorMessage("No trading accounts found.");
                    setShowPopup(true);
                    return;
                }

                if (!response.ok) throw new Error("Failed to fetch accounts");

                const data = await response.json();
                if (Array.isArray(data)) {
                    setAccounts(data);
                    if (data.length === 0) {
                        setShowPopup(true);
                    }
                } else {
                    throw new Error("Unexpected response format.");
                }
            } catch (error) {
                setErrorMessage("Failed to load accounts.");
                setShowPopup(true);
            }
        };

        fetchAccounts();
    }, []);


    const handleDeleteAccount = (deletedAccountId: number) => {
        setAccounts((prevAccounts) =>
            prevAccounts.filter((account) => Number(account.account_id) !== deletedAccountId)
        );
    };

    return (
        <div className="dashboard-page">
            <NavBar />
            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">
                    <h1>Your Trading Accounts</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <div className="account-list">
                        {accounts.length > 0 ? (
                            accounts.map((account) => (
                                <AccountInfoCard
                                    key={account.account_id}
                                    account={account}
                                    onDelete={handleDeleteAccount}
                                />
                            ))
                        ) : (
                            <p>Loading accounts...</p>
                        )}
                    </div>
                </div>
            </div>

            {showPopup && (
                <div className="credentials-modal">
                    <div className="modal-content">
                        <p className="error-message">
                            You don't have any trading accounts added yet. Please add one to continue.
                        </p>
                        <button className="close-modal" onClick={() => setShowPopup(false)}>✖</button>

                        <div className="modal-buttons">
                            <button className="add-account-button" onClick={() => navigate("/accounts/add")}>
                                Add Account
                            </button>
                            <button className="cancel-button" onClick={() => navigate("/home")}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;



