import React, { useEffect, useState } from 'react'

//Import Css
import 'assets/styles/emp/EmpTopMenu.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EmpTopMenu() {

    const navigate = useNavigate();
    const location = useLocation();

    const [selectedMenu, setSelectedMenu] = useState<'assignment' | 'manageCounseling' | 'myInfo'>('assignment');

    useEffect(() => {
        if(location.pathname.startsWith('/emp/manageCounseling')) {
            setSelectedMenu('manageCounseling');
        } else if(location.pathname.startsWith('/emp/myInfo')) {
            setSelectedMenu('myInfo');
        } else {
            setSelectedMenu('assignment');
        }
    }, [location.pathname]);

    const handleMenuClick = (menu: 'assignment' | 'manageCounseling' | 'myInfo') => {
        setSelectedMenu(menu);
        if (menu === 'assignment') {
            navigate('/emp/assignment');
        } else if (menu === 'manageCounseling') {
            navigate('/emp/manageCounseling');
        } else if (menu === 'myInfo') {
            navigate('/emp/myInfo');
        }
    }

    return (
        <>
            <div className='top-menu-grid'>
                <div 
                    className={selectedMenu === 'assignment' ? 'top-menu-btn-selected' : 'top-menu-btn-unselected'}
                    onClick={() => handleMenuClick('assignment')}
                >
                    지도교수 관리
                </div>
                <div 
                    className={selectedMenu === 'manageCounseling' ? 'top-menu-btn-selected' : 'top-menu-btn-unselected'}
                    onClick={() => handleMenuClick('manageCounseling')}
                >
                    상담 관리
                </div>
                <div 
                    className={selectedMenu === 'myInfo' ? 'top-menu-btn-selected' : 'top-menu-btn-unselected'}
                    onClick={() => handleMenuClick('myInfo')}
                >
                    내 정보 관리
                </div>
                <div></div>
                <div></div>
            </div>
        </>
    )
}
