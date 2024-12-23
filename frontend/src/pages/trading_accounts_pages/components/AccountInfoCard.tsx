import React from "react";
import "../view_accounts/DashboardStyles.css";

const AccountInfoCard: React.FC = () => {
    return (
        <div className="account-info-card">
            <h2>Free Trial 1520568431</h2>
            <div className="info-grid">
                <div><strong>Status:</strong> Ended</div>
                <div><strong>Start:</strong> 12 Dec 2024</div>
                <div><strong>End:</strong> 20 Dec 2024</div>
                <div><strong>Account Size:</strong> $100,000.00</div>
                <div><strong>Platform:</strong> MT5</div>
                <div>
                    <a href="#">Download</a>
                </div>
            </div>
        </div>
    );
};

export default AccountInfoCard;
