import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { countries } from '../../components/utils';
import './AuthStyles.css';
import '../../styles/GlobalStyles.css';

const RegisterPage: React.FC = () => {
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGender(event.target.value);
    };

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
    };

    return (
        <div className="page-container">
            <div className="left-section">
                <img
                    src={"../images/loginImage.jpg"}
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
                    <form>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" placeholder="Enter your first name" required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" placeholder="Enter your last name" required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" placeholder="Enter your phone number" required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                value={selectedGender}
                                onChange={handleGenderChange}
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
                                value={selectedCountry}
                                onChange={handleCountryChange}
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
