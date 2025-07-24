import React, { useState, useEffect } from "react";
import {calendars} from "../../components/utils";

import SideMenu from "../../components/side_menu/SideMenu";
import NavBar from "../../components/nav_bar/NavBar";
import Footer from "../../components/footer/Footer";

import '../../styles/GlobalStyles.css';
import '../../styles/FormStyles.css';
import "./EconomicCalendarStyles.css";


const EconomicCalendarPage: React.FC = () => {
    const [selectedCalendar, setSelectedCalendar] = useState<keyof typeof calendars>("Investing.com");

    useEffect(() => {
        if (selectedCalendar === "TradingView") {
            const existingScript = document.getElementById("tradingview-widget-script");
            if (existingScript) {
                existingScript.remove();
            }

            const script = document.createElement("script");
            script.id = "tradingview-widget-script";
            script.type = "text/javascript";
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
            script.async = true;
            script.innerHTML = JSON.stringify({
                colorTheme: "dark",
                isTransparent: false,
                width: "100%",
                height: "900",
                locale: "en",
                importanceFilter: "-1,0,1",
                countryFilter: "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu"
            });

            document.getElementById("tradingview-container")?.appendChild(script);
        }
    }, [selectedCalendar]);

    return (
        <div className="app-container">
            <NavBar/>

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">
                    <h2 className="page-title">Economic Calendar</h2>

                    <div className="form-container economic-container">
                        <div className="calendar-selector">
                            <label htmlFor="calendar">Choose a calendar:</label>
                            <select
                                id="calendar"
                                value={selectedCalendar}
                                onChange={(e) => setSelectedCalendar(e.target.value as keyof typeof calendars)}
                            >
                                {Object.keys(calendars).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="calendar-iframe-container">
                        {selectedCalendar === "TradingView" ? (
                            <div id="tradingview-container" className="tradingview-widget-container">
                                <div className="tradingview-widget-container__widget"></div>
                            </div>
                        ) : (
                            <iframe
                                src={calendars[selectedCalendar]}
                                title="Economic Calendar"
                                frameBorder="0"
                                loading="lazy"
                            ></iframe>
                        )}
                    </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};

export default EconomicCalendarPage;
