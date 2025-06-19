import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../../components/nav_bar/NavBar";
import SideMenu from "../../components/side_menu/SideMenu";
import './styles/NewStatistic.css';

const NewStatisticPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [params, setParams] = useState({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            user_id: 1,
            name,
            params
        };

        const res = await fetch("http://localhost:8000/api/trademind/statistics/create", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            navigate("/statistics/my_statistics");
        } else {
            const error = await res.json();
            alert("Error: " + error.detail);
        }
    };

    return (
        <div className="my-trades-container">
            <NavBar />
            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>
                <div className="page-content">
                    <h2>Create New Statistic</h2>
                    <form onSubmit={handleSubmit} className="new-stat-form">
                        <div className="form-group">
                            <label>Statistic Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Markets (comma-separated):</label>
                            <input
                                type="text"
                                onChange={(e) => setParams({
                                    ...params,
                                    market: e.target.value.split(',').map(m => m.trim())
                                })}
                                placeholder="e.g., DE30EUR, NAS100USD"
                            />
                        </div>

                        <div className="form-group">
                            <label>Sessions:</label>
                            <select multiple onChange={(e) => {
                                const selected = Array.from(e.target.selectedOptions).map(option => option.value);
                                setParams({...params, session: selected});
                            }}>
                                <option value="Asia">Asia</option>
                                <option value="London">London</option>
                                <option value="NewYork">NewYork</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Source Type:</label>
                            <select onChange={(e) => setParams({...params, source_type: e.target.value})}>
                                <option value="">-- select source --</option>
                                <option value="manual">Manual</option>
                                <option value="bot">Bot</option>
                            </select>
                        </div>

                        <div className="form-group">
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
                        </div>

                        <div className="form-group">
                            <label>Start Date:</label>
                            <input
                                type="date"
                                onChange={(e) => setParams({...params, start_date: e.target.value})}
                            />
                        </div>

                        <div className="form-group">
                            <label>End Date:</label>
                            <input
                                type="date"
                                onChange={(e) => setParams({...params, end_date: e.target.value})}
                            />
                        </div>

                        <button type="submit" className="add-new-button">Save Statistic</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewStatisticPage;
