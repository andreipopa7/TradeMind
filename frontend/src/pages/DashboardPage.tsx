import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideMenu from "../components/SideMenu";
import "../styles/DashboardStyles.css";

interface Account {
    broker: string;
    accountId: string;
    balance: number;
    isVisible: boolean;
    credentials?: { username: string; password: string }; // Adăugăm câmp pentru credențiale
}

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState<Account[]>([
        {
            broker: "Broker A",
            accountId: "123456",
            balance: 1050.75,
            isVisible: true,
            credentials: { username: "user1223", password: "pass1243" },
        },
        {
            broker: "Broker B",
            accountId: "7894012",
            balance: 250.0,
            isVisible: false,
            credentials: { username: "user7289", password: "pass7899" },
        },
        {
            broker: "Broker C",
            accountId: "7893012",
            balance: 2540.0,
            isVisible: false,
            credentials: { username: "user7839", password: "pass785689" },
        },
        {
            broker: "Broker D",
            accountId: "789D012",
            balance: 2530.0,
            isVisible: false,
            credentials: { username: "user7589", password: "pass7689" },
        },
        {
            broker: "Broker E",
            accountId: "7890W12",
            balance: 2250.0,
            isVisible: false,
            credentials: { username: "user76789", password: "pass7789" },
        },
    ]);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [showCredentials, setShowCredentials] = useState<boolean>(false);

    // Funcția pentru deschiderea modal-ului
    const handleSeeCredentials = (account: Account) => {
        setSelectedAccount(account);
        setShowModal(true);
    };

    // Confirmarea afișării credentialelor
    const confirmCredentials = () => {
        setShowModal(false);
        setShowCredentials(true);

        // Ascunderea credentialelor după 2 minute
        setTimeout(() => {
            setShowCredentials(false);
        }, 120000);
    };

    // Schimbarea vizibilității contului
    const toggleVisibility = (index: number) => {
        setAccounts((prev) =>
            prev.map((account, i) =>
                i === index ? { ...account, isVisible: !account.isVisible } : account
            )
        );
    };

    // Secțiune pentru conturi vizibile
    const visibleAccounts = accounts.filter((account) => account.isVisible);
    const invisibleAccounts = accounts.filter((account) => !account.isVisible);

    const renderAccounts = () => {
        return (
            <div className="accounts-container">
                <div className="accounts-list">
                    {visibleAccounts.map((account, index) => (
                        <div key={index} className="account-card">
                            <h3>{account.broker}</h3>
                            <p>ID Cont: {account.accountId}</p>
                            <p>Balanta: {account.balance.toFixed(2)} USD</p>
                            <div className="account-actions">
                                <button
                                    onClick={() => navigate(`/dashboard/${account.accountId}/metrics`)}
                                    className="action-button">
                                    Metrics
                                </button>
                                <button
                                    onClick={() => handleSeeCredentials(account)}
                                    className="action-button">
                                    Credentials
                                </button>
                                <button
                                    onClick={() => toggleVisibility(index)}
                                    className="action-button invisible-button">
                                    Set Invisible
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="accounts-list">
                    {invisibleAccounts.map((account, index) => (
                        <div key={index} className="account-card invisible">
                            <h3>{account.broker}</h3>
                            <p>ID Cont: {account.accountId}</p>
                            <button
                                onClick={() => toggleVisibility(index)}
                                className="action-button visible-button">
                                Set Visible
                            </button>
                        </div>
                    ))}
                </div>
            </div>
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
                    {renderAccounts()}
                </div>
            </div>

            {/* Modal pentru confirmarea credentialelor */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmare</h2>
                        <p>Sigur doriți să vizualizați credențialele acestui cont?</p>
                        <button onClick={confirmCredentials} className="confirm-button">
                            Confirm
                        </button>
                        <button onClick={() => setShowModal(false)} className="cancel-button">
                            Anulează
                        </button>
                    </div>
                </div>
            )}

            {/* Afișarea credentialelor */}
            {showCredentials && selectedAccount && (
                <div className="credentials-popup">
                    <h3>Credențiale pentru {selectedAccount.broker}</h3>
                    <p>Username: {selectedAccount.credentials?.username}</p>
                    <p>Password: {selectedAccount.credentials?.password}</p>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
