import React from 'react';
import NavBar from '../../components/nav_bar/NavBar';
import SideMenu from '../../components/side_menu/SideMenu';
import '../../styles/GlobalStyles.css';
import '../home_page/HomePageStyles.css';

const HelpPage: React.FC = () => {
    return (
        <div className="home-page">
            <NavBar />

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">
                    <h1>Help Page</h1>

                </div>
            </div>
        </div>
    );
};

export default HelpPage;
