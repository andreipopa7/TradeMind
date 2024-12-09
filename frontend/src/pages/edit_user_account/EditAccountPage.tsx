import React from 'react';
import '../../styles/GlobalStyles.css';
import NavBar from '../../components/nav_bar/NavBar';
import SideMenu from "../../components/side_menu/SideMenu";

const EditAccountPage: React.FC = () => {

    return (
        <div className="home-page">
            <NavBar/>

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu/>
                </div>

                <div className="page-content">
                    <h1>Edi Account Page</h1>
                    <p>Acesta este conținutul principal al paginii.</p>
                </div>
            </div>
        </div>
    );
};

export default EditAccountPage;