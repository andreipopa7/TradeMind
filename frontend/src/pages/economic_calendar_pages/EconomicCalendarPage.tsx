import React, { useState, useEffect } from "react";
import SideMenu from "../../components/side_menu/SideMenu";
import NavBar from "../../components/nav_bar/NavBar";
import "./EconomicCalendarStyles.css";

const EconomicCalendarPage: React.FC = () => {
    const calendars = {
        "Investing.com": "https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&importance=2,3&features=datepicker,timezone,filters&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=week&timeZone=65&lang=1",
        "Trading Economics": "https://tradingeconomics.com/calendar",
        "TradingView": "tradingview"
    };

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
        <div className="economic-calendar-page">
            <NavBar />
            <div className="economic-calendar-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="calendar-content">
                    <h1>Economic Calendar</h1>

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
            </div>
        </div>
    );
};

export default EconomicCalendarPage;
