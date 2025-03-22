import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../styles/GlobalStyles.css';
import './AuthStyles.css';

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch(`http://localhost:8000/api/trademind/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const userData = await response.json();

                localStorage.setItem('user_id', JSON.stringify(userData.user.id));
                localStorage.setItem("email", userData.user.email);

                setSuccessMessage(`Welcome back, ${userData.user.first_name}!`);

                setTimeout(() => navigate('/home'), 2000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.detail || 'Login failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Invalid Credentials. Please try again later.');
        }
    };

    return (
        <div className="page-container">
            <div className="left-section">
                <img
                    src={'../images/login.jpg'}
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
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="login-register--button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
