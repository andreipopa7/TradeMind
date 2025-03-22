import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/GlobalStyles.css";
import "./AddAccountStyles.css";
import NavBar from "../../../components/nav_bar/NavBar";
import SideMenu from "../../../components/side_menu/SideMenu";

const AddAccount: React.FC = () => {
    const [formData, setFormData] = useState({
        user_id: "",
        broker_name: "",
        account_id: "",
        server: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedID = localStorage.getItem("user_id");
        if (storedID) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                user_id: storedID,
            }));
        } else {
            setErrorMessage("No user found. Please log in.");
        }
    }, []);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });

        validateField(id, value);
    };

    const validateField = (field: string, value: string) => {
        let error = "";

        if (!value.trim()) {
            error = "This field is required.";
        } else {
            if (field === "account_id" && !/^\d+$/.test(value)) {
                error = "Account ID must contain only digits.";
            }
        }

        setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));
    };

    const validateForm = () => {
        const errors: { [key: string]: string } = {};

        Object.keys(formData).forEach((field) => {
            if (!formData[field as keyof typeof formData].trim()) {
                errors[field] = "This field is required.";
            }
        });

        if (formData.account_id && !/^\d+$/.test(formData.account_id)) {
            errors.account_id = "Account ID must contain only digits.";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!validateForm()) {
            return;
        }

        const formDataToSend = {
            ...formData,
            user_id: Number(formData.user_id),
        };

        console.log("Form Data:", formDataToSend);

        try {
            const response = await fetch("http://localhost:8000/api/trademind/trading_accounts/add_account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataToSend),
            });

            if (response.ok) {
                setSuccessMessage("Account successfully added!");
                setTimeout(() => navigate(`/accounts/dashboard/${formData.account_id}`), 2000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.detail || "Invalid trading account credentials. Failed to add account.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setErrorMessage("Network error. Please try again.");
        }
    };


    return (
        <div className="add-account-page">
            <NavBar />

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">
                    <h1>Add New Trading Account</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    <form className="add-account-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="broker">Broker:</label>
                            <input
                                type="text"
                                id="broker_name"
                                value={formData.broker_name}
                                onChange={handleInputChange}
                                placeholder="Enter broker name"
                                required
                            />
                            {fieldErrors.broker_name && <p className="field-error">{fieldErrors.broker_name}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="accountId">Account ID:</label>
                            <input
                                type="text"
                                id="account_id"
                                value={formData.account_id}
                                onChange={handleInputChange}
                                placeholder="Enter account ID"
                                required
                            />
                            {fieldErrors.account_id && <p className="field-error">{fieldErrors.account_id}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Account Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter account password"
                                required
                            />
                            {fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="server">Server:</label>
                            <input
                                type="text"
                                id="server"
                                value={formData.server}
                                onChange={handleInputChange}
                                placeholder="Enter server"
                                required
                            />
                            {fieldErrors.server && <p className="field-error">{fieldErrors.server}</p>}
                        </div>

                        <button type="submit" className="submit-button">
                            Add Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAccount;
