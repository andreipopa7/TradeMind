import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import EditAccountPage from "./pages/EditAccountPage";
import AddAccount from "./pages/AddAccount";
import ViewAccountsPage from "./pages/DashboardPage";
import NewBacktesting from "./pages/NewBacktesting";
import CustomStrategy from "./pages/CustomStrategy";
import HelpPage from "./pages/HelpPage";
import EconomicCalendarPage from "./pages/EconomicCalendarPage";
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
                <Route path="/accounts/add" element={<AddAccount />} />
                <Route path="/accounts/view" element={<ViewAccountsPage />} />
                {/*
                <Route path="/statistics/new" element={<CreateStatisticPage />} />
                <Route path="/statistics/view" element={<ViewStatisticsPage />} />
                */}
                <Route path="/backtesting/new-session" element={<NewBacktesting />} />
                <Route path="/backtesting/custom-strategy" element={<CustomStrategy />} />
                <Route path="/economic-calendar" element={<EconomicCalendarPage />} />
                <Route path="/help" element={<HelpPage />} />

            </Routes>
        </Router>
    );
}

export default App;
