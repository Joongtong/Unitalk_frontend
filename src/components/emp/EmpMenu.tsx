import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//Import Css
import 'assets/styles/emp/EmpMenu.css';

function EmpMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedMenu, setSelectedMenu] = useState<'home' | 'assignment'>('home');

    useEffect(() => {
        if (location.pathname === '/viewAssignment') {
            setSelectedMenu('assignment');
        } else {
            setSelectedMenu('home');
        }
    }, [location.pathname]);

    const handleMenuClick = (menu: 'home' | 'assignment') => {
        setSelectedMenu(menu);
        if (menu === 'home') {
            navigate('/empHome');
        } else if (menu === 'assignment') {
            navigate('/viewAssignment');
        }
    };

    return (
        <>
            <div className='menu-box'>
                <div
                    className={selectedMenu === 'home' ? 'menu-text-selected' : 'menu-text-unselected'}
                    onClick={() => handleMenuClick('home')}
                >
                    지도교수 배정하기
                </div>
                <div
                    className={selectedMenu === 'assignment' ? 'menu-text-selected' : 'menu-text-unselected'}
                    onClick={() => handleMenuClick('assignment')}
                >
                    지도교수 배정현황
                </div>
            </div>
        </>
    );
}

export default EmpMenu;
