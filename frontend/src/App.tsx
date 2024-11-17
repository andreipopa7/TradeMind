import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import EditAccountPage from "./pages/EditAccountPage";
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
    return (
        <Router>
            <Routes>
                {/* pagina implicită este Login */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/edit-credentials" element={<EditAccountPage />} />
            </Routes>
        </Router>
    );
}

export default App;
