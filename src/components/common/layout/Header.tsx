import React from 'react';
import { Link } from 'react-router-dom';
import 'assets/styles/common/Header.css';
import { LoginInfo } from '../../../types/interface/LoginInfo';

interface HeaderProps {
    setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
    user: LoginInfo | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <div id='header'>
            <div className='header-container'>
                <div className='header-logo-area'>
                    <div className='header-icon-box'>
                        <div className='logo-icon'></div>
                    </div>
                </div>
                <div></div>
                <div className='login-user-info'>
                    <span className='login-user-text'>{user?.userName || "GUEST"}</span> 님 환영합니다.
                </div>
                <div className='header-right'>
                    {user ? (
                        <button className='header-btn' onClick={handleLogout}>로그아웃</button>
                    ) : (
                        <Link to="/login">
                            <button className='header-btn'>로그인</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
