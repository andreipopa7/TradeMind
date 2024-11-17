import React from 'react';
import '../styles/GlobalStyles.css';
import NavBar from '../components/NavBar';
import SideMenu from "../components/SideMenu";

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