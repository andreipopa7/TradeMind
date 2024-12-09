import React from 'react';
import '../../styles/GlobalStyles.css';
import NavBar from '../../components/nav_bar/NavBar';
import SideMenu from "../../components/side_menu/SideMenu";

const CustomStrategy: React.FC = () => {

    return (
        <div className="add-account-page">
            <NavBar/>

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu/>
                </div>

                <div className="page-content">
                    <h1>CustomStrategy Page</h1>
                    <p>Acesta este conținutul principal al paginii.</p>
                </div>
            </div>
        </div>
    );
};

export default CustomStrategy;