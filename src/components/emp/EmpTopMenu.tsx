import React, { useEffect, useState } from 'react'

//Import Css
import 'assets/styles/emp/EmpTopMenu.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EmpTopMenu() {

    const navigate = useNavigate();
    const location = useLocation();

    const [selectedMenu, setSelectedMenu] = useState<'assignment' | 'manageCounseling'>('assignment');

    useEffect(() => {
        if(location.pathname.startsWith('/emp/manageCounseling')) {
            setSelectedMenu('manageCounseling');
        } else {
            setSelectedMenu('assignment');
        }
    }, [location.pathname]);

    const handleMenuClick = (menu: 'assignment' | 'manageCounseling') => {
        setSelectedMenu(menu);
        if (menu === 'assignment') {
            navigate('/emp/assignment');
        } else if (menu === 'manageCounseling') {
            navigate('/emp/manageCounseling');
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
                    상담 프로그램 개설
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    )
}
