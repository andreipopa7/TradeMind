import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth_pages/LoginPage';
import RegisterPage from './pages/auth_pages/RegisterPage';
import HomePage from './pages/home_page/HomePage';
import EditAccountPage from "./pages/edit_user_account/EditAccountPage";
import AddAccount from "./pages/trading_accounts_pages/add_new_account/AddAccount";
import ViewAccountsPage from "./pages/trading_accounts_pages/view_accounts/DashboardPage";
import NewBacktesting from "./pages/backtesting_pages/NewBacktesting";
import CustomStrategy from "./pages/backtesting_pages/CustomStrategy";
import HelpPage from "./pages/help_page/HelpPage";
import EconomicCalendarPage from "./pages/economic_calendar_pages/EconomicCalendarPage";
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
