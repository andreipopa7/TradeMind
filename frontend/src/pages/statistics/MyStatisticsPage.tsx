import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/MyStatistics.css';
import NavBar from "../../components/nav_bar/NavBar";
import SideMenu from "../../components/side_menu/SideMenu";

interface Statistic {
    id: number;
    name: string;
    created_at: string;
    is_active: boolean;
    params: any;
}

const MyStatisticsPage: React.FC = () => {
    const [statistics, setStatistics] = useState<Statistic[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/api/trademind/statistics/user/1")
            .then((res) => res.json())
            .then((data) => setStatistics(data))
            .catch((err) => console.error("Failed to fetch statistics", err));
    }, []);

    const handleCardClick = (statisticId: number) => {
        navigate(`/statistics/my_statistics/${statisticId}`);
    };

    return (
        <div className="my-trades-container">
            <NavBar />
            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>
                <div className="page-content">
                    <h2>My Statistics</h2>

                    <div style={{textAlign: 'center', marginBottom: '20px'}}>
                        <button
                            onClick={() => navigate("/statistics/new_statistic")}
                            className="add-new-button"
                        >
                            Add New Statistic
                        </button>
                    </div>
                    
                    <div className="statistics-grid">
                        {statistics.map((stat) => (
                            <div key={stat.id} className="stat-card">
                                <h3>{stat.name}</h3>
                                <div className="stat-info-grid">
                                    <div className="stat-info-item">
                                        <span>Created</span>
                                        <p>{new Date(stat.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="stat-info-item">
                                        <span>Status</span>
                                        <p>{stat.is_active ? 'Active' : 'Inactive'}</p>
                                    </div>
                                </div>
                                <div className="stat-actions">
                                    <button className="view-button" onClick={() => handleCardClick(stat.id)}>View
                                    </button>
                                    <button className="delete-button">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyStatisticsPage;
