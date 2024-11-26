import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/GlobalStyles.css';
import '../styles/Login-RegisterPage.css';
//import image from '../images/loginImage.jpg'

const LoginPage: React.FC = () => {
    return (
        <div className="page-container">
            <div className="left-section">
                <img
                    src={'../images/loginImage.jpg'}
                    alt="Login Illustration"
                    className="login-image"
                />
            </div>

            <div className="right-section">
                <div className="title-container">
                    <h1>TradeMind</h1>
                </div>

                <div className="button-container">
                    <Link to="/login">
                        <button className="btn active">Login</button>
                    </Link>

                    <Link to="/register">
                        <button className="btn inactive">Register</button>
                    </Link>
                </div>
                <div className="form-container">
                    <h1>Login</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" required/>
                        </div>

                        <Link to="/home">
                            <button type="submit" className="login-register--button">Login</button>
                        </Link>
                    </form>

                    <div className="remember-me-container">
                        <div className="remember-me">
                            <input type="checkbox" id="rememberMe"/>
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>

                        <div className="forgot-password-container">
                            <Link to="/forgot-password" className="link">Forgot password?</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
