import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as IoIcons from 'react-icons/io5';
import { Link } from 'react-router-dom';
import '../../styles/GlobalStyles.css';
import './NavBar.css';
import { IconContext } from 'react-icons';

const NavBar: React.FC = () => {
    const [sidebar, setSidebar] = useState<boolean>(false);
    const [profileMenu, setProfileMenu] = useState<boolean>(false);

    const toggleSidebar = () => setSidebar(!sidebar);
    const toggleProfileMenu = () => setProfileMenu(!profileMenu);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <div className='menu-bars'>
                        <Link to='#' onClick={toggleSidebar}>
                            <FaIcons.FaBars />
                        </Link>
                    </div>

                    <div className='navbar-icons'>
                        <div className='profile-edit-icon' onClick={toggleProfileMenu}>
                            <BiIcons.BiUserCircle />
                        </div>
                        <div className='notification-icon'>
                            <IoIcons.IoNotificationsOutline />
                        </div>
                    </div>
                </div>

                <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
                    <div className="menu-close">
                        <FaIcons.FaTimes onClick={toggleSidebar} />
                    </div>
                </nav>

                {profileMenu && (
                    <div className='profile-menu'>
                        <div className='profile-info'>
                            <p><strong>Nume Prenume</strong></p>
                            <p>email@example.com</p>
                        </div>
                        <div className='profile-actions'>
                            <Link to='/edit-credentials'>
                                <button className='menu-button'>Edit Credentials</button>
                            </Link>
                            <Link to='/login'>
                                <button className='menu-button'>Log Out</button>
                            </Link>
                        </div>
                    </div>
                )}
            </IconContext.Provider>
        </>
    );
};

export default NavBar;
