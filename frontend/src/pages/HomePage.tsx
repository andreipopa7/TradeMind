import React from 'react';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
import '../styles/GlobalStyles.css';
import '../styles/HomePage.css';
import image from "../images/loginImage.jpg";

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <NavBar />

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>

                <div className="page-content">
                    <h1>Home Page</h1>

                </div>
            </div>
        </div>
    );
};

export default HomePage;
