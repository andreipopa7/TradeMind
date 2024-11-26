import React from 'react';
import '../styles/GlobalStyles.css';
import NavBar from '../components/NavBar';
import SideMenu from "../components/SideMenu";

const NewBacktesting: React.FC = () => {

    return (
        <div className="add-account-page">
            <NavBar/>

            <div className="main-content">
                <div className="side-menu">
                    <SideMenu/>
                </div>

                <div className="page-content">
                    <h1>NewBacktesting Page</h1>
                    <p>Acesta este conținutul principal al paginii.</p>
                </div>
            </div>
        </div>
    );
};

export default NewBacktesting;