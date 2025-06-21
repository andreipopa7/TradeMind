import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { countries } from '../../components/utils';
import './AuthStyles.css';
import '../../styles/GlobalStyles.css';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        country: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:8000/api/trademind/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    gender: formData.gender,
                    country: formData.country
                })
            });

            if (response.ok) {
                setSuccessMessage('User registered successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    phone: '',
                    gender: '',
                    country: ''

                });
                setTimeout(() => navigate('/login'), 1000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.detail || 'Failed to register user.');
            }
        } catch (error) {
            setErrorMessage('Network error. Please try again.');
        }
    };

    return (
        <div className="page-container">
            <div className="left-section">
                <img
                    src={"/loginImage.jpg"}
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
                        <button className="btn inactive">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="btn active">Register</button>
                    </Link>
                </div>
                <div className="form-container">
                    <h1>Register</h1>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

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

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select
                                id="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                required>
                                <option value="">Select Country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="login-register--button">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
