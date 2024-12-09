import React, { useState, useEffect } from "react";
import SideMenu from "../../components/side_menu/SideMenu";
import NavBar from "../../components/nav_bar/NavBar";
import "./EconomicCalendarStyles.css";

interface EconomicEvent {
    country: string;
    event: string;
    impact: string; // High, Medium, Low
    time: string;
    forecast?: number;
    actual?: number;
    previous?: number;
}

const EconomicCalendarPage: React.FC = () => {
    const [events, setEvents] = useState<EconomicEvent[]>([]);
    const [filter, setFilter] = useState({
        country: "",
        impact: "",
    });

    // Fetch data from backend
    useEffect(() => {
        fetch("http://localhost:8000/economic-calendar") // Endpoint-ul backendului
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error("Error fetching economic events:", error));
    }, []);

    // Filtering logic
    const filteredEvents = events.filter((event) => {
        return (
            (filter.country === "" || event.country === filter.country) &&
            (filter.impact === "" || event.impact === filter.impact)
        );
    });

    return (
        <div className="economic-calendar-page">
            <NavBar />
            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="calendar-content">
                    <h1>Economic Calendar</h1>

                    {/* Filters */}
                    <div className="filters">
                        <select
                            value={filter.country}
                            onChange={(e) => setFilter({ ...filter, country: e.target.value })}
                        >
                            <option value="">All Countries</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Germany">Germany</option>
                            {/* Adaugă alte țări */}
                        </select>

                        <select
                            value={filter.impact}
                            onChange={(e) => setFilter({ ...filter, impact: e.target.value })}
                        >
                            <option value="">All Impacts</option>
                            <option value="High">High Impact</option>
                            <option value="Medium">Medium Impact</option>
                            <option value="Low">Low Impact</option>
                        </select>
                    </div>

                    {/* Events List */}
                    <div className="events-list">
                        {filteredEvents.map((event, index) => (
                            <div key={index} className={`event-card impact-${event.impact.toLowerCase()}`}>
                                <h3>{event.event}</h3>
                                <p>Country: {event.country}</p>
                                <p>Time: {event.time}</p>
                                {event.forecast && <p>Forecast: {event.forecast}</p>}
                                {event.actual && <p>Actual: {event.actual}</p>}
                                {event.previous && <p>Previous: {event.previous}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EconomicCalendarPage;
