import React, { useState } from "react";
import "../../../styles/GlobalStyles.css";
import "./AddAccountStyles.css";
import NavBar from "../../../components/nav_bar/NavBar";
import SideMenu from "../../../components/side_menu/SideMenu";
import { useNavigate } from "react-router-dom";

const AddAccount: React.FC = () => {
    const [formData, setFormData] = useState({
        broker: "",
        accountId: "",
        password: "",
        server: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validare simplă
        if (!formData.broker || !formData.accountId || !formData.password || !formData.server) {
            setError("All fields are required.");
            return;
        }

        // Simulare verificare cont
        setTimeout(() => {
            alert("Cont adăugat cu succes!");
            navigate(`/dashboard/${formData.accountId}`);
        }, 1000); // După 1 secundă, redirecționează către dashboard
    };

    return (
        <div className="add-account-page">
            <NavBar />

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">
                    <h1>Add your new trading account!</h1>
                    <form className="add-account-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="broker">Broker:</label>
                            <input
                                type="text"
                                id="broker"
                                name="broker"
                                value={formData.broker}
                                onChange={handleInputChange}
                                placeholder="Broker name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="accountId">ID Cont:</label>
                            <input
                                type="text"
                                id="accountId"
                                name="accountId"
                                value={formData.accountId}
                                onChange={handleInputChange}
                                placeholder="Account ID"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Parolă:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Account Password"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="server">Server:</label>
                            <input
                                type="text"
                                id="server"
                                name="server"
                                value={formData.server}
                                onChange={handleInputChange}
                                placeholder="Account Server"
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="submit-button">
                            Adaugă Cont
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAccount;
