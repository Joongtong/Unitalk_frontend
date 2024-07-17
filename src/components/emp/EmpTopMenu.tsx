import React, { useEffect, useState } from 'react'

//Import Css
import 'assets/styles/emp/EmpTopMenu.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EmpTopMenu() {

    const navigate = useNavigate();
    const location = useLocation();

    const [selectedMenu, setSelectedMenu] = useState<'assignment' | 'manageProgram'>('assignment');

    useEffect(() => {
        if(location.pathname.startsWith('/emp/manageProgram')) {
            setSelectedMenu('manageProgram');
        } else {
            setSelectedMenu('assignment');
        }
    }, [location.pathname]);

    const handleMenuClick = (menu: 'assignment' | 'manageProgram') => {
        setSelectedMenu(menu);
        if (menu === 'assignment') {
            navigate('/emp/assignment');
        } else if (menu === 'manageProgram') {
            navigate('/emp/manageProgram');
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
                    className={selectedMenu === 'manageProgram' ? 'top-menu-btn-selected' : 'top-menu-btn-unselected'}
                    onClick={() => handleMenuClick('manageProgram')}
                >
                    상담 프로그램 관리
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    )
}
