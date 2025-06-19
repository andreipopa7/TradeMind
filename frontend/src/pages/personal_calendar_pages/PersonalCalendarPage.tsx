import React from 'react';
import NavBar from '../../components/nav_bar/NavBar';
import SideMenu from '../../components/side_menu/SideMenu';
import '../../styles/GlobalStyles.css';
import './PersonalCalendarStyles.css';

const PersonalCalendsarPage: React.FC = () => {
    return (
        <div className="home-page">
            <NavBar />

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">
                    <h1>PersonalCalendar - Update soon...</h1>

                </div>
            </div>
        </div>
    );
};

export default PersonalCalendsarPage;
