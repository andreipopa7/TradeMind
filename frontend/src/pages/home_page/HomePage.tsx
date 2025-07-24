import React from 'react';

import NavBar from '../../components/nav_bar/NavBar';
import SideMenu from '../../components/side_menu/SideMenu';
import Footer from "../../components/footer/Footer";

import '../../styles/GlobalStyles.css';
import '../../styles/FormStyles.css';
import './HomePageStyles.css';


const HomePage: React.FC = () => {
    return (
        <div className="app-container">
            <NavBar />

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">
                    <h2 className="page-title">Home - Update soon...</h2>

                    <Footer/>
                </div>
            </div>


        </div>
    );
};

export default HomePage;
