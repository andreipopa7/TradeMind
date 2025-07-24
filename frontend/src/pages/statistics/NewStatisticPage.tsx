import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from "../../configuration/AxiosConfigurations";
import {useAuth} from "../../configuration/UseAuth";
import NavBar from "../../components/nav_bar/NavBar";
import SideMenu from "../../components/side_menu/SideMenu";
import Footer from "../../components/footer/Footer";

import './styles/NewStatistic.css';


const NewStatisticPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [params, setParams] = useState({});
    const user = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.id) {
            alert("You must be logged in to create a statistic.");
            return;
        }

        const payload = {
            user_id: user.id,
            name,
            params
        };

        try {
            const res = await api.post("/api/trademind/statistics/create", payload);
            if (res.status === 200 || res.status === 201) {
                navigate("/statistics/my_statistics");
            }
        } catch (err: any) {
            console.error("Error creating statistic:", err);
            alert("Error: " + (err.response?.data?.detail || "Failed to create statistic."));
        }
    };

    return (
        <div className="app-container">
            <NavBar />

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">
                    <h2 className="page-title">Create New Statistic</h2>

                    <form onSubmit={handleSubmit} className="form-container">
                        <label>Statistic Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <label>Markets (comma-separated):</label>
                        <input
                            type="text"
                            onChange={(e) => setParams({
                                ...params,
                                market: e.target.value.split(',').map(m => m.trim())
                            })}
                            placeholder="e.g., DE30EUR, NAS100USD"
                        />

                        <label>Sessions:</label>
                        <select multiple onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions).map(option => option.value);
                            setParams({...params, session: selected});
                        }}>
                            <option value="Asia">Asia</option>
                            <option value="London">London</option>
                            <option value="NewYork">NewYork</option>
                        </select>

                        <label>Source Type:</label>
                        <select onChange={(e) => setParams({...params, source_type: e.target.value})}>
                            <option value="">-- select source --</option>
                            <option value="user">USER</option>
                            <option value="backtest">BACKTEST</option>
                        </select>

                        <label>Volume Range:</label>
                        <div className="volume-range">
                            <input
                                type="number"
                                placeholder="Min"
                                onChange={(e) => setParams({...params, min_volume: e.target.value})}
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                onChange={(e) => setParams({...params, max_volume: e.target.value})}
                            />
                        </div>

                        <label>Start Date:</label>
                        <input
                            type="date"
                            onChange={(e) => setParams({...params, start_date: e.target.value})}
                        />

                        <label>End Date:</label>
                        <input
                            type="date"
                            onChange={(e) => setParams({...params, end_date: e.target.value})}
                        />

                        <button type="submit" className="form-button ">Save Statistic</button>
                    </form>

                    <Footer />

                </div>
            </div>
        </div>
    );
};

export default NewStatisticPage;
