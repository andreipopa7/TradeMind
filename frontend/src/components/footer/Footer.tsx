import React from 'react';
import "./FooterStyles.css"

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} TradeMind. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
