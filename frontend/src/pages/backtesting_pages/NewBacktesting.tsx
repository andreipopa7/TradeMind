import React from 'react';
import '../../styles/GlobalStyles.css';
import NavBar from '../../components/nav_bar/NavBar';
import SideMenu from "../../components/side_menu/SideMenu";

const NewBacktesting: React.FC = () => {

    return (
        <div className="add-account-page">
            <NavBar/>

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu/>
                </div>

                <div className="page-content">
                    <h2 className="page-title"> NewBacktesting Page</h2>
                    <p>Acesta este conținutul principal al paginii.</p>
                </div>
            </div>
        </div>
    );
};

export default NewBacktesting;